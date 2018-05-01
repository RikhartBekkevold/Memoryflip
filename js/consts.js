const CARDS_WIDTH   = 138;
const CARDS_HEIGHT  = 200;
const PADDING       = 30;


// ROWS = 2;
// COLOUMS = 2;


const STYLE = new PIXI.TextStyle({
    fontFamily: 'Helvetica',
    fontSize: 45,
    fontWeight: 'bold',
    fill: ['#ffffff', '#ffffff'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});

const ALT_STYLE = new PIXI.TextStyle({
    fontFamily: 'Helvetica',
    fontSize: 20,
    fontWeight: 'bold',
    fill: ['#ffffff', '#ffffff'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});

const ROOT = "resources/";
const IMG_ROOT = ROOT + "img/";
const SOUND_ROOT = ROOT + "sound/";
const CARD_PATH =  IMG_ROOT + "cards/card_back";

const PATHS = {

    // root: "resources/img/",

    // cards
    cardBGs: [   IMG_ROOT + "cards/card_back0.png",
                 IMG_ROOT + "cards/card_back1.png",
                 IMG_ROOT + "cards/card_back2.png",
                 IMG_ROOT + "cards/card_back3.png",
                 IMG_ROOT + "cards/card_back4.png",
                 IMG_ROOT + "cards/card_back5.png",
                 IMG_ROOT + "cards/card_back6.png",
                 IMG_ROOT + "cards/card_back7.png"],
    cardFG:      IMG_ROOT + "cards/card_front.png",

    // buttons
    sceneBG:     IMG_ROOT + "background.png",
    endmessage:  IMG_ROOT + "endScreen.png",
    retryBtn:    IMG_ROOT + "retryBtn.png",
    startBtn:    IMG_ROOT + "startBtn.png",
    settingsBtn: IMG_ROOT + "settingsbtn.png",
    quitBtn:     IMG_ROOT + "quitBtn.png",
    peekBtn:     IMG_ROOT + "cogwheel.png",
    underline:   IMG_ROOT + "underline.png",
    menuBtnBG:   IMG_ROOT + "menuBtn.png",

    //misc
    eyes:        IMG_ROOT + "eyes.png",

    // sound
    flipSound:   SOUND_ROOT + "cardflip.mp3",
    successSound:SOUND_ROOT + "success.mp3"

};
