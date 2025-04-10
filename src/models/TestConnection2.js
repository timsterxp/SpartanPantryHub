const { MongoClient } = require('mongodb');

//const uri = removedLinkAsthishadapassword

async function testConnection() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        console.log("MongoDB connected successfully");
        const db = client.db("PantryHub");
        const collections = await db.listCollections().toArray();
        console.log("Collections:", collections);
    } catch (err) {
        console.error("Connection failed", err);
    } finally {
        await client.close();
    }
}

testConnection();