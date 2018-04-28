function Game(canvas) {
    this.canvas         = canvas;
    this.fps            = 60;
    this.cards          = [];
    this.prevFlipped    = null;
    this.allowFlip      = true;
    this.nrOfCards      = 16;
    this.nrOfRows       = 2;
    this.paused         = false;
    this.nrOfMovesMade  = 0;
    this.cardContainer  = new PIXI.Container();
    this.score          = new PIXI.Text(this.nrOfMovesMade, STYLE);
    this.cogwheel       = PIXI.Sprite.fromImage(PATHS.cogwheel);
    this.flipSound      = new Audio(PATHS.flipSound);
    this.successSound   = new Audio(PATHS.successSound);

    this.successSound.volume = 0.1;
    this.cardContainer.x = game.renderer.width/2 - 400;
    this.score.x = 30;
    this.cogwheel.x = game.renderer.width - 100;
    this.cogwheel.interactive = true;
    this.cogwheel.buttonMode = true;

    this.canvas.addChild(this.cardContainer);
    this.cogwheel.on("pointerup", () => this.reset(this.canvas));
};


Game.prototype.init = function(delay) {
    this.createCards();
    this.cards = shuffleCards(this.cards);
    this.setCardCoordinates();
    this.drawCards(delay, this.canvas);
    var self = this;
    this.cards.forEach(function(card) {
        card.frontView.on('pointerover', () => self.animateHover(card));
        card.frontView.on('pointerout', () => self.animateHoverLeave(card));
        card.frontView.on('pointerup', () => self.gameLogic(card));
    });
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
                }, 700);
            }
            // if not successful match
            else if(prevClickedCard.flipped === true && prevClickedCard.value != card.value) {
                self.allowFlip = false;
                card.flipBack();
                prevClickedCard.flipBack();
                setTimeout(function () {
                    self.allowFlip = true;
                }, 700);
            }
        });

        //do on every click
        self.score.text = self.nrOfMovesMade++;
        card.flipOver();
        self.flipSound.play();

        //if the game is over
        if(self.cards.length === 0) {
            end = new EndScreen(game.stage, self.nrOfMovesMade);
            self.canvas.removeChild(self.score);
            self.canvas.removeChild(self.cogwheel);
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

        setTimeout(function() { // this adds many
            canvas.addChild(self.cogwheel);
            canvas.addChild(self.score);
        }, delay + 500);

        delay += 20;

    });
};

Game.prototype.animateHover = function(card) {
    card.frontView.tint = 0xB1B1B1;
    //close eyes
};

Game.prototype.animateHoverLeave = function(card) {
    card.frontView.tint = 0xFFFFFF;
    //open eyes
};

Game.prototype.revealAllCards = function() {
    this.cards.forEach(function(card, index) {
        card.flipped = true;
        card.draw();
    });
};

Game.prototype.disableCard = function (card) {
    card.inactive = true;
};

Game.prototype.disableCards = function () {
    this.cards.forEach(function(card) {
        card.disableCard();
    });
};

Game.prototype.createCards = function() {
    // create 16 cards
    for(let i = 0; i < 2; i++) { //rows
        for(let j = 0; j < this.nrOfCards/2; j++) { //columns
            this.cards.push(new Card(j, PATHS.cardBGs[j], this.cardContainer)); //(j*CARDS_WIDTH) + (PADDING*j) + 30, (i*CARDS_HEIGHT) + (PADDING*i) + 30)
        }
    }
};

Game.prototype.setCardCoordinates = function() {
    // set the cards x,y coordinates to match their new randomized array location
    var index = 0;
    for(l = 0; l < 4; l++) {
        for(k = 0; k < this.nrOfCards/4; k++) {
            this.cards[index].x = (k*CARDS_WIDTH) + (PADDING*k) + 120;
            this.cards[index].y = (l*CARDS_HEIGHT) + (PADDING*l) + 120;
            index++;
        }
    }
};

Game.prototype.reset = function() {
    this.cards.forEach(function(card) {
        card.removeView();
    });
    this.canvas.removeChild(this.score);
    this.canvas.removeChild(this.cogwheel);
    this.cards = [];
    GAME = new Game(this.canvas);
    GAME.init(0);
};

// this.cogwheel.on('mousemove', function (event) {
//     const x = event.data.global.x;
//     const y = event.data.global.y;
//
//     self.cards.forEach(function(card) {
//         var rad = Math.atan2(x - card.eyes.x, y - card.eyes.y);   // atan only useful for rotation - dont need for moving to an x,y point, just inc both x and y at same time
//         card.eyes.rotation = (rad * (180 / Math.PI) * -1) + 180;
//     });
// });
