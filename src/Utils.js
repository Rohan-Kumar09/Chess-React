
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
        [{emoji: '♜', name: 'Brook', coordinate: 'a8'}, {emoji: '♞', name: 'Bknight', coordinate: 'b8'}, {emoji: '♝', name: 'Bbishop', coordinate: 'c8'}, {emoji: '♛', name: 'Bqueen', coordinate: 'd8'}, {emoji: '♚', name: 'Bking', coordinate: 'e8'}, {emoji: '♝', name: 'Bbishop', coordinate: 'f8'}, {emoji: '♞', name: 'Bknight', coordinate: 'g8'}, {emoji: '♜', name: 'Brook', coordinate: 'h8'}],
        [{emoji: '♟', name: 'Bpawn', coordinate: 'a7'}, {emoji: '♟', name: 'Bpawn', coordinate: 'b7'}, {emoji: '♟', name: 'Bpawn', coordinate: 'c7'}, {emoji: '♟', name: 'Bpawn', coordinate: 'd7'}, {emoji: '♟', name: 'Bpawn', coordinate: 'e7'}, {emoji: '♟', name: 'Bpawn', coordinate: 'f7'}, {emoji: '♟', name: 'Bpawn', coordinate: 'g7'}, {emoji: '♟', name: 'Bpawn', coordinate: 'h7'}],
        [{emoji: ' ', name: 'empty', coordinate: 'a6'}, {emoji: ' ', name: 'empty', coordinate: 'b6'}, {emoji: ' ', name: 'empty', coordinate: 'c6'}, {emoji: ' ', name: 'empty', coordinate: 'd6'}, {emoji: ' ', name: 'empty', coordinate: 'e6'}, {emoji: ' ', name: 'empty', coordinate: 'f6'}, {emoji: ' ', name: 'empty', coordinate: 'g6'}, {emoji: ' ', name: 'empty', coordinate: 'h6'}],
        [{emoji: ' ', name: 'empty', coordinate: 'a5'}, {emoji: ' ', name: 'empty', coordinate: 'b5'}, {emoji: ' ', name: 'empty', coordinate: 'c5'}, {emoji: ' ', name: 'empty', coordinate: 'd5'}, {emoji: ' ', name: 'empty', coordinate: 'e5'}, {emoji: ' ', name: 'empty', coordinate: 'f5'}, {emoji: ' ', name: 'empty', coordinate: 'g5'}, {emoji: ' ', name: 'empty', coordinate: 'h5'}],
        [{emoji: ' ', name: 'empty', coordinate: 'a4'}, {emoji: ' ', name: 'empty', coordinate: 'b4'}, {emoji: ' ', name: 'empty', coordinate: 'c4'}, {emoji: ' ', name: 'empty', coordinate: 'd4'}, {emoji: ' ', name: 'empty', coordinate: 'e4'}, {emoji: ' ', name: 'empty', coordinate: 'f4'}, {emoji: ' ', name: 'empty', coordinate: 'g4'}, {emoji: ' ', name: 'empty', coordinate: 'h4'}],
        [{emoji: ' ', name: 'empty', coordinate: 'a3'}, {emoji: ' ', name: 'empty', coordinate: 'b3'}, {emoji: ' ', name: 'empty', coordinate: 'c3'}, {emoji: ' ', name: 'empty', coordinate: 'd3'}, {emoji: ' ', name: 'empty', coordinate: 'e3'}, {emoji: ' ', name: 'empty', coordinate: 'f3'}, {emoji: ' ', name: 'empty', coordinate: 'g3'}, {emoji: ' ', name: 'empty', coordinate: 'h3'}],
        [{emoji: '♙', name: 'Wpawn', coordinate: 'a2'}, {emoji: '♙', name: 'Wpawn', coordinate: 'b2'}, {emoji: '♙', name: 'Wpawn', coordinate: 'c2'}, {emoji: '♙', name: 'Wpawn', coordinate: 'd2'}, {emoji: '♙', name: 'Wpawn', coordinate: 'e2'}, {emoji: '♙', name: 'Wpawn', coordinate: 'f2'}, {emoji: '♙', name: 'Wpawn', coordinate: 'g2'}, {emoji: '♙', name: 'Wpawn', coordinate: 'h2'}],
        [{emoji: '♖', name: 'Wrook', coordinate: 'a1'}, {emoji: '♘', name: 'Wknight', coordinate: 'b1'}, {emoji: '♗', name: 'Wbishop', coordinate: 'c1'}, {emoji: '♕', name: 'Wqueen', coordinate: 'd1'}, {emoji: '♔', name: 'Wking', coordinate: 'e1'}, {emoji: '♗', name: 'Wbishop', coordinate: 'f1'}, {emoji: '♘', name: 'Wknight', coordinate: 'g1'}, {emoji: '♖', name: 'Wrook', coordinate: 'h1'}]
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