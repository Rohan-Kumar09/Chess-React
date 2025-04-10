import ChessBoard from './ChessBoard'
import { ChessProvider } from '../context/ChessProvider'

function App() {
  return (
    <ChessProvider>
      <ChessBoard />
    </ChessProvider>
  )
}

export default App
