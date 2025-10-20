import express from "express";
import db from "./conn.mjs";

const router = express.Router();

async function getNextSequenceValue(sequenceName) {
  const counterCollection = db.collection('counters');
  const sequenceDocument = await counterCollection.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { returnDocument: 'after', upsert: true } // upsert: true creates the document if it doesn't exist
  );
  return sequenceDocument.sequence_value;
}

// Get list of puzzles
router.get("/puzzle", async (req, res) => {
  let collection = await db.collection("puzzles");
  let result = await collection.find({}).project({ puzzle_number: 1, title: 1 }).sort({ puzzle_number: -1 }).toArray();
  console.log(result);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Get a single puzzle
router.get("/puzzle/:puzzle_number", async (req, res) => {
  let collection = await db.collection("puzzles");
  let puzzle_number = +req.params.puzzle_number;
  let query = { puzzle_number: puzzle_number };
  let result = await collection.findOne(query);
  if (!result) res.send('Not found').status(404);
  else {
    result.answer = atob(result.answer);
  } res.send(result).status(200);
});

// Add a new document to the collection
router.post("/mini", async (req, res) => {
  let collection = await db.collection("puzzles");
  let newDocument = req.body;
  newDocument.puzzle_number = await getNextSequenceValue('puzzle_number');
  newDocument.answer = btoa(newDocument.answer);
  let result = await collection.insertOne(newDocument);
  result.puzzle_number = newDocument.puzzle_number;
  res.send(result).status(204);
});

export default router;


