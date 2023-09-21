'use strict'

const mongoose = require('mongoose');

var sessionLogSchema = new mongoose.Schema({
    idUser: {type: String, required: true},
    initTime: {type: Date, required: true},
    endTime: {type: Date, required: false},
    ipAddress: {type: String, required: true},
    device: {type: String, required: false}
});

module.exports = mongoose.model('SessionLog', sessionLogSchema);