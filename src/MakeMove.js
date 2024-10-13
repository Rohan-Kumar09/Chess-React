import { FindValidMoves } from './ValidMoves.js'; // function for finding valid piece moves
import { switchTurn } from './SwitchTurn.js'; // function for switching turn
import { Pieces } from './InitializeBoard.js'; // function for returning piece types

// PreCondition: selectedPiece is a valid piece
// PostCondition: moves the selected piece to the goToRow and goToCol
//                Switches turn to other player's turn and sets the new board
//                Promotes pawns if they reach the end of the board
export function MakeAMove(selectedPiece, goToRow, goToCol, setBoard, board, setSelectedPiece, turn, setTurn, audio){
    let isValidPieceMove = FindValidMoves(selectedPiece, goToRow, goToCol, board, turn, setTurn, audio);
    let newBoard = board;
    const pieces = Pieces();
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
            newBoard[selectedPiece.row][selectedPiece.col] = {emoji: ' ', name: 'empty', coordinate: board[selectedPiece.row][selectedPiece.col].coordinate}; // remove the piece from the old square
            newBoard[goToRow][goToCol] = {emoji: selectedPiece.piece, name: selectedPiece.name, coordinate: board[goToRow][goToCol].coordinate}; // place the piece in the new square

            if (selectedPiece.name === 'Wpawn' && goToRow === 0){ // if white pawn on promotion square
                board[goToRow][goToCol] = {emoji: pieces.Wqueen.emoji, name: pieces.Wqueen.name}; // promote the pawn to a queen
            }
            else if (selectedPiece.name === 'Bpawn' && goToRow === 7){ // if black pawn on promotion square
                board[goToRow][goToCol] = {emoji: pieces.Bqueen.emoji, name: pieces.Bqueen.name}; // promote the pawn to a queen
            }
            setSelectedPiece({emoji: ' ',row: -1, col: -1, name: 'empty'}); // remove the selected piece
        }
    }
    else if (!isValidPieceMove){
        // remove selected piece if invalid move
        setSelectedPiece({emoji: ' ',row: -1, col: -1, name: 'empty'});
        return; // if invalid move then don't change turn.
    } 
    switchTurn(turn, setTurn);
    setBoard(newBoard);
}