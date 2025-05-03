export function switchTurn(turn, setTurn){
    if (turn === 'white'){
        setTurn('black');
    }
    else if (turn === 'black'){
        setTurn('white');
    }
}

export const getClassColor = (i, j) => {
    return ((j - i) % 2) === 0 ? 'White-Square' : 'Black-Square';
};

export function InitializeBoard() {
    let board = [
        [{emoji: '♜', name: 'Brook', coordinate: 'a8', hasMoved: false}, {emoji: '♞', name: 'Bknight', coordinate: 'b8'}, {emoji: '♝', name: 'Bbishop', coordinate: 'c8'}, {emoji: '♛', name: 'Bqueen', coordinate: 'd8'}, {emoji: '♚', name: 'Bking', coordinate: 'e8', hasMoved: false}, {emoji: '♝', name: 'Bbishop', coordinate: 'f8'}, {emoji: '♞', name: 'Bknight', coordinate: 'g8'}, {emoji: '♜', name: 'Brook', coordinate: 'h8', hasMoved: false}],
        [{emoji: '♟', name: 'Bpawn', coordinate: 'a7', lastMovedTwo: false}, {emoji: '♟', name: 'Bpawn', coordinate: 'b7', lastMovedTwo: false}, {emoji: '♟', name: 'Bpawn', coordinate: 'c7', lastMovedTwo: false}, {emoji: '♟', name: 'Bpawn', coordinate: 'd7', lastMovedTwo: false}, {emoji: '♟', name: 'Bpawn', coordinate: 'e7', lastMovedTwo: false}, {emoji: '♟', name: 'Bpawn', coordinate: 'f7', lastMovedTwo: false}, {emoji: '♟', name: 'Bpawn', coordinate: 'g7', lastMovedTwo: false}, {emoji: '♟', name: 'Bpawn', coordinate: 'h7', lastMovedTwo: false}],
        [{emoji: ' ', name: 'empty', coordinate: 'a6'}, {emoji: ' ', name: 'empty', coordinate: 'b6'}, {emoji: ' ', name: 'empty', coordinate: 'c6'}, {emoji: ' ', name: 'empty', coordinate: 'd6'}, {emoji: ' ', name: 'empty', coordinate: 'e6'}, {emoji: ' ', name: 'empty', coordinate: 'f6'}, {emoji: ' ', name: 'empty', coordinate: 'g6'}, {emoji: ' ', name: 'empty', coordinate: 'h6'}],
        [{emoji: ' ', name: 'empty', coordinate: 'a5'}, {emoji: ' ', name: 'empty', coordinate: 'b5'}, {emoji: ' ', name: 'empty', coordinate: 'c5'}, {emoji: ' ', name: 'empty', coordinate: 'd5'}, {emoji: ' ', name: 'empty', coordinate: 'e5'}, {emoji: ' ', name: 'empty', coordinate: 'f5'}, {emoji: ' ', name: 'empty', coordinate: 'g5'}, {emoji: ' ', name: 'empty', coordinate: 'h5'}],
        [{emoji: ' ', name: 'empty', coordinate: 'a4'}, {emoji: ' ', name: 'empty', coordinate: 'b4'}, {emoji: ' ', name: 'empty', coordinate: 'c4'}, {emoji: ' ', name: 'empty', coordinate: 'd4'}, {emoji: ' ', name: 'empty', coordinate: 'e4'}, {emoji: ' ', name: 'empty', coordinate: 'f4'}, {emoji: ' ', name: 'empty', coordinate: 'g4'}, {emoji: ' ', name: 'empty', coordinate: 'h4'}],
        [{emoji: ' ', name: 'empty', coordinate: 'a3'}, {emoji: ' ', name: 'empty', coordinate: 'b3'}, {emoji: ' ', name: 'empty', coordinate: 'c3'}, {emoji: ' ', name: 'empty', coordinate: 'd3'}, {emoji: ' ', name: 'empty', coordinate: 'e3'}, {emoji: ' ', name: 'empty', coordinate: 'f3'}, {emoji: ' ', name: 'empty', coordinate: 'g3'}, {emoji: ' ', name: 'empty', coordinate: 'h3'}],
        [{emoji: '♙', name: 'Wpawn', coordinate: 'a2', lastMovedTwo: false}, {emoji: '♙', name: 'Wpawn', coordinate: 'b2', lastMovedTwo: false}, {emoji: '♙', name: 'Wpawn', coordinate: 'c2', lastMovedTwo: false}, {emoji: '♙', name: 'Wpawn', coordinate: 'd2', lastMovedTwo: false}, {emoji: '♙', name: 'Wpawn', coordinate: 'e2', lastMovedTwo: false}, {emoji: '♙', name: 'Wpawn', coordinate: 'f2', lastMovedTwo: false}, {emoji: '♙', name: 'Wpawn', coordinate: 'g2', lastMovedTwo: false}, {emoji: '♙', name: 'Wpawn', coordinate: 'h2', lastMovedTwo: false}],
        [{emoji: '♖', name: 'Wrook', coordinate: 'a1', hasMoved: false}, {emoji: '♘', name: 'Wknight', coordinate: 'b1'}, {emoji: '♗', name: 'Wbishop', coordinate: 'c1'}, {emoji: '♕', name: 'Wqueen', coordinate: 'd1'}, {emoji: '♔', name: 'Wking', coordinate: 'e1', hasMoved: false}, {emoji: '♗', name: 'Wbishop', coordinate: 'f1'}, {emoji: '♘', name: 'Wknight', coordinate: 'g1'}, {emoji: '♖', name: 'Wrook', coordinate: 'h1', hasMoved: false}]
    ];
    return board;
}

export function Pieces(){
    const pieces = {
        Bpawn: { emoji: '♟', name: 'Bpawn' },
        Brook: { emoji: '♜', name: 'Brook' },
        Bknight: { emoji: '♞', name: 'Bknight' },
        Bbishop: { emoji: '♝', name: 'Bbishop' },
        Bqueen: { emoji: '♛', name: 'Bqueen' },
        Bking: { emoji: '♚', name: 'Bking' },
        Wpawn: { emoji: '♙', name: 'Wpawn' },
        Wrook: { emoji: '♖', name: 'Wrook' },
        Wknight: { emoji: '♘', name: 'Wknight' },
        Wbishop: { emoji: '♗', name: 'Wbishop' },
        Wqueen: { emoji: '♕', name: 'Wqueen' },
        Wking: { emoji: '♔', name: 'Wking' }
    };
    return pieces;
}

export const coordinateMap = {
    "a1": { col: 0, row: 7 }, "a2": { col: 0, row: 6 }, "a3": { col: 0, row: 5 }, "a4": { col: 0, row: 4 }, "a5": { col: 0, row: 3 }, "a6": { col: 0, row: 2 }, "a7": { col: 0, row: 1 }, "a8": { col: 0, row: 0 },
    "b1": { col: 1, row: 7 }, "b2": { col: 1, row: 6 }, "b3": { col: 1, row: 5 }, "b4": { col: 1, row: 4 }, "b5": { col: 1, row: 3 }, "b6": { col: 1, row: 2 }, "b7": { col: 1, row: 1 }, "b8": { col: 1, row: 0 },
    "c1": { col: 2, row: 7 }, "c2": { col: 2, row: 6 }, "c3": { col: 2, row: 5 }, "c4": { col: 2, row: 4 }, "c5": { col: 2, row: 3 }, "c6": { col: 2, row: 2 }, "c7": { col: 2, row: 1 }, "c8": { col: 2, row: 0 },
    "d1": { col: 3, row: 7 }, "d2": { col: 3, row: 6 }, "d3": { col: 3, row: 5 }, "d4": { col: 3, row: 4 }, "d5": { col: 3, row: 3 }, "d6": { col: 3, row: 2 }, "d7": { col: 3, row: 1 }, "d8": { col: 3, row: 0 },
    "e1": { col: 4, row: 7 }, "e2": { col: 4, row: 6 }, "e3": { col: 4, row: 5 }, "e4": { col: 4, row: 4 }, "e5": { col: 4, row: 3 }, "e6": { col: 4, row: 2 }, "e7": { col: 4, row: 1 }, "e8": { col: 4, row: 0 },
    "f1": { col: 5, row: 7 }, "f2": { col: 5, row: 6 }, "f3": { col: 5, row: 5 }, "f4": { col: 5, row: 4 }, "f5": { col: 5, row: 3 }, "f6": { col: 5, row: 2 }, "f7": { col: 5, row: 1 }, "f8": { col: 5, row: 0 },
    "g1": { col: 6, row: 7 }, "g2": { col: 6, row: 6 }, "g3": { col: 6, row: 5 }, "g4": { col: 6, row: 4 }, "g5": { col: 6, row: 3 }, "g6": { col: 6, row: 2 }, "g7": { col: 6, row: 1 }, "g8": { col: 6, row: 0 },
    "h1": { col: 7, row: 7 }, "h2": { col: 7, row: 6 }, "h3": { col: 7, row: 5 }, "h4": { col: 7, row: 4 }, "h5": { col: 7, row: 3 }, "h6": { col: 7, row: 2 }, "h7": { col: 7, row: 1 }, "h8": { col: 7, row: 0 }
};