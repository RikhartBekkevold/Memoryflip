/**
 * Creates the startscreen with the options to go to
 * game scene, settings screen or to quit
 * @param canvas the element to draw to
 */
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
                        btn.x = game.renderer.width/2;
                        btn.y = i === 0 ? ((game.renderer.height/2) - ((this.startBtn.height/2) + 100)) : (this.buttons[i-1].y + this.BTN_SPACING);

                        btn.interactive = true;
                        btn.buttonMode  = true;

                        i === 0 ? btn.on('pointerup',  () => { SM.nextScene('game') })
                        : i === 1 ? btn.on('pointerup', () => { SM.nextScene('settings') })
                        :           btn.on('pointerup', () => { window.history.back() });

                        this.container.addChild(btn);
                    });

                    canvas.addChild(this.background);
                    canvas.addChild(this.container);
                });
};


/**
 * Each scene needs a destroySelf function which the
 * scene manager calls before initating a new scene
 * @return undefined
 */
StartScreen.prototype.destroySelf = function() {
    this.buttons.forEach((btn) => {
        slideOutandRemove(btn);
    });
};
