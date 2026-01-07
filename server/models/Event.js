const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=80'
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    registered: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
