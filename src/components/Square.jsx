import React, { useState, useEffect } from 'react';
import * as chessPieces from '../assets/index.js';
import { MakeAMove } from '../utils/MakeMove.js';
import { useChess } from '../context/ChessProvider.jsx';

const Square = ({ row, col, classColor }) => {
    const { setMoveTo, setMoveFrom, playAs, board, 
            setSelectedPiece, selectedPiece, setBoard,
            turn, setTurn, audio, setUserMove } = useChess();

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
    }, [dragging, offset, board, row, col, selectedPiece, setBoard, turn, setTurn, audio, setMoveTo, setUserMove, setSelectedPiece]);


    return (
        <button
            style={{ transform: playAs }}
            id='Squares'
            className={classColor}
            key={`${row}-${col}`} // for react to identify the square
            draggable={false}
            // onMouseDown={handleMouseDown}
            // onMouseUp={handleMouseUp}
            // onDragStart={(event) => event.preventDefault()} // prevent drag start
            // onDragOver={(event) => event.preventDefault()} // prevent drag over
            // onDrop={(event) => {
            //     event.preventDefault();
            //     setDragging(false); // ensure dragging state is reset
            // }}

            
            // onDragStart={( event ) => {
            //     event.dataTransfer.effectAllowed = "move";
            //     setSelectedPiece({ piece: board[row][col].emoji, row: row, col: col, name: board[row][col].name });
            //     let img = new Image();
            //     img.src = chessPieces[board[row][col].name];
            //     img.style.opacity = 1;
            //     event.dataTransfer.setDragImage(img);
            // }}
            // onDragOver={( event ) => {
            //     event.preventDefault();
            //     event.dataTransfer.dropEffect = "move";
            // }}
            // onDrop={() => { console.log('dropped'); MakeAMove(selectedPiece, row, col, setBoard, board, setSelectedPiece, turn, setTurn, audio); }}
            onClick = {async (event) => {
                event.preventDefault();
                if (turn === 'white' && board[row][col].name[0] === 'W' || turn === 'black' && board[row][col].name[0] === 'B') {
                    setMoveFrom(board[row][col].coordinate);
                    setSelectedPiece({ piece: board[row][col].emoji, row: row, col: col, name: board[row][col].name });
                } else if ((turn === 'white' && board[row][col].name[0] !== 'W') || (turn === 'black' && board[row][col].name[0] !== 'B')) {
                    setMoveTo(board[row][col].coordinate);
                    setUserMove(board[row][col].coordinate);
                    MakeAMove(selectedPiece, row, col, setBoard, board, setSelectedPiece, turn, setTurn, audio);
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
        {dragging && (
            <img
                className='chess-piece'
                src={chessPieces[board[row][col].name]}
                alt={board[row][col].emoji}
                style={{
                    position: 'absolute',
                    top: dragPos.y,
                    left: dragPos.x,
                    pointerEvents: 'none',
                    zIndex: 1000
                }}
            />
        )}
        </button>
    );
};

export default Square;