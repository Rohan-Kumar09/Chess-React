import '../styles/ChessBoard.css';
import { InitializeBoard } from '../utils/Utils';
import { useChess } from '../context/ChessProvider';

const SideButtons = () => {
    const { playAs, setPlayAs, setBoard, setTurn, setSelectedPiece, engine, setHistory, opponentTurn, setOpponentTurn } = useChess();
    
    function rotateBoard() {
        playAs === 'rotate(180deg)' ? setPlayAs('rotate(0deg)') : setPlayAs('rotate(180deg)');
    }

    function resetGame() {
        engine.newGame();
        setBoard(InitializeBoard());
        setTurn('white');
        setHistory([]);
        setSelectedPiece({piece: ' ', row: -1, col: -1, name: 'empty'});
    }
    return (
        <>
            <div className='side-buttons'>
                <div>Toggle Board</div>
                <button className='toggle-btn' onClick={() => {
                    rotateBoard();
                }}>🔃</button>
                <div>Reset Game</div>
                <button className='reset-btn' onClick={() => {
                    resetGame();
                }}>🔄</button>
                <div>Play AS: </div>
                <button className='turn-choose-btn'>
                    <select className='turn-choose-select' onChange={(e) => {
                        const userColor = e.target.value;
                        const engineColor = userColor === 'white' ? 'black' : 'white';
                        // Always start with white's move
                        setTurn('white');
                        setOpponentTurn(engineColor);
                        if (userColor === 'white') {
                            setPlayAs('rotate(0deg)');
                        } else {
                            setPlayAs('rotate(180deg)');
                        }

                        resetGame();
                    }}>
                        <option value='white'>W</option>
                        <option value='black'>B</option>
                    </select>
                </button>
            </div>
        </>
    );
};

export default SideButtons;