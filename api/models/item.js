const mongoose = require('mongoose');

// Schema for the items to be created
const itemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    count: { type: Number, required: true },
    image: { type: String, required: true }
});

module.exports = mongoose.model('Item', itemSchema);