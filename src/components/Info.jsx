import React from 'react';
import '../styles/ChessBoard.css';
import { useChess } from '../context/ChessProvider.jsx';

function Info() {
  const { turn, color } = useChess();
  return (
    <div id='info'>
        <label id='turn-variable'>Turn: </label>
        <h1 id='turn-variable' style={{color: color}}>{turn}</h1>
    </div>);
}

export default Info;