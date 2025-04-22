const express = require('express');
const {connectToDB,  checkUser, sendRequestToDB,retrieveRequests, changeRole,removeRequest } = require('./MongoModel');
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

//Note, need to fix send role-request to also send current role.
app.get("/api/retrieve-request", retrieveRequests);

app.post("/api/user-check", async(req, res) => {
    const {name, email} = req.body;

    try {
        await checkUser(name, email);
    } catch (error){
        console.error("MongoDB error:", error);
    }
});

app.post("/api/role-change", async(req, res) => {
    const {email, role, text} = req.body;
    await changeRole(email,role,text);
})

app.post("/api/role-change-deny", async(req, res) => {
    const {email} = req.body;
    await removeRequest(email);
})


app.post("/api/send-role-request", async(req, res) => {
    const {name, email, role, text} = req.body;

    try {
        await sendRequestToDB(name, email, role, text);
    } catch (err) {
        console.error("MongoDB error:", err);
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});