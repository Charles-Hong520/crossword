import { useEffect, useState, useMemo } from 'react'
import '@/styles/Grid.css';

function Grid({ puzzle, direction, setDirection, currPos, setCurrPos, letters, setLetters }) {

  const ROWS = puzzle.rows;
  const COLS = puzzle.cols;
  const across = puzzle.across;
  const down = puzzle.down;

  function Cell({ pos }) {
    function handleCellClick() {
      if (currPos[0] === pos[0] && currPos[1] === pos[1]) {
        setDirection(direction === 'ACROSS' ? 'DOWN' : 'ACROSS');
      } else {
        setCurrPos([...pos]);
      }
    };

    const getBackgroundColor = () => {
      if (pos[0] === currPos[0] && pos[1] === currPos[1]) {
        return "#ffff28";
      } else if (direction === 'ACROSS' && currPos[0] === pos[0]) {
        return "#92d250";
      } else if (direction === 'DOWN' && currPos[1] === pos[1]) {
        return "#92d250";
      } else {
        return "#f0f0f0";
      }
    };

    return (
      <>
        <div
          className='cell'
          style={{ backgroundColor: getBackgroundColor() }}
          onClick={handleCellClick}>

          <p className='top-left-corner'>{clueNumberTable[pos]}</p>
          {letters[flatten(...pos)]}

        </div>
      </>
    )
  };

  function setCurrLetter(i) {
    setLetters(letters => {
      return letters.slice(0, flatten(...currPos)) + i + letters.slice(flatten(...currPos) + 1);
    });
  }


  function flatten(i, j) {
    return i * COLS + j;
  }
  const clueNumberTable = useMemo(() => {
    const startTable = {};
    for (const num in across) {
      startTable[across[num].start] = num;
    }
    for (const num in down) {
      startTable[down[num].start] = num;
    }
    return startTable;
  }, []);

  const gridCells = [];
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      gridCells.push(<Cell key={`${i}-${j}`} pos={[i, j]} />)
    }
  }



  useEffect(() => {
    function handleLetterInput(key) {
      // change highlighted box to next one
      setCurrLetter(key);
      if (direction === 'ACROSS') {
        //find to the right, if not, go down 1 col, if not, go to 0,0
        if (currPos[0] === ROWS - 1 && currPos[1] === COLS - 1) {
          setCurrPos([0, 0]);
        } else if (currPos[1] === COLS - 1) {
          setCurrPos([currPos[0] + 1, 0]);
        } else {
          setCurrPos([currPos[0], currPos[1] + 1]);
        }
      } else {
        if (currPos[0] === ROWS - 1 && currPos[1] === COLS - 1) {
          setCurrPos([0, 0]);
        } else if (currPos[0] === ROWS - 1) {
          setCurrPos([0, currPos[1] + 1]);
        } else {
          setCurrPos([currPos[0] + 1, currPos[1]]);
        }
      }
    }
    function handleKeyDown(event) {
      const { key } = event;
      if (event.ctrlKey) {
        return;
      }
      else if (key.length === 1) {
        handleLetterInput(key.toUpperCase());
      } else {
        switch (key) {
          case 'ArrowUp':
            if (direction === 'ACROSS') {
              setDirection('DOWN');
            } else {
              setCurrPos([(currPos[0] - 1 + ROWS) % ROWS, currPos[1]]);
            }
            break;
          case 'ArrowDown':
            if (direction === 'ACROSS') {
              setDirection('DOWN');
            } else {
              setCurrPos([(currPos[0] + 1) % ROWS, currPos[1]]);
            }
            break;
          case 'ArrowLeft':
            if (direction === 'DOWN') {
              setDirection('ACROSS');
            } else {
              setCurrPos([currPos[0], (currPos[1] - 1 + COLS) % COLS]);
            }
            break;
          case 'ArrowRight':
            if (direction === 'DOWN') {
              setDirection('ACROSS');
            } else {
              setCurrPos([currPos[0], (currPos[1] + 1) % COLS]);
            }
            break;
          case 'Backspace':
            if (direction === 'ACROSS') {
              setCurrPos([currPos[0], Math.max(0, currPos[1] - 1)]);
            } else {
              setCurrPos([Math.max(0, currPos[0] - 1), currPos[1]]);
            }
            setCurrLetter(' ');
            break;
          case 'Delete':
            if (direction === 'ACROSS') {
              setCurrPos([currPos[0], Math.min(COLS - 1, currPos[1] + 1)]);
            } else {
              setCurrPos([Math.min(ROWS - 1, currPos[0] + 1), currPos[1]]);
            }
            setCurrLetter(' ');
            break;
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currPos, direction]);



  return (
    <>
      <div className="grid-container" style={
        {
          gridTemplateRows: Array.from({ length: ROWS }, () => "1fr").join(" "),
          gridTemplateColumns: Array.from({ length: COLS }, () => "1fr").join(" "),
          height: `${ROWS * 110}px`,
          width: `${COLS * 110}px`
        }
      }>
        {gridCells}
      </div>
    </>
  )
}



export default Grid
