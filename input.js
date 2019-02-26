function setupKeyboard(entity, keyboard) {
    const input = keyboard || new keyBoardState(); //new keyboard
    entity.input = input;

    input.addMapping('Space', keyState => { //jump
        //console.log(keyState);
        if (keyState) {
            //shoot?
        }
    });

    input.addMapping('KeyA', keyState => { //punch
        if (keyState) {
          entity.go.dir = -1;
        }
    });

    input.addMapping('KeyW', keyState => { //Fireball
        if (keyState) {
          entity.vertical.dir = -1;
        }
    });

    input.addMapping('KeyD', keyState => { //Kick
        if (keyState) {
            entity.go.dir = 1;
            console.log('d');
        }
    });

    input.addMapping('KeyS', keyState => { //go down
        if (keyState) {
          entity.vertical.dir = 1
        }
    });

    input.addMapping('KeyC', keyState => { //Enable CPU movement
      if (keyState) {
        CPUsEnabled = !CPUsEnabled;
      }
    });


    return input;
}

function setupEmptyKeyboard(input) {
  return new keyBoardState();
}
