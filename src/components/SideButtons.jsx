import '../styles/ChessBoard.css';
import { useChess } from '../context/ChessProvider';
import { MdSwapVerticalCircle } from "react-icons/md";
import { IoMdRefreshCircle } from "react-icons/io";
import { useResetGame } from '../utils/resetGame';

const SideButtons = () => {
    const { 
        playAs, 
        setPlayAs, 
        setTurn, 
        engine, 
        setOpponentTurn
    } = useChess();

    const resetGame = useResetGame();
    
    function rotateBoard() {
        playAs === 'rotate(180deg)' ? setPlayAs('rotate(0deg)') : setPlayAs('rotate(180deg)');
    }

    return (
        <>
            <div className='side-buttons'>
                <div className='side-buttons-title'>Toggle Board</div>
                <button className='toggle-btn' onClick={() => {
                    rotateBoard();
                }}><MdSwapVerticalCircle /></button>

                <div className='side-buttons-title'>Reset Game</div>
                <button className='reset-btn' onClick={() => {
                    resetGame();
                }}><IoMdRefreshCircle /></button>

                <div className='side-buttons-title'>Play AS</div>
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
                        <option value='white'>White</option>
                        <option value='black'>Black</option>
                    </select>
                </button>

                <div className='side-buttons-title'>Bot Strength</div>
                <button className='depth-choose-btn'>
                    <select
                        className='turn-choose-select'
                        defaultValue='1'
                        onChange={e => engine.setDepth(Number(e.target.value))}
                    >
                        {Array.from({length: 25}, (_, i) => i + 1).map(depth => (
                            <option key={depth} value={depth}>{depth}</option>
                        ))}
                    </select>
                </button>
            </div>
        </>
    );
};

export default SideButtons;