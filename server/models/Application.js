const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    startDate: { type: Date },
    endDate: { type: Date },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    travelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Travel',
    },
})

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;