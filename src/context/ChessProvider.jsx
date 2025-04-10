import React, { createContext, useState, useContext, useEffect } from 'react';
import { InitializeBoard } from '../utils/Utils.js';
import { moveSound } from '../assets/exportSound.js';
import { botServer } from '../botServer.js';

const ChessContext = createContext();

export const ChessProvider = ({ children }) => {
    const audio = new Audio(moveSound);
    const [history, setHistory] = useState([]);
    const [board, setBoard] = useState(() => InitializeBoard());
    const [selectedPiece, setSelectedPiece] = useState({ piece: ' ', row: -1, col: -1, name: 'empty' });
    const [turn, setTurn] = useState('white');
    const [playAs, setPlayAs] = useState('rotate(0deg)');
    const [fen, setFen] = useState('');
    const [move, setMove] = useState({ from: '', to: '' });
    const [engineMove, setEngineMove] = useState('');
    const engine = botServer();

    useEffect(() => {
        async function initializeEngine() {
            await engine.initializeEngine();
            const firstFen = await engine.getFen();
            setFen(firstFen);
        }
        initializeEngine();
        const firstMove = async () => {
            const fm = await engine.getFirstMove();
            setEngineMove(fm);
        }
        firstMove();
    }, []); // Runs once on mount

    const getFen = async () => {
        const newFen = await engine.getFen();
        setFen(newFen);
        return newFen;
    };

    const getBestMove = async () => {
        const bestMove = await engine.getBestMove();
        setEngineMove(bestMove);
        return bestMove;
    };

    return (
        <ChessContext.Provider
            value={{
                audio,
                history, setHistory,
                board, setBoard,
                selectedPiece, setSelectedPiece,
                turn, setTurn,
                playAs, setPlayAs,
                fen, setFen,
                move, setMove,
                engineMove, setEngineMove,
                getFen,
                getBestMove,
                engine
            }}
        >
        {children}
        </ChessContext.Provider>
    );
};

export const useChess = () => useContext(ChessContext);