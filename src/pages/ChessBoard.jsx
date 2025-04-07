import React, {useState} from 'react';
import '../styles/ChessBoard.css';
import { moveSound } from '../assets/exportSound.js'
import { InitializeBoard } from '../utils/Utils.js'; // function for initializing board
import { RenderBoard } from '../components/RenderBoard.jsx'; // function for rendering board
import Info from '../components/Info.jsx'; // function for displaying turn
import MoveHistory from '../components/MoveHistory.jsx';
import Buttons from '../components/SideButtons.jsx';

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
    const [playAs, setPlayAs] = useState('rotate(0deg)');
    
    const handleMove = (move) => {
        setHistory((prevHistory) => [...prevHistory, move]);
    };

    let color = 'white';
    turn == 'white' ? color = 'rgb(104, 121, 214)' : color = 'darkblue';
    // const [pieceStyle, setPieceStyle] = useState(0);
    return (
        <>
            <div className='game-display'>
                <div className="chess-board-plus-info">
                    <div className="chess-board" style={{transform: playAs}}>
                        <RenderBoard 
                            selectedPiece={selectedPiece} 
                            setSelectedPiece={setSelectedPiece}
                            board={board} 
                            setBoard={setBoard} 
                            turn={turn} 
                            setTurn={setTurn} 
                            playAs={playAs} 
                            audio={audio}
                            onMove={handleMove}
                        />
                    </div>
                    <Info turn={turn} color={color} />
                </div>
                <MoveHistory history={history} />
                <Buttons
                    playAs={playAs}
                    setPlayAs={setPlayAs}
                    setBoard={setBoard}
                    setTurn={setTurn}
                    setSelectedPiece={setSelectedPiece}
                />
            </div>
        </>
    );
}

export default ChessBoard;