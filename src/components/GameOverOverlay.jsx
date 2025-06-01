import { useChess } from '../context/ChessProvider.jsx';
import { useResetGame } from '../utils/resetGame.js';
import React from 'react';

export default function GameOverOverlay() {
    const { 
		isGameOver, 
		winner, 
		setIsGameOver, 
		playAs
	} = useChess();
	const resetGame = useResetGame();

	if (!isGameOver) return null;
	return (
		<div className="game-over-overlay" style={{ transform: playAs }}>
			<div className="game-over-message">
				<h2>Game Over!</h2>
				<p>
				{winner
					? `${winner.charAt(0).toUpperCase() + winner.slice(1)} wins by checkmate.`
					: 'Checkmate.'}
				</p>
				<div className="game-over-buttons-container">
					<button className="game-over-buttons" onClick={() => setIsGameOver(false)}>
						View Board
					</button>
					<button className="game-over-buttons" onClick={resetGame}>
						New Game
					</button>
				</div>
			</div>
		</div>
	);
}