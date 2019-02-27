class Throw extends Trait {
    constructor() {
        super('throw');

        this.dir = 0;
        this.speed = 12000;  //should be about 10,000ish
        this.v = 0;
    }

    update(entity, deltaTime) {

      //moves the projectile
        entity.vel.x = this.speed * this.dir * deltaTime;
        entity.vel.y = this.speed * this.v * deltaTime;
    }
}
