import { useState } from 'react';
import '@/styles/Clues.css';


function Clues({ puzzle, direction, setDirection, currPos, setCurrPos }) {
  const across = puzzle.across;
  const down = puzzle.down;
  const owner = puzzle.owner;

  function handleClueClick(dir, clueNumber) {
    setDirection(dir);
    if (dir === 'ACROSS') {
      setCurrPos([...across[clueNumber].start]);
    } else {
      setCurrPos([...down[clueNumber].start]);
    }

  }

  function getBackgroundColor(number, dir) {
    let currClue, backgroundColor;
    if (dir == "ACROSS") {
      currClue = owner.across[currPos[0] * puzzle.cols + currPos[1]];
    } else {
      currClue = owner.down[currPos[0] * puzzle.cols + currPos[1]];
    }
    if (currClue === number && dir === direction) {
      backgroundColor = "green";
    } else {
      backgroundColor = "transparent";
    }
    return { backgroundColor: backgroundColor };
  }


  function ClueColumn({ clues, bannerName }) {
    return (
      <>
        <ul className='clue-container'>
          <p className='banner-name'>{bannerName}</p>
          {Object.entries(clues).map(([number, data]) => (
            <li className='clue-item' key={number}
              onClick={() => handleClueClick(bannerName, number)}
              style={getBackgroundColor(+number, bannerName)}
            >
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
