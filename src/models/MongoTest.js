const express = require('express');
const {connectToDB,  checkUser, sendRequestToDB,retrieveRequests, changeRole,removeRequest, retrieveRequest, denyOrder, retrieveInventory, retrieveRecipe, reduceVisits, senditemToinventoryDB, retrieveOrders, changeOrderToReady, changeOrderToComplete, getOrderHistory } = require('./MongoModel');
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

app.get("/api/retrieve-inventory", retrieveInventory);

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
    const {_id} = req.body;
    try {
        await changeOrderToReady(_id);
    } catch (err) {
        console.error("MongoDB error:", err);
    }
});
app.post("/api/order/problem", async(req, res) => {
    const {_id, notes} = req.body;
    console.log("I am sending" +notes);
    try {
        await denyOrder(_id, notes);
    } catch (err) {
        console.error("MongoDB error:", err);
    }
});

app.post("/api/order/complete", async(req, res) => {
    const {_id} = req.body;
    try {
        await changeOrderToComplete(_id);
    } catch (err) {
        console.error("MongoDB error:", err);
    }
});

app.post("/api/order/history", async(req, res) => {
    const {userID} = req.body;
    try {
        const orders = await getOrderHistory(userID);
        res.json(orders);
    } catch (err) {
        console.error("MongoDB error:", err);
    }
});

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
            datePlaced: new Date().toISOString().split('T')[0],
        };

        const db = await connectToDB();
        const ordersCollections = db.collection("orders");
        const result = await ordersCollections.insertOne(cartData);
        await reduceVisits(userID);


        const inventoryCollection = db.collection("inventory");

        for (let item of items) {
            const { name, quantity } = item;

            // Find the item in the inventory and decrement the quantity
            const inventoryItem = await inventoryCollection.findOne({ name: name });

            if (inventoryItem) {
                if (inventoryItem.quantity >= quantity) {
                    // Update inventory by decreasing the quantity
                    await inventoryCollection.updateOne(
                        { name: name },
                        { $inc: { quantity: -quantity } }  // Decrease by ordered quantity
                    );
                } else {
                    // If not enough stock, handle the error (optional)
                    res.status(400).json({ error: `Not enough stock for item: ${name}` });
                    return;
                }
            }
        }

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