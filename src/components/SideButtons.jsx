import React from 'react';
import '../styles/ChessBoard.css';
import { InitializeBoard } from '../utils/Utils';

const Buttons = ({ playAs, setPlayAs, setBoard, setTurn, setSelectedPiece }) => {
    return (
        <>
            <div className='side-buttons'>
                <button className='toggle-btn' onClick={() => {
                    playAs === 'rotate(180deg)' ? setPlayAs('rotate(0deg)') : setPlayAs('rotate(180deg)');
                }}>🔃</button>
                <button className='reset-btn' onClick={() => {
                    setBoard(InitializeBoard());
                    setTurn('white');
                    setSelectedPiece({piece: ' ', row: -1, col: -1, name: 'empty'});
                }}>🔄</button>
            </div>
        </>
    );
};

export default Buttons;