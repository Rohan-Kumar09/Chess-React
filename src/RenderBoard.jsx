import * as chessPieces from './assets/index.js'
import { MakeAMove } from './MakeMove.js';
import { useState, useEffect } from 'react';

export function RenderBoard({selectedPiece, setSelectedPiece, board, setBoard, turn, setTurn, playAs, audio}) {
    const [squares, setSquares] = useState([]);
    const getClassColor = (i, j) => {
        return ((j - i) % 2) === 0 ? 'White-Square' : 'Black-Square';
    };
    useEffect(() => {
        let newSquares = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const classColor = getClassColor(i, j);
                newSquares.push(<button
                    style={{transform: playAs}}
                    id='Squares' 
                    className={classColor}
                    key={`${i}-${j}`}
                    draggable={true}
                    onDragStart={(e) => {
                        e.dataTransfer.effectAllowed = "move";
                        setSelectedPiece({piece: board[i][j].emoji, row:i, col:j, name: board[i][j].name});
                        let img = new Image();
                        img.src = chessPieces[board[i][j].name];
                        e.dataTransfer.setDragImage(img, 50, 50);
                    }}
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = "move";
                    }}
                    onDrop={() => {MakeAMove(selectedPiece, i, j, setBoard, board, setSelectedPiece, turn, setTurn, audio);}}
                    onClick={(e) => {
                            e.preventDefault();
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
                        if (e.currentTarget.style.backgroundColor === 'red'){
                            if (classColor === 'White-Square'){
                                let element = document.querySelector('.White-Square');
                                let style = window.getComputedStyle(element);
                                e.currentTarget.style.backgroundColor = style.backgroundColor;
                            }
                            else if (classColor === 'Black-Square'){
                                let element = document.querySelector('.Black-Square');
                                let style = window.getComputedStyle(element);
                                e.currentTarget.style.backgroundColor = style.backgroundColor;
                            }
                        }
                        else{
                            e.currentTarget.style.backgroundColor = 'red';
                        }
                    }}
                > <img className='chess-piece' src={chessPieces[board[i][j].name]} alt={board[i][j].emoji} />
                </button>);
            }
        }
        setSquares(newSquares);
    }, [board, selectedPiece, playAs]);
    return squares;
}