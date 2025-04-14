import { Pieces, switchTurn } from './Utils.js'; // function for returning piece types and switching turns

// PreCondition: selectedPiece is a valid piece
// PostCondition: returns true if the piece move is valid, false otherwise
export function FindValidMoves(selectedPiece, goToRow, goToCol, board, turn, setTurn, audio){
    // NOTE: out of bound errors can never happen because the board's buttons are confined to 8x8 space
    // it's impossible to go out of bounds

    if (goToRow === selectedPiece.row && goToCol === selectedPiece.col) return false;
    if (turn == 'white' && selectedPiece.name[0] != 'W') return false;
    if (turn == 'black' && selectedPiece.name[0] != 'B') return false;

    const pieces = Pieces();

    let isValidPieceMove = false;
    switch(selectedPiece.piece){
        // white pieces
        case pieces.Wpawn.emoji:
            // Moving 2 spaces or 1 initially
            if ((selectedPiece.col === goToCol // check if on same col
                && selectedPiece.row === 6 // check if on starting row
                && goToRow === selectedPiece.row - 2) // let it move 2 squares if on starting row
                || (selectedPiece.col === goToCol // if on the same col but not on starting row
                && goToRow === selectedPiece.row - 1) // let it move 1 square
                ){
                if (board[goToRow][goToCol].name[0] === 'B'){
                    // if goint forward and there's a piece in front of it
                    break; // if there's a piece in front of it
                }
                if (goToRow === 4){ // if it's moving 2 squares
                    if (isBlocked(selectedPiece, goToRow, goToCol, board)){
                        break;
                    }
                }
                isValidPieceMove = true;
            } // Diagonal Capture, Pawn promotion, 1 space moves
            else if((((selectedPiece.row - 1 === goToRow) 
                && (selectedPiece.col - 1 === goToCol 
                || selectedPiece.col + 1 === goToCol)
                // if going diagonally and there's a capturable piece
                && (board[goToRow][goToCol].name[0] === 'B')
                ))){
                isValidPieceMove = true;
                if (goToRow === 0){ // promote the pawn
                    audio.play();
                    board[goToRow][goToCol] = {emoji: pieces.Wqueen.emoji, name: pieces.Wqueen.name};
                    board[selectedPiece.row][selectedPiece.col] = {emoji: ' ', name: 'empty'};
                    switchTurn(turn, setTurn);
                    break; // return false because the pawn has been promoted
                }
            } // Diagonal move for EN Passant capture
            else if (
                ((selectedPiece.row - 1) == goToRow) &&
                ((selectedPiece.col == goToCol) || (selectedPiece.col + 1 == goToCol)) &&
                (board[goToRow][goToCol].name === 'empty') &&
                selectedPiece.row === 3
            ) {
                // Check if the last move was a black pawn moving two squares forward
                // get history of move's last move
                // if it was set valid to true
                
                // const last = board.lastMove;
                // // Check if the last move was a black pawn moving two squares forward
                // if (
                //     last.piece === pieces.Bpawn.emoji &&
                //     last.from.row === 1 &&
                //     last.to.row === 3 &&
                //     last.to.col === goToCol
                // ){
                //     isValidPieceMove = true;
                // }
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
            if (goToRow == selectedPiece.row + 1 && goToCol == selectedPiece.col + 1
                || goToRow == selectedPiece.row - 1 && goToCol == selectedPiece.col - 1
                || goToRow == selectedPiece.row + 1 && goToCol == selectedPiece.col - 1
                || goToRow == selectedPiece.row - 1 && goToCol == selectedPiece.col + 1
                || goToRow == selectedPiece.row + 1 && goToCol == selectedPiece.col
                || goToRow == selectedPiece.row - 1 && goToCol == selectedPiece.col
                || goToRow == selectedPiece.row && goToCol == selectedPiece.col + 1
                || goToRow == selectedPiece.row && goToCol == selectedPiece.col - 1
            ){
                isValidPieceMove = true;
            }
            break;

        // black pieces
        case pieces.Bpawn.emoji:
            if ((selectedPiece.col === goToCol // check if on same col
                && selectedPiece.row === 1 // check if on starting row
                && goToRow === selectedPiece.row + 2) // let it move 2 squares if on starting row
                || (selectedPiece.col === goToCol // if on the same col but not on starting row
                && goToRow === selectedPiece.row + 1) // let it move 1 square
                ){
                if (board[goToRow][goToCol].name[0] === 'W'){
                    break; // if there's a piece in front of it
                }
                if (goToRow === 3){ // if it's moving 2 squares
                    if (isBlocked(selectedPiece, goToRow, goToCol, board)){
                        break;
                    }
                }
                isValidPieceMove = true;
            }
            else if((((selectedPiece.row + 1 === goToRow) 
                && (selectedPiece.col + 1 === goToCol 
                || selectedPiece.col - 1 === goToCol)  && (board[goToRow][goToCol].name[0] === 'W')
                ))){
                if (goToRow === 7){
                    audio.play();
                    board[goToRow][goToCol] = {emoji: pieces.Bqueen.emoji, name: pieces.Bqueen.name};
                    board[selectedPiece.row][selectedPiece.col] = {emoji: ' ', name: 'empty'};
                    switchTurn(turn, setTurn);
                    break; // return false because the pawn has been promoted
                }
                isValidPieceMove = true;
            } 
            else if ((selectedPiece.col === goToCol) &&
                selectedPiece.row === 1 &&
                (goToRow === selectedPiece.row + 2) || (selectedPiece.col === goToCol) &&
                goToRow === selectedPiece.row + 1
            ) {
                // const last = board.lastMove;
                // // Check if the last move was a white pawn moving two squares forward
                // if (
                //     last.piece === pieces.Wpawn.emoji &&
                //     last.from.row === 6 &&
                //     last.to.row === 4 &&
                //     last.to.col === goToCol
                // ){
                //     isValidPieceMove = true;
                // }
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
            if (goToRow == selectedPiece.row + 1 && goToCol == selectedPiece.col + 1
                || goToRow == selectedPiece.row - 1 && goToCol == selectedPiece.col - 1
                || goToRow == selectedPiece.row + 1 && goToCol == selectedPiece.col - 1
                || goToRow == selectedPiece.row - 1 && goToCol == selectedPiece.col + 1
                || goToRow == selectedPiece.row + 1 && goToCol == selectedPiece.col
                || goToRow == selectedPiece.row - 1 && goToCol == selectedPiece.col
                || goToRow == selectedPiece.row && goToCol == selectedPiece.col + 1
                || goToRow == selectedPiece.row && goToCol == selectedPiece.col - 1
            ){
                isValidPieceMove = true;
            }
            break;
        default: // in case something goes wrong
            console.log("wtf are you selecting?");
            break;
    }
    return isValidPieceMove;
}

// PreCondition: selectedPiece is a valid piece
// PostCondition: returns true if there's a piece blocking the selected piece from moving to goToRow and goToCol
function isBlocked(selectedPiece, goToRow, goToCol, board){
    if (selectedPiece.name === 'Bpawn'){
        if (board[selectedPiece.row + 1][selectedPiece.col].name[0] !== 'e'){
            return true;
        }
    }
    else if (selectedPiece.name === 'Wpawn'){
        if (board[selectedPiece.row - 1][selectedPiece.col].name[0] !== 'e'){
            return true;
        }
    }
    else if (selectedPiece.name === 'Brook' || selectedPiece.name === 'Wrook') {
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

function findKing(board, turn) {
    const kingName = turn === 'white' ? 'Wking' : 'Bking';
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[r].length; c++) {
            if (board[r][c].name === kingName) {
                return { 
                    row: r, col: c
                };
            }
        }
    }
    return null;
}

// find out if the square is under attack
function isSquareAttacked(board, square, ownTurn) {
    const opponent = ownTurn === 'white' ? 'B' : 'W';
    // Create dummy objects for audio and setTurn that do nothing.
    const dummyAudio = { play: () => {} };
    const dummySetTurn = () => {};
    // Loop through the board looking for enemy pieces.
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[r].length; c++) {
            const piece = board[r][c];
            if (piece.name[0] === opponent) {
                // Create a dummy selectedPiece object.
                let selectedPiece = {
                    piece: piece.emoji,
                    row: r,
                    col: c,
                    name: piece.name
                };
                // If enemy piece can move to target square, square is attacked.
                if (FindValidMoves(selectedPiece, square.row, square.col, board, opponent, dummySetTurn, dummyAudio)) {
                    return true;
                }
            }
        }
    }
    return false;
}

export function isKingSafeAfterMove(board, turn) {
    // Find king's position for the current turn.
    const kingPos = findKing(board, turn);
    if (!kingPos) return false;
    // If any enemy piece can move to the king's square, the king is in check.
    return !isSquareAttacked(board, kingPos, turn);
}

export function inCheckmate(board, turn) {
    // If the king is not in check, it can't be checkmate.
    if (isKingSafeAfterMove(board, turn)) return false;

    // Iterate over every square looking for a piece belonging to "turn"
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[r].length; c++) {
            const piece = board[r][c];
            if (piece.name[0] !== (turn === 'white' ? 'W' : 'B')) continue;

            // Try every possible destination square.
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    // Use dummy functions for audio/setTurn parameters.
                    const dummyAudio = { play: () => {} };
                    const dummySetTurn = () => {};

                    // If move is valid for this piece...
                    if (
                        FindValidMoves(
                            { piece: piece.emoji, row: r, col: c, name: piece.name },
                            row,
                            col,
                            board,
                            turn,
                            dummySetTurn,
                            dummyAudio
                        )
                    ) {
                        // Create a deep copy of the board and simulate the move.
                        const simBoard = JSON.parse(JSON.stringify(board));
                        simBoard[row][col] = simBoard[r][c];
                        simBoard[r][c] = { emoji: ' ', name: 'empty' };

                        // If after this move the king is safe then it's not checkmate.
                        if (isKingSafeAfterMove(simBoard, turn)) {
                            return false;
                        }
                    }
                }
            }
        }
    }
    // No legal moves can resolve the check.
    return true;
}