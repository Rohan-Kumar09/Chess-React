import React from 'react';
import * as chessPieces from './assets/index.js';
import { MakeAMove } from './MakeMove.js';

const Square = ({ i, j, classColor, playAs, board, setSelectedPiece, selectedPiece, setBoard, turn, setTurn, audio }) => {
    return (
        <button
            style={{ transform: playAs }}
            id='Squares'
            className={classColor}
            key={`${i}-${j}`}
            draggable={true}
            onDragStart={(e) => {
                e.dataTransfer.effectAllowed = "move";
                setSelectedPiece({ piece: board[i][j].emoji, row: i, col: j, name: board[i][j].name });
                let img = new Image();
                img.src = chessPieces[board[i][j].name];
                e.dataTransfer.setDragImage(img, 50, 50);
            }}
            onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
            }}
            onDrop={() => { MakeAMove(selectedPiece, i, j, setBoard, board, setSelectedPiece, turn, setTurn, audio); }}
            onClick={(e) => {
                e.preventDefault();
                console.log(i, j, board[i][j].name, board[i][j].coordinate);
                if (turn === 'white' && board[i][j].name[0] === 'W') {
                    setSelectedPiece({ piece: board[i][j].emoji, row: i, col: j, name: board[i][j].name });
                } else if (turn === 'black' && board[i][j].name[0] === 'B') {
                    setSelectedPiece({ piece: board[i][j].emoji, row: i, col: j, name: board[i][j].name });
                } else if ((turn === 'white' && board[i][j].name[0] !== 'W') || (turn === 'black' && board[i][j].name[0] !== 'B')) {
                    MakeAMove(selectedPiece, i, j, setBoard, board, setSelectedPiece, turn, setTurn, audio);
                }
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                console.log('right click at position: ', board[i][j].coordinate);
                if (e.currentTarget.style.backgroundColor === 'red') {
                    if (classColor === 'White-Square') {
                        let element = document.querySelector('.White-Square');
                        let style = window.getComputedStyle(element);
                        e.currentTarget.style.backgroundColor = style.backgroundColor;
                    } else if (classColor === 'Black-Square') {
                        let element = document.querySelector('.Black-Square');
                        let style = window.getComputedStyle(element);
                        e.currentTarget.style.backgroundColor = style.backgroundColor;
                    }
                } else {
                    e.currentTarget.style.backgroundColor = 'red';
                }
            }}
        >
            {board[i][j].name !== 'empty' && (
                <img className='chess-piece' src={chessPieces[board[i][j].name]} alt={board[i][j].emoji} />
            )}
        </button>
    );
};

export default Square;