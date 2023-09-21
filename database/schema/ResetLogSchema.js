'use strict'

const mongoose = require('mongoose');

var resetLogSchema = new mongoose.Schema({
    idUser: {type: String, required: true},
    type: {type: String, required: true},
    state: {type: String, required: true},
    sendDate: {type: Date, required: true},
    completeDate: {type: Date, required: false}
});

module.exports = mongoose.model('ResetLog', resetLogSchema);
