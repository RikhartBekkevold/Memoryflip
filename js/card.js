function Card(v, b, canvas, x, y) {
    this.canvas     =   canvas;

    this.value      =   v;
    this.x          =   x;
    this.y          =   y;
    this.flipped    =   false;
    this.inactive   =   false;
    this.backView   =   new PIXI.Sprite(PIXI.loader.resources[b].texture);//b; //PIXI.Sprite.fromImage(b);
    this.frontView  =   new PIXI.Sprite(PIXI.loader.resources[PATHS.cardFG].texture);//f; //PIXI.Sprite.fromImage(PATHS.cardFG);

    // this.height     =   backView.height;
    // this.width      =   backView.width;

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

    if(this.x < x && sameColumn === false && biggerX === true) {
        console.log('y');
        return
    }
    if(this.x > x && sameColumn === false && biggerX === false) {
        console.log('u');
        return
    }

    console.log(this.value +': ' + x + ', ' + y);

    const move = setInterval(() => {
        this.rotation = Math.atan2(y - this.y, x - this.x);

        this.x += Math.cos(this.rotation) * speed;
        if(!sameColumn && this.y !== y) {
            this.y += Math.sin(this.rotation) * speed;
        }

        // if the card has one of 4 possible positions

        // same row and right
        if(this.x > x && sameColumn === false && biggerX === false) {
            this.stopMove(move, x, y);
        }
        // same row and left
        else if(this.x <= x && sameColumn === false && biggerX === true) {
            this.stopMove(move, x, y);


            // higher x than other card
            // same y as other card
            // the stop move does not get called for it
            // its x but not y, is alternating between two values

            // biggerX = true at start
            //


            // dont move the y?
            // this only case when y is the same?

            // why do it no always move? or it gets the same coord imidately?
            // when it bugs it goes faster, it ignores the time
        }
        // not same row and
        else if(this.y > y && sameColumn === true && biggerY === true) {
            this.stopMove(move, x, y);
        }
        else if(this.y < y && sameColumn === true && biggerY === false) {
            this.stopMove(move, x, y);
        }


// always left one. always same row. meaning the one that starts right

        this.draw();

    }, REFRESH_RATE);

};


///////////////////////////////////////
Card.prototype.stopMove = function(move, x, y) {
    clearInterval(move);
    this.x = x;
    this.y = y;


// always left side that bugs....
    // stop move never called for second card.. or first
    // it bugs simply when one of the values are the same? then it stops for one first? before.. then what about same coloumn?

// no stop condition for one of them.. but when it moves over it become the other card and have a stop condition?

    console.log(this.value +': ' + x + ', ' + y);

    // this.removeView();

};
