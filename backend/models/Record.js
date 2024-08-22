const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    intensity: Number,
    likelihood: Number,
    relevance: Number,
    year: Number,
    end_year: String,
    country: String,
    topics: [String],
    region: String,
    city: String,
    sector: String,
    pestle: String,
    source: String,
    swot: String
    // Add other fields as per your JSON structure
});

module.exports = mongoose.model('Record', recordSchema);
