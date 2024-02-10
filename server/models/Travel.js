const mongoose = require('mongoose');

const travelSchema= new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    category: {type: String },
    price: { type: Number }
})

const Travel = mongoose.model('Travel', travelSchema);
module.exports=Travel;