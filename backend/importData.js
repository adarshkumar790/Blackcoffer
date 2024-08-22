const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

// Replace the URI with your MongoDB connection string
const uri = 'mongodb+srv://AdarshKumar:7903848803@cluster0.bpglqqv.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function importData() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('data_dashboard');
        const collection = db.collection('records');

        // Read JSON data from file
        const filePath = path.join(__dirname, 'frontend', 'jsondata.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Insert data into MongoDB
        await collection.insertMany(data);
        console.log('Data imported successfully');
    } catch (error) {
        console.error('Error importing data:', error);
    } finally {
        await client.close();
    }
}

importData();
