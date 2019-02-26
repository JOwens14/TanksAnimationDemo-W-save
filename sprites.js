

function loadTankSprites() {
    return loadImage(`./tanks/tankSprite.png`)
    .then(image => {
        const sprites = new SpriteSheet(image, 32, 32); // will only display 32x32 sprites. #bug
        sprites.defineTile('levelobject', 0, 0);
        return sprites;
    });
}
