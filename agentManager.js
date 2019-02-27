
function agentManager(entity) {
    // this.level = levelObject;
    this.agent = entity;
    this.input = setupKeyboard(entity);
    this.keyHeld = true;
    this.delay = 1;
    this.target;
    this.targetDist = Infinity;
    this.myStyle;
    this.choice;

};

agentManager.prototype.update = function () {
        this.selectTarget();
        //console.log(this.agent.Ename + "s target is " + this.target.Ename);
        //console.log(this.target.Ename + " is " + this.targetDist + " units away");
        this.move();
        this.attack();
};

agentManager.prototype.attack = function () {
  var myX = this.agent.pos.x;
  var myY = this.agent.pos.y;

  var targetX = this.target.pos.x;
  var targetY = this.target.pos.y;

  var xDist = targetX - myX;
  var yDist = targetY - myY;

  if (xDist > 0 && (yDist < 15 && yDist > -15)) {
    //console.log('shoot 1');
    this.right();
    ThrowProjectile('arrow', this.agent, 'right');
  } else if (xDist < 0 && (yDist < 15 && yDist > -15)) {
    //console.log('shoot 2');
    this.left();
    ThrowProjectile('arrow', this.agent, 'left');
  } else if (yDist > 0 && (xDist < 15 && xDist > -15)) {
    //console.log('shoot 3');
    this.up()
    ThrowProjectile('arrow', this.agent, 'up');
  } else if (yDist < 0 && (xDist < 15 && xDist > -15)) {
    //console.log('shoot 4');
    this.down()
    ThrowProjectile('arrow', this.agent, 'down');
  }

}




agentManager.prototype.move = function () {
    var myX = this.agent.pos.x;
    var myY = this.agent.pos.y;

    var targetX = this.target.pos.x;
    var targetY = this.target.pos.y;

    var xDist = targetX - myX;
    var yDist = targetY - myY;

    // Check if close to killzone-----------------------------------------------
    if (myX < 100) {
        this.agent.right();
        if (myX < 100) {
            this.agent.right();
        }
    }
    if (myX > 1180) {
        this.agent.left();
        if (myX > 1180) {
            this.agent.left();
        }
    }
    if (myY > 620) {
        this.agent.up();
        if (myY > 620) {
            this.agent.up();
        }
    }
    if (myY < 100) {
        this.agent.down();
        if (myY < 100) {
            this.agent.down();
        }
    }
    // kill zone bounding end---------------------------------------------------

    //random dir picker
    dirPicker(this);


    //
    // if (this.target.type === 'tank') { // Target the human player
    //     if (xDist > 0) { // Face the target to the right
    //         this.agent.heading = 1;
    //         this.right();
    //     } else { // or to the left
    //         this.agent.heading = -1;
    //         this.left();
    //     }
    //
    //     if (this.targetDist < 0) {
    //         if (xDist > 0) {
    //             this.agent.left();
    //             if (yDist < 0) {
    //                 this.agent.down();
    //             } else if (yDist > 0){
    //                 this.agent.up();
    //             }
    //         } else if (xDist < 0) {
    //             this.agent.right();
    //             if (yDist < 0) {
    //                 this.agent.down();
    //             } else if (yDist > 0){
    //                 this.agent.up();
    //             }
    //         } else {
    //             if (yDist < 0) {
    //                 this.agent.down();
    //             } else if (yDist > 0){
    //                 this.agent.up();
    //             }
    //         }
    //         //this.attack(true);
    //     } else {
    //         if (yDist < 0) {
    //             this.agent.up();
    //         } else if (yDist > 0) {
    //             this.agent.down();
    //         } else if (xDist < 0) {
    //           this.agent.left();
    //         } else if (xDist > 0) {
    //           this.agent.right();
    //         }
    //         //this.attack(false);
    //       }
    // }
};

agentManager.prototype.selectTarget = function () {
    var closestEnemyDist = Infinity;
    var closestEnemy;

    levelObject.entities.forEach(Entity => {
        if (Entity != this.agent && Entity.team !== this.agent.team) {
            var dist = Math.sqrt( Math.pow((this.agent.pos.x-Entity.pos.x), 2)
                                    + Math.pow((this.agent.pos.y-Entity.pos.y), 2));
            if (dist < closestEnemyDist) {
                closestEnemyDist = dist;
                closestEnemy = Entity;
            }
        }
    });
    this.target = closestEnemy;
    this.targetDist = closestEnemyDist;
};




///////////////////////////////////////////////////////////////////////////////////////
agentManager.prototype.right = function () {
        this.agent.go.dir = 1;
        this.agent.right();
        this.agent.facing = 0;
      }

agentManager.prototype.left = function () {
        this.agent.go.dir = -1;
        this.agent.left();
        this.agent.facing = 0;
}

agentManager.prototype.up = function () {
        this.agent.vertical.dir = -1;
        this.agent.up();
        this.agent.facing = -1;
}

agentManager.prototype.down = function () {
        this.agent.vertical.dir = 1;
        this.agent.down();
        this.agent.facing = 1;
}
/////////////////////////////////////////////////////////////////////////////////////////

function dirPicker(tank) { //picks the item to spawn
  choice = getRandomInt(1, 5); //between 1 and number of items + 1
  if (choice === 1) {
    tank.agent.up();
    tank.agent.go.dir = 0;
    tank.agent.vertical.dir = -1;
    tank.agent.facing = -1;
  }
  if (choice === 2) {
    tank.agent.down();
    tank.agent.go.dir = 0;
    tank.agent.vertical.dir = 1;
    tank.agent.facing = 1;
  }
  if (choice === 3) {
    tank.agent.left();
    tank.agent.vertical.dir = 0;
    tank.agent.go.dir = -1;
    tank.agent.facing = 0;
  }
  if (choice === 4) {
    tank.agent.right();
    tank.agent.vertical.dir = 0;
    tank.agent.go.dir = 1;
    tank.agent.facing = 0;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
