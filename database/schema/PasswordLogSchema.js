'use strict'

const mongoose = require('mongoose');

var passwordLogSchema = new mongoose.Schema({
    idUser: {type: String, required: true},
    pwd: {type: String, required: true},
    date: {type: Date, required: true},
    login: {type: Boolean, required: true}
});

module.exports = mongoose.model('PasswordLog', passwordLogSchema);
