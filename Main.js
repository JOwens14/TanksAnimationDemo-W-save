const deltaTime = 1/60; //FPS timer --- 1/60 is 60fps
const killzone = 10; // Max distance from the edge of the screen that will trigger death
var levelObject;
var levelChoice;
var CPUsEnabled = true;

const ASSET_MANAGER = new AssetManager();
//que all the asset files needed
ASSET_MANAGER.queueDownload("./tanks/tankSprite.png");
ASSET_MANAGER.queueDownload("./Projectiles/Arrow.png");
ASSET_MANAGER.queueDownload("./Projectiles/ArrowUp.png");
ASSET_MANAGER.queueDownload("./Projectiles/ArrowDown.png");

ASSET_MANAGER.downloadAll(function () {});


window.onload = function() {
  const canvas = document.getElementById('gameWorld');
  const context = canvas.getContext('2d');

  //start of fullscreen resizing -----------------------------------------------------------------
  function resize() {
  	// Our canvas must cover full height of screen regardless of the resolution
  	var height = window.innerHeight;
  	// So we need to calculate the proper scaled width that should work well with every resolution
  	var ratio = canvas.width/canvas.height;
  	var width = height * ratio;
  	canvas.style.width = width+'px';
  	canvas.style.height = height+'px';
  }
  window.addEventListener('load', resize, false);
  window.addEventListener('resize', resize, false);
  //end of fullscreen resizing -------------------------------------------------------------------

  //start the Game
  //displayFightScene(canvas, context);
  Start(canvas, context);



}
