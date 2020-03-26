class Board {
  constructor() {
    this.board = scene.add.sprite(300, 300, 'board');
    this.gamePieceClasses = [];
    this.gamePieceSprites = [];
    for (var i = 0; i < 49; i++) {
      var pos = { x: i % 7, y: Math.floor(i / 7) },
        visible = false,
        piece;
      if (1 < pos.y && pos.y < 5) {
        visible = true;
      } else if (1 < pos.x && pos.x < 5 && (pos.y < 2 || pos.y > 4)) {
        visible = true;
      }
      if (pos.x === 3 && pos.y === 3) {
        piece = null;
      } else {
        piece = new Piece(pos, visible);
      }
      this.gamePieceClasses.push(piece);
      this.gamePieceSprites.push(piece === null ? null : piece.sprite);
    }
  }
  findNearestPos(pos) {
    return { x: Math.round((pos.x - 54) / 82), y: Math.round((pos.y - 54) / 82) };
  }
  isPosEmpty(pos) {
    return this.gamePieceClasses[pos.y * 7 + pos.x] === null;
  }
  getClass(sprite) {
    return this.gamePieceClasses[this.gamePieceSprites.indexOf(sprite)];
  }
  updatePiece(pieceClass) {
    this.gamePieceSprites[this.gamePieceClasses.indexOf(pieceClass)] = null;
    this.gamePieceClasses[this.gamePieceClasses.indexOf(pieceClass)] = null;
    if (pieceClass.sprite.active) {
      this.gamePieceClasses[pieceClass.pos.ideal.y * 7 + pieceClass.pos.ideal.x] = pieceClass;
      this.gamePieceSprites[pieceClass.pos.ideal.y * 7 + pieceClass.pos.ideal.x] = pieceClass.sprite;
    }
  }
  destroy() {
    for (el of this.gamePieceClasses) {
      el.sprite.destroy();
    }
    this.gamePieceClasses.splice(0, this.gamePieceClasses.length);
  }
}
