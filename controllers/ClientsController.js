var randomstring = require('randomstring');
var moment = require('moment');
var crypto = require('crypto-js');
var mongoose = require('mongoose');
const { Request, Response, NextFunction } = require('express');
const { CustomError } = require('../types/CustomError');

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('data/Configuration.js');
var configuration = require(filePath);
var responseManager = require('../managers/responseManager');
var errorManager = require('../managers/errorManager');
var utils = require('../managers/utilManager');
const CONFIG = require('../config/config');
const { encriptacion } = require('../config/config');
const sqlDriver = require('../database/SQLDriver');

const FILENAME = 'ClientsController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.createClient = async function (req,res) {
    const functionname = 'createClient';
    try {
        console.log('entro a createClient')
        const {NoC_Nombre, NoC_Apellido, NoC_Nit, NoC_NumTelefono, NoC_Direccion, NoC_mail, NoC_DPI} = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO ccee_NoColegiado 
            (NoC_Nombre, NoC_Apellido, NoC_Nit, NoC_NumTelefono, NoC_Direccion, NoC_mail, NoC_DPI) 
            VALUES 
            ('${NoC_Nombre}', '${NoC_Apellido}', '${NoC_Nit}', ${NoC_NumTelefono}, '${NoC_Direccion}', '${NoC_mail}', '${NoC_DPI}' )
            SELECT SCOPE_IDENTITY() as NoC_NoNoColegiado `;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 504, res, 'Error de registro');
    }
}