const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;