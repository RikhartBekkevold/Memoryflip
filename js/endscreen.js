function EndScreen(canvas, score) {
    this.canvas     = canvas;
    this.message    =   new PIXI.Text("YOUR SCORE:", STYLE);
    this.endScore   =   new PIXI.Text(score, STYLE);
    this.retryBtn   =   PIXI.Sprite.fromImage(PATHS.retryBtn);

    this.endScore.text = (score === undefined ? 0 : score);

    this.message.y = 300;
    this.message.x =  innerWidth/2;
    this.message.anchor.set(0.5);

    this.endScore.x = this.message.x;
    this.endScore.y = this.message.y + 50;
    this.endScore.anchor.x = .5;

    this.retryBtn.x = this.message.x;
    this.retryBtn.y = this.message.y + 250;
    this.retryBtn.anchor.set(0.5);
    this.retryBtn.interactive = true;
    this.retryBtn.buttonMode = true;

    canvas.addChild(this.message);
    canvas.addChild(this.endScore);
    canvas.addChild(this.retryBtn);

    this.retryBtn.on('pointerup', () => this.restartGame());
};


/////////////////////////////////
EndScreen.prototype.restartGame = function() {
    SM.nextScene('game');
};


/////////////////////////////////
EndScreen.prototype.destroySelf = function() {
    slideOutandRemove(this.retryBtn);
    slideOutandRemove(this.message);
    slideOutandRemove(this.endScore);

    // this.canvas.removeChild(this.endScore);
    // delete this.endScore;
    this.retryBtn.removeAllListeners();
};
