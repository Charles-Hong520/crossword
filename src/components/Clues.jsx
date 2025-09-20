import { useState } from 'react';
import '@/styles/Clues.css';
function Clues({ puzzle, setHighlighted }) {
  const across = puzzle.across;
  const down = puzzle.down;



  return (
    <>
      <div className='container'>
        <ul>
          {Object.entries(across).map(([number, data]) => (
            <li key={number}>
              {number}. {data.clue}
            </li>
          ))}
        </ul>
        <ul >
          {Object.entries(down).map(([number, data]) => (
            <li key={number}>
              {number}. {data.clue}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Clues;
