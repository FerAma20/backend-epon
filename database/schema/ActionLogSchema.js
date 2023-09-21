'use strict'

const mongoose = require('mongoose');

var actionLogSchema = new mongoose.Schema({
    idUser: {type: String, required: true},
    date: {type: Date, required: true},
    idAction: {type: Number, required: true},
    action: {type: String, required: true},
    device: {type: String, required: false},
    description: {type: String, required: false},
});

module.exports = mongoose.model('ActionLog', actionLogSchema);