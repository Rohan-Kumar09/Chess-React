import React from 'react';
import '../styles/ChessBoard.css';
import { InitializeBoard } from '../utils/Utils';
import { useChess } from '../context/ChessProvider';

const SideButtons = () => {
    const { playAs, setPlayAs, setBoard, setTurn, setSelectedPiece, engine, setHistory } = useChess();
    return (
        <>
            <div className='side-buttons'>
                <button className='toggle-btn' onClick={() => {
                    playAs === 'rotate(180deg)' ? setPlayAs('rotate(0deg)') : setPlayAs('rotate(180deg)');
                }}>🔃</button>
                <button className='reset-btn' onClick={() => {
                    engine.newGame();
                    setBoard(InitializeBoard());
                    setTurn('white');
                    setHistory([]);
                    setSelectedPiece({piece: ' ', row: -1, col: -1, name: 'empty'});
                }}>🔄</button>
            </div>
        </>
    );
};

export default SideButtons;