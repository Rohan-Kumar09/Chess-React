import React, { useEffect } from 'react';
import { useChess } from '../context/ChessProvider.jsx';
import '../styles/ChessBoard.css';
import { RenderBoard } from '../components/RenderBoard.jsx'; // function for rendering board
import Info from '../components/Info.jsx'; // function for displaying turn
import MoveHistory from '../components/MoveHistory.jsx';
import SideButtons from '../components/SideButtons.jsx';

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
    const { turn, playAs, setColor } = useChess(); 

    useEffect(() => {
        turn == 'white' ? setColor('rgb(104, 121, 214)') : setColor('darkblue');
    }, [turn, setColor])

    // const [pieceStyle, setPieceStyle] = useState(0);
    return (
        <>
            <div className='game-display'>
                <div className="chess-board-plus-info">
                    <div className="chess-board" style={{transform: playAs}}>
                        <RenderBoard />
                    </div>
                    <Info />
                </div>
                <MoveHistory />
                <SideButtons />
            </div>
        </>
    );
}

export default ChessBoard;