class Level {
    constructor(levelName) {
        this.gravity = 0; //level side gravity.
        this.levelName = levelName;
        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();


        this.tileCollider = new TileCollider(this.tiles);
        this.entityCollider = new EntityCollider(this.entities);   //added
    }

    addEntity(entity) {
      this.entities.add(entity);
      this.entityCollider.addEntityCollider(entity);
    }

    addTempEntity(entity, timeout) {
      this.entities.add(entity);
      this.entityCollider.addEntityCollider(entity);
      var that = this;
      window.setTimeout(function() {
        that.entities.delete(entity);
        that.entityCollider.removeEntityCollider(entity);}, timeout);
    }

    removeEntity(entity) {
      this.entities.delete(entity);
      this.entityCollider.removeEntityCollider(entity);
      
    }

    getLastCharacter() {
      var e;
      this.entities.forEach(function(entity) {
        if(entity.type == 'player') {
          e = entity;
        }
      });
      return e;
    }

    levelSave() {
      return this.entities;
    }

    levelLoad(load) {
      this.entities = load;
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);
            //console.log('update');
            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);

            this.entityCollider.update(entity);

        });
    }
}
