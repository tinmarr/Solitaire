class Piece {
  sprite: Phaser.GameObjects.Sprite;
  pos: Pos;
  constructor(pos: IdealPos, public visible: boolean) {
    this.pos = { ideal: pos, real: { x: 0, y: 0 } };
    this.visible = visible;
    if (visible) {
      this.sprite = scene.add.sprite(0, 0, 'piece').setInteractive();
      scene.input.setDraggable(this.sprite);
    } else {
      this.sprite = scene.add.sprite(0, 0, 'piece').setVisible(false);
    }
    this.calcReal();
  }
  calcReal() {
    this.pos.real = { x: 54 + this.pos.ideal.x * 82, y: 54 + this.pos.ideal.y * 82 };
    this.sprite.setX(this.pos.real.x).setY(this.pos.real.y);
  }
}

interface Pos {
  ideal: IdealPos;
  real: RealPos;
}

interface IdealPos {
  x: integer;
  y: integer;
}

interface RealPos {
  x: number;
  y: number;
}
