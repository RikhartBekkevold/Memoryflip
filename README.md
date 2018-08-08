# Memoryflip

Memoryflip is a card flipping game made in javascript with the help of [pixi.js](http://www.pixijs.com/).

## Play the game here: ##
https://rikhartbekkevold.github.io/cardflip-game

## Code structure ##

Each scene is an object ``` Startscreen, Game, Settingscreen, Endscreen ```. Switching scenes is done through a call to the ``` SceneManager ``` object which
then destroys the current scene and then creates the new scene.
