let data = {
    title: "Fromage",
    rows: 5,
    cols: 5,
    across: {
        1: { clue: "Video ___", start: [0, 0], end: [0, 4] },
        6: { clue: "Before (Fr)", start: [1, 0], end: [1, 4] },
        7: { clue: "Arabic name meaning kind", start: [2, 0], end: [2, 4] },
        8: { clue: "Right (Fr)", start: [3, 0], end: [3, 4] },
        9: { clue: "Eagle (archaic)", start: [4, 0], end: [4, 4] }
    },
    down: {
        1: { clue: "Fencers say, “En ___” (Fr)", start: [0, 0], end: [4, 0] },
        2: { clue: "Stingy (Fr)", start: [0, 1], end: [4, 1] },
        3: { clue: "Leader of the city", start: [0, 2], end: [4, 2] },
        4: { clue: "Finally (Fr)", start: [0, 3], end: [4, 3] },
        5: { clue: "50 of these", start: [0, 4], end: [4, 4] },
    },
    answer: "GAMESAVANTRAYFADROITEERNE",
    owner: {
        across: [1, 1, 1, 1, 1, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9],
        down: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
    }
};
function input() {
    let rawClues = `
ACROSS
Twenty (Fr)
Flying
Cute (Sp)
Monday (Fr)
Chevrolet hybrid Corvettes

DOWN
City (Fr)
Intermittent napping is usually required
Grandma
Excited
Three (Fr)
`.split("\n");
    const removeStrings = ["", "ACROSS", "DOWN"];
    rawClues = rawClues.filter(element => !removeStrings.includes(element));
    console.log(rawClues);
    const a = [1, 6, 7, 8, 9];
    const d = [1, 2, 3, 4, 5];

    for (let i = 0; i < 5; i++) {
        data.across[a[i]].clue = rawClues[i];
        data.down[d[i]].clue = rawClues[i + 5];
    }
}

// input(); // comment out if keep original
// import { writeFileSync } from 'fs'; // Import the file system module

// const jsonString = JSON.stringify(data, null, 2); // Convert object to pretty-printed JSON string
// try {
//   writeFileSync('output.json', jsonString); // Write the JSON string to a file named 'output.json'
//   console.log('Object successfully written to output.json');
// } catch (error) {
//   console.error('Error writing file:', error);
// }

console.log(data);
export default data;