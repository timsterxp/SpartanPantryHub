//Starter code directly fron MongoDB start + minor fixes

//File that contains many of the Mongo Functions we utilize over in MongoTest.

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const {MongoClient, ServerApiVersion, ObjectId} = require ('mongodb');
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

/**
 * Basic connection to DB; Provided by MongoDB documentation
 * @returns {Promise<Db>}
 */
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

/**
 * Method to either create a new db entry for user, or retrieve current db entry
 * @param name - Name of gmail account logged in
 * @param email - Email of gmail account
 * @returns {Promise<Document>}
 */
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





/**
 * Below will be the set of database methods that a pantry-user will call
 */

/**
 * Method to retrieve current pantry stock
 * @param req
 * @param res- Response contains all the inventory items for a pantry user to view
 * @returns {Promise<void>}
 */
async function retrieveInventory(req,res) {
    try {
        if (!db){
            const db = await connectToDB();
        }
        const inventoryCollections = db.collection("inventory");//find the inventory db
        const inventory = await inventoryCollections.find({}).toArray(); //put the inventory db into an array
        res.json(inventory);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

/**
 * Method for pantry user to view recipes
 * @param req
 * @param res- Response contains the list of recipes
 * @returns {Promise<void>}
 */
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

/**
 * Guests and Students may utilize this to gain a new role
 * @param name - User Name
 * @param email - User Email
 * @param role - Role Requested
 * @param text - Extra info (Such as Student ID)
 * @returns {Promise<void>}
 */
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



/**
 * Below is the set of methods that the staff have access to
 */


/**
 * Method to retrieve all requests for staff to review
 * @param req - request info
 * @param res - response contains all the requests
 * @returns {Promise<void>}
 */
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

/**
 * Retrieve all the orders for staff to review
 * @param req
 * @param res-Response is an array of all the orders
 * @returns {Promise<void>}
 */
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

/**
 * Create a new item to add to inventory db
 * @param name - item name
 * @param imageUrl - url of picture
 * @param quantity - quantity #
 * @param category - perishable vs non perishable
 * @param calories - nutrition #1
 * @param protein - nutrition #2
 * @returns {Promise<void>}
 */
async function senditemToinventoryDB(name, imageUrl, quantity, category, calories, protein){//item parameters that are needed for the db
    try {
        const db = await connectToDB();
        const inventoryCollections = db.collection("inventory");
        const newitem = {name: name, imageUrl: imageUrl, quantity: quantity, category: category, calories: calories, protein: protein};//creates the new item
        const result = await inventoryCollections.insertOne(newitem);
    }catch (error){
        console.error("Error creating request:", error);
    }
}

/**
 *  Deny an order and append with reason
 * @param _id - Order ID to locate an order
 * @param text - Denial reason
 * @returns {Promise<void>}
 */
async function denyOrder(_id,text ) {
    try {
        if (!db){
            const db = await connectToDB();
        }
        const { ObjectId } = require('mongodb');
        const ordersCollections = db.collection("orders");
        const update = await ordersCollections.updateOne(
            { _id: new ObjectId(_id) },
            { $set: { status: 'Cancelled', notes: text } }
        );

        console.log("Updated");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

/**
 * Change an order to ready for pick up
 * @param _id - Locate order by ID
 * @returns {Promise<void>}
 */
async function changeOrderToReady(_id) {
    try {
        if (!db){
            const db = await connectToDB();
        }
        const { ObjectId } = require('mongodb');
        const ordersCollections = db.collection("orders");
        const update = await ordersCollections.updateOne(
            { _id: new ObjectId(_id) },
            { $set: { status: 'Ready for pickup' } }  // Set the status to "Ready for Pickup"
        );

        console.log("Updated");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

/**
 * Change an order to completed (Picked Up)
 * @param _id - Order ID to locate order
 * @returns {Promise<void>}
 */
async function changeOrderToComplete(_id) {
    console.log("changing this" + _id);
    const { ObjectId } = require('mongodb');
    try {
        if (!db){
            const db = await connectToDB();
        }
        const ordersCollections = db.collection("orders");
        const update = await ordersCollections.updateOne(
            { _id: new ObjectId(_id) },
            { $set: { status: 'Completed' } }  // Set the status to "Ready for Pickup"
        );

        console.log("Updated");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}


/**
 * Helper method to reduce amounts  of visits after placing an order
 * @param studentID - Locate user by studentID
 * @returns {Promise<void>}
 */
async function reduceVisits(studentID) {
    try {
        const db = await connectToDB();
        const usersCollection = await db.collection("users");
        console.log("Reducing user:", studentID);
        await usersCollection.updateOne(
            {text: studentID},
            {$inc: {visits: -1}},
        )
    } catch (error) {
        console.error("Error updating user:", error);
    }
}

/**
 * Retrieve a users order history
 * @param studentID - Locate a student's history
 * @returns {Promise<Document[]>}
 */
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


/**
 * Changes the role of the user with said email
 * @param email Email being used
 * @param role Role that is being requested
 * @param text Extra information (such as Student ID if student)
 * @returns {Promise<void>}
 */
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

/**
 * Removes a role upgrade request by utilizing their email
 * @param email - Users email to locate them
 * @returns {Promise<void>}
 */
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

/**
 * Retrieves a users requests; used to prevent duplicates
 * @param req - Request should contain email
 * @param res - Response
 * @param email - Email to use to view requests
 * @returns {Promise<void>}
 */
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


/**
 * The below methods are meant for testing our database connection and are used for reference for building other database requests
 */


/**
 * Method just to test connections to DB.
 * @returns {Promise<void>}
 */
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

/**
 * Method to test connecting and retrieving from a DB. Not used
 * @returns {Promise<void>}
 */
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


module.exports = { connectToDB, getUserNames, listCollections, checkUser, sendRequestToDB, retrieveRequests, changeRole,removeRequest, retrieveRequest, retrieveInventory, retrieveRecipe, reduceVisits,denyOrder, senditemToinventoryDB,retrieveOrders, getOrderHistory, changeOrderToReady, changeOrderToComplete };