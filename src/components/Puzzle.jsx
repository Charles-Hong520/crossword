import { useState } from 'react'
import Grid from '@/components/Grid'
import Clues from '@/components/Clues'

function Puzzle() {
  const [highlighted, setHighlighted] = useState([]);

  const puzzle = {
    title: "New Yorker 2/28/2025",
    rows: 5,
    cols: 5,
    across: {
      1: { clue: "Video ___", start: [0, 0] },
      6: { clue: "Before (Fr)", start: [1, 0] },
      7: { clue: "Arabic name meaning kind", start: [2, 0] },
      8: { clue: "Right (Fr)", start: [3, 0] },
      9: { clue: "Eagle (archaic)", start: [4, 0] }
    },
    down: {
      1: { clue: "Fencers say, “En ___” (Fr)", start: [0, 0] },
      2: { clue: "Stingy (Fr)", start: [0, 1] },
      3: { clue: "Leader of the city", start: [0, 2] },
      4: { clue: "Finally (Fr)", start: [0, 3] },
      5: { clue: "50 of these", start: [0, 4] },
    },
    answer: "pavesalivebagelsmoretorts",
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
        />
        <Clues
          puzzle={puzzle}
          setHighlighted={setHighlighted}
        />
      </div>
    </>
  )
}

export default Puzzle
