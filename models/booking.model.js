const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['film', 'serie'],
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

bookingSchema.pre('save', function(next) {
    if (this.type === 'film' && !this.film) {
        next(new Error('Debe proporcionar un film para una reserva de tipo film'));
    } else if (this.type === 'serie' && !this.serie) {
        next(new Error('Debe proporcionar una serie para una reserva de tipo serie'));
    } else {
        next();
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
