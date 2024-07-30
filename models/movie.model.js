const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    actors:{
        type: String,
        required: true,
    },
    year:{
        type: Number,
        required: true,
    },
    thema: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    valoration: {
        type: Number,
        required: true
    },
    ageRestriction: {
        type: String,
        required: true
    },
    trailer: {
        type: String,
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: "movie",
        default: "movie"
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;