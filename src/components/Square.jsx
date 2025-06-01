import * as chessPieces from '../assets/index.js';
import { MakeAMove } from '../utils/MakeMove.js';
import { useChess } from '../context/ChessProvider.jsx';

const Square = ({ row, col, classColor }) => {
    const { 
        setMoveTo, 
        setMoveFrom, 
        playAs, 
        board,
        setSelectedPiece, 
        selectedPiece, 
        setBoard,
        turn, 
        setTurn, 
        audio, 
        setUserMove,
        setHistory, 
        setIsGameOver, 
        setWinner 
    } = useChess();

    const handleDragStart = (e) => {
        setMoveFrom(board[row][col].coordinate);
        setSelectedPiece({ piece: board[row][col].emoji, row, col, name: board[row][col].name });
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', '');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setMoveTo(board[row][col].coordinate);
        setUserMove(board[row][col].coordinate);
        const { checkmate, validMove } = MakeAMove(selectedPiece, row, col, setBoard, board, setSelectedPiece, turn, setTurn, audio);
        if (validMove && selectedPiece.name !== 'empty') {
            const move = [selectedPiece.name, 
                            board[selectedPiece.row][selectedPiece.col].coordinate, 
                            board[row][col].coordinate];
            setHistory((prevHistory) => [...prevHistory, move]);
            console.log("User's move logging in history: ", move);
        }
        if (checkmate) {
            setIsGameOver(true);
            setWinner('Player');
            console.log("Checkmate! Player Won.");
            return;
        }
    };

    return (
        <button
            // Allow drops and show move cursor, not copy
            onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }}
            onDrop={handleDrop}
            style={{ transform: playAs }}
            className={`${classColor} Squares`}
            key={`${row}-${col}`} // for React identification
            onClick = {async (event) => {
                event.preventDefault();
                if (turn === 'white' && board[row][col].name[0] === 'W' || turn === 'black' && board[row][col].name[0] === 'B') {
                    setMoveFrom(board[row][col].coordinate);
                    setSelectedPiece({ piece: board[row][col].emoji, row: row, col: col, name: board[row][col].name });
                } else if ((turn === 'white' && board[row][col].name[0] !== 'W') || (turn === 'black' && board[row][col].name[0] !== 'B')) {
                    setMoveTo(board[row][col].coordinate);
                    setUserMove(board[row][col].coordinate);
                    const { checkmate, validMove } = MakeAMove(selectedPiece, row, col, setBoard, board, setSelectedPiece, turn, setTurn, audio);
                    if (validMove && selectedPiece.name !== 'empty') {
                        const move = [selectedPiece.name, 
                                     board[selectedPiece.row][selectedPiece.col].coordinate, 
                                     board[row][col].coordinate];
                        setHistory((prevHistory) => [...prevHistory, move]);
                        console.log("User's move logging in history: ", move);
                    }

                    if (checkmate) {
                        setIsGameOver(true);
                        setWinner('Player');
                        console.log("Checkmate! Player Won.");
                        return;
                    }
                }
            }}
            onContextMenu={( event ) => {
                // Right click event
                event.preventDefault();
                if (event.currentTarget.style.backgroundColor === 'red') {
                    if (classColor === 'White-Square') {
                        let element = document.querySelector('.White-Square');
                        let style = window.getComputedStyle(element);
                        event.currentTarget.style.backgroundColor = style.backgroundColor;
                    } else if (classColor === 'Black-Square') {
                        let element = document.querySelector('.Black-Square');
                        let style = window.getComputedStyle(element);
                        event.currentTarget.style.backgroundColor = style.backgroundColor;
                    }
                } else {
                    event.currentTarget.style.backgroundColor = 'red';
                }
            }}
        >
        {board[row][col].name !== 'empty' && (
            <img
                className='chess-piece'
                src={chessPieces[board[row][col].name]}
                alt={board[row][col].emoji}
                draggable={true}
                onDragStart={handleDragStart}
            />
        )}
        </button>
    );
};

export default Square;