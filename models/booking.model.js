const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    film: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film',
    },
    serie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Serie',
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
