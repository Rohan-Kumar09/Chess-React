import React, { useEffect, useRef } from 'react';
import { useChess } from '../context/ChessProvider';

function MoveHistory() {
  const { history } = useChess();
  const scrollRef = useRef(null);
  // Group moves into rows: [moveNum, white, black]
  const rows = [];
  for (let i = 0; i < history.length; i += 2) {
    rows.push([
      Math.floor(i / 2) + 1,
      history[i] || '',
      history[i + 1] || ''
    ]);
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="move-history" ref={scrollRef}>
      <h2>Move History</h2>
      <table>
        <thead>
          <tr>
            <th>Move</th>
            <th>White</th>
            <th>Black</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([moveNum, white, black], idx) => (
            <tr key={idx}>
              <td>{moveNum}</td>
              <td>{white}</td>
              <td>{black}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MoveHistory;