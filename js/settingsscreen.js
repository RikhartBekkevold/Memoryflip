function SettingsScreen(canvas) {
    this.canvas = canvas;
    this.padding = 200;
    this.valueText = new PIXI.Text('Easy: ' + 0 + '%', ALT_STYLE3);
    this.diffText = new PIXI.Text('Difficulty ', ALT_STYLE2);
    this.eventsText = new PIXI.Text('Toggle random events', ALT_STYLE2);

    this.valueText.y = 200;
    this.valueText.x = innerWidth/2 - (this.valueText.width/2);
    this.diffText.y = 80;
    this.diffText.x = innerWidth/2 - (this.diffText.width/2);
    this.eventsText.y = this.valueText.y + 200;
    this.eventsText.x = innerWidth/2 - (this.eventsText.width/2);

    this.checkmark = new Checkmark(innerWidth/2, this.valueText.y + 270, canvas);

    this.backBtn = new PIXI.Text('SAVE', ALT_STYLE);
    this.backBtn.y = this.checkmark.y + 200;
    this.backBtn.x = innerWidth/2 - (this.backBtn.width/2) - 90;
    this.backBtn.interactive = true;
    this.backBtn.buttonMode = true;

    this.cancelBtn = new PIXI.Text('CANCEL', ALT_STYLE);
    this.cancelBtn.y = this.checkmark.y + 200;
    this.cancelBtn.x = innerWidth/2 - (this.cancelBtn.width/2) + 70;
    this.cancelBtn.interactive = true;
    this.cancelBtn.buttonMode = true;

    canvas.addChild(this.backBtn);
    canvas.addChild(this.cancelBtn);
    canvas.addChild(this.valueText);
    canvas.addChild(this.diffText);
    canvas.addChild(this.eventsText);

    this.slider = Slider(20, 400, false, this.valueText, 0x0D85FF, 0xA1B212);
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


///////////////////////////////////////
SettingsScreen.prototype.setDifficulty = function () {
    // this looks wrong with 'value'
    this.valueText.text = 'Value: ' + this.slider.getSliderVal();
    // store state of slider also
    Settings.sliderValue = this.slider.getSliderVal();

    if(this.slider.getSliderVal() < 33) {
        Settings.num_cards = 8;
        Settings.num_rows = 2;
    }
    else if (this.slider.getSliderVal() < 66) {
        Settings.num_cards = 12;
        Settings.num_rows = 3;
    }
    else if(this.slider.getSliderVal() < 100) {
        Settings.num_cards = 16;
        Settings.num_rows = 4;
    }
};


///////////////////////////////////////
SettingsScreen.prototype.destroySelf = function() {
    this.canvas.removeChild(this.visual);
    delete this.slider;  // cant destroy window objects
};


///////////////////////////////////////
SettingsScreen.prototype.exitScene = function() {
    this.setDifficulty();
    this.removeScene();
};


///////////////////////////////////////
SettingsScreen.prototype.saveAndGoBack = function() {
    this.setDifficulty();
    SM.nextScene('start');
};
