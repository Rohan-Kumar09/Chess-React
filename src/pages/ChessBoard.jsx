import React, { useEffect } from 'react';
import { useChess } from '../context/ChessProvider.jsx';
import '../styles/ChessBoard.css';
import { RenderBoard } from '../components/RenderBoard.jsx'; // function for rendering board
import Info from '../components/Info.jsx'; // function for displaying turn
import MoveHistory from '../components/MoveHistory.jsx';
import SideButtons from '../components/SideButtons.jsx';

function ChessBoard() {
    const { turn, playAs, setColor } = useChess(); 

    useEffect(() => {
        turn == 'white' ? setColor('rgb(231, 240, 239)') : setColor('rgb(0, 0, 0)');
    }, [turn, setColor])

    // const [pieceStyle, setPieceStyle] = useState(0);
    return (
        <>
            <div className='game-display'>
                <div className="board-info-container">
                    <div className="chess-board" style={{transform: playAs}}>
                        <RenderBoard />
                    </div>
                    <Info />
                </div>
                <div className="move-history-container">
                    <MoveHistory />
                </div>
                <div className="side-buttons-container">
                    <SideButtons />
                </div>
            </div>
        </>
    );
}

export default ChessBoard;