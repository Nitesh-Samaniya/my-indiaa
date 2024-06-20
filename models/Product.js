const mongoose = require('mongoose');

const productScheme = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
    qty: {type: Number, required: true},
    isAvailable: {type: String, enum:['yes', 'no'], default: 'yes'},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        requires: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('product', productScheme);