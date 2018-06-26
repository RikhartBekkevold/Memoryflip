function Game(canvas) {
    this.canvas                 = canvas;
    this.CARDS_WIDTH            = 138;
    this.CARDS_HEIGHT           = 200;
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
    this.cardContainer.x        = game.renderer.width/2 - 400;
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
    this.backBtn.on("pointerup", () => SM.nextScene('start')); //;this.gotoMainMenu()
};


///////////////////////////////////////
Game.prototype.init = function(delay) {
    this.canvas.addChild(this.cardContainer);
    this.createCards();
    this.cards = shuffleCards(this.cards);
    this.setCardCoordinates();
    this.drawCards(delay, this.canvas);
    this.cards.forEach((card) => {
        card.frontView.on('pointerup', () => this.onCardClick(card));
    });

    if(this.enableEvents) {
       this.randomEvent();
    }
};


///////////////////////////////////////
Game.prototype.showAll = function() {
    this.cards.forEach((card) => {
        card.flipOver();
        this.revealed = true;
    });
};


///////////////////////////////////////
Game.prototype.hideAll = function() {
    this.cards.forEach((card) => {
        card.flipBack();
        this.revealed = false;
    });
};


///////////////////////////////////////
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
Game.prototype.onCardClick = function(card) {
    // can't use arrow function with prototype
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
Game.prototype.checkIfGameOver = function () {
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
Game.prototype.createCards = function() {
    // create 16 cards. pairs of cards share index
    for(let i = 0; i < 2; i++) { //rows
        for(let j = 0; j < this.nrOfCards/2; j++) { //columns
            this.cards.push(new Card(j, PATHS.cardBGs + j + ".png", this.cardContainer)); //(j*CARDS_WIDTH) + (PADDING*j) + 30, (i*CARDS_HEIGHT) + (PADDING*i) + 30)
        } //PATHS.cardBGs[j]
    }
};


///////////////////////////////////////
Game.prototype.setCardCoordinates = function() {
    // set the cards x,y coordinates to match their new randomized array location
    let index = 0;
    for(l = 0; l < this.nrOfRows; l++) {  //3 rows
        for(k = 0; k < this.nrOfCards/this.nrOfRows; k++) {   //colomns 12/3 = 4
            this.cards[index].x = (k*this.CARDS_WIDTH) + (this.PADDING*k) + 120;
            this.cards[index].y = (l*this.CARDS_HEIGHT) + (this.PADDING*l) + 120;
            index++;
        }
    }
};


///////////////////////////////////////
Game.prototype.removeMenuButtons = function() {
    for(var i = 0; i < this.menuButtons.length; i++) {
        slideOutandRemove(this.menuButtons[i]);
        // this.canvas.removeChild(this.menuButtons[i]);
    }
};


///////////////////////////////////////
Game.prototype.destroySelf = function() {
    this.cards.forEach(function(card) {
        card.removeView();
    });
    this.removeMenuButtons();
    this.cards = [];
    slideOutandRemove(this.score);
    // this.canvas.removeChild(this.score);
    // just destroy container should be necessary...
};


///////////////////////////////////////
Game.prototype.resetGame = function() {
    this.destroySelf();
    this.canvas.removeChild(this.score);
    new Game(this.canvas).init(0);
};


///////////////////////////////////////
Game.prototype.switchTwoCards = function() {
    var nr = Math.round(Math.random() * (this.cards.length - 2));
    var firstCard = this.cards[nr];
    var secondCard = this.cards[nr + 1];  // not random yet

    firstCard.startMove(secondCard.x, secondCard.y);
    secondCard.startMove(firstCard.x, firstCard.y);
};


///////////////////////////////////////
Game.prototype.randomEvent = function() {
    const MAX_SEC   =   30 * 1000;
    const MIN_SEC   =   5;
    var randomTime  =   Math.round(MIN_SEC + Math.random() * MAX_SEC);

    console.log('Seconds to next card switch: ' + Math.round(randomTime / 1000));

    setTimeout(() => {
            this.switchTwoCards();
            this.randomEvent();
    }, randomTime);
};
