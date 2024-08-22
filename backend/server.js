const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;


const uri = 'mongodb+srv://AdarshKumar:7903848803@cluster0.bpglqqv.mongodb.net/data_dashboard?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));


const recordSchema = new mongoose.Schema({
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: String,
    impact: String,
    added: Date,
    published: Date,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number,
    city: String,
});


const Record = mongoose.model('Record', recordSchema);


app.use(cors());
app.use(express.json());

app.get('/api/data', async (req, res) => {
    try {
        const filters = req.query;
        const query = {};

        
        Object.keys(filters).forEach((key) => {
            if (filters[key]) {
                if (key === 'intensity' || key === 'relevance' || key === 'likelihood') {
                    query[key] = Number(filters[key]); 
                }
                
                else if (key === 'end_year' || key === 'start_year' || key === 'country' || key === 'region' || key === 'pestle' || key === 'source' || key === 'sector' || key === 'topic') {
                    query[key] = filters[key]; 
                } 
                
                else {
                    query[key] = new RegExp(filters[key], 'i'); 
                }
            }
        });

        const records = await Record.find(query).limit(100); 
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
