var tanks = ["./tanks/tankSprite.png"];

var playerNum = 1;
function createTank(name, choice) {
    const Tank = new Entity(name);
    Tank.team = choice;
    Tank.type = 'player'
    Tank.size.set(40, 42); //set to actuall pixel size of Tank, determines collision box. kat is 18,29
    Tank.origin = 'self';
    Tank.addTrait(new Velocity());
    Tank.addTrait(new Go());
    Tank.addTrait(new Vertical());
    Tank.heading = 1;
    Tank.Moving = false;

    Tank.damage = 0;

    Tank.choice = choice * 66 || 0;
    Tank.player = playerNum;
    playerNum++;

    Tank.drawX = (96);
    Tank.drawY = 0;
    Tank.drawSize = 24;
    Tank.scale = 2;


    Tank.draw = function (context) {
      context.drawImage(ASSET_MANAGER.getAsset(tanks[0]), Tank.drawX, Tank.drawY, Tank.drawSize,Tank.drawSize,
      Tank.pos.x, Tank.pos.y, Tank.drawSize * Tank.scale, Tank.drawSize * Tank.scale);
    }

    // draw updates-------------------------------------------------------------
    Tank.up = function () {
      Tank.drawX = 32 + 2;
      Tank.drawY = Tank.choice;
    }
    Tank.down = function () {
      Tank.drawX = 64 + 2;
      Tank.drawY = 32 + Tank.choice;
    }
    Tank.left = function () {
      Tank.drawX = 0;
      Tank.drawY = 32 + Tank.choice;
    }
    Tank.right = function () {
      Tank.drawX = 96;
      Tank.drawY = Tank.choice;
    }
    //--------------------------------------------------------------------------

    return Tank;
}
