/**
 * Displays the endscreen with achieved player score
 * @param canvas the view to draw the scene to
 * @param score the score the player achieved
 * @return undefined
 */
function EndScreen(canvas, score) {
    this.canvas                 =   canvas;
    this.message                =   new PIXI.Text("YOUR SCORE:", STYLE);
    this.endScore               =   new PIXI.Text(score, STYLE);
    this.retryBtn               =   PIXI.Sprite.fromImage(PATHS.retryBtn);
    this.elements               =   [this.message, this.endScore, this.retryBtn];

    this.elements.forEach((el, i) => {
        el.anchor.set(0.5);
        el.x = innerWidth / 2;
        el.y = 300 + (110 * i);
        this.canvas.addChild(el);
    });

    this.endScore.text          =   (score === undefined ? 0 : score);
    this.retryBtn.interactive   =   true;
    this.retryBtn.buttonMode    =   true;
    this.methodName(padding);
    this.retryBtn.on('pointerup', () => this.restartGame());
};


/**
 * Destroys itself and restarts the
 * game "to take its place"
 * @return undefined
 */
EndScreen.prototype.restartGame = function() {
    SM.nextScene('game');
};

/**
 * Each scene needs a destroySelf function which the
 * scene manager calls before initating a new scene
 * @return undefined
 */
EndScreen.prototype.destroySelf = function() {
    slideOutandRemove(this.retryBtn);
    slideOutandRemove(this.message);
    slideOutandRemove(this.endScore);
};
