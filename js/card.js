/**
 * The representation of a card on the board. The visual
 * part of the card consists of two sprites, a backside
 * and frontside view
 * @param v the value of the card
 * @param b the backside texture
 * @param canvas the view element to draw the card onto
 * @param x the card's coordinate on the x axis
 * @param y the card's coordinate on the y axis
 * @return undefined
 */
function Card(v, b, canvas, x, y) {
    this.canvas     =   canvas;
    this.value      =   v;
    this.x          =   x;
    this.y          =   y;
    this.flipped    =   false;
    this.inactive   =   false;
    this.backView   =   new PIXI.Sprite(PIXI.loader.resources[b].texture);
    this.frontView  =   new PIXI.Sprite(PIXI.loader.resources[PATHS.cardFG].texture);

    this.backView.interactive = true;
    this.backView.buttonMode = true;
    this.backView.anchor.set(0.5);
    this.backView.scale.x = 0;

    this.frontView.interactive = true;
    this.frontView.buttonMode = true;
    this.frontView.anchor.set(0.5);
};



/**
 * If flipped draws the backside of the card, else
 * draws the frontside of the card to the view
 * @return undefined
 */
Card.prototype.draw = function() {

    if(this.flipped) {
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
// console.log(performance.now());
// all game logic and some of the animation is handled on click. no need every update
/**
 * Visually flips the card over by shrinking the
 * scale of the frontview card, on the x axis, from 1 to 0, and then increasing
 * the scale of the backview from 0 to 1 creating the
 * appearance of a card flip
 * @return undefined
 */
Card.prototype.flipOver = function() {
    // // var card = this;
    // var self = this;
    let ani = requestAnimationFrame( () => { this.flipOver(); } );
    // request animation frame with delta

    console.log(performance.now());

    this.frontView.scale.x -= 0.1;

    if(this.frontView.scale.x < 0) {
        this.frontView.scale.x = 0;
        this.flipped = true;
        this.draw();
        this.backView.scale.x += 0.1;

        if(this.backView.scale.x > 0.9) {
            this.backView.scale.x = 1;
            cancelAnimationFrame(ani);
        }
    }

    // interval i want. interval that has passed (delta)
    // so i want 20 sec to pass . thats the interval. time between each time/call i want to pass
    // "time_between_calls".. maybe call it delta? opptimiztic?

    // // what is the current time
    // currentTime = (new Date()).getTime();
    // // how much time has passed
    // delta = (currentTime-lastTime);
    //
    // //  has enough time passed? is the time passed bigger than the FPS/interval?
    // if(delta > interval) {
    //
    //     // animation here...
    //
    //     //
    //     lastTime = currentTime - (delta % interval);
    // }

    // tweening

    // decouple animation and game logic from gameloop. only needed on click

    // console.log('d');

    // if(this.backView.scale.x > 0.9) {
    //      this.backView.scale.x = 1;
    //      cancelAnimationFrame(flip);
    //  }

    // var flip = setInterval(() => {
    //     this.frontView.scale.x -= 0.1 * delta; // delta might not work here
    //
    //     if(this.frontView.scale.x < 0) {
    //         this.frontView.scale.x = 0;
    //         this.flipped = true;
    //         this.draw();
    //         this.backView.scale.x += 0.1;
    //
    //         if(this.backView.scale.x > 0.9) {
    //             this.backView.scale.x = 1;
    //             clearInterval(flip);
    //         }
    //     }
    // }, 20);
};


/**
 * Does same as flipOver(), in reverse
 * @return undefined
 */
Card.prototype.flipBack = function() {
     // const DELAY     =  700;
     // const INTERVAL  =  10;


     // thsoe scales become the max after all ... 0 still min
     // this will shorten the animation time though. need decoupling



    let anis = requestAnimationFrame(() => { this.flipBack(); } );

    this.backView.scale.x -= 0.1;

    if(this.backView.scale.x < 0) {
        this.backView.scale.x = 0;
        this.flipped = false;
        this.draw();



        // when scale is set at start.. use these vars/Consts as values here.. "untill scale = 0.8"

        this.frontView.scale.x += 0.1;
        if(this.frontView.scale.x > 0.9) {
            this.frontView.scale.x = 1;
            cancelAnimationFrame(anis);
        }
    }

//
// you want the person with passion
// hard working
// interested in what he does and interested in improving and learning

    //
    // let Rikhart_Bekkevold = {
    //
    //     Frontend: 75 + '%',
    //     Backend: 25
    //
    //
    //
    // }


    // dark bg with color like syntax highlighting?


    // makeResponive() => {
    //
    // }


    // something that has programming in it - as a theme
    // something that is not a theme you can find
    // something that has all the things i claim tio have on it. responive site proves i make responive things
    // shows deep js understanding of new things


    // vue
    // mobile rpject , java


    // completely unique. not something i can find anywhere in a framwork etc... unique. somethign clearly built by me
    // reposnivet design, fast, ux

    // all the claims about me and what i like, proved in the websites
    // a way that plebs can search and i does my best guess at what they want?


    // use monospace font
    // reponsive
    // associations

    //django

// WOW
// interesting
// mezmerizing
// attention grabbing
// clean and neat
// modern  - // arrow functions shows modern


// uptodate/modern, creative, trendy, skillfull



     // missing set timeout delay


    // setTimeout(() => {
    //     const FLIP = setInterval(() => {
    //         this.backView.scale.x -= 0.1;
    //
    //         if(this.backView.scale.x < 0) {
    //             this.backView.scale.x = 0;
    //             this.flipped = false;
    //             this.draw();
    //
    //             this.frontView.scale.x += 0.1;
    //             if(this.frontView.scale.x > 0.9) {
    //                 this.frontView.scale.x = 1;
    //                 clearInterval(FLIP);
    //             }
    //         }
    //     }, INTERVAL);
    // }, DELAY);
};


/**
 * Removes both views from the board that
 * the card consists of
 * @return undefined
 */
Card.prototype.removeView = function() {
    this.canvas.removeChild(this.backView);
    this.canvas.removeChild(this.frontView);
};


/**
 * Animates the removal of the card from the board
 * @return undefined
 */
Card.prototype.removeCard = function() {
    const fade  = 0.3;
    const delay = 1000;
    const speed = 100;          // is it speed?

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


/**
 * Moves the card to x and y
 * @param x the x coord to move the card towards
 * @param y the y coordinateto move the cards towards
 * @return undefined
 */
Card.prototype.startMove = function(x, y) {
    var sameColumn          = this.x === x ? true : false;
    var biggerX             = this.x > x ? true : false;
    var biggerY             = this.y > y ? true : false;
    var speed               = 5;
    const INTERVAL          = 1;

    // if(this.x < x && sameColumn === false && biggerX === true) {
    //     console.log('y');
    //     return
    // }
    // if(this.x > x && sameColumn === false && biggerX === false) {
    //     console.log('u');
    //     return
    // }

    // console.log(this.value +': ' + x + ', ' + y);

    const move = setInterval(() => {

        this.rotation = Math.atan2(y - this.y, x - this.x);

        this.x += Math.cos(this.rotation) * speed;
        if(!sameColumn && this.y !== y) {
            this.y += Math.sin(this.rotation) * speed;
        }

        // the cards start position can be to the left, right, above or below its end goal
        // each of these types (locations) have a different condition under which it is determined that they need to stop
        if(this.x > x && sameColumn === false && biggerX === false) {
            this.stopMove(move, x, y);
        }
        else if(this.x <= x && sameColumn === false && biggerX === true) {
            this.stopMove(move, x, y);
        }
        else if(this.y > y && sameColumn === true && biggerY === true) {
            this.stopMove(move, x, y);
        }
        else if(this.y < y && sameColumn === true && biggerY === false) {
            this.stopMove(move, x, y);
        }

        this.draw();

    }, INTERVAL);
};



/**
 * Stops the card from moving and ensures that the card is
 * positioned exactly where it was intended to stop.
 * @param move the current running interval to stop
 * @param x the value to set the cards x position to
 * @param y the value to set the cards y position to
 * @return undefined
 */
Card.prototype.stopMove = function(move, x, y) {
    clearInterval(move);
    this.x = x;
    this.y = y;
};
