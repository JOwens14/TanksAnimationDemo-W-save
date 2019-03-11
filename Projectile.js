function createProjectile(name, originEntity, direction) {
    const Projectile = new Entity(name); //creates the projectile as an entity
    Projectile.origin = originEntity;
    Projectile.type = 'projectile';
    Projectile.addTrait(new Velocity());
    Projectile.addTrait(new Throw());
    Projectile.addTrait(new Vertical());


    Projectile.vertical.speed = Projectile.throw.speed;
    Projectile.heading = originEntity.go.dir;
    if (Projectile.heading === 0) {
      Projectile.heading = 1;
    }

    if (originEntity.facing === 0) {
      Projectile.throw.dir = originEntity.go.dir;
    } else {
      Projectile.vertical.dir = -originEntity.vertical.dir;
    }

    //console.log(originEntity.go.dir + originEntity.vertical.dir);

    if(name == 'arrow') {
        Projectile.size.set(32, 9);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 30);
    }

    Projectile.handle = function(intent) {
        if(intent == 'getThrower'){
            return originEntity;
        }
    }

    Projectile.updateAnimation = function() {
      if (direction === 'up'){
          console.log('fire up ');
          Projectile.size.set(9,32);
          Projectile.animation = new Animation(ASSET_MANAGER.getAsset(
              "./Projectiles/arrowUp.png"), 0, 0, 110, 400, 1, 1, true, false);
      } else if (direction === 'down'){
          Projectile.size.set(9,32);
          Projectile.animation = new Animation(ASSET_MANAGER.getAsset(
              "./Projectiles/arrowDown.png"), 0, 0, 110, 400, 1, 1, true, false);
      } else {
          Projectile.size.set(32, 9);
          Projectile.animation = new Animation(ASSET_MANAGER.getAsset(
              "./Projectiles/arrow.png"), 0, 0, 400, 110, 1, 1, true, false);
          }
    }

    Projectile.draw = function (context) {
        context.save();
          if(Projectile.heading == 1) {
            context.translate(-5, 0);
          } else {
            context.translate(35, 0);
          }
          context.scale(Projectile.heading, 1);


        Projectile.animation.drawFrame(deltaTime, context, Projectile.heading * this.pos.x + 5, this.pos.y, .08);

        context.restore();
    }

    Projectile.updateAnimation();
    return Projectile;
}


function ThrowProjectile(name, originEntity, direction) {
  levelObject.addEntity(createProjectile(name, originEntity, direction));
}
