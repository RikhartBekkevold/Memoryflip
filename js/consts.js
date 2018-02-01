const CARDS_WIDTH   = 138;
const CARDS_HEIGHT  = 200;
const PADDING       = 30;

const STYLE = new PIXI.TextStyle({
    stroke: '#ffffff',
    strokeThickness: 5,
    fontSize: 60
});

const PATHS = {
    // cards
    cardBGs: [   "img/card_back0.png",
                 "img/card_back1.png",
                 "img/card_back2.png",
                 "img/card_back3.png",
                 "img/card_back4.png",
                 "img/card_back5.png",
                 "img/card_back6.png",
                 "img/card_back7.png"],
    cardFG:      "img/card_front.png",

    // buttons
    sceneBG:     "img/background.png",
    endmessage:  "img/endScreen.png",
    retryBtn:    "img/retryBtn.png",
    startBtn:    "img/startBtn.png",
    settingsBtn: "img/settingsbtn.png",
    quitBtn:     "img/quitBtn.png",
    cogwheel:    "img/cogwheel.png",
    underline:    "img/underline.png",


    // sound
    flipSound:   "sound/cardflip.mp3",
    successSound:"sound/success.mp3",

    //misc
    eyes: "img/eyes.png"
};
