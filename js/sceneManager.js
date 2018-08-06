/**
 * Handler for scene switching.
 */
function SceneManager() {
    this.formattedScenes  = '';

    this.WARNING     =    'You did not provide a scene to destroy. Always destroy the previous ' +
                          'scene, unless this is called on load.';

    this.DEST_ERROR  =    'Could not destroy current scene. Scene did ' +
                          'not contain a destroySelf function';

    this.VALID_ERR   =    ' is not a valid scene name. ' +
                          '\n\n\tAvailable options: ';
    this.SCENES = [
        "start",
        "game",
        "settings",
        "end"
    ];

    this.SCENES.forEach((scene) => {
        this.formattedScenes += '\n\t\t' + scene;
    });

    this.currentScene = new StartScreen(game.stage);
};



/**
 * Deletes current scene and initiates next scene.
 * @param scene type {string} name identifier for scene to initiate
 * @param current the current scene (that calls the function)
 * @param data any optional data to be passed to the new scene
 */
SceneManager.prototype.nextScene = function(scene, data) {
    // 
    if(this.currentScene !== null) {
        if(typeof this.currentScene.destroySelf === 'function') {
            this.currentScene.destroySelf();
        }
        else {
            console.error(this.DEST_ERROR);
        }
    }
    else if(this.currentScene === null) {
        console.warn(this.WARNING);
    }

    this.switchScene(scene, data);
};



/**
 * Determines which scene to initate.
 * @param scene {string} name identifier for scene to initiate
 * @param data any optional data to be passed to the new scene
*/
SceneManager.prototype.switchScene = function(scene, data) {
    switch(scene.toLowerCase()) {
        case this.SCENES[0]:
            setTimeout(() => {
                this.currentScene = new StartScreen(game.stage);
            }, 0);
        break;
        case this.SCENES[1]:
            setTimeout(() => {
                this.currentScene = new Game(game.stage);
                this.currentScene.init(500);
            }, 500);
        break;
        case this.SCENES[2]:
            setTimeout(() => {
                this.currentScene = new SettingsScreen(game.stage);
            }, 500);
        break;
        case this.SCENES[3]:
            setTimeout(() => {
                this.currentScene = new EndScreen(game.stage, data);
            }, 500);
        break;
        default:
            console.error(scene + this.VALID_ERR + this.formattedScenes);
    }
};
