import { useState, useEffect } from 'react'
import Grid from '@/components/Grid'
import Clues from '@/components/Clues'
import '@/styles/Puzzle.css'
import data from '@/assets/db.js'

function Puzzle() {
  const [direction, setDirection] = useState("ACROSS");
  const [currPos, setCurrPos] = useState([0, 0]);
  const [hasWon, setHasWon] = useState(false);
  const [letters, setLetters] = useState(' '.repeat(data.rows * data.cols));

  useEffect(() => {
    if (letters === data.answer) { // Ensure it only sets once
      setHasWon(true);
    }
  }, [letters]);
  
  return (
    <>
      <div className='title-bar'>
        {data.title}
        {hasWon && <p className='win'>C'EST COMPLET !</p>}
      </div>
      <div className='puzzle-content'>
        <Grid
          puzzle={data}
          direction={direction}
          setDirection={setDirection}
          currPos={currPos}
          setCurrPos={setCurrPos}
          letters={letters}
          setLetters={setLetters}
        />
        <Clues
          puzzle={data}
          direction={direction}
          setDirection={setDirection}
          currPos={currPos}
          setCurrPos={setCurrPos}
        />
      </div>

    </>
  )
}

export default Puzzle
