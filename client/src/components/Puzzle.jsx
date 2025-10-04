import { useState, useEffect } from 'react'
import Grid from '@/components/Grid'
import Clues from '@/components/Clues'
import '@/styles/Puzzle.css'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
function Puzzle() {
  const { puzzle_number } = useParams();
  const [direction, setDirection] = useState("ACROSS");
  const [currPos, setCurrPos] = useState([0, 0]);
  const [hasWon, setHasWon] = useState(false);
  const [letters, setLetters] = useState('');

  const fetchURL = `${import.meta.env.VITE_BACKEND_URL}/${puzzle_number}`;

  const { status, isPending, error, data } = useQuery({
    queryKey: [`puzzle_number ${puzzle_number}`],
    queryFn: () =>
      fetch(fetchURL)
        .then((res) => res.json(),
        ), staleTime: 1000 * 60 * 60 * 24,
  })

  useEffect(() => {
    if (status === 'success' && data && letters.length != data.rows * data.cols) {
      setLetters(' '.repeat(data.rows * data.cols));
    }
    if (data && 'answer' in data && letters === data.answer) { // Ensure it only sets once
      setHasWon(true);
    }

  }, [letters, data]);


  if (isPending) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <>
      <div className='title-bar'>
        {data.title}
        {hasWon && <p className='win'>C'EST FINI !</p>}
      </div>
      <div className='puzzle-content'>
        <Grid
          puzzle={data}
          direction={direction}
          setDirection={setDirection}
          currPos={currPos}
          setCurrPos={setCurrPos}
          letters={letters}
          setLetters={setLetters}
        />
        <Clues
          puzzle={data}
          direction={direction}
          setDirection={setDirection}
          currPos={currPos}
          setCurrPos={setCurrPos}
        />
      </div>

    </>
  )
}

export default Puzzle
