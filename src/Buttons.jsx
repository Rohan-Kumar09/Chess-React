import React from 'react';
import './ChessBoard.css';
import { InitializeBoard } from './Utils';

const Buttons = ({ playAs, setPlayAs, setBoard, setTurn, setSelectedPiece }) => {
    return (
        <>
            <div>
                <div className='buttons'>
                    <button className='toggle-btn' onClick={() => {
                        playAs === 'rotate(180deg)' ? setPlayAs('rotate(0deg)') : setPlayAs('rotate(180deg)');
                    }}>🔃</button>
                    <button className='reset-btn' onClick={() => {
                        setBoard(InitializeBoard());
                        setTurn('white');
                        setSelectedPiece({piece: ' ', row: -1, col: -1, name: 'empty'});
                    }}>🔄</button>
                </div>
            </div>
        </>
    );
};

export default Buttons;