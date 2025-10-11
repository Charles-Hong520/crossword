import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '@/styles/PuzzleList.css';
import { useQuery } from '@tanstack/react-query';
function PuzzleList() {
    const fetchURL = `${import.meta.env.VITE_BACKEND_URL}/puzzle`;

    const { isPending, error, data } = useQuery({
        queryKey: ['puzzle list'],
        queryFn: () =>
            fetch(fetchURL)
                .then((res) => res.json(),
                ), staleTime: 1000 * 60 * 60 * 24,
    });




    if (isPending) return 'Getting Puzzle List...';
    if (error) return 'An error has occurred: ' + error.message;

    console.log(data);
    return (
        <>
            <div className='puzzle-grid'>
                {data.map((puzzle) => (
                    <Link
                        key={puzzle.puzzle_number}
                        className='puzzle-info-container'
                        to={`/puzzle/${puzzle.puzzle_number}`}
                    >
                        <p>{puzzle.puzzle_number}</p>
                        <h3>{puzzle.title}</h3>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default PuzzleList;
