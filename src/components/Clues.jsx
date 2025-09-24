import { useState } from 'react';
import '@/styles/Clues.css';


function Clues({ puzzle, setHighlighted }) {
  const across = puzzle.across;
  const down = puzzle.down;
  function ClueColumn({ clues, bannerName, highlight }) {
    return (
      <>
        <ul>
          <p>{bannerName}</p>
          {Object.entries(clues).map(([number, data]) => (
            <li key={number} onClick={setHighlighted}>
              {number}. {data.clue}
            </li>
          ))}
        </ul>
      </>
    );
  }
  return (
    <>
      <div className='container'>
        <ClueColumn
          clues={across}
          bannerName={"ACROSS"} />
        
        <ClueColumn
          clues={down}
          bannerName={"DOWN"} />
        
      </div>
    </>
  )
}

export default Clues;
