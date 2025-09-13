import { useEffect, useState } from 'react'
import '@/styles/Grid.css';
import Cell from '@/components/Cell';
function Grid({ row, col }) {
  const [posRow, setPosRow] = useState(0);
  const [posCol, setPosCol] = useState(0);
  const [letters, setLetters] = useState(' '.repeat(row * col));
  const [highlightDir, setHighlightDir] = useState('row'); // 'row' or 'col'


  function getHighlightColor(i) {
    if (i === posRow * col + posCol) {
      return "yellow";
    } else if (highlightDir == 'row' && posRow === Math.floor(i / col)) {
      return "cyan";
    } else if (highlightDir == 'col' && posCol == i % col) {
      return "cyan";
    }
    return "white";
  }

  function getCells() {
    console.log("bruh", posRow, posCol);

    let gridCells = Array.from({ length: row * col }).map((_, i) => {

      return <Cell key={i} letter={letters[i]} color={getHighlightColor(i)}></Cell>
    });

    return gridCells;
  }

  function handleLetterInput(key) {
    // change highlighted box to next one

    setLetters(letters => {
      return letters.slice(0, posRow * col + posCol) + key + letters.slice(posRow * col + posCol + 1);
    });


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
      if (key.length === 1) {
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
            setLetters(letters => {
              return letters.slice(0, posRow * col + posCol) + ' ' + letters.slice(posRow * col + posCol + 1);
            });
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
        {getCells()}
      </div>
    </>
  )
}



export default Grid
