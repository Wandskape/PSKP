require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.dbURI;
const dbName = process.env.DATABASE_NAME;

let client;
let db;

async function initDatabase() {
    client = new MongoClient(uri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
    });

    try {
        await client.connect();
        db = client.db(dbName);
        console.log("Successfully connected to MongoDB");
        return db;
    } catch (err) {
        console.error("Connection error:", err);
        throw err;
    }
}

function getDatabase() {
    if (!db) throw new Error("Database not initialized");
    return db;
}

async function closeDatabase() {
    if (client) {
        await client.close();
        client = null;
        db = null;
        console.log("MongoDB connection closed");
    }
}

module.exports = {
    initDatabase,
    getDatabase,
    closeDatabase
};