const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    content: { type: String },
    travelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Travel',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
})

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;