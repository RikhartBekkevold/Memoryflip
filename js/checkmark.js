// use drawing methods instead, that way we can
// change colour easily?

function Checkmark(x, y, canvas) {
    this.x = x;
    this.y = y;
    // if either set use them instead
    this.unchecked = PIXI.Sprite.fromImage(PATHS.checkmark);
    this.checked = PIXI.Sprite.fromImage(PATHS.checked);

    this.unchecked.anchor.set(0.5);
    this.unchecked.x = this.x;
    this.unchecked.y = this.y;
    this.unchecked.interactive = true;
    this.unchecked.buttonMode = true;
    this.unchecked.on('pointerdown', () => this.onButton());

    this.checked.anchor.set(0.5);
    this.checked.x = this.x;
    this.checked.y = this.y;
    this.checked.interactive = true;
    this.checked.buttonMode = true;
    this.checked.on('pointerdown', () => this.onButtonDown());

    if(Settings.randomEvents) {
        this.checked.visible = true;
        this.unchecked.visible = false;
    }
    else {
        this.checked.visible = false;
        this.unchecked.visible = true;
    }

    canvas.addChild(this.checked);
    canvas.addChild(this.unchecked);

    this.onButton = () => {
        this.checked.visible = true;
        this.unchecked.visible = false;
        Settings.randomEvents = true;
    }

    this.onButtonDown = () => {
        this.checked.visible = false;
        this.unchecked.visible = true;
        Settings.randomEvents = false;
    }

}
