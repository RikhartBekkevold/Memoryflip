function Card(v, b, canvas, x, y) {
    this.canvas     =   canvas;
    this.height     =   0;
    this.width      =   0;
    this.value      =   v;
    this.x          =   x;
    this.y          =   y;
    this.flipped    =   false;
    this.inactive   =   false;
    this.backView   =   PIXI.Sprite.fromImage(b);
    this.frontView  =   PIXI.Sprite.fromImage(PATHS.cardFG);

    this.backView.interactive = true;
    this.backView.buttonMode = true;
    this.backView.anchor.set(0.5);
    this.backView.scale.x = 0;

    this.frontView.interactive = true;
    this.frontView.buttonMode = true;
    this.frontView.anchor.set(0.5);
};


///////////////////////////////////////
Card.prototype.draw = function() {
    if (this.flipped) {
        if(this.backView.visible === false) {
            this.backView.visible = true;
        }

        this.backView.x = this.x;
        this.backView.y = this.y;
        this.canvas.addChild(this.backView);
        this.frontView.visible = false;
    }
    else {
        if(this.frontView.visible === false) {
            this.frontView.visible = true;
        }
        // show front
        this.frontView.x = this.x;
        this.frontView.y = this.y;
        this.canvas.addChild(this.frontView);

        // hide back
        this.backView.visible = false;
    }
};


///////////////////////////////////////
Card.prototype.flipOver = function() {
    var card = this;

    var flip = setInterval(function() {
        card.frontView.scale.x -= 0.1;

        if(card.frontView.scale.x < 0) {
            card.frontView.scale.x = 0;
            card.flipped = true;
            card.draw();
            card.backView.scale.x += 0.1;

            if(card.backView.scale.x > 0.9) {
                card.backView.scale.x = 1;
                clearInterval(flip);
            }
        }
    }, 20);
};


///////////////////////////////////////
Card.prototype.flipBack = function(){
    var card = this;

    setTimeout(() => {
        let flip = setInterval(() => {
            card.backView.scale.x -= 0.1;

            if(card.backView.scale.x < 0) {
                card.backView.scale.x = 0;
                card.flipped = false;
                card.draw();

                card.frontView.scale.x += 0.1;
                if(card.frontView.scale.x > 0.9) {
                    card.frontView.scale.x = 1;
                    clearInterval(flip);
                }
            }
        }, 10);
    }, 700);
};


///////////////////////////////////////
Card.prototype.removeView = function() {
    this.canvas.removeChild(this.backView);
    this.canvas.removeChild(this.frontView);
};


///////////////////////////////////////
Card.prototype.removeCard = function() {
    const fade  = 0.3;
    const delay = 1000;
    const speed = 100;

    setTimeout(() => {
        let fadeOut = setInterval(() => {
            this.backView.alpha -= 0.3;
            if(this.backView.alpha <= 0) {
                this.removeView();
                clearInterval(fadeOut);
            }
        }, 100);
    }, 1000);
};


///////////////////////////////////////
Card.prototype.startMove = function(x, y) {
    var sameColumn          = this.x === x ? true : false;
    var biggerX             = this.x > x ? true : false;
    var biggerY             = this.y > y ? true : false;
    var speed               = 5;
    const REFRESH_RATE      = 1;

    const move = setInterval(() => {
        this.rotation = Math.atan2(y - this.y, x - this.x);

        this.x += Math.cos(this.rotation) * speed;
        this.y += Math.sin(this.rotation) * speed;

        // if the card is one of 4 cards
        if(this.x > x && sameColumn === false && biggerX === false) {
            this.stopMove(move, x, y);
        }
        if(this.x < x && sameColumn === false && biggerX === true) {
            this.stopMove(move, x, y);
        }
        if(this.y > y && sameColumn === true && biggerY === true) {
            this.stopMove(move, x, y);
        }
        if(this.y < y && sameColumn === true && biggerY === false) {
            this.stopMove(move, x, y);
        }

        this.draw();

    }, REFRESH_RATE);

};


///////////////////////////////////////
Card.prototype.stopMove = function(move, x, y) {
    clearInterval(move);
    this.x = x;
    this.y = y;
};
