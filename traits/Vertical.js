// import {Trait} from '../Entity.js';

//left and right movement trait
class Vertical extends Trait {
    constructor() {
        super('vertical');

        this.dir = 0;
        this.speed = 1000;
    }

    update(entity, deltaTime) {

      //moves the character sprite
        entity.vel.y = this.speed * this.dir * deltaTime;
    }
}
