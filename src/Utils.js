
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