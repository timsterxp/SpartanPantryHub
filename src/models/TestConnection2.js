const { MongoClient } = require('mongodb');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const uri = process.env.MONGO_URL;

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