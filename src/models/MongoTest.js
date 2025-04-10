const express = require('express');
const {connectToDB, checkUser,getUserNames, listCollections, db} = require('./MongoModel');
const cors = require ('cors');


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

app.post("/api/user-check", async(req, res) => {
    const {name, email} = req.body;

    try {
        await checkUser(name, email);
    } catch (error){
        console.error("MongoDB error:", error);
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});