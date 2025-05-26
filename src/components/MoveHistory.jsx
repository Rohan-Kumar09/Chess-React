import { useEffect, useRef } from 'react';
import { useChess } from '../context/ChessProvider';

function MoveHistory() {
  const { history } = useChess();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const rowCount = Math.ceil(history.length / 2);

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
          {[...Array(rowCount)].map((_, rowIndex) => {
            const moveNum = rowIndex + 1;
            const whiteIndex = rowIndex * 2;
            const blackIndex = whiteIndex + 1;
            return (
              <tr key={rowIndex}>
                <td>{moveNum}</td>
                <td>
                  {history[whiteIndex] ? 
                    `${history[whiteIndex][0]} ${history[whiteIndex][1]}-${history[whiteIndex][2]}` : 
                    ''}
                </td>
                <td>
                  {history[blackIndex] ? 
                    `${history[blackIndex][0]} ${history[blackIndex][1]}-${history[blackIndex][2]}` : 
                    ''}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MoveHistory;