import { MongoClient } from "mongodb";

async function connectToDb() {
    const uri = "mongodb+srv://tennisbals:Il0vemongodb@cluster0.gixkahl.mongodb.net/";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
        return client;
    } catch (e) {
        console.error(e);
    }
}
async function getCollection() {
    const client = await connectToDb();
    const db = client.db("puzzles"); // Replace with your database name
    const collection = db.collection("puzzles"); // Replace with your collection name
    return collection;
}

const collection = await getCollection();
await collection.find().forEach(function (doc) {
    const newanswer = btoa(doc.answer.toUpperCase());
    console.log(doc.answer, newanswer);
    // Alternatively, to update specific keys without replacing the whole document:
    // collection.updateOne({ _id: doc._id }, { $set: { "answer": newanswer } });
});