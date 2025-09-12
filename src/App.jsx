import { useState } from 'react'
import './styles/App.css'
import Grid from './components/Grid.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Grid row={5} col={5}></Grid>
    </>
  )
}

export default App
