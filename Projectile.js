function createProjectile(name, originEntity, direction) {
    const Projectile = new Entity(name); //creates the projectile as an entity
    Projectile.origin = originEntity;
    Projectile.type = 'projectile';
    Projectile.addTrait(new Velocity());
    Projectile.addTrait(new Throw());
    Projectile.addTrait(new Vertical());
    Projectile.vertical.speed = Projectile.throw.speed;
    Projectile.heading = originEntity.go.dir;

    if (originEntity.facing === 0) {
      Projectile.throw.dir = originEntity.go.dir;
    } else {
      Projectile.vertical.dir = originEntity.vertical.dir;
    }

    Projectile.upOrDown = 0;
    if (direction === 'down') {
      Projectile.upOrDown = -1;
    }
    if (direction === 'up') {
      Projectile.upOrDown = 1;
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
        switch(name) {
            case 'arrow':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset(
                    "./Projectiles/Arrow.png"), 0, 0, 400, 110, 1, 1, true, false);
                break;
        }
    }

    Projectile.draw = function (context) {
        context.save();
        if (Projectile.upOrDown === 0) {
          if(Projectile.heading == 1) {
              if(name == 'cash') {
                  context.translate(20, 0);
              } else {
                  context.translate(-5, 0);
              }
          } else {
              if(name == 'shadeStep') {
                  context.translate(10, 0)
              } else if(name == 'fireball') {
                  context.translate(30, 0)
              } else if(name == 'cash') {
                  context.translate(0, 0);
              } else {
                  context.translate(35, 0)
              };
          }
          context.scale(Projectile.heading, 1);
        } else {
          console.log('rotate');
          context.rotate(Math.PI / 2);
        }



        Projectile.animation.drawFrame(deltaTime, context, Projectile.heading * this.pos.x + 5, this.pos.y, .08);

        context.restore();
    }

    Projectile.updateAnimation();
    return Projectile;
}


function ThrowProjectile(name, originEntity, direction) {
  levelObject.addEntity(createProjectile(name, originEntity, direction));
}
