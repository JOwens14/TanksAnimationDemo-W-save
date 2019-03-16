const deltaTime = 1/60; //FPS timer --- 1/60 is 60fps
const killzone = 10; // Max distance from the edge of the screen that will trigger death
var levelObject;
var levelChoice;
var Tank1;
var Tank2;
var Tank3;
var Tank4;

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
      //console.log(data.data);
      score = data.score;


      Tank1.pos.x =  data.Tank1x;
      Tank1.pos.y = data.Tank1y;
      Tank1.alive = data.Tank1alive;
      Tank1.damage = data.Tank1damage;
      Tank1.facing = data.Tank1facing;
      levelObject.addEntity(Tank1);

      Tank2.pos.x = data.Tank2x;
      Tank2.pos.y = data.Tank2y;
      Tank2.alive = data.Tank2alive;
      Tank2.damage = data.Tank2damage;
      Tank2.facing = data.Tank2facing;
      levelObject.addEntity(Tank2);

      Tank3.pos.x = data.Tank3x;
      Tank3.pos.y = data.Tank3y;
      Tank3.alive = data.Tank3alive;
      Tank3.damage = data.Tank3damage;
      Tank3.facing = data.Tank3facing;
      levelObject.addEntity(Tank3);

      Tank4.pos.x = data.Tank4x;
      Tank4.pos.y = data.Tank4y;
      Tank4.alive = data.Tank4alive;
      Tank4.damage = data.Tank4damage;
      Tank4.facing = data.Tank4facing;
      levelObject.addEntity(Tank4);
      //levelObject.levelLoad(saveState);
  });

  var text = document.getElementById("text");
  var saveButton = document.getElementById("save");
  var loadButton = document.getElementById("load");

  saveButton.onclick = function () {
    console.log("save");
    //console.log(Tank1);
    text.innerHTML = "Saved."
    socket.emit("save", { studentname: "Jacob Owens", statename: "aState", score: score,
    Tank1x: Tank1.pos.x,
    Tank1y: Tank1.pos.y,
    Tank1alive: Tank1.alive,
    Tank1damage: Tank1.damage,
    Tank1facing: Tank1.facing,

    Tank2x: Tank2.pos.x,
    Tank2y: Tank2.pos.y,
    Tank2alive: Tank2.alive,
    Tank2damage: Tank2.damage,
    Tank2facing: Tank2.facing,

    Tank3x: Tank3.pos.x,
    Tank3y: Tank3.pos.y,
    Tank3alive: Tank3.alive,
    Tank3damage: Tank3.damage,
    Tank3facing: Tank3.facing,

    Tank4x: Tank4.pos.x,
    Tank4y: Tank4.pos.y,
    Tank4alive: Tank4.alive,
    Tank4damage: Tank4.damage,
    Tank4facing: Tank4.facing

  });
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
