///////////////////////////////////////
function slideRight(element, canvas) {
    let slideRight = setInterval(function() {
        element.x += 10;
        if(element.x > game.renderer.width) {
            clearInterval(slideRight);
            canvas.removeChild(element);
        }
    }, 1);
};


///////////////////////////////////////
function slideLeft(element, canvas) {
    let slideLeft = setInterval(function() {
        element.x -= 10;
        if(element.x < -self.message.width) {
            clearInterval(slideLeft);
            canvas.removeChild(element);
        }
    }, 1);
};


///////////////////////////////////////
function slideOutandRemove(element, h) {
    const START_Y           =   JSON.parse(JSON.stringify(element.y));  //elements y value before moving
    const START_X           =   JSON.parse(JSON.stringify(element.x));  //elements x value before moving
    const GRAVITY           =   0.4;            //acceleration - how many pixels faster each time
    const AMPLITUDE         =   0;          //how many pixels to jump
    const OUT_OF_BOUNDS     =   0 - element.width;                      //hide element if <= oob

    let velocity = .001;
    let speed = 0.1;

        let jump = setInterval(function() {

                if(element.y >=  START_Y) { //if on ground
                    element.y = START_Y;
                    clearInterval(jump);
                    setTimeout(function() {  //can give it a name?
                        let skewElement = setInterval(function() {
                            element.skew.x -= 0.3;
                            if(element.skew.x < -0.3) {
                                clearInterval(skewElement);
                            }
                        }, 1);

                        let startMove = setInterval(function() {
                            // move element with increasing speed
                            element.x = -Math.pow(speed, 6) + START_X;
                            speed += 0.1;
                            // when entire element is outside screen
                            if(element.x < OUT_OF_BOUNDS) {
                                clearInterval(startMove);
                            }
                        }, 1);
                    }, 250);
                }
            // }
        }, 1);
};


let originalX = [];
let originalY = [];


///////////////////////////////////////
function stackCards() {
    let x = 600; //distance in pixels  calc with formula   innerWidth/2 - card.x - CARDS_WIDTH/2
    let y = 600; //distance in pixels

    GAME.cards.forEach(function(card, index) {
        originalX.push(JSON.parse(JSON.stringify(card.x)));
        originalY.push(JSON.parse(JSON.stringify(card.y)));

        var loop = setInterval(function() {
            card.x += (x - card.x) / 2;     //x distance? therefore go to 0?   so x shouldnt be position, but difference.. so subtract the current x pos
            card.y += (y - card.y) / 2;     //x never becomes smaller, since only card.x experiences an new value assignment. the other is just used for the expression //distance in pixels
            card.draw();

            if(Math.round(card.x) === 600) {
                card.x = 600;
                card.y = 600;
                clearInterval(loop);
            }
        }, 50);
    });
};


///////////////////////////////////////
function layCards() {
    var delay = 600;

    GAME.cards.forEach(function(card, index) {
        var distanceX = originalX[index] - card.x - CARDS_WIDTH/2;
        var distanceY = originalY[index] - card.y - CARDS_HEIGHT/2;
        var count = 0;

        setTimeout(function() {
            var loop = setInterval(function() {
                card.x -= (distanceX + card.x) / 4;
                card.y -= (distanceY + card.y) / 4;
                card.draw();
                count++;
                if(count === 4) {
                    clearInterval(loop);
                }
            }, 100);
        }, delay);
        delay -= 50;
    });
};
