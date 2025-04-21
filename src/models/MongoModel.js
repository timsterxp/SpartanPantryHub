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
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        db = client.db("PantryHub");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);  // Log the specific error
        throw new Error("MongoDB connection failed");
    }
    return db;
}

//Fx to test the users collection db and that MongoDB can read it

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

async function checkUser(name, email){
    try {
        const db = await connectToDB();
        const usersCollections = db.collection("users");
        let user = await usersCollections.findOne({ email });
        if (!user) {
            const newUser = {name: name, email: email, role: 'guest'};
            const result = await usersCollections.insertOne(newUser);
            user = {_id: result._id, ...newUser};
        }else {
        }
    }catch (error){
        console.error("Error creating user:", error);
    }

}

async function sendRequestToDB(name,email, role, text){
    try {
        const db = await connectToDB();
        const requestCollections = db.collection("requests");
        const newRequest = {name: name, email: email, role: role, text: text};
        const result = await requestCollections.insertOne(newRequest);
    }catch (error){
        console.error("Error creating request:", error);
    }
}

//Fx to test all collections in MongoDB ' delete later.
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



module.exports = { connectToDB, getUserNames, listCollections, checkUser, sendRequestToDB };