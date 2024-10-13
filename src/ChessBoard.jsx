import React, {useEffect, useState} from 'react';
import './ChessBoard.css';
// import * as chessPieces from './assets/index.js'
import { moveSound } from './assets/exportSound.js'
import { InitializeBoard } from './InitializeBoard.js'; // function for initializing board
import { RenderBoard } from './RenderBoard.jsx'; // function for rendering board

/*

NOTE: turn set to white for debugging
reset button is not well tested - don't trust it.

TODO:
king checks

add arrows on right click
Add piece style chooser drop down menu.
Add Valid Move Shower For Beginners.

en passant
checkmate detection
castling

pins - don't allow the king to move if it's in check

forks - attack two pieces at once

dont allow the king to move to a square that is attacked by the opponent

notation system
*/

function ChessBoard() {
    const audio = new Audio(moveSound); // sound for moving pieces
    const [history, setHistory] = useState([]); // history of moves
    
    const [board, setBoard] = useState(() => InitializeBoard());
    const [selectedPiece, setSelectedPiece] = useState({piece: ' ', row: -1, col: -1, name: 'empty'});
    const [turn, setTurn] = useState('white');
    let color = 'white';
    turn == 'white' ? color = 'rgb(104, 121, 214)' : color = 'darkblue';
    const [playAs, setPlayAs] = useState('rotate(0deg)');
    // const [pieceStyle, setPieceStyle] = useState(0);
    return (
        <>
            <div className='game-display'>
                <div className="chess-board" style={{transform: playAs}}>
                    <RenderBoard selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece}
                    board={board} setBoard={setBoard} turn={turn} setTurn={setTurn} 
                    playAs={playAs} audio={audio}/>
                </div>
                <div className='buttons'>
                    <button className='toggle-btn' onClick={() => {
                        playAs === 'rotate(180deg)' 
                        ? setPlayAs('rotate(0deg)') 
                        : setPlayAs('rotate(180deg)');
                    }}>🔃</button>
                    <button className='reset-btn' onClick={() => {
                        setBoard(InitializeBoard());
                        setTurn('white');
                        setSelectedPiece({piece: ' ', row: -1, col: -1, name: 'empty'});
                    }}>🔄</button>
                </div>
                <table className='move-table'>
                    <tbody>
                        <tr className='title'>
                            <th>Move</th>
                            <th>White</th>
                            <th>Black</th>
                        </tr>
                    </tbody>
                    <tbody className='move-history'>
                        <tr className='move'>
                            <td>1</td>
                            <td>e4</td>
                            <td>e5</td>
                        </tr>
                        <tr className='move'>
                            <td>2</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id='info'>
                <label id='turn-variable'>Turn: </label>
                <h1 id='turn-variable' style={{color: color}}>{turn}</h1>
            </div>
        </>
    );
}

export default ChessBoard;