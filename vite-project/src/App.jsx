import { useState } from 'react'
import Board from './containers/Board'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '10px'}}>
      <Board/>
    </div>
  )
}

export default App
