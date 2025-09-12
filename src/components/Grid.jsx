import { useEffect, useState } from 'react'
import '../styles/Grid.css'
function Grid({row, col}) {
  const [posRow, setPosRow] = useState(0)
  const [posCol, setPosCol] = useState(0)

  let gridCells = Array.from({length: row*col}).map((i,j) => <p className="grid-cell">{posRow} {posCol}</p>);
  gridCells[posRow*col + posCol]=(<p className="grid-cell" style={{backgroundColor:"yellow"}}></p>);
  useEffect(() => {
    function handleKeyDown(event) {
      switch(event.key) {
        case 'ArrowUp':
          setPosRow(posRow => Math.max(0, posRow - 1));
          break;
        case 'ArrowDown':
          setPosRow(posRow => Math.min(row-1, posRow + 1));
          break;
        case 'ArrowLeft':
          setPosCol(posCol => Math.max(0, posCol - 1));
          break;
        case 'ArrowRight':
          setPosCol(posCol => Math.min(col-1, posCol + 1));
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown); 

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  },[]);



  return (
    <>
      <div className="grid-container" style={
        {
          gridTemplateColumns: Array.from({ length: col }, () => "1fr").join(" "),
          gridTemplateRows: Array.from({ length: row }, () => "1fr").join(" "),
          width: `${col*125}px`,
          height: `${row*125}px`
        }
      }>
        {gridCells}
      </div>
    </>
  )
}



export default Grid
