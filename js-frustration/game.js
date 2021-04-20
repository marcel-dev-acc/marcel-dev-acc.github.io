/* Game code here */

// GLOBAL VARIABLES
let playerColour;
let playerHasPiecesOnBoard = false;
let activePiece = 1;
let playPiece1Position;
let playPiece2Position;
let playPiece3Position;
let playPiece4Position;
let maxMoves = 27;

function MoveGenerator() {
    let goodRoll = false;
    let moveBy;
    while (goodRoll === false) {
        moveBy = Math.round(Math.random() * 6);
        if (moveBy > 0) {
            return moveBy;
        }
    }
}

function RedrawTheBoard(activePiece) {
    // console.log(typeof playPiece1Position);
    // Clear the board
    let i = 0;
    while (i < 28) {
        document.getElementsByClassName(
            'b' + i.toString()
        )[0].innerHTML = '0';
        i++;
    }
    // Layout all pieces
    if (typeof playPiece1Position !== 'undefined') {
        document.getElementsByClassName(
            'b' + playPiece1Position.toString()
        )[0].innerHTML = 'X';
    }
    if (typeof playPiece2Position !== 'undefined') {
        document.getElementsByClassName(
            'b' + playPiece2Position.toString()
        )[0].innerHTML = 'X';
    }
    if (typeof playPiece3Position !== 'undefined') {
        document.getElementsByClassName(
            'b' + playPiece3Position.toString()
        )[0].innerHTML = 'X';
    }
    if (typeof playPiece4Position !== 'undefined') {
        document.getElementsByClassName(
            'b' + playPiece4Position.toString()
        )[0].innerHTML = 'X';
    }
}

function IsTileTaken(position) {
    let tile = document.getElementsByClassName(
        'b' + position.toString()
    )[0].innerHTML;
    if (tile.length > 0) {
        return true;
    } else {
        return false;
    }
}

function GameFlow() {
    /*
    Assuming you always start
    1) Roll dice
    2) IF the dice == 6
        THEN release token onto the map
        ELSE Nothing
    */
    let roll = MoveGenerator();
    console.log(roll);
    console.log('Piece 1: '+playPiece1Position.toString());
    console.log('Piece 2: '+playPiece2Position.toString());
    console.log('Piece 3: '+playPiece3Position.toString());
    console.log('Piece 4: '+playPiece4Position.toString());
    if (playerHasPiecesOnBoard === true) {
        // Piece 1
        if (activePiece === 1) {
            if (playPiece1Position + roll > maxMoves) {
                if ([28, 29, 30, 31].indexOf(playPiece1Position + roll) > -1) {
                    let tileTaken = IsTileTaken(playPiece1Position + roll);
                    if (tileTaken === false) {
                        playPiece1Position += roll;
                        activePiece = 2;
                        playerHasPiecesOnBoard = false;
                    }
                }
            } else {
                playPiece1Position += roll;
            }
        }
        // Piece 2
        if (activePiece === 2) {
            if (playPiece2Position + roll > maxMoves) {
                if ([28, 29, 30, 31].indexOf(playPiece2Position + roll) > -1) {
                    let tileTaken = IsTileTaken(playPiece2Position + roll);
                    if (tileTaken === false) {
                        playPiece2Position += roll;
                        activePiece = 2;
                        playerHasPiecesOnBoard = false;
                    }
                }
            } else {
                playPiece2Position += roll;
            }
        }
    }
    if (playerHasPiecesOnBoard === false && roll === 6) {
        // Put a piece on the board
        if (activePiece === 1) {
            playPiece1Position = 0;
        }
        if (activePiece === 2) {
            playPiece2Position = 0;
        }
        playerHasPiecesOnBoard = true;
    }
    // Draw the board function
    RedrawTheBoard(activePiece);
}
