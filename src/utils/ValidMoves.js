import { Pieces } from './Utils.js'; // function for returning piece types and switching turns

// PreCondition: selectedPiece is a valid piece
// PostCondition: returns true if the piece move is valid, false otherwise
export function FindValidMoves(selectedPiece, goToRow, goToCol, board, turn){
    // NOTE: out of bound errors can never happen because the board's buttons are confined to 8x8 space
    // it's impossible to go out of bounds

    if (goToRow === selectedPiece.row && goToCol === selectedPiece.col) return false;
    if (turn == 'white' && selectedPiece.name[0] != 'W') return false;
    if (turn == 'black' && selectedPiece.name[0] != 'B') return false;

    // Check for friendly fire early
    if (board[goToRow][goToCol].name !== 'empty' && board[goToRow][goToCol].name[0] === selectedPiece.name[0]) {
        return false;
    }

    const pieces = Pieces();

    let isValidPieceMove = false;
    switch(selectedPiece.piece){
        // white pieces
        case pieces.Wpawn.emoji:
            // Moving 2 spaces forward initially
            if (selectedPiece.col === goToCol && selectedPiece.row === 6 && goToRow === 4) {
                // Check if both squares in front are empty
                if (board[5][goToCol].name === 'empty' && board[4][goToCol].name === 'empty') {
                    isValidPieceMove = true;
                }
            }
            // Moving 1 space forward
            else if (selectedPiece.col === goToCol && goToRow === selectedPiece.row - 1) {
                // Check if destination square is empty
                if (board[goToRow][goToCol].name === 'empty') {
                    isValidPieceMove = true;
                }
            }
            // Diagonal Capture
            else if (selectedPiece.row - 1 === goToRow && 
                    (selectedPiece.col - 1 === goToCol || selectedPiece.col + 1 === goToCol) &&
                    board[goToRow][goToCol].name[0] === 'B') { // Check if capturing a black piece
                isValidPieceMove = true;
            }
            // En Passant Capture
            else if (selectedPiece.row === 3 && // White pawn must be on 5th rank (row 3 in zero-based)
                    (selectedPiece.col - 1 === goToCol || selectedPiece.col + 1 === goToCol) && // Moving diagonally
                    goToRow === 2 && // Moving to 6th rank
                    board[goToRow][goToCol].name === 'empty' && // Destination is empty
                    board[selectedPiece.row][goToCol].name === 'Bpawn' && // Adjacent pawn is a black pawn
                    board[selectedPiece.row][goToCol].lastMovedTwo === true) { // The adjacent pawn just moved two squares
                isValidPieceMove = true;
            }
            break;
        case pieces.Wrook.emoji:
            // if moving to the same row or col, let it move
            if (goToRow === selectedPiece.row || goToCol === selectedPiece.col){
                if (isBlocked(selectedPiece, goToRow, goToCol, board)){ // if there's a friendly piece in the way or trying to capture an enemy piece over another piece
                    break;
                }
                isValidPieceMove = true;
            }
            break;
        case pieces.Wknight.emoji:
            if (goToRow === selectedPiece.row + 2 && goToCol === selectedPiece.col + 1
                || goToRow === selectedPiece.row + 2 && goToCol === selectedPiece.col - 1
                || goToRow === selectedPiece.row - 2 && goToCol === selectedPiece.col + 1
                || goToRow === selectedPiece.row - 2 && goToCol === selectedPiece.col - 1
                || goToRow === selectedPiece.row + 1 && goToCol === selectedPiece.col + 2
                || goToRow === selectedPiece.row + 1 && goToCol === selectedPiece.col - 2
                || goToRow === selectedPiece.row - 1 && goToCol === selectedPiece.col + 2
                || goToRow === selectedPiece.row - 1 && goToCol === selectedPiece.col - 2
            ){
                isValidPieceMove = true;
            }
            break;
        case pieces.Wbishop.emoji:
            // Diagonal moves is when either the sum or difference of the row and col is the same
            if (goToRow + goToCol === selectedPiece.row + selectedPiece.col
                || goToRow - goToCol === selectedPiece.row - selectedPiece.col
            ){
                if (isBlocked(selectedPiece, goToRow, goToCol, board)){
                    break;
                }
                isValidPieceMove = true;
            }
            break;
        case pieces.Wqueen.emoji:
            if (goToRow + goToCol === selectedPiece.row + selectedPiece.col
                || goToRow - goToCol === selectedPiece.row - selectedPiece.col
                || (goToRow === selectedPiece.row || goToCol === selectedPiece.col)
            ){
                if (isBlocked(selectedPiece, goToRow, goToCol, board)){
                    break;
                }
                isValidPieceMove = true;
            }
            break;
        case pieces.Wking.emoji:
            // Normal 1-square move
            if (Math.abs(goToRow - selectedPiece.row) <= 1 && Math.abs(goToCol - selectedPiece.col) <= 1){
                isValidPieceMove = true;
            }
            // Castling Check (White)
            else if (selectedPiece.row === 7 && selectedPiece.col === 4 && goToRow === 7) {
                // Kingside Castle (O-O) to g1 (col 6)
                if (goToCol === 6 && canCastle(board, turn, 'K')) {
                    isValidPieceMove = true;
                }
                // Queenside Castle (O-O-O) to c1 (col 2)
                else if (goToCol === 2 && canCastle(board, turn, 'Q')) {
                    isValidPieceMove = true;
                }
            }
            break;

        // black pieces
        case pieces.Bpawn.emoji:
            // Moving 2 spaces forward initially
            if (selectedPiece.col === goToCol && selectedPiece.row === 1 && goToRow === 3) {
                 // Check if both squares in front are empty
                if (board[2][goToCol].name === 'empty' && board[3][goToCol].name === 'empty') {
                    isValidPieceMove = true;
                }
            }
            // Moving 1 space forward
            else if (selectedPiece.col === goToCol && goToRow === selectedPiece.row + 1) {
                 // Check if destination square is empty
                if (board[goToRow][goToCol].name === 'empty') {
                    isValidPieceMove = true;
                }
            }
            // Diagonal Capture
            else if (selectedPiece.row + 1 === goToRow && 
                     (selectedPiece.col + 1 === goToCol || selectedPiece.col - 1 === goToCol) && 
                     board[goToRow][goToCol].name[0] === 'W') // Check if capturing a white piece
            {
                isValidPieceMove = true;
            }
            // En Passant Capture
            else if (selectedPiece.row === 4 && // Black pawn must be on 4th rank (row 4 in zero-based)
                    (selectedPiece.col - 1 === goToCol || selectedPiece.col + 1 === goToCol) && // Moving diagonally
                    goToRow === 5 && // Moving to 3rd rank
                    board[goToRow][goToCol].name === 'empty' && // Destination is empty
                    board[selectedPiece.row][goToCol].name === 'Wpawn' && // Adjacent pawn is a white pawn
                    board[selectedPiece.row][goToCol].lastMovedTwo === true) { // The adjacent pawn just moved two squares
                isValidPieceMove = true;
            }
            break;
        case pieces.Brook.emoji:
            if (goToRow === selectedPiece.row || goToCol === selectedPiece.col){
                if (isBlocked(selectedPiece, goToRow, goToCol, board)){
                    break;
                }
                isValidPieceMove = true;
            }
            break;
        case pieces.Bknight.emoji:
            if (goToRow === selectedPiece.row + 2 && goToCol === selectedPiece.col + 1
                || goToRow === selectedPiece.row + 2 && goToCol === selectedPiece.col - 1
                || goToRow === selectedPiece.row - 2 && goToCol === selectedPiece.col + 1
                || goToRow === selectedPiece.row - 2 && goToCol === selectedPiece.col - 1
                || goToRow === selectedPiece.row + 1 && goToCol === selectedPiece.col + 2
                || goToRow === selectedPiece.row + 1 && goToCol === selectedPiece.col - 2
                || goToRow === selectedPiece.row - 1 && goToCol === selectedPiece.col + 2
                || goToRow === selectedPiece.row - 1 && goToCol === selectedPiece.col - 2
            ){
                isValidPieceMove = true;
            }
            break;
        case pieces.Bbishop.emoji:
            if (goToRow + goToCol === selectedPiece.row + selectedPiece.col
                || goToRow - goToCol === selectedPiece.row - selectedPiece.col
            ){
                if (isBlocked(selectedPiece, goToRow, goToCol, board)){
                    break;
                }
                isValidPieceMove = true;
            }
            break;
        case pieces.Bqueen.emoji:
            if (goToRow + goToCol === selectedPiece.row + selectedPiece.col
                || goToRow - goToCol === selectedPiece.row - selectedPiece.col
                || (goToRow === selectedPiece.row || goToCol === selectedPiece.col)
            ){
                if (isBlocked(selectedPiece, goToRow, goToCol, board)){
                    break;
                }
                isValidPieceMove = true;
            }
            break;
        case pieces.Bking.emoji:
            // Normal 1-square move
            if (Math.abs(goToRow - selectedPiece.row) <= 1 && Math.abs(goToCol - selectedPiece.col) <= 1){
                isValidPieceMove = true;
            }
            // Castling Check (Black)
            else if (selectedPiece.row === 0 && selectedPiece.col === 4 && goToRow === 0) {
                 // Kingside Castle (o-o) to g8 (col 6)
                if (goToCol === 6 && canCastle(board, turn, 'k')) {
                    isValidPieceMove = true;
                }
                // Queenside Castle (o-o-o) to c8 (col 2)
                else if (goToCol === 2 && canCastle(board, turn, 'q')) {
                    isValidPieceMove = true;
                }
            }
            break;
        default:
            console.log("Unknown piece type in FindValidMoves:", selectedPiece.piece);
            break;
    }

    // If the move is valid by piece rules, check if it leaves the king in check
    if (isValidPieceMove) {
        if (isKingInCheckAfterMove(selectedPiece, goToRow, goToCol, board, turn)) {
            return false; // Move is illegal because it leaves the king in check
        }
    }

    return isValidPieceMove;
}

// PreCondition: selectedPiece is a valid piece
// PostCondition: returns true if there's a piece blocking the selected piece from moving to goToRow and goToCol
function isBlocked(selectedPiece, goToRow, goToCol, board){
    if (selectedPiece.name === 'Brook' || selectedPiece.name === 'Wrook') {
        if (goToRow < selectedPiece.row){ // if going up the board
            for (let i = selectedPiece.row - 1; i > goToRow; i--){
                if (board[i][selectedPiece.col].name[0] !== 'e'){
                    return true;
                }
            }
        }
        else if (goToRow > selectedPiece.row){ // if going down the board
            for (let i = selectedPiece.row + 1; i < goToRow; i++){
                if (board[i][selectedPiece.col].name[0] !== 'e'){
                    return true;
                }
            }
        }
        else if (goToCol < selectedPiece.col){ // if going left the board
            for (let i = selectedPiece.col - 1; i > goToCol; i--){
                if (board[selectedPiece.row][i].name[0] !== 'e'){
                    return true;
                }
            }
        }
        else {
            for (let i = selectedPiece.col + 1; i < goToCol; i++){
                if (board[selectedPiece.row][i].name[0] !== 'e'){
                    return true;
                }
            }
        }
    }
    else if (selectedPiece.name === 'Bbishop' || selectedPiece.name === 'Wbishop'){
        if (selectedPiece.col > goToCol && selectedPiece.row < goToRow){ // if going down and left
            console.log('going down and left');
            for (let i = selectedPiece.row + 1, j = selectedPiece.col - 1; i < goToRow; i++, j--){
                if (board[i][j].name[0] !== 'e'){
                    return true;
                }
            }
        }
        else if (selectedPiece.col < goToCol && selectedPiece.row < goToRow){ // if going down and right
            console.log('going down and right');
            for (let i = selectedPiece.row + 1, j = selectedPiece.col + 1; i < goToRow; i++, j++){
                if (board[i][j].name[0] !== 'e'){
                    return true;
                }
            }
        }
        else if (selectedPiece.col > goToCol && selectedPiece.row > goToRow){ // if going up and left
            console.log('going up and left');
            for (let i = selectedPiece.row - 1, j = selectedPiece.col - 1; i > goToRow; i--, j--){
                if (board[i][j].name[0] !== 'e'){
                    return true;
                }
            }
        }
        else if (selectedPiece.col < goToCol && selectedPiece.row > goToRow){ // if going up and right
            console.log('going up and right');
            for (let i = selectedPiece.row - 1, j = selectedPiece.col + 1; i > goToRow; i--, j++){
                if (board[i][j].name[0] !== 'e'){
                    return true;
                }
            }
        }
    }
    else if (selectedPiece.name === 'Bqueen' || selectedPiece.name === 'Wqueen'){
        if (goToRow === selectedPiece.row || goToCol === selectedPiece.col){
            // rook move
            if (isBlocked({name: 'Brook', row: selectedPiece.row, col: selectedPiece.col, piece: '♜'},
                goToRow, goToCol, board)
            ){
                console.log('queen blocked');
                return true;
            }
        }
        else if (goToRow + goToCol === selectedPiece.row + selectedPiece.col
            || goToRow - goToCol === selectedPiece.row - selectedPiece.col
        ){
            // bishop move
            if (isBlocked({name: 'Bbishop', row: selectedPiece.row, col: selectedPiece.col, piece: '♝'},
                goToRow, goToCol, board)
            ){
                console.log('queen blocked');
                return true;
            }
        }
    }
    return false;
}

// New function to check if the king is in check after a potential move
function isKingInCheckAfterMove(selectedPiece, goToRow, goToCol, board, turn) {
    // Create a deep copy of the board to simulate the move
    let tempBoard = JSON.parse(JSON.stringify(board));

    // Simulate the move on the temporary board
    const originalSquare = tempBoard[selectedPiece.row][selectedPiece.col];
    tempBoard[goToRow][goToCol] = { ...originalSquare, row: goToRow, col: goToCol }; // Move piece
    tempBoard[selectedPiece.row][selectedPiece.col] = { emoji: ' ', name: 'empty', coordinate: board[selectedPiece.row][selectedPiece.col].coordinate }; // Empty original square

    // Handle en passant capture simulation
    if ((selectedPiece.name === 'Wpawn' || selectedPiece.name === 'Bpawn') &&
        goToCol !== selectedPiece.col && board[goToRow][goToCol].name === 'empty') {
        const capturedPawnRow = turn === 'white' ? goToRow + 1 : goToRow - 1;
        // Check if the square exists and contains the correct pawn before attempting to clear it
        if (tempBoard[capturedPawnRow]?.[goToCol]?.name === (turn === 'white' ? 'Bpawn' : 'Wpawn')) {
             tempBoard[capturedPawnRow][goToCol] = { emoji: ' ', name: 'empty', coordinate: board[capturedPawnRow][goToCol].coordinate };
        }
    }


    // Find the king's position on the temporary board
    let kingRow = -1, kingCol = -1;
    const kingName = turn === 'white' ? 'Wking' : 'Bking';
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            if (tempBoard[r][c].name === kingName) {
                kingRow = r;
                kingCol = c;
                break;
            }
        }
        if (kingRow !== -1) break;
    }

    if (kingRow === -1) {
        console.error("King not found on temporary board!");
        return true; // Treat as illegal if king is missing
    }

    // Check if the king's square is attacked by the opponent
    // Pass the *player's* turn color, isSquareAttacked will determine the opponent
    return isSquareAttacked(tempBoard, { row: kingRow, col: kingCol }, turn);
}


export function inCheckmate(board, turn) {
    // 1) Locate the king
    const kingName = turn === 'white' ? 'Wking' : 'Bking';
    let kingRow = -1, kingCol = -1;
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            if (board[r][c].name === kingName) {
                kingRow = r; kingCol = c;
                break;
            }
        }
        if (kingRow !== -1) break;
    }

    // 2) If king not found or not currently in check, not checkmate
    if (kingRow === -1 || !isSquareAttacked(board, { row: kingRow, col: kingCol }, turn)) {
        return false;
    }

    // 3) For every piece of 'turn', try every destination; if any legal move exists, not checkmate
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const sq = board[r][c];
            if (sq.name !== 'empty' && sq.name[0] === (turn === 'white' ? 'W' : 'B')) {
                const pieceObj = { piece: sq.emoji, row: r, col: c, name: sq.name };
                for (let tr = 0; tr < 8; tr++) {
                    for (let tc = 0; tc < 8; tc++) {
                        if (FindValidMoves(pieceObj, tr, tc, board, turn)) {
                            return false;
                        }
                    }
                }
            }
        }
    }

    // no escape found
    return true;
}

// find out if the square is under attack by the opponent
export function isSquareAttacked(board, square, playerColor) {
    const opponentColor = playerColor === 'white' ? 'black' : 'white'; // Determine opponent's color
    const opponentPieceColorChar = opponentColor === 'white' ? 'W' : 'B';

    // Loop through the board looking for enemy pieces.
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[r].length; c++) {
            const piece = board[r][c];
            // Check if the piece belongs to the opponent
            if (piece.name !== 'empty' && piece.name[0] === opponentPieceColorChar) {
                // Create a dummy selectedPiece object for the attacking piece.
                let attackingPiece = {
                    piece: piece.emoji,
                    row: r,
                    col: c,
                    name: piece.name
                };
                // Check if the opponent piece can move to the target square (ignoring check rules for this check)
                if (canPieceAttackSquare(attackingPiece, square.row, square.col, board)) {
                    return true;
                }
            }
        }
    }
    return false;
}

// Helper function for isSquareAttacked: Checks if a piece *could* move to a square, ignoring check rules.
// This is needed because isSquareAttacked calls FindValidMoves, which calls isKingInCheckAfterMove, creating a potential infinite loop.
function canPieceAttackSquare(selectedPiece, goToRow, goToCol, board) {
    // NOTE: out of bound errors can never happen because the board's buttons are confined to 8x8 space
    // it's impossible to go out of bounds

    if (goToRow === selectedPiece.row && goToCol === selectedPiece.col) return false;

    const pieces = Pieces();

    let isValidPieceMove = false;
    switch(selectedPiece.piece){
        // white pieces
        case pieces.Wpawn.emoji:
            // Diagonal Capture only for attack check
             if (selectedPiece.row - 1 === goToRow &&
                    (selectedPiece.col - 1 === goToCol || selectedPiece.col + 1 === goToCol)) {
                isValidPieceMove = true;
            }
            break;
        case pieces.Wrook.emoji:
            if (goToRow === selectedPiece.row || goToCol === selectedPiece.col){
                if (isBlocked(selectedPiece, goToRow, goToCol, board)){
                    break;
                }
                isValidPieceMove = true;
            }
            break;
        case pieces.Wknight.emoji:
            if (goToRow === selectedPiece.row + 2 && goToCol === selectedPiece.col + 1
                || goToRow === selectedPiece.row + 2 && goToCol === selectedPiece.col - 1
                || goToRow === selectedPiece.row - 2 && goToCol === selectedPiece.col + 1
                || goToRow === selectedPiece.row - 2 && goToCol === selectedPiece.col - 1
                || goToRow === selectedPiece.row + 1 && goToCol === selectedPiece.col + 2
                || goToRow === selectedPiece.row + 1 && goToCol === selectedPiece.col - 2
                || goToRow === selectedPiece.row - 1 && goToCol === selectedPiece.col + 2
                || goToRow === selectedPiece.row - 1 && goToCol === selectedPiece.col - 2
            ){
                isValidPieceMove = true;
            }
            break;
        case pieces.Wbishop.emoji:
            if (goToRow + goToCol === selectedPiece.row + selectedPiece.col
                || goToRow - goToCol === selectedPiece.row - selectedPiece.col
            ){
                if (isBlocked(selectedPiece, goToRow, goToCol, board)){
                    break;
                }
                isValidPieceMove = true;
            }
            break;
        case pieces.Wqueen.emoji:
            if (goToRow + goToCol === selectedPiece.row + selectedPiece.col
                || goToRow - goToCol === selectedPiece.row - selectedPiece.col
                || (goToRow === selectedPiece.row || goToCol === selectedPiece.col)
            ){
                if (isBlocked(selectedPiece, goToRow, goToCol, board)){
                    break;
                }
                isValidPieceMove = true;
            }
            break;
        case pieces.Wking.emoji:
            if (Math.abs(goToRow - selectedPiece.row) <= 1 && Math.abs(goToCol - selectedPiece.col) <= 1){
                isValidPieceMove = true;
            }
            break;

        // black pieces
        case pieces.Bpawn.emoji:
            // Diagonal Capture only for attack check
            if (selectedPiece.row + 1 === goToRow &&
                     (selectedPiece.col + 1 === goToCol || selectedPiece.col - 1 === goToCol))
            {
                isValidPieceMove = true;
            }
            break;
        case pieces.Brook.emoji:
            if (goToRow === selectedPiece.row || goToCol === selectedPiece.col){
                if (isBlocked(selectedPiece, goToRow, goToCol, board)){
                    break;
                }
                isValidPieceMove = true;
            }
            break;
        case pieces.Bknight.emoji:
            if (goToRow === selectedPiece.row + 2 && goToCol === selectedPiece.col + 1
                || goToRow === selectedPiece.row + 2 && goToCol === selectedPiece.col - 1
                || goToRow === selectedPiece.row - 2 && goToCol === selectedPiece.col + 1
                || goToRow === selectedPiece.row - 2 && goToCol === selectedPiece.col - 1
                || goToRow === selectedPiece.row + 1 && goToCol === selectedPiece.col + 2
                || goToRow === selectedPiece.row + 1 && goToCol === selectedPiece.col - 2
                || goToRow === selectedPiece.row - 1 && goToCol === selectedPiece.col + 2
                || goToRow === selectedPiece.row - 1 && goToCol === selectedPiece.col - 2
            ){
                isValidPieceMove = true;
            }
            break;
        case pieces.Bbishop.emoji:
            if (goToRow + goToCol === selectedPiece.row + selectedPiece.col
                || goToRow - goToCol === selectedPiece.row - selectedPiece.col
            ){
                if (isBlocked(selectedPiece, goToRow, goToCol, board)){
                    break;
                }
                isValidPieceMove = true;
            }
            break;
        case pieces.Bqueen.emoji:
            if (goToRow + goToCol === selectedPiece.row + selectedPiece.col
                || goToRow - goToCol === selectedPiece.row - selectedPiece.col
                || (goToRow === selectedPiece.row || goToCol === selectedPiece.col)
            ){
                if (isBlocked(selectedPiece, goToRow, goToCol, board)){
                    break;
                }
                isValidPieceMove = true;
            }
            break;
        case pieces.Bking.emoji:
            if (Math.abs(goToRow - selectedPiece.row) <= 1 && Math.abs(goToCol - selectedPiece.col) <= 1){
                isValidPieceMove = true;
            }
            break;
        default:
            console.log("Unknown piece type in canPieceAttackSquare:", selectedPiece.piece);
            break;
    }
    return isValidPieceMove;
}

/*
The king's path should not be in check. 
the king's path must be cleared.
the rook must not have moved.
the king must not have moved.
the king is not in check.
*/
// New function to check castling validity
function canCastle(board, turn, side) {
    const kingRow = turn === 'white' ? 7 : 0;
    const kingCol = 4;

    if (board[kingRow][kingCol].hasMoved) return false; // King has moved
    if (isSquareAttacked(board, { row: kingRow, col: kingCol }, turn)) return false; // King is in check

    if (turn === 'white') {
        if (side === 'K') { // Kingside (g1)
            if (board[7][7].name !== 'Wrook' || board[7][7].hasMoved) return false; // Rook has moved or doesn't exist
            if (board[7][5].name !== 'empty' || board[7][6].name !== 'empty') return false; // Path isn't clear (f1, g1)
            if (isSquareAttacked(board, { row: 7, col: 5 }, turn) 
                || isSquareAttacked(board, { row: 7, col: 6 }, turn)) return false; // Path is attacked (f1, g1)
        } else { // Queenside (c1)
            if (board[7][0].name !== 'Wrook' || board[7][0].hasMoved) return false;
            if (board[7][1].name !== 'empty' || board[7][2].name !== 'empty' || board[7][3].name !== 'empty') return false; // (b1, c1, d1)
            if (isSquareAttacked(board, { row: 7, col: 2 }, turn) 
                || isSquareAttacked(board, { row: 7, col: 3 }, turn)) return false; // (c1, d1)
        }
    } else { // Black
        if (side === 'k') { // Kingside (g8)
            if (board[0][7].name !== 'Brook' || board[0][7].hasMoved) return false;
            if (board[0][5].name !== 'empty' || board[0][6].name !== 'empty') return false; // (f8, g8)
            if (isSquareAttacked(board, { row: 0, col: 5 }, turn) 
                || isSquareAttacked(board, { row: 0, col: 6 }, turn)) return false; // (f8, g8)
        } else { // Queenside (c8)
            if (board[0][0].name !== 'Brook' || board[0][0].hasMoved) return false;
            if (board[0][1].name !== 'empty' || board[0][2].name !== 'empty' || board[0][3].name !== 'empty') return false; // (b8, c8, d8)
            if (isSquareAttacked(board, { row: 0, col: 2 }, turn) 
                || isSquareAttacked(board, { row: 0, col: 3 }, turn)) return false; // (c8, d8)
        }
    }
    return true; // All checks passed
}