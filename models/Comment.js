const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    email: {
        type: String
    }
},{timestamps: true})

module.exports = mongoose.model('Comment', commentSchema)