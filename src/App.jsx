import { useState } from 'react'
import '@/styles/App.css'
import Grid from '@/components/Grid.jsx';
import Cell from '@/components/Cell';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Grid row={5} col={7}></Grid>
    </>
  )
}

export default App
