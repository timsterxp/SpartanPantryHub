//Starter code directly fron MongoDB start + minor fixes

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const {MongoClient, ServerApiVersion} = require ('mongodb');
const uri = process.env.MONGO_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;
async function connectToDB() {
    try {
        console.log("Attempting to connect to MongoDB...");
        await client.connect();
        console.log("MongoDB connection successful");
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged MongoDB deployment. Connection successful!");
        db = client.db("PantryHub");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);  // Log the specific error
        throw new Error("MongoDB connection failed");
    }
    return db;
}

async function getUserNames() {
    try {
        const usersCollection = db.collection("users"); // Access "users" collection
        const users = await usersCollection.find({}).toArray(); // Get all users
        console.log("User Names: ");
        users.forEach(user => {
            console.log(user.name); // Assuming the user object has a "name" field
        });
    } catch (err) {
        console.error("Error fetching users:", err);
    }
}

async function listCollections() {
    if (!db) {
        console.error("❌ DB connection is not established.");
        return;
    }

    try {
        // List all collections in the database
        const collections = await db.listCollections().toArray();
        console.log("Collections in database:", db.databaseName);
        collections.forEach(collection => {
            console.log(collection.name);  // Print each collection's name
        });
    } catch (err) {
        console.error("Error listing collections:", err);
    }
}



module.exports = { connectToDB, getUserNames, listCollections };