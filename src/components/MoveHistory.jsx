import React from 'react';
import { useChess } from '../context/ChessProvider';

function MoveHistory() {
  const { history } = useChess();
  return (
    <div className="move-history">
      <h2>Move History</h2>
      <table>
        <thead>
          <tr>
            <th>Move</th>
            <th>White</th>
            <th>Black</th>
          </tr>
        </thead>
        {/* <tbody>
          {history.map((move, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{move.white}</td>
              <td>{move.black}</td>
            </tr>
          ))}
        </tbody> */}
      </table>
    </div>
  );
}

export default MoveHistory;