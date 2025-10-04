import React, { useEffect, useState } from 'react';
import '@/styles/Form.css';
const Form = () => {
    const [acrossClues, setAcrossClues] = useState('');
    const [downClues, setDownClues] = useState('');
    const [title, setTitle] = useState('');
    const [answer, setAnswer] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const backendUrl = 'http://localhost:5050/crossword/mini'; // POST

    const data = {
        title: "",
        rows: 5,
        cols: 5,
        across: {
            1: { clue: "", start: [0, 0], end: [0, 4] },
            6: { clue: "", start: [1, 0], end: [1, 4] },
            7: { clue: "", start: [2, 0], end: [2, 4] },
            8: { clue: "", start: [3, 0], end: [3, 4] },
            9: { clue: "", start: [4, 0], end: [4, 4] }
        },
        down: {
            1: { clue: "", start: [0, 0], end: [4, 0] },
            2: { clue: "", start: [0, 1], end: [4, 1] },
            3: { clue: "", start: [0, 2], end: [4, 2] },
            4: { clue: "", start: [0, 3], end: [4, 3] },
            5: { clue: "", start: [0, 4], end: [4, 4] },
        },
        answer: "",
        owner: {
            across: [1, 1, 1, 1, 1, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9],
            down: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
        }
    };

    useEffect(() => {
        let error = [];
        const cluesData = {
            across: acrossClues.split('\n').filter(line => line.trim() !== ''),
            down: downClues.split('\n').filter(line => line.trim() !== ''),
            answer: answer.split('\n').filter(line => line.trim() !== ''),
            title: title.split('\n').filter(line => line.trim() !== '')
        };
        if (cluesData.title.length != 1) {
            error.push(<div key="title">TITLE MUST BE 1 LINE</div>);
        }
        if (cluesData.across.length != 5 || cluesData.down.length != 5) {
            error.push(<div key="clues">MUST BE 5 ROWS OF DATA IN ACROSS AND DOWN</div>);
        }
        if (cluesData.answer.length != 5) {
            error.push(<div key="answer">MUST BE 5x5</div>);
        } else {
            for (let word of cluesData.answer) {
                if (word.length != 5) {
                    error.push(<div key="answer">MUST BE 5x5</div>);
                    break;
                }
            }
        }
        setErrorMessages(error);
    }, [acrossClues, downClues, title, answer]);



    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        // if(errorMessages.length != 0) {
        //     alert('fix the inputs Ani');
        //     return;
        // } 
        const cluesData = {
            across: acrossClues.split('\n').filter(line => line.trim() !== ''),
            down: downClues.split('\n').filter(line => line.trim() !== ''),
            answer: answer.split('\n').filter(line => line.trim() !== '').join('').toUpperCase(),
            title: title.split('\n').filter(line => line.trim() !== '').join('')
        };
        data.title = cluesData.title;
        data.answer = cluesData.answer;

        const a = [1, 6, 7, 8, 9];
        const d = [1, 2, 3, 4, 5];
        for (let i = 0; i < 5; i++) {
            data.across[a[i]].clue = cluesData.across[i];
            data.down[d[i]].clue = cluesData.down[i];
        }
        try {
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Clues submitted successfully!');
                // Optionally, clear the form or show a success message
                setTitle('');
                setAcrossClues('');
                setDownClues('');
                setAnswer('');
            } else {
                console.error('Failed to submit clues:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting clues:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <textarea
                    id="title"
                    rows="1"
                    cols="50"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title..."
                ></textarea>
            </div>
            <div>
                <label htmlFor="acrossClues">Across Clues (5 lines):</label>
                <textarea
                    id="acrossClues"
                    rows="5"
                    cols="50"
                    value={acrossClues}
                    onChange={(e) => setAcrossClues(e.target.value)}
                    placeholder="Enter across clues, one per line..."
                ></textarea>
            </div>
            <div>
                <label htmlFor="downClues">Down Clues (5 lines):</label>
                <textarea
                    id="downClues"
                    rows="5"
                    cols="50"
                    value={downClues}
                    onChange={(e) => setDownClues(e.target.value)}
                    placeholder="Enter down clues, one per line..."
                ></textarea>
            </div>
            <div>
                <label htmlFor="answer">Answer:</label>
                <textarea
                    id="answer"
                    rows="5"
                    cols="10"
                    maxLength="29"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="5 letters on 5 new lines"
                ></textarea>
            </div>
            <div className='error-message'>
                {errorMessages.map(div => div)}
            </div>
            <button type="submit">Submit Clues</button>
        </form>
    );
};

export default Form;