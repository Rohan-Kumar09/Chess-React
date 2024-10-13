
export function switchTurn(turn, setTurn){
    if (turn === 'white'){
        setTurn('black');
    }
    else if (turn === 'black'){
        setTurn('white');
    }
}