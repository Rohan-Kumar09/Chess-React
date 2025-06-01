import { InitializeBoard } from './Utils';
import { useChess } from '../context/ChessProvider';

export function useResetGame() {
	const {
		engine,
		setBoard,
		setTurn,
		setHistory,
		setSelectedPiece,
		setMoveFrom,
		setMoveTo,
		setIsGameOver,
		setWinner
	} = useChess();

	return () => {
		engine.newGame();
		setBoard(InitializeBoard());
		setTurn('white');
		setHistory([]);
		setSelectedPiece({ piece: ' ', row: -1, col: -1, name: 'empty' });
		setMoveFrom('');
		setMoveTo('');
		setIsGameOver(false);
		setWinner('');
	};
}