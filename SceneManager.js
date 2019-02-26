//scene manager
var myCanvas;
var myContext;


function Start(canvas, context) {
  myCanvas = canvas;
  myContext = context;
  //display the Start Screen
  var img = new Image();
  img.onload = function () {context.drawImage(img, 400, 400);}
  img.src = './Enviroment/TT-TanksLogo.png';

  //sound
  mainMusic = new sound('./sound/MainTheme.wav');
  mainMusic.sound.volume = .04; //main theme volume
  mainMusic.sound.loop = true; //loops the main theme
  mainMusic.play(); //plays the main theme

  // next screen --------------------
  screenNextHandler = function(e) {
    var key = e.which || e.keyCode;
    if(key === 13) { // 13 is enter
      mainMusic.stop(); //stops the main music

      StartCombat(canvas, context);
      this.removeEventListener('keypress', screenNextHandler, false);
    }
  };
  //move to the next scene
  this.addEventListener('keypress', screenNextHandler, false);

}



function StartCombat(canvas, context) {
    canvas.removeEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        console.log('enter');
      }
    });

    Promise.all([

      createTank('CPU-1', 1),
      createTank('CPU-2', 2),
      loadLevel(),

  ])
  .then(([T1, T2, level]) => {
      levelObject = level;

      T1.pos.set(400, 400); //sets the Tank position
      T2.pos.set(900, 400);

      level.comp.layers.push(createCollisionLayer(level));

      level.addEntity(T1);
      level.addEntity(T2);


      const timer = new Timer(deltaTime);
      timer.update = function update(deltaTime) {
          level.update(deltaTime);
          level.comp.draw(context);

      }

      timer.start();
      });

}
