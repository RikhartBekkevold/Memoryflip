function Game(canvas) {
    this.canvas                 = canvas;
    this.fps                    = 60;
    this.cards                  = [];
    this.prevFlipped            = null;
    this.revealed               = false;
    this.allowFlip              = true;
    this.nrOfCards              = Settings.num_cards;
    this.nrOfRows               = Settings.num_rows;
    this.paused                 = false;
    this.nrOfMovesMade          = 0;
    this.cardContainer          = new PIXI.Container();
    this.score                  = new PIXI.Text('SCORE: ' + this.nrOfMovesMade, STYLE);
    this.flipSound              = new Audio(PATHS.flipSound);
    this.successSound           = new Audio(PATHS.successSound);
    this.successSound.volume    = 0.1;
    this.cardContainer.x        = game.renderer.width/2 - 400;
    this.score.x                = 30;
    this.peekBtn                = new PIXI.Text('PEEK', ALT_STYLE);
    this.backBtn                = new PIXI.Text('BACK', ALT_STYLE);
    this.resetBtn               = new PIXI.Text('RESET', ALT_STYLE);
    this.menuButtons            = [this.peekBtn, this.resetBtn, this.backBtn];

    //add lines above in foreach and push at end?
    this.menuButtons.forEach((btn, i) => {
        btn.y = i === 0 ? 100 : 40 + this.menuButtons[i-1].y;
        btn.x = 30;
        btn.interactive = true;
        btn.buttonMode = true;
        // btn.on("pointerup", () => btn.text());
    });

    this.peekBtn.on("pointerup", () => this.peek());
    this.resetBtn.on("pointerup", () => this.resetGame());
    this.backBtn.on("pointerup", () => this.gotoMainMenu());
};















Game.prototype.init = function(delay) {
    this.canvas.addChild(this.cardContainer);
    this.createCards();
    this.cards = shuffleCards(this.cards);
    this.setCardCoordinates();
    this.drawCards(delay, this.canvas);
    this.cards.forEach((card) => {
        card.frontView.on('pointerup', () => this.gameLogic(card));
    });
};


/**
 * Flips every card with the frontside up
 */
Game.prototype.showAll = function() {
    this.cards.forEach((card) => {
        card.flipOver();
        this.revealed = true;
    });
};


/**
 *  Flips every card with the backside up
 */
Game.prototype.hideAll = function() {
    this.cards.forEach((card) => {
        card.flipBack();
        this.revealed = false;
    });
};


/**
 * Shows the backside of all cards for 1 second
 */
Game.prototype.peek = function () {
    this.nrOfMovesMade += 2;
    this.score.text = 'SCORE: ' + this.nrOfMovesMade;
    this.showAll();

    setTimeout(() => {
        this.hideAll();
    }, 1000);
};



Game.prototype.gameLogic = function(card) {
    var self = this;

    if(this.allowFlip === true) {

        self.cards.forEach(function(prevClickedCard) {
            // if successful match
            if(prevClickedCard.value === card.value && prevClickedCard.flipped === true && prevClickedCard !== card) {

                self.allowFlip = false;
                self.cards.splice(self.cards.indexOf(card), 1);
                self.cards.splice(self.cards.indexOf(prevClickedCard), 1);
                self.successSound.play();
                card.removeCard();
                prevClickedCard.removeCard();
                setTimeout(function () {
                    self.allowFlip = true;
                }, 1000);
            }
            // if not successful match
            else if(prevClickedCard.flipped === true && prevClickedCard.value != card.value) {
                self.allowFlip = false;
                self.score.text = 'SCORE: ' + self.nrOfMovesMade++;
                card.flipBack();
                prevClickedCard.flipBack();
                setTimeout(function () {
                    self.allowFlip = true;
                }, 500);
            }
        });

        //do on every click
        card.flipOver();
        self.flipSound.play();

        //check if game is over
        if(self.cards.length === 0) {

            setTimeout(function () {
                end = new EndScreen(game.stage, self.nrOfMovesMade);
            }, 1500);

            self.canvas.removeChild(self.score);
            // remove all buttons
            self.menuButtons.forEach(function(btn) {
                self.canvas.removeChild(btn);
            });
        }
    }
};


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




/**
 * pushes 16 cards. uses the same index twice.
 */
Game.prototype.createCards = function() {
    // create 16 cards. pairs of cards share index
    for(let i = 0; i < 2; i++) { //rows
        for(let j = 0; j < this.nrOfCards/2; j++) { //columns
            this.cards.push(new Card(j, PATHS.cardBGs[j], this.cardContainer)); //(j*CARDS_WIDTH) + (PADDING*j) + 30, (i*CARDS_HEIGHT) + (PADDING*i) + 30)
        }
    }
};


// PATHS.cardBGs + i + ".png"
// CARD_PATH + i + ".png"

// 2 rows
// 2 8/2
// 2 - 8/2 - two rows, eight cards


// 3 rows
// 3 - 12/3
// nr of cards must match the space below

// 4 16/4
//
// this.nrOfCards = 8;
// this.nrOfRows = 2;
//
// this.nrOfCards = 12;
// this.nrOfRows = 3;
//
// this.nrOfCards = 16;
// this.nrOfRows = 4;
// rows
//cant dobbel click peek becasue revlead = true/false? execture code only if true.


Game.prototype.setCardCoordinates = function() {
    // set the cards x,y coordinates to match their new randomized array location
    let index = 0;
    for(l = 0; l < this.nrOfRows; l++) {  //3 rows
        for(k = 0; k < this.nrOfCards/this.nrOfRows; k++) {   //colomns 12/3 = 4
            this.cards[index].x = (k*CARDS_WIDTH) + (PADDING*k) + 120;
            this.cards[index].y = (l*CARDS_HEIGHT) + (PADDING*l) + 120;
            index++;
        }
    }
};


Game.prototype.removeMenuButtons = function () {
    for(var i = 0; i < this.menuButtons.length; i++) {
        this.canvas.removeChild(this.menuButtons[i]);
    }
};
//alt 2:
// Game.prototype.removeMenuButtons = function () {
//     this.menuButtons.forEach(function(btn) {
//         this.canvas.removeChild(btn);
//     });
// };

Game.prototype.removeScene = function () {
    this.cards.forEach(function(card) {
        card.removeView();
    });
    this.removeMenuButtons();
    this.cards = [];
};


Game.prototype.resetGame = function() {
    this.removeScene();
    this.canvas.removeChild(this.score);
    GAME = new Game(this.canvas);
    GAME.init(0);
};


Game.prototype.gotoMainMenu = function () {
    this.removeScene();
    const STARTSCREEN = new StartScreen(game.stage);
};
