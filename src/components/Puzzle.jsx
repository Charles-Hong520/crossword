import { useState } from 'react'
import Grid from '@/components/Grid'
import Clues from '@/components/Clues'

function Puzzle() {
  const [direction, setDirection] = useState("ACROSS");
  const [currPos, setCurrPos] = useState([0, 0]);

  const puzzle = {
    title: "New Yorker 2/28/2025",
    rows: 5,
    cols: 5,
    across: {
      1: { clue: "Video ___", start: [0, 0], end: [0, 4] },
      6: { clue: "Before (Fr)", start: [1, 0], end: [1, 4] },
      7: { clue: "Arabic name meaning kind", start: [2, 0], end: [2, 4] },
      8: { clue: "Right (Fr)", start: [3, 0], end: [3, 4] },
      9: { clue: "Eagle (archaic)", start: [4, 0], end: [4, 4] }
    },
    down: {
      1: { clue: "Fencers say, “En ___” (Fr)", start: [0, 0], end: [4, 0] },
      2: { clue: "Stingy (Fr)", start: [0, 1], end: [4, 1] },
      3: { clue: "Leader of the city", start: [0, 2], end: [4, 2] },
      4: { clue: "Finally (Fr)", start: [0, 3], end: [4, 3] },
      5: { clue: "50 of these", start: [0, 4], end: [4, 4] },
    },
    answer: "gamesavantroyfadroiteerne",
    owner: {
      across: [1, 1, 1, 1, 1, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9],
      down: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
    }
  };
  const containerStyle = {
    display: "flex",
    flexDirection: "row"
  }
  return (
    <>
      <div style={containerStyle}>
        <Grid
          puzzle={puzzle}
          direction={direction}
          setDirection={setDirection}
          currPos={currPos}
          setCurrPos={setCurrPos}
        />
        <Clues
          puzzle={puzzle}
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
