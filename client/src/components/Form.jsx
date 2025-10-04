import React, { useState } from 'react';

const Form = () => {
  const [acrossClues, setAcrossClues] = useState('');
  const [downClues, setDownClues] = useState('');
  const backendUrl = 'http://localhost:5050/crossword/mini'; // POST

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const cluesData = {
      across: acrossClues.split('\n').filter(line => line.trim() !== ''), // Split by new line, remove empty lines
      down: downClues.split('\n').filter(line => line.trim() !== ''),   // Split by new line, remove empty lines
    };
    if(cluesData.across.length != 5 || cluesData.down.length != 5) {
        alert('MUST BE 5 ROWS OF DATA IN ACROSS AND DOWN');
        return;
    }
    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cluesData),
      });

      if (response.ok) {
        console.log('Clues submitted successfully!');
        // Optionally, clear the form or show a success message
        setAcrossClues('');
        setDownClues('');
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
      <button type="submit">Submit Clues</button>
    </form>
  );
};

export default Form;