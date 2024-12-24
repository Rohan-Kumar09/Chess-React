import React from 'react';
import './ChessBoard.css';

function Info({ turn, color }) {
  return (
    <div id='info'>
        <label id='turn-variable'>Turn: </label>
        <h1 id='turn-variable' style={{color: color}}>{turn}</h1>
    </div>);
}

export default Info;