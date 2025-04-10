import StockfishWorker from 'stockfish/src/stockfish-nnue-16-single.js?worker';
// https://github.com/nmrugg/stockfish.js/blob/Stockfish16/example/enginegame.js
// some reference code.


var fen = "";
let fenResolver = null;
var bestMove = "";
let bestMoveResolver = null;
var isEngineReady = false;
var isGameOver = false;
const engine = new StockfishWorker();

engine.onmessage = (event) => {
    let info;

    if (event && typeof event === "object") {
        info = event.data;
    } else {
        info = event;
    }

    if (info == "uciok") {
        console.log("uciok received");
    } else if (info == "readyok") {
        isEngineReady = true;
        console.log("readyok received");
    } else {
        if (info.includes("bestmove")) {
            bestMove = info.split(" ")[1];
            console.log("Best Move:", bestMove);
            if (bestMoveResolver) {
                bestMoveResolver(bestMove);
                bestMoveResolver = null;
            }
        } else if (info.slice(0, 3) == "Fen") {
            // case Position is received
            fen = info;
            if (fenResolver) {
                fenResolver(fen);
                fenResolver = null;
            }
        }
    }
};

engine.onerror = (err) => {
    console.error("Engine Error:", err);
};

export function botServer() {

    async function initializeEngine() {
        engine.postMessage("uci");
        engine.postMessage("isready");
    }

    async function getFirstMove() {
        engine.postMessage("go depth 1");
        return new Promise((resolve) => {
            bestMoveResolver = resolve;
        })
    }

    function newGame() {
        engine.postMessage("ucinewgame");
        engine.postMessage("isready");
    }

    function sendFen(fen) {
        console.log("Sending FEN to engine:", fen);
        engine.postMessage(fen);
    }

    async function getFen() {
        engine.postMessage("d");
        return new Promise((resolve) => {
            fenResolver = resolve;
        });
    }

    async function getBestMove() {
        engine.postMessage("go depth 15");
        return new Promise((resolve) => {
            bestMoveResolver = resolve;
        });
    }

    return {
        initializeEngine,
        newGame,
        sendFen,
        getFen,
        getFirstMove,
        getBestMove,
        isEngineReady
    };
}

// // Initialize the engine
// engine.postMessage("uci");
// engine.postMessage("ucinewgame");

// // when the engine is ready, it will send "uciok" message
// engine.postMessage("isready");

// // Search for the first move
// // check if white or black
// engine.postMessage("go depth 1");
// engine.postMessage("d");

// repeat:
// get fen from engine
// save the fen
// get next move from user
// append user move to saved fen
// send saved fen to engine
// get best move from engine
// send best move to gui
// Repeat the process

// engine.postMessage("position startpos moves e2e4");
// engine.postMessage("d");

// engine.postMessage("go depth 10");
// engine.postMessage("position startpos moves e2e4 d7d5");
// engine.postMessage("d");


// engine.postMessage("stop");


// Using stockfish API online
// const fen = "rnbqkb1r/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"; // Example FEN
// const depth = 10; // Example depth

// fetch(`https://stockfish.online/api/s/v2.php?fen=${encodeURIComponent(fen)}&depth=${depth}`)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error("Network response was not ok " + response.statusText);
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log("Data received:", data);
//     })
//     .catch(error => {
//         console.error("There was a problem with the fetch operation:", error);
//     });