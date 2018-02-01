function EndScreen(canvas, score) {
    // every component on screen
    this.message    =   new PIXI.Text("YOUR SCORE:", STYLE);
    this.endScore   =   new PIXI.Text(score, STYLE);
    this.retryBtn   =   PIXI.Sprite.fromImage(PATHS.retryBtn);

    this.endScore.text = (score === undefined ? 0 : score);

    // message
    this.message.y = 300;
    this.message.x =  innerWidth/2;
    this.message.anchor.set(0.5);

    // end score
    this.endScore.x = this.message.x;
    this.endScore.y = this.message.y + 50;
    this.endScore.anchor.x = .5;

    // retry button
    this.retryBtn.x = this.message.x;
    this.retryBtn.y = this.message.y + 250;
    this.retryBtn.anchor.set(0.5);
    this.retryBtn.interactive = true;
    this.retryBtn.buttonMode = true;

    // visually add to scene. add order = z-index
    canvas.addChild(this.message);
    canvas.addChild(this.endScore);
    canvas.addChild(this.retryBtn);

    // event handlers
    this.retryBtn.on('pointerup', () => this.restartGame(canvas));
};


EndScreen.prototype.restartGame = function(canvas) {
    var self    = this;
    var i       = 0.0;              //the value that increases to the power of 2. so must be speed
    var start_X = JSON.parse(JSON.stringify(this.message.x));

    let slideRight = setInterval(function() {
        //
        self.retryBtn.x = Math.pow( i, 2.3 ) + start_X;  //replace with i*i = 500?
        i += 0.1;
        //
        if(self.retryBtn.x > game.renderer.width) {
            clearInterval(slideRight);
            canvas.removeChild(self.retryBtn);
        }
    }, 1);

    let slideLeft = setInterval(function() {
        // move the button in x direction
        self.message.x = Math.pow( i, 2.3 ) + start_X;
        i += 0.1;
        //
        if(self.message.x < -self.message.width) {
            clearInterval(slideLeft);
            canvas.removeChild(self.message);
        }
    }, 1);

    canvas.removeChild(self.endScore);
    delete self.endScore;
    this.retryBtn.removeAllListeners();

    // GAME.resetGame();? cant delete obj but can = GAME = {};?
    // canvas.removeChild(GAME.score);
    // canvas.removeChild(GAME.cogwheel);
    GAME = new Game(canvas);
    GAME.init(1000);
};
