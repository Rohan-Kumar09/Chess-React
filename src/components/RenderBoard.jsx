import React, { useState, useEffect } from 'react';
import Square from './Square';
import { getClassColor } from '../utils/Utils';
import { useChess } from '../context/ChessProvider.jsx';

export function RenderBoard() {
    const { board, engineMove, botMoved } = useChess();
    const [squares, setSquares] = useState([]);

    useEffect(() => {
        let newSquares = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const classColor = getClassColor(row, col);
                newSquares.push(
                    <Square
                        key={`${row}-${col}`} // for react to identify the square
                        row={row}
                        col={col}
                        classColor={classColor}
                    />
                );
            }
        }
        setSquares(newSquares);
    }, [ board, engineMove, botMoved ]);

    return <>{squares}</>;
}