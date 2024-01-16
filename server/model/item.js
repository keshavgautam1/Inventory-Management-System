const mongoose = require('mongoose');

const itemDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    supplierInfo: {
        type: String,
        required: true,
        trim: true
    },
    mfgDate: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
});

const Item = mongoose.model('Item', itemDetailSchema);

module.exports = Item;