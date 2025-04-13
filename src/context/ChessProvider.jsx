import React, { createContext, useState, useContext, useEffect } from 'react';
import { InitializeBoard } from '../utils/Utils.js';
import { moveSound } from '../assets/exportSound.js';
import { botServer } from '../botServer.js';
import { MakeAMove } from '../utils/MakeMove.js';
import { coordinateMap } from '../utils/Utils.js';

const ChessContext = createContext();
let fenFromEngine = '';

export const ChessProvider = ({ children }) => {
    const audio = new Audio(moveSound);
    const [color, setColor] = useState('white');
    const [history, setHistory] = useState([]);
    const [board, setBoard] = useState(() => InitializeBoard());
    const [selectedPiece, setSelectedPiece] = useState({ piece: ' ', row: -1, col: -1, name: 'empty' });
    const [turn, setTurn] = useState('white');
    const [playAs, setPlayAs] = useState('rotate(0deg)');
    const [userMove, setUserMove] = useState('');
    
    const [moveTo, setMoveTo] = useState('');
    const [moveFrom, setMoveFrom] = useState('');
    const engine = botServer();

    useEffect(() => {
        async function initializeEngine() {
            await engine.initializeEngine();
        }
        initializeEngine();
        // const firstMove = async () => {
        //     const fm = await engine.getFirstMove();
        //     setEngineMove(fm);
        // }
        // firstMove();
    }, []); // Runs once on mount
 
    const parseMove = (moveStr) => {
        let botPieceLocation = moveStr.slice(0, 2);
        let botMove = moveStr.slice(2, 4);
        const { col: fromCol, row: formRow } = coordinateMap[botPieceLocation];
        const { col: toCol, row: toRow } = coordinateMap[botMove];
        console.log("from: ", formRow, fromCol, "to: ", toRow, toCol);
        return {
            from: { row: formRow, col: fromCol },
            to: { row: toRow, col: toCol }
        };
    };
    
    const handleBotMove = async () => {

        fenFromEngine = await engine.getFen(); // initial fen
        engine.sendFen(fenFromEngine, moveFrom + moveTo); // send initial fen with user move
        const moveStr = await engine.getBestMove(); // engine's move
        
        fenFromEngine = await engine.getFen(); // get the new fen from the engine
        engine.sendFen(fenFromEngine, moveStr); // send the new fen back to the engine
        fenFromEngine = await engine.getFen(); // get the new fen from the engine

        // Parse the string into from and to coordinates
        const { from, to } = parseMove(moveStr);
        const botPiece = { 
            piece: board[from.row][from.col].emoji, 
            row: from.row, 
            col: from.col, 
            name: board[from.row][from.col].name 
        };
        // setSelectedPiece({ piece: board[from.row][from.col].emoji, row: to.row, col: to.col, name: board[from.row][from.col].name });
        MakeAMove(botPiece, to.row, to.col, setBoard, board, setSelectedPiece, turn, setTurn, audio);
        // switchTurn(turn, setTurn, setPlayAs);
    };

    useEffect(() => {
        console.log("Turn : ", turn);
        if (turn === 'black') {
            console.log("Bot's turn");
            handleBotMove();
        }
    }, [moveTo, moveFrom]) // Runs when the turn changes to black

    return (
        <ChessContext.Provider
            value={{
                audio,
                color, setColor,
                history, setHistory,
                board, setBoard,
                selectedPiece, setSelectedPiece,
                turn, setTurn,
                playAs, setPlayAs,
                moveTo, setMoveTo,
                moveFrom, setMoveFrom,
                engine,
                userMove, setUserMove
            }}
        >
        {children}
        </ChessContext.Provider>
    );
};

export const useChess = () => useContext(ChessContext);