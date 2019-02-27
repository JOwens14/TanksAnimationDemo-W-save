//entity colliding
  class EntityCollider {
    constructor() {
      this.entities = new Set();
    }


  addEntityCollider(entity) {
    this.entities.add(entity);
  }

  removeEntityCollider(entity) {
    this.entities.delete(entity);
  }

  clearEntityColliders() {
    this.entities.clear();
  }


  checkEntityCollision(entity) {
    var xCollideFallFactor = 50;
    this.entities.forEach(entityObject => {
      if (entity !== entityObject) {
        if (entity.type === 'projectile' || entityObject.type === 'projectile') {
          if (entity.origin === entityObject || entityObject.origin === entity) {
            //console.log('projectile hit origin');
            return;
          }
        }
        //bound collisions
        if (entity.type !== 'projectile') {
          if (entity.pos.x > 1180) {
            entity.vel.x = 0;
            entity.pos.x = entity.pos.x;
            entity.go.dir = -1;
            entity.left();
          }
          if (entity.pos.x < 100) {
            entity.vel.x = 0;
            entity.pos.x = entity.pos.x;
            entity.go.dir = 1;
            entity.right();
          }
          if (entity.pos.y > 620) {
            entity.vel.y = 0;
            entity.pos.y = entity.pos.y;
            entity.vertical.dir = -entity.vertical.dir;
            entity.up();
          }
          if (entity.pos.y < 100) {
            entity.vel.y = 0;
            entity.pos.y = entity.pos.y;
            entity.vertical.dir = -entity.vertical.dir;
            entity.down();
          }
      }
        //end bound collisions

        //check all for collision

//YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
        // if (entity.vel.y > 0) {
        //   if (entity.pos.y + entity.size.y >= entityObject.pos.y && entity.pos.y + entity.size.y <= entityObject.pos.y + entityObject.size.y/2) { // /3
        //
        //     if (entity.type === 'projectile') {
        //       levelObject.removeEntity(entity);
        //       console.log('hit from top');
        //       return;
        //     }
        //
        //     entity.pos.y = entityObject.pos.y - entity.size.y ;
        //     //push back
        //     entity.vel.y = entity.vel.y/2;
        //     entityObject.vel.y = entity.vel.y/2;
        //
        //   }
        // } else if (entity.vel.y < 0) {
        //     if (entity.pos.y >= entityObject.pos.y + entityObject.size.y/2 && entity.pos.y <= entityObject.pos.y + entityObject.size.y ) { //division divides the char in hald and then segments further to catch between frames
        //
        //       if (entity.type === 'projectile') {
        //         levelObject.removeEntity(entity);
        //         console.log('hit from bottom');
        //         return;
        //       }
        //
        //       entity.pos.y = entityObject.pos.y + entityObject.size.y;
        //       //push back
        //       entity.vel.y = entity.vel.y/2;
        //       entityObject.vel.y = entity.vel.y/2;
        //
        //     }
        //
        //   }
//YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (entity.vel.x > 0) {
          if (entity.pos.x + entity.size.x >= entityObject.pos.x && entity.pos.x + entity.size.x <= entityObject.pos.x + entityObject.size.x/2
          && (entity.pos.y >= entityObject.pos.y + entityObject.size.y/2 && entity.pos.y <= entityObject.pos.y + entityObject.size.y ||
            entity.pos.y + entity.size.y >= entityObject.pos.y && entity.pos.y + entity.size.y <= entityObject.pos.y + entityObject.size.y/2)) { // /3

            if (entity.type === 'projectile') {
              levelObject.removeEntity(entity);
              entityObject.damage++;
              //console.log('hit from left');
              return;
            }

            entity.pos.x = entityObject.pos.x - entity.size.x ;
            //push back
            entity.vel.x = entity.vel.x/2;
            entityObject.vel.x = entity.vel.x/2;

          }
        } else if (entity.vel.x < 0) {
            if (entity.pos.x >= entityObject.pos.x + entityObject.size.x/2 && entity.pos.x <= entityObject.pos.x + entityObject.size.x
              && (entity.pos.y >= entityObject.pos.y + entityObject.size.y/2 && entity.pos.y <= entityObject.pos.y + entityObject.size.y ||
                entity.pos.y + entity.size.y >= entityObject.pos.y && entity.pos.y + entity.size.y <= entityObject.pos.y + entityObject.size.y/2)) { //division divides the char in hald and then segments further to catch between frames

              if (entity.type === 'projectile') {
                levelObject.removeEntity(entity);
                entityObject.damage++;
                //console.log('hit from right');
                return;
              }

              entity.pos.x = entityObject.pos.x + entityObject.size.x;
              //push back
              entity.vel.x = entity.vel.x/2;
              entityObject.vel.x = entity.vel.x/2;

            }

          }
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      }
    });
  }

  update(entity) {
    this.checkEntityCollision(entity);
  }


}
