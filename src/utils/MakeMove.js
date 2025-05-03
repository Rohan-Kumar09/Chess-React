import { FindValidMoves, inCheckmate, isSquareAttacked } from './ValidMoves.js'; // function for finding valid piece moves
import { Pieces, switchTurn } from './Utils.js'; // function for returning piece types and switching turns

// PreCondition: selectedPiece is a valid piece
// PostCondition: moves the selected piece to the goToRow and goToCol
//                Switches turn to other player's turn and sets the new board
//                Promotes pawns if they reach the end of the board
//                Returns true if the move resulted in checkmate, false otherwise.
let gameOver = false;
export function MakeAMove(selectedPiece, goToRow, goToCol, setBoard, board, setSelectedPiece, turn, setTurn, audio) {

    // Use a deep copy to avoid modifying the original state directly before setBoard
    let newBoard = JSON.parse(JSON.stringify(board));
    const pieces = Pieces();

    if (inCheckmate(newBoard, turn === 'white' ? 'black' : 'white')) {
        gameOver = true;
        return true;
    }

    // Reset lastMovedTwo flag for all pawns of current player's color
    for (let r = 0; r < newBoard.length; r++) {
        for (let c = 0; c < newBoard[r].length; c++) { // Corrected loop condition
            const square = newBoard[r][c];
            if (square && square.name === `${turn === 'white' ? 'W' : 'B'}pawn`) {
                square.lastMovedTwo = false;
            }
        }
    }

    // Check if the move is valid according to piece rules
    if(!FindValidMoves(selectedPiece, goToRow, goToCol, board, turn, setTurn, audio)){
        // Reset selected piece if invalid move
        setSelectedPiece({emoji: ' ', row: -1, col: -1, name: 'empty'});
        return false;
    }

    // Check for friendly fire
    if (selectedPiece.name[0] === 'W' && board[goToRow][goToCol].name[0] === 'W' || 
        selectedPiece.name[0] === 'B' && board[goToRow][goToCol].name[0] === 'B'){
        setSelectedPiece({emoji: ' ', row: -1, col: -1, name: 'empty'});
        return false;
    }
    
    // The move is valid, apply it to the new board
    audio.play();
    const originalPiece = newBoard[selectedPiece.row][selectedPiece.col];
    
    // Clear the original square
    newBoard[selectedPiece.row][selectedPiece.col] = {
        emoji: ' ', 
        name: 'empty', 
        coordinate: board[selectedPiece.row][selectedPiece.col].coordinate
    };
    
    // Move to the new square, preserving hasMoved status if it exists
    newBoard[goToRow][goToCol] = {
        emoji: selectedPiece.piece, 
        name: selectedPiece.name, 
        coordinate: board[goToRow][goToCol].coordinate,
        // Set hasMoved to true if this is a king or rook
        hasMoved: selectedPiece.name === 'Wking' || selectedPiece.name === 'Bking' || 
                  selectedPiece.name === 'Wrook' || selectedPiece.name === 'Brook' ? 
                  (originalPiece.hasMoved || true) : undefined
    };

    // Handle en passant capture
    if (selectedPiece.name === 'Wpawn' && 
        selectedPiece.row === 3 && // White pawn on 5th rank (row 3 in zero-based)
        goToRow === 2 && // Moving to 6th rank
        (goToCol === selectedPiece.col - 1 || goToCol === selectedPiece.col + 1) && // Moving diagonally
        board[goToRow][goToCol].name === 'empty') { // Destination square is empty (en passant capture)
        
        // Remove the captured pawn
        newBoard[selectedPiece.row][goToCol] = {
            emoji: ' ',
            name: 'empty',
            coordinate: board[selectedPiece.row][goToCol].coordinate
        };
    } 
    else if (selectedPiece.name === 'Bpawn' && 
            selectedPiece.row === 4 && // Black pawn on 4th rank (row 4 in zero-based)
            goToRow === 5 && // Moving to 3rd rank
            (goToCol === selectedPiece.col - 1 || goToCol === selectedPiece.col + 1) && // Moving diagonally
            board[goToRow][goToCol].name === 'empty') { // Destination square is empty (en passant capture)
        
        // Remove the captured pawn
        newBoard[selectedPiece.row][goToCol] = {
            emoji: ' ',
            name: 'empty',
            coordinate: board[selectedPiece.row][goToCol].coordinate
        };
    }

    // Mark pawns that moved two squares for en passant
    if (selectedPiece.name === 'Wpawn' && selectedPiece.row === 6 && goToRow === 4) {
        newBoard[goToRow][goToCol].lastMovedTwo = true;
    }
    else if (selectedPiece.name === 'Bpawn' && selectedPiece.row === 1 && goToRow === 3) {
        newBoard[goToRow][goToCol].lastMovedTwo = true;
    }

    // Handle Castling Rook Move
    // White Kingside Castle (O-O)
    if (selectedPiece.name === 'Wking' && selectedPiece.row === 7 && selectedPiece.col === 4 && goToCol === 6) {
        // Move the h1 rook to f1
        newBoard[7][5] = { ...newBoard[7][7], coordinate: 'f1', hasMoved: true };
        newBoard[7][7] = { emoji: ' ', name: 'empty', coordinate: 'h1' };
    }
    // White Queenside Castle (O-O-O)
    else if (selectedPiece.name === 'Wking' && selectedPiece.row === 7 && selectedPiece.col === 4 && goToCol === 2) {
        // Move the a1 rook to d1
        newBoard[7][3] = { ...newBoard[7][0], coordinate: 'd1', hasMoved: true };
        newBoard[7][0] = { emoji: ' ', name: 'empty', coordinate: 'a1' };
    }
    // Black Kingside Castle (o-o)
    else if (selectedPiece.name === 'Bking' && selectedPiece.row === 0 && selectedPiece.col === 4 && goToCol === 6) {
        // Move the h8 rook to f8
        newBoard[0][5] = { ...newBoard[0][7], coordinate: 'f8', hasMoved: true };
        newBoard[0][7] = { emoji: ' ', name: 'empty', coordinate: 'h8' };
    }
    // Black Queenside Castle (o-o-o)
    else if (selectedPiece.name === 'Bking' && selectedPiece.row === 0 && selectedPiece.col === 4 && goToCol === 2) {
        // Move the a8 rook to d8
        newBoard[0][3] = { ...newBoard[0][0], coordinate: 'd8', hasMoved: true };
        newBoard[0][0] = { emoji: ' ', name: 'empty', coordinate: 'a8' };
    }
    
    // Handle pawn promotion
    if (selectedPiece.name === 'Wpawn' && goToRow === 0){
        newBoard[goToRow][goToCol] = {
            emoji: pieces.Wqueen.emoji, 
            name: pieces.Wqueen.name, 
            coordinate: newBoard[goToRow][goToCol].coordinate
        };
    }
    else if (selectedPiece.name === 'Bpawn' && goToRow === 7){
        newBoard[goToRow][goToCol] = {
            emoji: pieces.Bqueen.emoji, 
            name: pieces.Bqueen.name, 
            coordinate: newBoard[goToRow][goToCol].coordinate
        };
    }
    
    // Reset selected piece
    setSelectedPiece({emoji: ' ', row: -1, col: -1, name: 'empty'});
    setBoard(newBoard);
    switchTurn(turn, setTurn);
    return true;
}