import { useEffect, useState, useMemo } from 'react'
import '@/styles/Grid.css';



function Grid({ puzzle }) {
  const ROWS = puzzle.rows;
  const COLS = puzzle.cols;
  const across = puzzle.across;
  const down = puzzle.down;
  const [currRow, setCurrRow] = useState(0);
  const [currCol, setCurrCol] = useState(0);
  const [letters, setLetters] = useState(' '.repeat(ROWS * COLS));
  const [highlightDir, setHighlightDir] = useState('row'); // 'row' or 'col'

  function Cell({ pos }) {
    function handleCellClick() {
      if (currRow == pos[0] && currCol == pos[1]) {
        console.log("same", pos);
        setHighlightDir(highlightDir === 'row' ? 'col' : 'row');
      } else {
        setCurrRow(pos[0]);
        setCurrCol(pos[1]);
      }
    }

    const getBackgroundColor = () => {
      if (pos[0] == currRow && pos[1] == currCol) {
        return "yellow";
      } else if (highlightDir == 'row' && currRow === pos[0]) {
        return "#99ff00";
      } else if (highlightDir == 'col' && currCol === pos[1]) {
        return "#99ff00";
      }
      return "#f0f0f0";
    }

    return (
      <>
        <div
          className='cell'
          style={{ backgroundColor: getBackgroundColor() }}
          onClick={handleCellClick}>

          <p className='top-left-corner'>{clueNumberTable[pos]}</p>
          {letters[flatten(pos[0], pos[1])]}

        </div>
      </>
    )
  };
  function setCurrLetter(i) {
    setLetters(letters => {
      return letters.slice(0, currRow * COLS + currCol) + i + letters.slice(currRow * COLS + currCol + 1);
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

  function handleLetterInput(key) {
    // change highlighted box to next one
    setCurrLetter(key);
    if (highlightDir === 'row') {
      //find to the right, if not, go down 1 col, if not, go to 0,0
      if (currCol === COLS - 1 && currRow === ROWS - 1) {
        setCurrRow(0);
        setCurrCol(0);
      } else if (currCol === COLS - 1) {
        setCurrRow(currRow + 1);
        setCurrCol(0);
      } else {
        setCurrCol(currCol + 1);
      }
    } else {
      if (currCol === COLS - 1 && currRow === ROWS - 1) {
        setCurrRow(0);
        setCurrCol(0);
      } else if (currRow === ROWS - 1) {
        setCurrRow(0);
        setCurrCol(currCol + 1);
      } else {
        setCurrRow(currRow + 1);
      }
    }
  }

  useEffect(() => {
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
            if (highlightDir === 'row') {
              setHighlightDir('col');
            } else {
              setCurrRow((currRow - 1 + ROWS) % ROWS);
            }
            break;
          case 'ArrowDown':
            if (highlightDir === 'row') {
              setHighlightDir('col');
            } else {
              setCurrRow((currRow + 1) % ROWS);
            }
            break;
          case 'ArrowLeft':
            if (highlightDir === 'col') {
              setHighlightDir('row');
            } else {
              setCurrCol((currCol - 1 + COLS) % COLS);
            }
            break;
          case 'ArrowRight':
            if (highlightDir === 'col') {
              setHighlightDir('row');
            } else {
              setCurrCol((currCol + 1) % COLS);
            }
            break;
          case 'Backspace':
            if (highlightDir === 'row') {
              setCurrCol(Math.max(0, currCol - 1));
            } else {
              setCurrRow(Math.max(0, currRow - 1));
            }
            setCurrLetter(' ');
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currRow, currCol, highlightDir]);



  return (
    <>
      <div className="grid-container" style={
        {
          gridTemplateRows: Array.from({ length: ROWS }, () => "1fr").join(" "),
          gridTemplateColumns: Array.from({ length: COLS }, () => "1fr").join(" "),
          height: `${ROWS * 125}px`,
          width: `${COLS * 125}px`
        }
      }>
        {gridCells}
      </div>
    </>
  )
}



export default Grid
