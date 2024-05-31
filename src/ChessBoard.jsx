import React, {useEffect, useState} from 'react';
import './ChessBoard.css';
import * as chessPieces from './assets/index.js'
import { moveSound } from './assets/exportSound.js'

/*

NOTE: turn set to white for debugging
reset button is not well tested - don't trust it.

TODO:
add arrows on right click
Add piece style chooser drop down menu.
Add Valid Move Shower For Beginners.

en passant
king checks
checkmate detection
castling

pins - don't allow the king to move if it's in check

forks - attack two pieces at once

dont allow the king to move to a square that is attacked by the opponent

notation system
*/

function ChessBoard() {
    const audio = new Audio(moveSound); // sound for moving pieces
    
    const [board, setBoard] = useState(() => InitializeBoard());
    const [selectedPiece, setSelectedPiece] = useState({piece: ' ', row: -1, col: -1, name: 'empty'});
    const [turn, setTurn] = useState('white');
    let color = 'white';
    turn == 'white' ? color = 'rgb(104, 121, 214)' : color = 'darkblue';
    const [playAs, setPlayAs] = useState('rotate(0deg)');
    // const [pieceStyle, setPieceStyle] = useState(0);
    return (
        <>
            <div className='game-display'>
                <div className="chess-board" style={{transform: playAs}}>
                    <RenderBoard selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece}
                    board={board} setBoard={setBoard} turn={turn} setTurn={setTurn} 
                    playAs={playAs} audio={audio}/>
                </div>
                <div className='buttons'>
                    <button className='toggle-btn' onClick={() => {
                        playAs === 'rotate(180deg)' 
                        ? setPlayAs('rotate(0deg)') 
                        : setPlayAs('rotate(180deg)');
                    }}>🔃</button>
                    <button className='reset-btn' onClick={() => {
                        setBoard(InitializeBoard());
                        setTurn('white');
                        setSelectedPiece({piece: ' ', row: -1, col: -1, name: 'empty'});
                    }}>🔄</button>
                </div>
                <table className='move-table'>
                    <tbody>
                        <tr className='title'>
                            <th>Move</th>
                            <th>White</th>
                            <th>Black</th>
                        </tr>
                    </tbody>
                    <tbody className='move-history'>
                        <tr className='move'>
                            <td>1</td>
                            <td>e4</td>
                            <td>e5</td>
                        </tr>
                        <tr className='move'>
                            <td>2</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id='info'>
                <label id='turn-variable'>Turn: </label>
                <h1 id='turn-variable' style={{color: color}}>{turn}</h1>
            </div>
        </>
    );
}

export default ChessBoard;

function RenderBoard({selectedPiece, setSelectedPiece, board, setBoard, turn, setTurn, playAs, audio}) {
    const [squares, setSquares] = useState([]);
    let classColor = 'White-Square';
    useEffect(() => {
        let newSquares = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                ((j - i) % 2) === 0 ? classColor = "White-Square" : classColor = "Black-Square";
                newSquares.push(<button
                    style={{transform: playAs}}
                    id='Squares' 
                    className={classColor}
                    key={`${i}-${j}`}
                    draggable={true}
                    onDragStart={(e) => {
                        e.dataTransfer.effectAllowed = "move";
                        setSelectedPiece({piece: board[i][j].emoji, row:i, col:j, name: board[i][j].name});
                    }}
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = "move";
                    }}
                    onDrop={() => {MakeAMove(selectedPiece, i, j, setBoard, board, setSelectedPiece, turn, setTurn, audio);}}
                    onClick={() => {
                            console.log(i, j, board[i][j].name, board[i][j].coordinate);
                            // only select a piece if it's the right turn
                            if (turn === 'white' && board[i][j].name[0] === 'W'){
                                setSelectedPiece({piece: board[i][j].emoji, row:i, col:j, name: board[i][j].name});
                            }
                            else if (turn === 'black' && board[i][j].name[0] === 'B'){
                                setSelectedPiece({piece: board[i][j].emoji, row:i, col:j, name: board[i][j].name});
                            }
                            else if ((turn === 'white' && board[i][j].name[0] !== 'W') 
                                || (turn === 'black' && board[i][j].name[0] !== 'B')
                            ){ // then make a move
                                MakeAMove(selectedPiece, i, j, setBoard, board, setSelectedPiece, turn, setTurn, audio);
                            }
                        }
                    }
                    onContextMenu={(e) => {
                        e.preventDefault();
                        console.log('right click at position: ', board[i][j].coordinate);
                        e.currentTarget.classList.add('right-clicked');
                    }}
                > <img src={chessPieces[board[i][j].name]} alt={board[i][j].emoji} />
                </button>);
            }
        }
        setSquares(newSquares);
    }, [board, selectedPiece, playAs]);
    return squares;
}

function MakeAMove(selectedPiece, goToRow, goToCol, setBoard, board, setSelectedPiece, turn, setTurn, audio){
    let isValidPieceMove = FindValidMoves(selectedPiece, goToRow, goToCol, board, turn, setTurn, audio);
    let newBoard = board;
    if (isValidPieceMove){
        if (selectedPiece.name[0] === 'W' && board[goToRow][goToCol].name[0] === 'W'){
            // if white captures white piece, return
            setSelectedPiece({emoji: ' ',row: -1, col: -1, name: 'empty'});
            return;
        }
        else if (selectedPiece.name[0] === 'B' && board[goToRow][goToCol].name[0] === 'B'){
            // if black captures black piece, return
            setSelectedPiece({emoji: ' ', row: -1, col: -1, name: 'empty'});
            return;
        }
        else { // if it's a valid move
            audio.play();
            newBoard[selectedPiece.row][selectedPiece.col] = {emoji: ' ', name: 'empty'}; // remove the piece from the old square
            newBoard[goToRow][goToCol] = {emoji: selectedPiece.piece, name: selectedPiece.name}; // place the piece in the new square
            setSelectedPiece({emoji: ' ',row: -1, col: -1, name: 'empty'}); // remove the selected piece
        }
    }
    else if (!isValidPieceMove){
        // remove selected piece if invalid move
        setSelectedPiece({emoji: ' ',row: -1, col: -1, name: 'empty'});
        return;
    } 
    // if invalid move then don't change turn.
    switchTurn(turn, setTurn);
    setBoard(newBoard);
}

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


// this function moves the selected piece to the square that was clicked
// and sets the board to new board with right piece in right place
function FindValidMoves(selectedPiece, goToRow, goToCol, board, turn, setTurn, audio){
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
                if (goToRow === 0){ // promote the pawn
                    audio.play();
                    board[goToRow][goToCol] = {emoji: pieces.Wqueen.emoji, name: pieces.Wqueen.name};
                    board[selectedPiece.row][selectedPiece.col] = {emoji: ' ', name: 'empty'};
                    switchTurn(turn, setTurn);
                    break; // return false because the pawn has been promoted
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
                if (goToRow === 7){ // promote the pawn
                    audio.play();
                    board[goToRow][goToCol] = {emoji: pieces.Bqueen.emoji, name: pieces.Bqueen.name};
                    board[selectedPiece.row][selectedPiece.col] = {emoji: ' ', name: 'empty'};
                    switchTurn(turn, setTurn);
                    break; // return false because the pawn has been promoted
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

function Pieces(){
    const pieces = {
        Bpawn: { emoji: '♟', name: 'Bpawn' },
        Brook: { emoji: '♜', name: 'Brook' },
        Bknight: { emoji: '♞', name: 'Bknight' },
        Bbishop: { emoji: '♝', name: 'Bbishop' },
        Bqueen: { emoji: '♛', name: 'Bqueen' },
        Bking: { emoji: '♚', name: 'Bking' },
        Wpawn: { emoji: '♙', name: 'Wpawn' },
        Wrook: { emoji: '♖', name: 'Wrook' },
        Wknight: { emoji: '♘', name: 'Wknight' },
        Wbishop: { emoji: '♗', name: 'Wbishop' },
        Wqueen: { emoji: '♕', name: 'Wqueen' },
        Wking: { emoji: '♔', name: 'Wking' }
    };
    return pieces;
}

function InitializeBoard() {
    let board = [
        [{emoji: '♜', name: 'Brook', coordinate: 'a8'}, {emoji: '♞', name: 'Bknight', coordinate: 'b8'}, {emoji: '♝', name: 'Bbishop', coordinate: 'c8'}, {emoji: '♛', name: 'Bqueen', coordinate: 'd8'}, {emoji: '♚', name: 'Bking', coordinate: 'e8'}, {emoji: '♝', name: 'Bbishop', coordinate: 'f8'}, {emoji: '♞', name: 'Bknight', coordinate: 'g8'}, {emoji: '♜', name: 'Brook', coordinate: 'h8'}],
        [{emoji: '♟', name: 'Bpawn', coordinate: 'a7'}, {emoji: '♟', name: 'Bpawn', coordinate: 'b7'}, {emoji: '♟', name: 'Bpawn', coordinate: 'c7'}, {emoji: '♟', name: 'Bpawn', coordinate: 'd7'}, {emoji: '♟', name: 'Bpawn', coordinate: 'e7'}, {emoji: '♟', name: 'Bpawn', coordinate: 'f7'}, {emoji: '♟', name: 'Bpawn', coordinate: 'g7'}, {emoji: '♟', name: 'Bpawn', coordinate: 'h7'}],
        [{emoji: ' ', name: 'empty', coordinate: 'a6'}, {emoji: ' ', name: 'empty', coordinate: 'b6'}, {emoji: ' ', name: 'empty', coordinate: 'c6'}, {emoji: ' ', name: 'empty', coordinate: 'd6'}, {emoji: ' ', name: 'empty', coordinate: 'e6'}, {emoji: ' ', name: 'empty', coordinate: 'f6'}, {emoji: ' ', name: 'empty', coordinate: 'g6'}, {emoji: ' ', name: 'empty', coordinate: 'h6'}],
        [{emoji: ' ', name: 'empty', coordinate: 'a5'}, {emoji: ' ', name: 'empty', coordinate: 'b5'}, {emoji: ' ', name: 'empty', coordinate: 'c5'}, {emoji: ' ', name: 'empty', coordinate: 'd5'}, {emoji: ' ', name: 'empty', coordinate: 'e5'}, {emoji: ' ', name: 'empty', coordinate: 'f5'}, {emoji: ' ', name: 'empty', coordinate: 'g5'}, {emoji: ' ', name: 'empty', coordinate: 'h5'}],
        [{emoji: ' ', name: 'empty', coordinate: 'a4'}, {emoji: ' ', name: 'empty', coordinate: 'b4'}, {emoji: ' ', name: 'empty', coordinate: 'c4'}, {emoji: ' ', name: 'empty', coordinate: 'd4'}, {emoji: ' ', name: 'empty', coordinate: 'e4'}, {emoji: ' ', name: 'empty', coordinate: 'f4'}, {emoji: ' ', name: 'empty', coordinate: 'g4'}, {emoji: ' ', name: 'empty', coordinate: 'h4'}],
        [{emoji: ' ', name: 'empty', coordinate: 'a3'}, {emoji: ' ', name: 'empty', coordinate: 'b3'}, {emoji: ' ', name: 'empty', coordinate: 'c3'}, {emoji: ' ', name: 'empty', coordinate: 'd3'}, {emoji: ' ', name: 'empty', coordinate: 'e3'}, {emoji: ' ', name: 'empty', coordinate: 'f3'}, {emoji: ' ', name: 'empty', coordinate: 'g3'}, {emoji: ' ', name: 'empty', coordinate: 'h3'}],
        [{emoji: '♙', name: 'Wpawn', coordinate: 'a2'}, {emoji: '♙', name: 'Wpawn', coordinate: 'b2'}, {emoji: '♙', name: 'Wpawn', coordinate: 'c2'}, {emoji: '♙', name: 'Wpawn', coordinate: 'd2'}, {emoji: '♙', name: 'Wpawn', coordinate: 'e2'}, {emoji: '♙', name: 'Wpawn', coordinate: 'f2'}, {emoji: '♙', name: 'Wpawn', coordinate: 'g2'}, {emoji: '♙', name: 'Wpawn', coordinate: 'h2'}],
        [{emoji: '♖', name: 'Wrook', coordinate: 'a1'}, {emoji: '♘', name: 'Wknight', coordinate: 'b1'}, {emoji: '♗', name: 'Wbishop', coordinate: 'c1'}, {emoji: '♕', name: 'Wqueen', coordinate: 'd1'}, {emoji: '♔', name: 'Wking', coordinate: 'e1'}, {emoji: '♗', name: 'Wbishop', coordinate: 'f1'}, {emoji: '♘', name: 'Wknight', coordinate: 'g1'}, {emoji: '♖', name: 'Wrook', coordinate: 'h1'}]
    ];
    return board;
}

function switchTurn(turn, setTurn){
    if (turn === 'white'){
        setTurn('black');
    }
    else if (turn === 'black'){
        setTurn('white');
    }
}