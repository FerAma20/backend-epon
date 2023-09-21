'use strict'

const mongoose = require('mongoose');

var companySchema = new mongoose.Schema({
    Com_Id: {type: String, required: true},
    Com_Nit: {type: String, required: true},
    Com_RTU: {type: Date, required: true}
});

module.exports = mongoose.model('CompanyLog', companySchema);
