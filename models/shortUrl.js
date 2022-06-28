const mongoose = require('mongoose');
const shortId = require('shortid');
const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    visits: {
        type: Number,
        required: true,
        default: 0
    },
    date:{type: Date, default: Date.now},
    visitsFB: {
        type: Number,
        default: 0
    },
    visitsIG: {
        type: Number,
        default: 0
    },
    visitsYT: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('shortUrl', shortUrlSchema);