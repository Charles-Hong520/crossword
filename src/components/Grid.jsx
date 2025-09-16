import { useEffect, useState } from 'react'
import '@/styles/Grid.css';

let Cell = ({letter, color = "#f0f0f0", pos, setPos }) => {
    const style = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        fontFamily: "sans-serif",
        fontSize: "300%",
        color: "black",
        backgroundColor: color
    };

    function handleCellClick(e) {setPos(pos);}
    return (
        <>
            <p key={pos} style={style} onClick={handleCellClick}> {letter} </p>
        </>
    )
};

function Grid({ puzzle }) {
  const row = puzzle.rows;
  const col = puzzle.cols;
  const [posRow, setPosRow] = useState(0);
  const [posCol, setPosCol] = useState(0);
  const [letters, setLetters] = useState(' '.repeat(row * col));
  const [highlightDir, setHighlightDir] = useState('row'); // 'row' or 'col'

  function setCurrLetter(i) {
    setLetters(letters => {
      return letters.slice(0, posRow * col + posCol) + i + letters.slice(posRow * col + posCol + 1);
    });
  }

  function setPos(pos) {
    if(posRow==pos[0] && posCol==pos[1]) {
      console.log("same", pos);
      setHighlightDir(highlightDir==='row' ? 'col' : 'row');
    } else {
      setPosRow(pos[0]);
      setPosCol(pos[1]);
    }
  }

  function getHighlightColor(i) {
    if (i === posRow * col + posCol) {
      return "yellow";
    } else if (highlightDir == 'row' && posRow === Math.floor(i / col)) {
      return "#99ff00";
    } else if (highlightDir == 'col' && posCol == i % col) {
      return "#99ff00";
    }
  }

  let gridCells = Array.from({ length: row * col }).map((_, i) => {
    return <Cell key={i}
      pos={[Math.floor(i / col), i % col]}
      letter={letters[i]}
      color={getHighlightColor(i)}
      setPos={setPos}
    />
  });

  function handleLetterInput(key) {
    // change highlighted box to next one
    setCurrLetter(key);
    if (highlightDir === 'row') {
      //find to the right, if not, go down 1 col, if not, go to 0,0
      if (posCol === col - 1 && posRow === row - 1) {
        setPosRow(0);
        setPosCol(0);
      } else if (posCol === col - 1) {
        setPosRow(posRow + 1);
        setPosCol(0);
      } else {
        setPosCol(posCol + 1);
      }
    } else {
      if (posCol === col - 1 && posRow === row - 1) {
        setPosRow(0);
        setPosCol(0);
      } else if (posRow === row - 1) {
        setPosRow(0);
        setPosCol(posCol + 1);
      } else {
        setPosRow(posRow + 1);
      }
    }
  }

  useEffect(() => {
    function handleKeyDown(event) {
      const { key } = event;
      if(event.ctrlKey) {
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
              setPosRow((posRow - 1 + row) % row);
            }
            break;
          case 'ArrowDown':
            if (highlightDir === 'row') {
              setHighlightDir('col');
            } else {
              setPosRow((posRow + 1) % row);
            }
            break;
          case 'ArrowLeft':
            if (highlightDir === 'col') {
              setHighlightDir('row');
            } else {
              setPosCol((posCol - 1 + col) % col);
            }
            break;
          case 'ArrowRight':
            if (highlightDir === 'col') {
              setHighlightDir('row');
            } else {
              setPosCol((posCol + 1) % col);
            }
            break;
          case 'Backspace':
            if (highlightDir === 'row') {
              setPosCol(Math.max(0, posCol - 1));
            } else {
              setPosRow(Math.max(0, posRow - 1));
            }
            setCurrLetter(' ');
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [posRow, posCol, highlightDir]);



  return (
    <>
      <div className="grid-container" style={
        {
          gridTemplateColumns: Array.from({ length: col }, () => "1fr").join(" "),
          gridTemplateRows: Array.from({ length: row }, () => "1fr").join(" "),
          width: `${col * 125}px`,
          height: `${row * 125}px`
        }
      }>
        {gridCells}
      </div>
    </>
  )
}



export default Grid
