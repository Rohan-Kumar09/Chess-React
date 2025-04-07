import { Pieces, switchTurn } from './Utils.js'; // function for returning piece types and switching turns

// PreCondition: selectedPiece is a valid piece
// PostCondition: returns true if the piece move is valid, false otherwise
export function FindValidMoves(selectedPiece, goToRow, goToCol, board, turn, setTurn, audio){
    // NOTE: out of bound errors can never happen because the board is 8x8
    // it's impossible to go out of bounds
    if (goToRow === selectedPiece.row && goToCol === selectedPiece.col) return false;
    if (turn == 'white' && selectedPiece.name[0] != 'W') return false;
    if (turn == 'black' && selectedPiece.name[0] != 'B') return false;
    const pieces = Pieces();
    let isValidPieceMove = false;
    switch(selectedPiece.piece){
        // white pieces
        case pieces.Wpawn.emoji:
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
            }
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