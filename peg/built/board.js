class Board {
    constructor() {
        this.board = scene.add.sprite(300, 300, 'board');
        this.gamePieceClasses = [];
        this.gamePieceSprites = [];
        for (let i = 0; i < 49; i++) {
            let pos = { x: i % 7, y: Math.floor(i / 7) }, visible = false, piece;
            if (1 < pos.y && pos.y < 5) {
                visible = true;
            }
            else if (1 < pos.x && pos.x < 5 && (pos.y < 2 || pos.y > 4)) {
                visible = true;
            }
            if (pos.x === 3 && pos.y === 3) {
                piece = null;
            }
            else {
                piece = new Piece(pos, visible);
            }
            this.gamePieceClasses.push(piece);
            this.gamePieceSprites.push(piece === null ? null : piece.sprite);
        }
        this.numLeft = 32;
    }
    findNearestPos(pos) {
        return { x: Math.round((pos.x - 54) / 82), y: Math.round((pos.y - 54) / 82) };
    }
    isPosEmpty(pos) {
        return this.gamePieceClasses[pos.y * 7 + pos.x] === null;
    }
    isLegalMove(pieceClass, newPos) {
        if (pieceClass.pos.ideal.x !== newPos.x && pieceClass.pos.ideal.y === newPos.y) {
            return (Math.abs(pieceClass.pos.ideal.x - newPos.x) === 2 &&
                !this.isPosEmpty({
                    x: newPos.x + Math.sign(pieceClass.pos.ideal.x - newPos.x),
                    y: newPos.y,
                }));
        }
        else if (pieceClass.pos.ideal.x === newPos.x && pieceClass.pos.ideal.y !== newPos.y) {
            return (Math.abs(pieceClass.pos.ideal.y - newPos.y) === 2 &&
                !this.isPosEmpty({
                    x: newPos.x,
                    y: newPos.y + Math.sign(pieceClass.pos.ideal.y - newPos.y),
                }));
        }
        else {
            return false;
        }
    }
    getClass(sprite) {
        return this.gamePieceClasses[this.gamePieceSprites.indexOf(sprite)];
    }
    updatePiece(pieceClass) {
        this.gamePieceSprites[this.gamePieceClasses.indexOf(pieceClass)] = null;
        this.gamePieceClasses[this.gamePieceClasses.indexOf(pieceClass)] = null;
        if (pieceClass.sprite.active) {
            this.gamePieceClasses[pieceClass.pos.ideal.y * 7 + pieceClass.pos.ideal.x] = pieceClass;
            this.gamePieceSprites[pieceClass.pos.ideal.y * 7 + pieceClass.pos.ideal.x] =
                pieceClass.sprite;
        }
        else {
            pieceClass.sprite.destroy();
            this.numLeft--;
        }
    }
    destroy() {
        for (let el of this.gamePieceClasses) {
            if (el !== null) {
                el.sprite.destroy();
            }
        }
        this.gamePieceClasses.splice(0, this.gamePieceClasses.length);
        this.board.destroy();
    }
    win() {
        let goodWin = false;
        for (let el of this.gamePieceClasses) {
            if (el !== null && el.pos.ideal.x === 3 && el.pos.ideal.y === 3) {
                goodWin = true;
            }
        }
        if (goodWin) {
            return '1st';
        }
        else {
            return '2nd';
        }
    }
}
//# sourceMappingURL=board.js.map