import React, {useEffect, useState} from 'react';
import './ChessBoard.css'


function ChessBoard() {
    const [selectedPiece, setSelectedPiece] = useState({piece: ' ', row: -1, col: -1, name: 'empty'});
    const [board, setBoard] = useState(() => InitializeBoard());
    const [turn, setTurn] = useState('white');
    let color = 'white';
    turn == 'white' ? color = 'rgb(104, 121, 214)' : color = 'darkblue';
    return (
        <>    
            <div className="chess-board">
                <RenderBoard selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece}
                board={board} setBoard={setBoard} turn={turn} setTurn={setTurn}/>
            </div>
            <div id='info'>
                <label id='turn-variable'>Turn: </label>
                <h1 id='turn-variable' style={{color: color}}>{turn}</h1>
            </div>
        </>
    );
}

/*

work on promotion square
king checks
checkmate detection

block attacks - don't allow piece teleportation over other pieces

pins - don't allow the king to move if it's in check
forks - attack two pieces at once
dont allow the king to move to a square that is attacked by the opponent
castling
en passant

*/

export default ChessBoard;

function RenderBoard({selectedPiece, setSelectedPiece, board, setBoard, turn, setTurn}) {
    const [squares, setSquares] = useState([]);
    let classColor = 'White-Square';
    useEffect(() => {
        let newSquares = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                ((j - i) % 2) === 0 ? classColor = "White-Square" : classColor = "Black-Square";
                newSquares.push(<button 
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
                    onDrop={() => {MakeAMove(selectedPiece, i, j, setBoard, board, setSelectedPiece, turn, setTurn);}}
                    onClick= {() => {
                        console.log(i, j, board[i][j].name)
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
                        MakeAMove(selectedPiece, i, j, setBoard, board, setSelectedPiece, turn, setTurn);
                    }
                }
            }>
                    {board[i][j].emoji}
                </button>);
            }
        }
        setSquares(newSquares);
    }, [board, selectedPiece]);
    return squares;
}

function MakeAMove(selectedPiece, goToRow, goToCol, setBoard, board, setSelectedPiece, turn, setTurn){
    let isValidPieceMove = FindValidMoves(selectedPiece, goToRow, goToCol, setBoard, board, setSelectedPiece, turn, setTurn);
    let newBoard = board;
    if (isValidPieceMove){
        if (selectedPiece.name[0] === 'W' && board[goToRow][goToCol].name[0] === 'W'){
            // if trying to capture your own piece, return
            setSelectedPiece({emoji: ' ',row: -1, col: -1, name: 'empty'});
            return;
        }
        else if (selectedPiece.name[0] === 'B' && board[goToRow][goToCol].name[0] === 'B'){
            // if trying to capture your own piece, return
            setSelectedPiece({emoji: ' ', row: -1, col: -1, name: 'empty'});
            return;
        }
        else {
            newBoard[selectedPiece.row][selectedPiece.col] = {emoji: ' ', name: 'empty'};
            newBoard[goToRow][goToCol] = {emoji: selectedPiece.piece, name: selectedPiece.name};
        }
    }
    else if (!isValidPieceMove){return;}
    if (turn === 'white') {
        setTurn('black');
    }
    else {
        setTurn('white');
    }
    setSelectedPiece({emoji: ' ',row: -1, col: -1, name: 'empty'});
    setBoard(newBoard);
}




// this function moves the selected piece to the square that was clicked
// and sets the board to new board with right piece in right place
function FindValidMoves(selectedPiece, goToRow, goToCol, setBoard, board, setSelectedPiece, turn, setTurn){
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
                if (goToRow === 0){
                    board[goToRow][goToCol] = {emoji: pieces.Wqueen.emoji, name: pieces.Wqueen.name};
                    board[selectedPiece.row][selectedPiece.col] = {emoji: ' ', name: 'empty'};
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
                if (goToRow === 0){
                    board[goToRow][goToCol] = {emoji: pieces.Wqueen.emoji, name: pieces.Wqueen.name};
                    board[selectedPiece.row][selectedPiece.col] = {emoji: ' ', name: 'empty'};
                }
            }
            break;
        case pieces.Wrook.emoji:
            // if moving to the same row or col, let it move
            if (goToRow === selectedPiece.row || goToCol === selectedPiece.col){
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
                isValidPieceMove = true;
            }
            break;
        case pieces.Wqueen.emoji:
            if (goToRow + goToCol === selectedPiece.row + selectedPiece.col
                || goToRow - goToCol === selectedPiece.row - selectedPiece.col
                || (goToRow === selectedPiece.row || goToCol === selectedPiece.col)
            ){
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
                if (goToRow === 7){
                    board[goToRow][goToCol] = {emoji: pieces.Bqueen.emoji, name: pieces.Bqueen.name};
                    board[selectedPiece.row][selectedPiece.col] = {emoji: ' ', name: 'empty'};
                }
                isValidPieceMove = true;
            }
            else if((((selectedPiece.row + 1 === goToRow) 
                && (selectedPiece.col + 1 === goToCol 
                || selectedPiece.col - 1 === goToCol)  && (board[goToRow][goToCol].name[0] === 'W')
                ))){
                if (goToRow === 7){
                    board[goToRow][goToCol] = {emoji: pieces.Bqueen.emoji, name: pieces.Bqueen.name};
                    board[selectedPiece.row][selectedPiece.col] = {emoji: ' ', name: 'empty'};
                }
                isValidPieceMove = true;
            }
            break;
        case pieces.Brook.emoji:
            if (goToRow === selectedPiece.row || goToCol === selectedPiece.col){
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
                isValidPieceMove = true;
            }
            break;
        case pieces.Bqueen.emoji:
            if (goToRow + goToCol === selectedPiece.row + selectedPiece.col
                || goToRow - goToCol === selectedPiece.row - selectedPiece.col
                || (goToRow === selectedPiece.row || goToCol === selectedPiece.col)
            ){
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
        [{emoji: '♜', name: 'Brook'}, {emoji: '♞', name: 'Bknight'}, {emoji: '♝', name: 'Bbishop'}, {emoji: '♛', name: 'Bqueen'}, {emoji: '♚', name: 'Bking'}, {emoji: '♝', name: 'Bbishop'}, {emoji: '♞', name: 'Bknight'}, {emoji: '♜', name: 'Brook'}],
        [{emoji: '♟', name: 'Bpawn'}, {emoji: '♟', name: 'Bpawn'}, {emoji: '♟', name: 'Bpawn'}, {emoji: '♟', name: 'Bpawn'}, {emoji: '♟', name: 'Bpawn'}, {emoji: '♟', name: 'Bpawn'}, {emoji: '♟', name: 'Bpawn'}, {emoji: '♟', name: 'Bpawn'}],
        [{emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}],
        [{emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}],
        [{emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}],
        [{emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}, {emoji: ' ', name: 'empty'}],
        [{emoji: '♙', name: 'Wpawn'}, {emoji: '♙', name: 'Wpawn'}, {emoji: '♙', name: 'Wpawn'}, {emoji: '♙', name: 'Wpawn'}, {emoji: '♙', name: 'Wpawn'}, {emoji: '♙', name: 'Wpawn'}, {emoji: '♙', name: 'Wpawn'}, {emoji: '♙', name: 'Wpawn'}],
        [{emoji: '♖', name: 'Wrook'}, {emoji: '♘', name: 'Wknight'}, {emoji: '♗', name: 'Wbishop'}, {emoji: '♕', name: 'Wqueen'}, {emoji: '♔', name: 'Wking'}, {emoji: '♗', name: 'Wbishop'}, {emoji: '♘', name: 'Wknight'}, {emoji: '♖', name: 'Wrook'}]
    ];
    return board;
}
