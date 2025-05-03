import React, { useState, useEffect } from 'react';
import * as chessPieces from '../assets/index.js';
import { MakeAMove } from '../utils/MakeMove.js';
import { useChess } from '../context/ChessProvider.jsx';

const Square = ({ row, col, classColor }) => {
    const { setMoveTo, setMoveFrom, playAs, board, 
            setSelectedPiece, selectedPiece, setBoard,
            turn, setTurn, audio, setUserMove,
            setHistory } = useChess();

    const [dragging, setDragging] = useState(false);
    const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (event) => {
        event.preventDefault();
        // Start drag if there's a piece to drag
        if (board[row][col].name !== 'empty') {
            setMoveFrom(board[row][col].coordinate);
            setSelectedPiece({
                piece: board[row][col].emoji,
                row: row,
                col: col,
                name: board[row][col].name
            });
            setOffset({
                x: event.clientX,
                y: event.clientY
            });
            setDragging(true);
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
        setMoveTo(board[row][col].coordinate);
        setUserMove(board[row][col].coordinate);
        MakeAMove(selectedPiece, row, col, setBoard, board, setSelectedPiece, turn, setTurn, audio);
    };

    useEffect(() => {
        const handleGlobalMouseMove = (event) => {
            if (!dragging) return;
            setDragPos({
                x: event.clientX - offset.x,
                y: event.clientY - offset.y
            });
        };

        if (dragging) {
            window.addEventListener('mousemove', handleGlobalMouseMove);
        }
        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
        };
    }, [dragging, offset]);


    return (
        <button
            style={{ transform: playAs }}
            className={`${classColor} Squares`}
            key={`${row}-${col}`} // for react to identify the square
            draggable={false}
            onClick = {async (event) => {
                event.preventDefault();
                if (turn === 'white' && board[row][col].name[0] === 'W' || turn === 'black' && board[row][col].name[0] === 'B') {
                    setMoveFrom(board[row][col].coordinate);
                    setSelectedPiece({ piece: board[row][col].emoji, row: row, col: col, name: board[row][col].name });
                } else if ((turn === 'white' && board[row][col].name[0] !== 'W') || (turn === 'black' && board[row][col].name[0] !== 'B')) {
                    setMoveTo(board[row][col].coordinate);
                    setUserMove(board[row][col].coordinate);
                    const moveWasValid = MakeAMove(selectedPiece, row, col, setBoard, board, setSelectedPiece, turn, setTurn, audio);
                    if (moveWasValid && selectedPiece.name !== 'empty') {
                        const move = `${selectedPiece.name} ${selectedPiece.row}${selectedPiece.col} ${row}${col}`;
                        setHistory((prevHistory) => [...prevHistory, move]);
                        console.log("User's move logging in history: ", move);
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
            <img className='chess-piece' src={chessPieces[board[row][col].name]} alt={board[row][col].emoji} />
        )}
        </button>
    );
};

export default Square;