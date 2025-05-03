const express = require('express');
const {connectToDB,  checkUser, sendRequestToDB,retrieveRequests, changeRole,removeRequest, retrieveRequest, retrieveInventory, retrieveRecipe, senditemToinventoryDB, retrieveOrders, changeOrderToReady, changeOrderToComplete, updateItem } = require('./MongoModel');
const cors = require ('cors');
const mongoose = require("mongoose");

const app = express();
const PORT =  5000;
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/api/test-db-connection", async (req, res) => {
    try {
        await connectToDB(); // This will ping MongoDB
    //    await listCollections();
        res.json({ message: "Connected to MongoDB!" });
     // await getUserNames();
    } catch (err) {
        console.error("MongoDB error:", err);
        res.status(500).json({ error: "MongoDB connection failed", details: err.message });
    }
});

//Note, need to fix send role-request to also send current role.
app.get("/api/retrieve-request", retrieveRequests);

app.get("/api/retrieve-orders", retrieveOrders);

app.get("/api/retrieve-orders", retrieveOrders);

app.get("/api/retrieve-inventory", retrieveInventory);// an api call to retrieve the inventory

app.get("/api/retrieve-recipe", retrieveRecipe);

app.post("/api/inventory-add/send", async(req, res) => {
    const {name, imageUrl, quantity, category, calories, protein} = req.body;

    try {
        await senditemToinventoryDB(name, imageUrl, quantity, category, calories, protein);
    } catch (err) {
        console.error("MongoDB error:", err);
    }
});

app.post("/api/order/ready", async(req, res) => {
    const {userID} = req.body;
    try {
        await changeOrderToReady(userID);
    } catch (err) {
        console.error("MongoDB error:", err);
    }
});

app.post("/api/order/complete", async(req, res) => {
    const {userID} = req.body;
    try {
        await changeOrderToComplete(userID);
    } catch (err) {
        console.error("MongoDB error:", err);
    }
});

app.post("/api/inventory-update/send", async(req, res) => {
    const {name, imageUrl, quantity, category, calories, protein} = req.body;
    await updateItem(name, imageUrl, quantity, category, calories, protein);
})

app.post("/api/user-check", async(req, res) => {
    const {name, email} = req.body;

    try {
        const user=await checkUser(name, email);
        res.status(200).json(user);
    } catch (error){
        console.error("MongoDB error:", error);
    }
});



app.post("/api/create-order", async  (req, res) => {
    try {
        const { items, userName, userID } = req.body;  // Get data sent from React

        const cartData = {
            items: items,
            userName: userName,
            userID: userID,
            status: "placed",
        };

        const db = await connectToDB();
        const ordersCollections = db.collection("orders");
        const result = await ordersCollections.insertOne(cartData);
        res.status(201).json({ message: "Cart saved successfully!" });
    } catch (error) {
        console.error("Error saving cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/api/role-change/confirm", async(req, res) => {
    const {email, role, text} = req.body;
    await changeRole(email,role,text);
})

app.post("/api/role-change/deny", async(req, res) => {
    const {email} = req.body;
    await removeRequest(email);
})


app.post("/api/role-change/send", async(req, res) => {
    const {name, email, role, text} = req.body;

    try {
        await sendRequestToDB(name, email, role, text);
    } catch (err) {
        console.error("MongoDB error:", err);
    }
});

app.post("/api/role-change/check", async(req, res) => {
    const {email} = req.body;
    try {
        await retrieveRequest(req,res,email);
    }catch (err){
        console.error("MongoDB error:", err);
    }
})

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});