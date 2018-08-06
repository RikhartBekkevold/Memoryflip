/**
 * Creates a checkmark using pixi sprites
 * @param x x position of sprite
 * @param y y position of sprite
 * @param canvas canvas element to draw to
 */
function Checkmark(x, y, canvas) {
    this.x          =   x;
    this.y          =   y;
    this.unchecked  =   PIXI.Sprite.fromImage(PATHS.checkmark);
    this.checked    =   PIXI.Sprite.fromImage(PATHS.checked);
    this.sprites    =   [this.unchecked, this.checked];

    this.sprites.forEach((sprite) => {
        sprite.anchor.set(0.5);
        sprite.x = this.x;
        sprite.y = this.y;
        sprite.interactive = true;
        sprite.buttonMode = true;
        // add both sprites on top of eachother
        canvas.addChild(sprite);
    });

    this.unchecked.on('pointerdown', () => this.check());
    this.checked.on('pointerdown', () => this.unCheck());

    // make one invisible
    if(Settings.randomEvents) {
        this.checked.visible = true;
        this.unchecked.visible = false;
    }
    else {
        this.checked.visible = false;
        this.unchecked.visible = true;
    }
};



/**
 * "Checks" the checkmark by hiding the 'unchecked' sprite
 * and showing the 'checked' sprite
 */
Checkmark.prototype.check = function() {
    this.checked.visible = true;
    this.unchecked.visible = false;
    Settings.randomEvents = true;
};



/**
 * "Unchecks" the checkmark by hiding the 'checked' sprite
 * and showing the 'unchecked' sprite
 */
Checkmark.prototype.unCheck = function () {
    this.checked.visible = false;
    this.unchecked.visible = true;
    Settings.randomEvents = false;
};
