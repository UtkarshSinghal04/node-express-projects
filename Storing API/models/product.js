const mongoose = require('mongoose');

const prodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name must be provided"]
    },
    price: {
        type: Number,
        required: [true, "Product price must be provided"]
    },
    featured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        default: 5.5
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        }
    }
});

// Export the model with a name (e.g., 'Product')
module.exports = mongoose.model('Product', prodSchema);