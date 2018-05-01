//https://github.com/KIvanow/PIXISliderInput/blob/master/PIXISlider.js
var Slider = function( width, length, notCentered, valueText ){
        this.visual = new PIXI.Container();
        this.SLIDE_LENGTH = length;
        this.SLIDE_WIDTH = width;
        this.SLIDE_COL = 0x888888;
        this.SLIDE_X0 = 0;
        this.SLIDE_Y0 = this.SLIDE_WIDTH * 8;

        this.KNOB_COL = 0xaaaaaa;

        if( !notCentered ){
            this.SLIDE_X0 = Math.round( (window.innerWidth / 2) - this.SLIDE_LENGTH / 2 );
            this.visual.x = 0.1;
        }

        var slide = new PIXI.Graphics();
        slide.lineStyle( this.SLIDE_WIDTH, this.SLIDE_COL, 1);
        slide.moveTo( this.SLIDE_X0, this.SLIDE_Y0);
        slide.lineTo( this.SLIDE_X0 + this.SLIDE_LENGTH, this.SLIDE_Y0);

        var knob = PIXI.Sprite.fromImage(PATHS.menuBtnBG);

        var that = this;
        knob.interactive = true;
        knob.buttonMode = true;
        knob.anchor.x = 0.5;
        knob.anchor.y = 0.5;
        knob.position.x = this.SLIDE_X0;
        knob.position.y = this.SLIDE_Y0;
        knob.width = knob.height = width * 2;

        // use the mousedown and touchstartthis.
        knob.mousedown = knob.touchstart = function(data){
            this.data = data;
            that.alpha = 0.9;
            that.dragging = true;
        };

        // set the events for when the mouse is released or a touch is released
        knob.mouseup = knob.mouseupoutside = knob.touchend = knob.touchendoutside = function(data){
            that.alpha = 1;
            that.dragging = false;
            // this.data = null;
        };

        // set the callbacks for when the mouse or a touch moves
        knob.mousemove = knob.touchmove = function(data){
            if(that.dragging){
                var newPosition = this.data.data.global;
                if (newPosition.x > that.SLIDE_X0 && newPosition.x < that.SLIDE_X0 + that.SLIDE_LENGTH) {
                    this.position.x = newPosition.x;
                    console.log(that.getSliderVal());
                    // valueText.text = 'Value: ' + that.getSliderVal();

                    if(that.getSliderVal() < 33) {  // /3 = 33% 4 = 25% 2 = 50%
                        valueText.text = 'Easy';
                    }
                    else if (that.getSliderVal() < 66) {
                        valueText.text = 'Medium';
                    }
                    else if(that.getSliderVal() < 100) {
                        valueText.text = 'Hard';
                    }

                    //if above value, print expert...or nr of cards etc
                }
            }
        }

        this.visual.addChild( slide );
        this.visual.addChild( knob );
        game.stage.addChild(this.visual);

        this.getSliderVal = function() {
            return parseInt((knob.position.x - that.SLIDE_X0) / that.SLIDE_LENGTH * 100);
        }

        this.setSliderVal = function( x ){
            knob.position.x = parseInt( x * that.SLIDE_LENGTH / 100 + that.SLIDE_X0);
        }
        return this;
    };





function SettingsScreen(canvas) {
    this.valueText = new PIXI.Text('', ALT_STYLE);
    this.valueText.y = 250;
    this.valueText.x = innerWidth/2 - (this.valueText.width/2);
    canvas.addChild(this.valueText);

    this.backBtn = new PIXI.Text('BACK', ALT_STYLE);
    this.backBtn.y = 300;
    this.backBtn.x = 70;
    this.backBtn.interactive = true;
    this.backBtn.buttonMode = true;
    canvas.addChild(this.backBtn);

    var slider = Slider(20, 500, false, this.valueText);
    //add it again or update value?


    this.backBtn.on("pointerup", () => {
        console.log(slider.getSliderVal());
        // slider.SLIDE_LENGTH/4
        // // /3 = 33% 4 = 25% 2 = 50%
        this.valueText.text = 'Value: ' + slider.getSliderVal();

        if(slider.getSliderVal() < 33) {  // /3 = 33% 4 = 25% 2 = 50%
            Settings.num_cards = 8;
            Settings.num_rows = 2;
        }
        else if (slider.getSliderVal() < 66) {
            Settings.num_cards = 12;
            Settings.num_rows = 3;
        }
        else if(slider.getSliderVal() < 100) {
            Settings.num_cards = 16;
            Settings.num_rows = 4;
        }

        canvas.removeChild(this.visual);
        delete slider;

        const STARTSCREEN = new StartScreen(game.stage);
    });




};
