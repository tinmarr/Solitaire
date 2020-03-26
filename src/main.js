var game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true
      }
    },
    scene: {
      preload: preload,
      create: create,
    },
    backgroundColor: 0xffffff
  }),
  scene,
  board;

function preload() {
  this.load.image('board', '/assets/img/background.png');
  this.load.image('piece', '/assets/img/gamepiece.png');
}

function create() {
  scene = this;
  board = new Board();

  scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
    gameObject.x = dragX;
    gameObject.y = dragY;
  });
  scene.input.on('dragend', (pointer, gameObject) => {
    if (board.isPosEmpty(board.findNearestPos({x: gameObject.x, y: gameObject.y}))){
      board.getClass(gameObject).pos.ideal = board.findNearestPos({x: gameObject.x, y: gameObject.y});
      board.getClass(gameObject).calcReal();
      board.updatePiece(board.getClass(gameObject));
    } else {
      board.getClass(gameObject).calcReal();
    }
  });
}