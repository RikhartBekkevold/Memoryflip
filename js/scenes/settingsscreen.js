/**
 * Creates the setting screen. With option to set difficulty
 * and enable randomly timed switching of cards.
 * @param canvas the element to draw the scene to
 * @return undefined
 */
function SettingsScreen(canvas) {
    this.canvas = canvas;
    this.padding = 200;
    this.valueText = new PIXI.Text('Easy: ' + 0 + '%', ALT_STYLE3);
    this.diffText = new PIXI.Text('Difficulty ', ALT_STYLE2);
    this.eventsText = new PIXI.Text('Let cards randomly switch', ALT_STYLE2);

    // loop creation

    this.valueText.y = 200;
    this.valueText.x = innerWidth/2 - (this.valueText.width/2);
    this.diffText.y = 80;
    this.diffText.x = innerWidth/2 - (this.diffText.width/2);
    this.eventsText.y = this.valueText.y + 200;
    this.eventsText.x = innerWidth/2 - (this.eventsText.width/2);

    this.checkmark = new Checkmark(innerWidth/2, this.valueText.y + 270, canvas);

    this.backBtn = new PIXI.Text('SAVE', ALT_STYLE);
    this.backBtn.y = this.checkmark.y + 200;
    this.backBtn.x = innerWidth/2 - (this.backBtn.width/2);
    this.backBtn.interactive = true;
    this.backBtn.buttonMode = true;

    this.cancelBtn = new PIXI.Text('CANCEL', ALT_STYLE);
    this.cancelBtn.y = this.checkmark.y + 200;
    this.cancelBtn.x = innerWidth/2 - (this.cancelBtn.width/2) - 100;    // imidately invoked function instead?
    this.cancelBtn.interactive = true;
    this.cancelBtn.buttonMode = true;

    canvas.addChild(this.backBtn);
    // canvas.addChild(this.cancelBtn);
    canvas.addChild(this.valueText);
    canvas.addChild(this.diffText);
    canvas.addChild(this.eventsText);

    this.slider = Slider(20, 250, false, this.valueText, 0xDDDDDD, 0x950740);
    this.backBtn.on("pointerup", () => this.saveAndGoBack());
    this.cancelBtn.on("pointerup", () => SM.nextScene('start'));

    if(Settings.num_cards === 16) {
        this.slider.setSliderVal(100);
    }
    if(Settings.num_cards === 12) {
        this.slider.setSliderVal(50);
    }
    if(Settings.num_cards === 8) {
        this.slider.setSliderVal(0);
    }

    // this.valueText.text = 'Value: ' + this.slider.getSliderVal();
    this.valueText.text = Settings.num_cards + ' cards';

};


/**
 * Sets the difficulty depending on slider position.
 * Saves to localstorage.
 * @return undefined
 */
SettingsScreen.prototype.setDifficulty = function () {
    // this looks wrong with 'value'
    // this.valueText.text = 'Value: ' + this.slider.getSliderVal();
    // store state of slider also
    Settings.sliderValue = this.slider.getSliderVal();

    if(this.slider.getSliderVal() < 33) {
        Settings.num_cards = 8;
        Settings.num_rows = 2;
        this.valueText.text = 8 + ' cards';
    }
    else if(this.slider.getSliderVal() < 66) {
        Settings.num_cards = 12;
        Settings.num_rows = 3;

        this.valueText.text = 12 + ' cards';
    }
    else if(this.slider.getSliderVal() < 100) {
        Settings.num_cards = 16;
        Settings.num_rows = 4;
        this.valueText.text = 16 + ' cards';
    }

    localStorage.setItem('Settings', JSON.stringify(Settings));
};


/**
 * Every scene needs it's own destroySelf method
 * @return undefined
 */
SettingsScreen.prototype.destroySelf = function() {
    this.canvas.removeChild(this.slider.visual);
    // canvas.addChild(this.backBtn);
    // // canvas.addChild(this.cancelBtn);
    // canvas.addChild(this.valueText);
    // canvas.addChild(this.diffText);
    // canvas.addChild(this.eventsText);
};


///////////////////////////////////////
// SettingsScreen.prototype.exitScene = function() {
//     this.setDifficulty();
//     this.removeScene();
// };


/**
 * Saves the state of the difficulty slider and then
 * returns to start screen
 * @return undefined
 */
SettingsScreen.prototype.saveAndGoBack = function() {
    this.setDifficulty();
    SM.nextScene('start');
};
