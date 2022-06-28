const mongoose = require('mongoose');
const storeClicksSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
    },
    date:{type: Number},
    userAgent:{
        type: JSON
    },
    remoteAdd: {
        type: String
    }
})
module.exports = mongoose.model('storeClicks', storeClicksSchema);