import express from "express";
import './loadEnvironment.mjs';
import cors from "cors";
import posts from "./posts.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

let corsOptions = {
   origin : ['https://crossword-2tch.onrender.com/','http://localhost:5173','http://127.0.0.1:5173'],
}

app.use(cors(corsOptions));
app.use(express.json());

// Load the /posts routes
app.use("/crossword", posts);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});