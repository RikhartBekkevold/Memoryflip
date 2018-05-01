function StartScreen(canvas) {
    // ini all startscreen components
    this.container   = new PIXI.Container();
    this.background  = PIXI.Sprite.fromImage(PATHS.sceneBG);
    this.startBtn    = PIXI.Sprite.fromImage(PATHS.startBtn);
    this.settingsBtn = PIXI.Sprite.fromImage(PATHS.settingsBtn);
    this.quitBtn     = PIXI.Sprite.fromImage(PATHS.quitBtn);

    this.u_1 = PIXI.Sprite.fromImage(PATHS.underline);
    this.u_2 = PIXI.Sprite.fromImage(PATHS.underline);
    this.u_3 = PIXI.Sprite.fromImage(PATHS.underline);

    this.lines = [this.u_1, this.u_2, this.u_3,]
    //just change the y of the same line..
    this.lines.forEach((line, i) => {
        line.anchor.set(0.5);
        line.visible = false;
        line.x = game.renderer.width/2; //- line.width/2
        line.y = i === 0 ? (this.startBtn.x + 170) : (this.lines[i-1].y + 200);
    });

    // background properties
    this.container.y  = (game.renderer.height - 600) / 2;
    this.background.width  = game.renderer.width;
    this.background.height = game.renderer.height;

    // start button properties
    this.startBtn.anchor.set(0.5);
    this.startBtn.x = game.renderer.width/2;
    this.startBtn.y = 100;
    this.startBtn.interactive = true;
    this.startBtn.buttonMode = true;

    // settings button properties
    this.settingsBtn.anchor.set(0.5);
    this.settingsBtn.x = game.renderer.width/2;
    this.settingsBtn.y = 300;
    this.settingsBtn.interactive = true;
    this.settingsBtn.buttonMode = true;

    // quit button properties
    this.quitBtn.anchor.set(0.5);
    this.quitBtn.x = game.renderer.width/2;
    this.quitBtn.y = 500;
    this.quitBtn.interactive = true;
    this.quitBtn.buttonMode = true;

    // display the components on screen
    canvas.addChild(this.background);
    canvas.addChild(this.container);
    this.container.addChild(this.startBtn);
    this.container.addChild(this.settingsBtn);
    this.container.addChild(this.quitBtn);

    this.container.addChild(this.u_1);
    this.container.addChild(this.u_2);
    this.container.addChild(this.u_3);

    // add listeners for all button components
    this.startBtn.on('pointerup', () => this.startGame());
    this.settingsBtn.on('pointerup', () => this.changeGameSettings());
    this.quitBtn.on('pointerup', () => this.quitGame());

    this.quitBtn.on('pointerover', () => { this.u_3.visible = true; });
    this.startBtn.on('pointerover', () => { this.u_1.visible = true; });
    this.settingsBtn.on('pointerover', () => { this.u_2.visible = true; });

    this.quitBtn.on('pointerout', () => { this.u_3.visible = false; });
    this.startBtn.on('pointerout', () => { this.u_1.visible = false; });
    this.settingsBtn.on('pointerout', () => { this.u_2.visible = false; });

};

StartScreen.prototype.removeMenu = function () {
    //loop here too. but must be in array
    slideOutandRemove(this.startBtn);
    slideOutandRemove(this.settingsBtn);
    slideOutandRemove(this.quitBtn);
};

StartScreen.prototype.startGame = function () {
    this.u_1.visible = false;
    this.u_2.visible = false;
    this.u_3.visible = false;
    this.removeMenu();

    // start the game
    GAME = new Game(game.stage);
    GAME.init(1000);
};

StartScreen.prototype.changeGameSettings = function () {
    this.removeMenu();
    setTimeout(() => {
        let settings = new SettingsScreen(game.stage);
    }, 1000);

};

StartScreen.prototype.quitGame = function () {
    this.removeMenu();
    end = new EndScreen(game.stage, 0);
};
