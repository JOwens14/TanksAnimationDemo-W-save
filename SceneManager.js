//scene manager
var myCanvas;
var myContext;

function Start(canvas, context) {
  myCanvas = canvas;
  myContext = context;
  //display the Start Screen
  var background = new Image();
  background.onload = function () {context.drawImage(background, 0, 0);}
  background.src = './Enviroment/green.jpg';

  var img = new Image();
  img.onload = function () {context.drawImage(img, 640 - 122, 360 - 73);}
  img.src = './Enviroment/TT-TanksLogo.png';

  //sound
  mainMusic = new sound('./sound/MainTheme.wav');
  mainMusic.sound.volume = .04; //main theme volume
  mainMusic.sound.loop = true; //loops the main theme
  mainMusic.play(); //plays the main theme

  this.setTimeout(function() {       // timeout before combat begins
    StartCombat(canvas, context);
  }, 2000);
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
      createTank('CPU-2', 0),
      createTank('CPU-3', 0),
      createTank('CPU-4', 0),
      loadLevel(),
  ])
  .then(([T1, T2, T3, T4, level]) => {
      levelObject = level;

      T1.pos.set(400, 400); //sets the Tank position
      T2.pos.set(900, 600);
      T3.pos.set(600, 300);
      T4.pos.set(500, 500);

      level.comp.layers.push(createCollisionLayer(level));

      level.addEntity(T1);
      level.addEntity(T2);
      level.addEntity(T3);
      level.addEntity(T4);


      const timer = new Timer(deltaTime);
      timer.update = function update(deltaTime) {
          level.update(deltaTime);
          level.comp.draw(context);
      }
      timer.start();
      });
}
