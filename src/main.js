var game = Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 },
        debug: true
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    },
    backgroudColor: 0x000000
  }),
  scene;

function preload() {}

function create() {
  scene = this;
}

function update() {}
