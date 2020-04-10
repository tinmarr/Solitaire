let game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    backgroundColor: 0xffffff,
    parent: 'game',
}), scene, board, win;
function preload() {
    this.load.image('board', 'assets/img/background.png');
    this.load.image('piece', 'assets/img/gamepiece.png');
}
function create() {
    scene = this;
    board = new Board();
    scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });
    scene.input.on('dragend', (pointer, gameObject) => {
        let newPos = board.findNearestPos({ x: gameObject.x, y: gameObject.y });
        if (board.isPosEmpty(newPos) && board.isLegalMove(board.getClass(gameObject), newPos)) {
            let posToDelete = board.getClass(gameObject).pos.ideal.x !== newPos.x
                ? {
                    x: newPos.x + Math.sign(board.getClass(gameObject).pos.ideal.x - newPos.x),
                    y: newPos.y,
                }
                : {
                    x: newPos.x,
                    y: newPos.y + Math.sign(board.getClass(gameObject).pos.ideal.y - newPos.y),
                };
            board.gamePieceClasses[posToDelete.y * 7 + posToDelete.x].sprite.active = false;
            board.updatePiece(board.gamePieceClasses[posToDelete.y * 7 + posToDelete.x]);
            board.getClass(gameObject).pos.ideal = newPos;
            board.getClass(gameObject).calcReal();
            board.updatePiece(board.getClass(gameObject));
        }
        else {
            board.getClass(gameObject).calcReal();
        }
        if (board.numLeft === 1) {
            win = true;
        }
    });
}
function update() {
    if (win) {
        let winType = board.win();
        board.destroy();
        let winText = this.add.text(300, 300, 'You win!\nYou got a ' + winType + ' place win!\nReload to play again', { color: '#000', align: 'center' });
        winText.x = 300 - winText.width / 2;
        winText.y = 300 - winText.height / 2;
        win = false;
    }
}
function restart() {
    board.destroy();
    board = new Board();
}
//# sourceMappingURL=main.js.map
