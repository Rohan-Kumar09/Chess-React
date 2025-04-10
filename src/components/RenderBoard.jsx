import React, { useState, useEffect } from 'react';
import Square from './Square';
import { getClassColor } from '../utils/Utils';
import { useChess } from '../context/ChessProvider.jsx';

export function RenderBoard() {
    const { selectedPiece, setSelectedPiece, board, setBoard, turn, setTurn, playAs, audio } = useChess();
    const [squares, setSquares] = useState([]);

    useEffect(() => {
        let newSquares = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const classColor = getClassColor(i, j);
                newSquares.push(
                    <Square
                        key={`${i}-${j}`}
                        i={i}
                        j={j}
                        classColor={classColor}
                    />
                );
            }
        }
        setSquares(newSquares);
    }, [board, selectedPiece, playAs, setSelectedPiece, setBoard, turn, setTurn, audio]);

    return <>{squares}</>;
}