/**
 *  Creates a square (knob) using pixi graphics.
 *  @param width width of the knob, height set to same value to create a square
 *  @param knobColour colour of knob
 *  @param x x position of knob
 *  @param y y position of knob
 */
function Knob(width, knobColour, x, y) {
    this.view = new PIXI.Graphics();
    this.view.interactive = true;
    this.view.buttonMode = true;
    this.view.position.x = x - this.view.width/2;
    this.view.position.y = y - this.view.height/2;
    this.view.width = this.view.height = width * 2;
    this.view.beginFill(knobColour);
    this.view.lineStyle(1, 0x000000, 1);
    this.view.drawRect(-25 , -25, 50 , 50);
};

/**
 * Based on https://github.com/KIvanow/PIXISliderInput/blob/master/PIXISlider.js
 * with many alterations. (PS: github code not doesn't work anymore)
 * @param width length of knob
 * @param length length of slider
 * @param notCentered true to make slider centered on screen
 * @param valueText the text beneath the slider
 * @param slideColour the colour of the bar
 * @param knobColour the colour of the knob
 * @returns slider
 */
var Slider = function(width, length, notCentered, valueText, slideColour, knobColour){
    this.visual = new PIXI.Container();
    this.SLIDE_LENGTH = length;
    this.SLIDE_WIDTH = width;
    this.SLIDE_COLOUR = slideColour !== 'undefined' ? slideColour : 0x888888;
    this.KNOB_COLOUR = knobColour !== 'undefined' ? knobColour : 0xffffff;
    this.SLIDE_X0 = 0;
    this.SLIDE_Y0 = this.SLIDE_WIDTH * 8;

    if(!notCentered) {
        this.SLIDE_X0 = Math.round( (window.innerWidth / 2) - this.SLIDE_LENGTH / 2 );
        this.visual.x = 0.1;
    }

    var slide = new PIXI.Graphics();
    slide.lineStyle( this.SLIDE_WIDTH, this.SLIDE_COLOUR, 1);
    slide.moveTo( this.SLIDE_X0, this.SLIDE_Y0);
    slide.lineTo( this.SLIDE_X0 + this.SLIDE_LENGTH, this.SLIDE_Y0);
    slide.interactive = true;
    slide.buttonMode = true;
    slide.alpha = 0.2;

    slide.hitArea = new PIXI.Rectangle(this.SLIDE_X0, this.SLIDE_Y0 - this.SLIDE_WIDTH / 2, this.SLIDE_LENGTH, this.SLIDE_WIDTH);

    slide.click = function (e) {
        var newPosition = e.data.global;
        handle.view.x = newPosition.x;
        if(self.getSliderVal() < 33) {
            Settings.num_cards = 8;
            Settings.num_rows = 2;
            valueText.text =  Settings.num_cards + ' cards';
        }
        else if (self.getSliderVal() < 66) {
            Settings.num_cards = 12;
            Settings.num_rows = 3;
            valueText.text = Settings.num_cards + ' cards';
            // valueText.text = 'Medium: ' + self.getSliderVal() + '%';
        }
        else if(self.getSliderVal() < 100) {
            Settings.num_cards = 16;
            Settings.num_rows = 4;
            valueText.text = Settings.num_cards + ' cards';
            // valueText.text = 'Hard: ' + self.getSliderVal() + '%';
        }
    }


    var handle = new Knob(width, this.KNOB_COLOUR, this.SLIDE_X0, this.SLIDE_Y0);

    var self = this;
    // use the mousedown and touchstartthis.
    handle.view.mousedown = handle.view.touchstart = function(data) {
        this.data = data; // if data is not undefined?
        self.alpha = 0.2;
        self.dragging = true;
    };

    // set the events for when the mouse is released or a touch is released
    handle.view.mouseup = handle.view.mouseupoutside = handle.view.touchend = handle.view.touchendoutside = function(data) {
        self.alpha = 1;
        self.dragging = false;
        // this.data = null;
    };

    // set the callbacks for when the mouse or a touch moves
    handle.view.mousemove = handle.view.touchmove = function(data) {
        if(self.dragging){
            var newPosition = this.data.data.global;
            if (newPosition.x > self.SLIDE_X0 && newPosition.x < self.SLIDE_X0 + self.SLIDE_LENGTH) {
                this.position.x = newPosition.x;

                if(self.getSliderVal() < 33) {
                    Settings.num_cards = 8;
                    Settings.num_rows = 2;
                    valueText.text =  Settings.num_cards + ' cards';
                }
                else if (self.getSliderVal() < 66) {
                    Settings.num_cards = 12;
                    Settings.num_rows = 3;
                    valueText.text = Settings.num_cards + ' cards';
                    // valueText.text = 'Medium: ' + self.getSliderVal() + '%';
                }
                else if(self.getSliderVal() < 100) {
                    Settings.num_cards = 16;
                    Settings.num_rows = 4;
                    valueText.text = Settings.num_cards + ' cards';
                    // valueText.text = 'Hard: ' + self.getSliderVal() + '%';
                }
            }
        }
    };

    this.visual.addChild(slide);
    this.visual.addChild(handle.view);
    game.stage.addChild(this.visual);

    this.getSliderVal = function() {
        return parseInt((handle.view.position.x - self.SLIDE_X0) / self.SLIDE_LENGTH * 100);
    };

    this.setSliderVal = function(x){
        handle.view.position.x = parseInt(x * self.SLIDE_LENGTH / 100 + self.SLIDE_X0);
    };


    return this;
};
