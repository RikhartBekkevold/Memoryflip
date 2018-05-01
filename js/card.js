function Card(v, b, canvas, x, y) {
    this.canvas     =   canvas;
    this.height     =   0;
    this.width      =   0;
    this.value      =   v;
    this.x          =   x;
    this.y          =   y;
    this.backView   =   PIXI.Sprite.fromImage(b);
    this.frontView  =   PIXI.Sprite.fromImage(PATHS.cardFG);
    this.eyes       =   PIXI.Sprite.fromImage(PATHS.eyes);
    this.flipped    =   false;
    this.inactive   =   false;

    // currFlipping
    // frontShowing
    // backShowing

    this.backView.interactive = true;
    this.backView.buttonMode = true;
    this.backView.anchor.set(0.5);
    this.backView.scale.x = 0;

    this.frontView.interactive = true;
    this.frontView.buttonMode = true;
    this.frontView.anchor.set(0.5);

    this.eyes.anchor.set(0.5);
};

Card.prototype.draw = function() {
    if (this.flipped) {
        if(this.backView.visible === false) {
            this.backView.visible = true;
        }
        this.backView.x = this.x;
        this.backView.y = this.y;
        this.canvas.addChild(this.backView);
        this.frontView.visible = false;
        this.eyes.visible = false;
    }
    else {
        if(this.frontView.visible === false) {
            this.frontView.visible = true;
            // this.eyes.visible = true;
        }
        // add front
        this.frontView.x = this.x;
        this.frontView.y = this.y;
        this.canvas.addChild(this.frontView);
        // add eyes
        this.eyes.x = this.x;
        this.eyes.y = this.y;
        // this.canvas.addChild(this.eyes);
        // hide back
        this.backView.visible = false;
    }
};

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


Card.prototype.flipBack = function(){
    var card = this;

    setTimeout(function() {
        let flip = setInterval(function() {
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

Card.prototype.removeView = function() {
    this.canvas.removeChild(this.backView);
    this.canvas.removeChild(this.frontView);
};

Card.prototype.removeCard = function() {
    var card = this;

    setTimeout(function() {
        let fadeOut = setInterval(function() {
            card.backView.alpha -= 0.3;
            if(card.backView.alpha <= 0) {
                card.removeView();
                clearInterval(fadeOut);
            }
        }, 100);
    }, 1000);
};
