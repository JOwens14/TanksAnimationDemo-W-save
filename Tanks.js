var tanks = ["./tanks/tankSprite.png"];

var playerNum = 1;
function createTank(name, choice) {
    const Tank = new Entity(name);
    Tank.type = 'player'
    Tank.frameSize = 128;
    Tank.size.set(28, 58); //set to actuall pixel size of Tank, determines collision box. kat is 18,29
    Tank.origin = 'self';
    Tank.addTrait(new Velocity());
    Tank.addTrait(new Go());

    Tank.heading = 1;
    Tank.Jumping = false;

    Tank.Moving = false;

    Tank.damage = 0;

    Tank.choice = choice || 0;
    Tank.player = playerNum;
    playerNum++;



    Tank.updateAnimation = function () {
        //idle values
        this.startX = 36;
        this.startY = 42;
        this.FrameWidth = Tank.frameSize;
        this.FrameHeight = Tank.frameSize /2 + 20;
        this.FrameSpeed = 0.1;
        this.FrameLength = 4;
        this.FrameLoop = true;
        this.FrameReverse = false;



        Tank.animation = new Animation(ASSET_MANAGER.getAsset(
            tanks[0]),
            this.startX, this.startY, this.FrameWidth, this.FrameHeight,
            this.FrameSpeed, this.FrameLength,
            this.FrameLoop, this.FrameReverse);




    }



    Tank.draw = function (context) {
        context.save();
        if(Tank.heading === -1) {
            context.translate(40, -5);
        } else {
            context.translate(-10, -5);
        }
        context.scale(Tank.heading, 1);

        Tank.animation.drawFrame(deltaTime, context, Tank.heading * this.pos.x, this.pos.y);
        context.restore();
      }

    Tank.updateAnimation();
    return Tank;
}
