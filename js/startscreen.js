function StartScreen(canvas) {
    this.container          = new PIXI.Container();
    this.background         = PIXI.Sprite.fromImage(PATHS.sceneBG);
    this.container.y        = 0;//(game.renderer.height - 600) / 2;
    this.background.width   = game.renderer.width;
    this.background.height  = game.renderer.height;
    this.startBtn           = PIXI.Sprite.fromImage(PATHS.startBtn);
    this.settingsBtn        = PIXI.Sprite.fromImage(PATHS.settingsBtn);
    this.quitBtn            = PIXI.Sprite.fromImage(PATHS.quitBtn);
    // PIXI.loader.add('image1', PATHS.startBtn).add('image2', PATHS.settingsBtn).add('image3', PATHS.quitBtn);
    this.buttons            = [this.startBtn, this.settingsBtn, this.quitBtn];
    this.lines              = [];

    for(let i = 0; i <= 2; i++) {
        this.lines.push(PIXI.Sprite.fromImage(PATHS.underline));
    }

    // set attr. of each button, and unique event handlers, then add to container
    this.buttons.forEach((btn, i) => {
        btn.x               = game.renderer.width/2; //game.renderer.width/2;
        btn.y               = i === 0 ? 100 : (this.buttons[i-1].y + 200);
        btn.interactive     = true;
        btn.buttonMode      = true;
        btn.anchor.set(0.5);
          i === 0 ? btn.on('pointerup', () => this.startGame())
        : i === 1 ? btn.on('pointerup', () => this.changeGameSettings())
        :           btn.on('pointerup', () => this.quitGame());
        btn.on('pointerover', () => { this.lines[i].visible = true; });
        btn.on('pointerout', () => { this.lines[i].visible = false; });
        this.container.addChild(btn);

    });

    // sett attr. of all 3 lines, and add to container
    this.lines.forEach((line, i) => {
        line.x          = game.renderer.width/2;
        line.y          = i === 0 ? (this.buttons[0].x + 170) : (this.lines[i-1].y + 200);
        line.visible    = false;
        line.anchor.set(0.5);
        this.container.addChild(line);
    });

    // lastly add BG and container to scene
    canvas.addChild(this.background);
    canvas.addChild(this.container);
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
    this.hideLines();
    SM.nextScene('end', 0);
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
