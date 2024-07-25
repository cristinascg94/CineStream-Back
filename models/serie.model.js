const mongoose = require('mongoose');

const serieSchema = new mongoose.Schema({
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
    available: {
        type: Boolean,
        default: true
    },
    type: {
        type: String,
        default: "film"
    }
});

const Serie = mongoose.model('Serie', serieSchema);

module.exports = Serie;