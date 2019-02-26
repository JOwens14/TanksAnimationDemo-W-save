
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
    console.log(this.agent.Ename + "s target is " + this.target.Ename);
    console.log(this.target.Ename + " is " + this.targetDist + " units away");
    this.move();
};




agentManager.prototype.move = function () {
    var myX = this.agent.pos.x;
    var myY = this.agent.pos.y;

    var targetX = this.target.pos.x;
    var targetY = this.target.pos.y;

    var xDist = targetX - myX;
    var yDist = targetY - myY;

    // Check if close to killzone
    if (myX < 80) {
        this.right();
        if (myX < 80) {
            this.right();
        }
    }
    if (myX > 1120) {
        this.left();
        if (myX > 1120) {
            this.left();
        }
    }
    if (myY > 700) {
        this.up();
        if (myY > 700) {
            this.up();
        }
    }
    if (myY < 100) {
        this.down();
        if (myY < 100) {
            this.down();
        }
    }

    if (this.target.Ename) { // Target the human player
        if (xDist > 0) { // Face the target to the right
            this.agent.heading = 1;
        } else { // or to the left
            this.agent.heading = -1;
        }

        if (true) { // Up close fighting style
            if (this.targetDist > 50) {
                if (xDist > 0) {
                    this.right();
                    if (yDist < 0) {
                        this.up();
                    } else if (yDist > 0){
                        this.down();
                    }
                } else if (xDist < 0) {
                    this.left();
                    if (yDist < 0) {
                        //this.up();
                    } else if (yDist > 0){
                        this.down();
                    }
                } else {
                    if (yDist < 0) {
                        //this.up();
                    } else if (yDist > 0){
                        this.down();
                    }
                }
                //this.attack(true);
            } else {
                //this.attack(false);
            }
        } else { // Ranged fighting style
            if (this.targetDist < 50) {
                if (xDist > 0) {
                    this.left();
                    if (yDist < 0) {
                        this.down();
                    } else if (yDist > 0){
                        this.up();
                    }
                } else if (xDist < 0) {
                    this.right();
                    if (yDist < 0) {
                        this.down();
                    } else if (yDist > 0){
                        this.up();
                    }
                } else {
                    if (yDist < 0) {
                        this.down();
                    } else if (yDist > 0){
                        this.up();
                    }
                }
                //this.attack(true);
            } else {
                if (yDist < 0) {
                    this.up();
                } else if (yDist > 0){
                    //this.down();
                }
                //this.attack(false);
            }
        }

    }
};

agentManager.prototype.selectTarget = function () {
    var closestEnemyDist = Infinity;
    var closestEnemy;

    var closestItemDist = Infinity;
    var closestItem;

    levelObject.entities.forEach(Entity => {
        // console.log("Entity type = " + Entity.type);
        if (Entity != this.agent) {
            var dist = Math.sqrt( Math.pow((this.agent.pos.x-Entity.pos.x), 2)
                                    + Math.pow((this.agent.pos.y-Entity.pos.y), 2));
            if (dist < closestEnemyDist) {
                closestEnemyDist = dist;
                closestEnemy = Entity;
            }
        }
    });

    if (closestItemDist < 500) {
        this.target = closestItem;
        this.targetDist = closestItemDist;
    } else {
        this.target = closestEnemy;
        this.targetDist = closestEnemyDist;
    }

};




///////////////////////////////////////////////////////////////////////////////////////
agentManager.prototype.right = function () {
        this.agent.go.dir = 1;
      }

agentManager.prototype.left = function () {
        this.agent.go.dir = -1;
}

agentManager.prototype.up = function () {
        this.agent.vertical.dir = -1;
}

agentManager.prototype.down = function () {
        this.agent.vertical.dir = 1;
}
/////////////////////////////////////////////////////////////////////////////////////////
