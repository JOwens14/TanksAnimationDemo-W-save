const deltaTime = 1/60; //FPS timer --- 1/60 is 60fps
const killzone = 10; // Max distance from the edge of the screen that will trigger death
var levelObject;
var levelChoice;
var CPUsEnabled = true;

const ASSET_MANAGER = new AssetManager();
//que all the asset files needed
ASSET_MANAGER.queueDownload("./tanks/tankSprite.png");
ASSET_MANAGER.queueDownload("./Projectiles/arrow.png");
ASSET_MANAGER.queueDownload("./Projectiles/arrowUp.png");
ASSET_MANAGER.queueDownload("./Projectiles/arrowDown.png");

ASSET_MANAGER.downloadAll(function () {});

var saveState;
var score = 0;

window.onload = function() {
  const canvas = document.getElementById('gameWorld');
  const context = canvas.getContext('2d');
  //-----------------------------------------------------------------------------------------SAVE/Loaded


  var socket = io.connect("http://24.16.255.56:8888");

  socket.on("load", function (data) {
      //console.log(data);
      score = data.data;
      //levelObject.levelLoad(saveState);
  });

  var text = document.getElementById("text");
  var saveButton = document.getElementById("save");
  var loadButton = document.getElementById("load");

  saveButton.onclick = function () {
    console.log("save");
    saveState = levelObject.levelSave();
    //console.log(saveState);
    text.innerHTML = "Saved."
    socket.emit("save", { studentname: "Jacob Owens", statename: "aState", data: score});
  };

  loadButton.onclick = function () {
    console.log("load");
    text.innerHTML = "Loaded."
    socket.emit("load", { studentname: "Jacob Owens", statename: "aState"});
    //console.log(data);
  };

  //----------------------------------------------------------------------------------------------------

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
