const mongoose = require('mongoose');

const WorkSchema = mongoose.Schema({
    wid: {
        type: Number,
        required: true
    },
    makul: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true,
        default: Date.now
    },
    topik: {
        type: String,
        required: true
    },
    jenis: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Works', WorkSchema);