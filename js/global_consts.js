const ROOT          =  "resources/";
const IMG_ROOT      =  ROOT + "img/";
const SOUND_ROOT    =  ROOT + "sound/";

const PATHS = {
    cardBGs:     IMG_ROOT + "cards/card_back",
    cardFG:      IMG_ROOT + "cards/card_front.png",
    sceneBG:     IMG_ROOT + "background.png",
    endmessage:  IMG_ROOT + "endScreen.png",
    retryBtn:    IMG_ROOT + "retryBtn.png",
    startBtn:    IMG_ROOT + "startBtn.png",
    settingsBtn: IMG_ROOT + "settingsbtn.png",
    quitBtn:     IMG_ROOT + "quitBtn.png",
    peekBtn:     IMG_ROOT + "cogwheel.png",
    underline:   IMG_ROOT + "underline.png",
    menuBtnBG:   IMG_ROOT + "menuBtn.png",
    knob:        IMG_ROOT + "knob.png",
    checkmark:   IMG_ROOT + "checkbox.png",
    checked:     IMG_ROOT + "checkbox_checked.png",
    eyes:        IMG_ROOT + "eyes.png",
    flipSound:   SOUND_ROOT + "cardflip.mp3",
    successSound:SOUND_ROOT + "success.mp3"
};

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

const ALT_STYLE = JSON.parse(JSON.stringify(STYLE));
ALT_STYLE._fontSize = 30;

const ALT_STYLE2 = JSON.parse(JSON.stringify(STYLE));
ALT_STYLE2._fontSize = 25;

const ALT_STYLE3 = JSON.parse(JSON.stringify(STYLE));
ALT_STYLE3._fontSize = 15;
