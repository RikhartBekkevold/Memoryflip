/**
 * @constructor call with 'new' to create an instance
 * @param canvas the canvas to draw the game unto
 */
function Game(canvas) {
    this.canvas                 = canvas;
    this.CARDS_WIDTH            = 100;
    this.CARDS_HEIGHT           = 145;
    this.PADDING                = 30;
    this.cards                  = [];
    this.prevFlipped            = null;
    this.revealed               = false;
    this.allowFlip              = true;
    this.nrOfCards              = Settings.num_cards;
    this.nrOfRows               = Settings.num_rows;
    this.enableEvents           = Settings.randomEvents;
    this.paused                 = false;
    this.nrOfMovesMade          = 0;
    this.cardContainer          = new PIXI.Container();
    this.score                  = new PIXI.Text('SCORE: ' + this.nrOfMovesMade, STYLE);
    this.flipSound              = new Audio(PATHS.flipSound);
    this.successSound           = new Audio(PATHS.successSound);
    this.successSound.volume    = 0.1;
    this.cardContainer.x        = 0;
    this.score.x                = 30;

    this.peekBtn                = new PIXI.Text('PEEK', ALT_STYLE);
    this.backBtn                = new PIXI.Text('BACK', ALT_STYLE);
    this.resetBtn               = new PIXI.Text('RESET', ALT_STYLE);
    this.menuButtons            = [this.peekBtn, this.resetBtn, this.backBtn];

    this.menuButtons.forEach((btn, i) => {
        btn.y = i === 0 ? 100 : 60 + this.menuButtons[i-1].y;
        btn.x = 30;
        btn.interactive = true;
        btn.buttonMode = true;
    });

    this.peekBtn.on("pointerup", () => this.peek());
    this.resetBtn.on("pointerup", () => this.resetGame());
    this.backBtn.on("pointerup", () => SM.nextScene('start'));
};



///////////////////////////////////////
/**
 * Starts the game
 * @param delay the time in milliseconds before the cards starts drawing
 * @returns undefined
 */
Game.prototype.init = function(delay) {
    // move this part? why preload every time?
    PIXI.loader.reset();
    PIXI.loader.add(PATHS.cardFG)
               .add(PATHS.cardBGs)
               .load(() => {
                    this.canvas.addChild(this.cardContainer);
                    this.createCards();
                    // for(let i = 0; i < 2; i++) { //rows
                    //     for(let j = 0; j < this.nrOfCards/2; j++) { //columns
                    //         this.cards.push(new Card(j, PATHS.cardBGs[j], this.cardContainer));
                    //     }
                    // }
                    this.cards = shuffleCards(this.cards);
                    this.setCardCoordinates();
                    this.drawCards(delay, this.canvas);
                    this.cards.forEach((card) => {
                        card.frontView.on('pointerup', () => this.onCardClick(card));
                    });
                    if(this.enableEvents) {
                        this.randomEvent();
                    }
                });
};



///////////////////////////////////////
/**
 * Shows the backsides of all cards
 * @param none
 * @return undefined
 */
Game.prototype.showAll = function() {
    this.cards.forEach((card) => {
        card.flipOver();
        this.revealed = true;
    });
};



///////////////////////////////////////
/**
 * Shows the frontside of all cards
 * @param none
 * @returns undefined
 */
Game.prototype.hideAll = function() {
    this.cards.forEach((card) => {
        card.flipBack();
        this.revealed = false;
    });
};



///////////////////////////////////////
/**
 * Shows the backside of all cards for 1 second before
 * flipping back
 * @param none
 * @returns undefined
 */
Game.prototype.peek = function () {
    // peeking should punish the score
    this.nrOfMovesMade += 4;
    this.score.text = 'SCORE: ' + this.nrOfMovesMade;
    // show all the cards
    this.showAll();
    // after 1 second hide them again
    setTimeout(() => {
        this.hideAll();
    }, 1000);
};



///////////////////////////////////////
/**
 * Checks if a card matches the previous card
 * @param card the card to check
 */
Game.prototype.onCardClick = function(card) {
    var self = this;

    if(this.allowFlip === true) {
        this.cards.forEach(function(prevClickedCard) {
            // if successful match
            if(prevClickedCard.value === card.value && prevClickedCard.flipped === true && prevClickedCard !== card) {
                self.removeCards(card, prevClickedCard);
            }
            // if not successful match
            else if(prevClickedCard.flipped === true && prevClickedCard.value != card.value) {
                self.resetCards(card, prevClickedCard);
            }
        });
        card.flipOver();
        self.flipSound.play();
        self.checkIfGameOver();
    }
};



///////////////////////////////////////
/**
 * Removes two cards from the board and array
 * @param card first card to remove
 * @param prevClickedCard second card to remove
 */
Game.prototype.removeCards = function (card, prevClickedCard) {
    var self = this;
    self.allowFlip = false;
    self.cards.splice(self.cards.indexOf(card), 1);
    self.cards.splice(self.cards.indexOf(prevClickedCard), 1);
    self.successSound.play();
    card.removeCard();
    prevClickedCard.removeCard();
    setTimeout(function () {
        self.allowFlip = true;
    }, 1000);
};



///////////////////////////////////////
/**
 * Resets the state of the two flipped cards
 * @param card first card to remove
 * @param prevClickedCard second card to remove
 */
Game.prototype.resetCards = function(card, prevClickedCard) {
    var self = this;
    self.allowFlip = false;
    self.score.text = 'SCORE: ' + self.nrOfMovesMade++;
    card.flipBack();
    prevClickedCard.flipBack();

    // freeze input to cards
    setTimeout(function () {
        self.allowFlip = true;
    }, 500);
};



///////////////////////////////////////
/**
 * Determines of game is over and initiates end screen if so
 */
Game.prototype.checkIfGameOver = function() {
    //check if game is over
    var self = this;

    if(self.cards.length === 0) {
        setTimeout(function () {
            // self.destroySelf();
            SM.nextScene('end', self.nrOfMovesMade);
        }, 1500);
    }
};



///////////////////////////////////////
/**
 * Draws the cards unto the canvas
 * @param delay the time before the cards is drawn
 * @param canvas the canvas to draw the cards unto
 */
Game.prototype.drawCards = function(delay, canvas) {
    var self = this;
    var time = 0;

    self.cards.forEach(function(card) {
        setTimeout(function() {
            card.draw();
        }, delay);

        setTimeout(function() {
            //add order == z-index
            self.menuButtons.forEach(function(btn) {
                canvas.addChild(btn);
            });
            canvas.addChild(self.score);
        }, delay);

        delay += 20;
    });
};



///////////////////////////////////////
/**
 * Creates 18/12/8 card objects
 * @param none
 * @returns undefined
 */
Game.prototype.createCards = function() {
    // create 16 cards. pairs of cards share value nr
    for(let i = 0; i < 2; i++) { //rows
        for(let j = 0; j < this.nrOfCards/2; j++) { //columns
            this.cards.push(new Card(j, PATHS.cardBGs[j], this.cardContainer));
        }
    }
};



///////////////////////////////////////
/**
 * Sets the x and y coordinates of all cards.
 * X axis is centered.
 * Y axis from the top.
 * @returns undefined
 */
Game.prototype.setCardCoordinates = function() {
    const CARD_HALF_WIDTH       =   this.CARDS_WIDTH / 2;
    const SCREEN_HALF_WIDTH     =   document.body.clientWidth / 2;
    const CARD_HALF_HEIGHT      =   this.CARDS_HEIGHT / 2;
    const WIDTH_OF_ALL_CARDS    =   ((this.CARDS_WIDTH + this.PADDING) * (this.nrOfCards / this.nrOfRows) - this.PADDING) / 2;
    const START_POS_X           =   (SCREEN_HALF_WIDTH - WIDTH_OF_ALL_CARDS) + CARD_HALF_WIDTH;
    const START_POS_Y           =   CARD_HALF_HEIGHT + 20;

    let card_nr = 0;

    for(let l = 0; l < this.nrOfRows; l++) {  //3 rows
        for(let k = 0; k < this.nrOfCards/this.nrOfRows; k++) {   //colomns 12/3 = 4
            // the length of previous cards + padding + start position
            this.cards[card_nr].x = (k * this.CARDS_WIDTH) + (this.PADDING * k) + START_POS_X;
            this.cards[card_nr].y = (l * this.CARDS_HEIGHT) + (this.PADDING * l) + START_POS_Y;
            card_nr++;
        }
    }
};



///////////////////////////////////////
/**
 * Removes all menu buttons and slids them out of the screen.
 * @returns undefined
 */
Game.prototype.removeMenuButtons = function() {
    for(var i = 0; i < this.menuButtons.length; i++) {
        slideOutandRemove(this.menuButtons[i]);
        // this.canvas.removeChild(this.menuButtons[i]);
    }
};



///////////////////////////////////////
/**
 * Removes all views.
 * @returns undefined
 */
Game.prototype.destroySelf = function() {
    this.cards.forEach(function(card) {
        card.removeView();
    });
    this.cards = [];
    this.menuButtons.forEach((btn) => {
        this.canvas.removeChild(btn);
    });
    this.canvas.removeChild(this.score);
    // this.nrOfMovesMade = 0;
    // must remove container also?
};



///////////////////////////////////////
/**
 * Resets game.
 */
Game.prototype.resetGame = function() {
    this.destroySelf();
    this.cards.forEach(function(card) {
        card.removeView();
    });

    this.menuButtons.forEach((btn) => {
        this.canvas.removeChild(btn);
    });

    this.cards = [];
    this.canvas.removeChild(this.score);

    SM.currentScene = new Game(this.canvas);
    SM.currentScene.init(0);
};



///////////////////////////////////////
/**
 * Selects two random cards left on the board and switches their position.
 * See: https://stackoverflow.com/questions/9719434/picking-2-random-elements-from-array
 * for randomization tips.
 */
Game.prototype.switchTwoCards = function() {

    // shuffles the cards left on board..
    shuffleCards(this.cards);
    // ..and selects the two first cards, essentially selecting two random cards
    var firstCard = this.cards[0];
    var secondCard = this.cards[1];

    firstCard.startMove(secondCard.x, secondCard.y);
    secondCard.startMove(firstCard.x, firstCard.y);
};



///////////////////////////////////////
/**
 * Initiates a card switch; 3 to 5 seconds after called.
 * Recursively calls itself to switch cards continuously.
 * @returns undefined
 */
Game.prototype.randomEvent = function() {
    const MAX_SEC   =   2 * 1000;
    const MIN_SEC   =   3 * 1000;

    // generate random time between 5 seconds and 20 seconds
    var randomTime  =   Math.round(MIN_SEC + Math.random() * MAX_SEC);

    console.log('Seconds to next card switch: ' + Math.round(randomTime / 1000));

    // switch cards after random time
    setTimeout(() => {
            this.switchTwoCards();
            this.randomEvent();
    }, randomTime);
};
