var tanks = ["./tanks/tankSprite.png"];

var playerNum = 1;
function createTank(name, choice) {
    const Tank = new Entity(name);
    Tank.type = 'player'
    Tank.frameSize = 32;
    Tank.size.set(32, 32); //set to actuall pixel size of Tank, determines collision box. kat is 18,29
    Tank.origin = 'self';
    Tank.addTrait(new Velocity());
    Tank.addTrait(new Go());
    Tank.addTrait(new Vertical());
    Tank.heading = 1;

    Tank.Moving = false;
    Tank.damage = 0;

    Tank.choice = choice || 0;
    Tank.player = playerNum;
    playerNum++;



    Tank.updateAnimation = function () {
        //idle values
        this.startX = 10;
        this.startY = 0;
        this.FrameWidth = Tank.frameSize;
        this.FrameHeight = Tank.frameSize;
        this.FrameSpeed = 1;
        this.FrameLength = 1;
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
