function StartScreen(canvas) {
    this.container          =   new PIXI.Container();
    this.background         =   PIXI.Sprite.fromImage(PATHS.sceneBG);
    this.container.y        =   0;//(game.renderer.height - 600) / 2;
    this.background.width   =   game.renderer.width;
    this.background.height  =   game.renderer.height;
    this.startBtn           =   null;
    this.settingsBtn        =   null;
    this.quitBtn            =   null;
    this.buttons            =   [];
    this.lines              =   [];
    this.BTN_SPACING        =   170;

    PIXI.loader.reset();
    PIXI.loader.add('startBtn', PATHS.startBtn)
                .add('settingsBtn', PATHS.settingsBtn)
                .add('quitBtn', PATHS.quitBtn)
                .load(() => {
                    this.startBtn = new PIXI.Sprite(PIXI.loader.resources.startBtn.texture);
                    this.settingsBtn = new PIXI.Sprite(PIXI.loader.resources.settingsBtn.texture);
                    this.quitBtn = new PIXI.Sprite(PIXI.loader.resources.quitBtn.texture);

                    this.buttons.push(this.startBtn, this.settingsBtn, this.quitBtn);

                    this.buttons.forEach((btn, i) => {
                        btn.anchor.set(0.5);
                        btn.x               = game.renderer.width/2;
                        btn.y               = i === 0 ? ((game.renderer.height/2) - ((this.startBtn.height/2) + 100)) : (this.buttons[i-1].y + this.BTN_SPACING);

                        btn.interactive     = true;
                        btn.buttonMode      = true;

                        i === 0 ? btn.on('pointerup', () => this.startGame())
                        : i === 1 ? btn.on('pointerup', () => this.changeGameSettings())
                        :           btn.on('pointerup', () => this.quitGame());
                    

                        this.container.addChild(btn);
                    });

                    canvas.addChild(this.background);
                    canvas.addChild(this.container);
                });
};


/////////////////////////////////
StartScreen.prototype.startGame = function() {
    this.hideLines();
    SM.nextScene('game');
};


/////////////////////////////////
StartScreen.prototype.changeGameSettings = function() {
    this.hideLines();
    SM.nextScene('settings');
};


/////////////////////////////////
StartScreen.prototype.quitGame = function() {
    window.history.back();
};


/////////////////////////////////
StartScreen.prototype.hideLines = function() {
   this.lines.forEach((line) => {
       line.visible = false;
   });
};


/////////////////////////////////
StartScreen.prototype.destroySelf = function() {
    this.buttons.forEach((btn) => {
        slideOutandRemove(btn);
    });
};
