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
      1: { clue: "Resurfaces a driveway, say", start: [0, 0] },
      6: { clue: "Still in it", start: [1, 0] },
      7: { clue: "Zero-shaped food that's a slang for zero, in tennis", start: [2, 0] },
      8: { clue: "Gooey fireside treat", start: [3, 0] },
      9: { clue: "Civil wrongs, in law", start: [4, 0] },
      owner: [1, 1, 1, 1, 1, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9]
    },
    down: {
      1: { clue: "___ Blue Ribbon", start: [0, 0] },
      2: { clue: "San Antonio historical attraction", start: [0, 1] },
      3: { clue: "Vitality", start: [0, 2] },
      4: { clue: "Tennis legend Chris", start: [0, 3] },
      5: { clue: "Tennis legend Monica", start: [0, 4] },
      owner: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
    },
    answer: "pavesalivebagelsmoretorts"
  };

  return (
    <>
      <Grid
        puzzle={puzzle}
      />
      <Clues
        puzzle={puzzle}
        setHighlighted={setHighlighted}
      />
    </>
  )
}

export default Puzzle
