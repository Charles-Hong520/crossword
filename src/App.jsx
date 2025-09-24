import { useState } from 'react'
import '@/styles/App.css'
import Puzzle from '@/components/Puzzle'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      
    <Puzzle/>
    </div>
    </>
  )
}

export default App
