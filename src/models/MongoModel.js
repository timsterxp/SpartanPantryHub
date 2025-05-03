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

async function retrieveRequests(req,res) {
    try {
        if (!db){
            const db = await connectToDB();
        }
        const requestCollections = db.collection("requests");
        const allRequests = await requestCollections.find({}).toArray();
        res.json(allRequests);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

async function retrieveOrders(req,res) {
    try {
        if (!db){
            const db = await connectToDB();
        }
        const ordersCollections = db.collection("orders");
        const allRequests = await ordersCollections.find({}).toArray();
        res.json(allRequests);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

async function retrieveInventory(req,res) {
    try {
        if (!db){
            const db = await connectToDB();
        }
        const inventoryCollections = db.collection("inventory");
        const inventory = await inventoryCollections.find({}).toArray();
        res.json(inventory);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

async function senditemToinventoryDB(name, imageUrl, quantity, category, calories, protein){
    try {
        const db = await connectToDB();
        const inventoryCollections = db.collection("inventory");
        const newitem = {name: name, imageUrl: imageUrl, quantity: quantity, category: category, calories: calories, protein: protein};
        const result = await inventoryCollections.insertOne(newitem);
    }catch (error){
        console.error("Error creating request:", error);
    }
}

async function retrieveRecipe(req,res) {
    try {
        if (!db){
            const db = await connectToDB();
        }
        const recipeCollections = db.collection("recipes");
        const recipes = await recipeCollections.find({}).toArray();
        res.json(recipes);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

async function changeOrderToReady(userID) {
    try {
        if (!db){
            const db = await connectToDB();
        }
        const ordersCollections = db.collection("orders");
        const update = await ordersCollections.updateOne(
            { userID},  // Corrected: use req.userID instead of req
            { $set: { status: 'Ready for pickup' } }  // Set the status to "Ready for Pickup"
        );

        console.log("Updated");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

async function changeOrderToComplete(userID) {
    try {
        if (!db){
            const db = await connectToDB();
        }
        const ordersCollections = db.collection("orders");
        const update = await ordersCollections.updateOne(
            { userID},  // Corrected: use req.userID instead of req
            { $set: { status: 'Completed' } }  // Set the status to "Ready for Pickup"
        );

        console.log("Updated");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
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
            return user;
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

async function getOrderHistory(studentID) {
    try {
        const db = await connectToDB();
        const orders = await db.collection("orders");
        const myOrders = await orders.find({userID:studentID}).toArray();
        console.log(myOrders);
        return myOrders;
    }catch (err) {
        console.error("Error getting order history:", err);
    }
}



//Need to add studentID aspect if student
async function changeRole(email, role, text){
    try {
        if (!db){
            const db = await connectToDB();
        }
        const usersCollections = db.collection("users");
        if (role==="Student"){
            const updating = await usersCollections.findOneAndUpdate(
                { email},
                { $set: {role:role, text: text, visits: 1}},

            )
        }else {
            const updating = await usersCollections.findOneAndUpdate(
                { email},
                { $set: {role:role, text: text}},

            )
        }

       await removeRequest(email);

    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

async function removeRequest(email){
    try {
        if (!db){
            const db = await connectToDB();
        }
        const requestsCollections = db.collection("requests");
        const deleting= await requestsCollections.findOneAndDelete(
            { email: email }
        )
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }

}


async function retrieveRequest(req,res,email) {
    try {
        if (!db){
            const db = await connectToDB();
        }
        const requestsCollections = db.collection("requests");
        const request = await requestsCollections.findOne(
            { email: email }
        )
        if (request){
            res.json(request);
        }else {
            res.status(404).send("Not Found");
        }

    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
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



module.exports = { connectToDB, getUserNames, listCollections, checkUser, sendRequestToDB, retrieveRequests, changeRole,removeRequest, retrieveRequest, retrieveInventory, retrieveRecipe, senditemToinventoryDB,retrieveOrders, getOrderHistory, changeOrderToReady, changeOrderToComplete };