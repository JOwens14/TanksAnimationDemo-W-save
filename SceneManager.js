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
  //mainMusic.play(); //plays the main theme

  this.setTimeout(function() {       // timeout before combat begins
    StartCombat(canvas, context);
  }, 2000);
}


function StartCombat(canvas, context) {
    Promise.all([
      createTank('CPU-1', 1),
      createTank('CPU-2', 1),
      createTank('CPU-3', 1),
      createTank('CPU-4', 1),
      createTank('CPU-5', 0),
      createTank('CPU-6', 0),
      createTank('CPU-7', 0),
      createTank('CPU-8', 0),
      loadLevel(),
  ])
  .then(([T1, T2, T3, T4, T5, T6, T7, T8, level]) => {
      levelObject = level;

      T1.pos.set(400, 400); //sets the Tank position
      T2.pos.set(900, 600);
      T3.pos.set(600, 300);
      T4.pos.set(500, 500);

      T5.pos.set(100, 400);
      T6.pos.set(600, 600);
      T7.pos.set(300, 300);
      T8.pos.set(200, 500);

      level.comp.layers.push(createCollisionLayer(level));

      level.addEntity(T1);
      level.addEntity(T2);
      level.addEntity(T3);
      level.addEntity(T4);
      level.addEntity(T5);
      level.addEntity(T6);
      level.addEntity(T7);
      level.addEntity(T8);


      resethandler = function(e) { //resets tanks positions and alive
        if (e.code === 'KeyR') {
          T1.pos.set(400, 400);
          T2.pos.set(900, 600);
          T3.pos.set(600, 300);
          T4.pos.set(500, 500);
          T1.damage = 0;
          T1.alive = true;
          T2.damage = 0;
          T2.alive = true;
          T3.damage = 0;
          T3.alive = true;
          T4.damage = 0;
          T4.alive = true;
        }
      };
      this.addEventListener('keypress', resethandler, false);

      const timer = new Timer(deltaTime);
      timer.update = function update(deltaTime) {
          level.update(deltaTime);
          level.comp.draw(context);
      }
      timer.start();
      });
}
