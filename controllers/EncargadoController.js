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

const FILENAME = 'EncargadoController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllEncargadoP = async function (req,res) {
    
    const functionname = 'readAllEncargadoP';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = ` select * from proy_encargado pe join proy_encargadoproyecto pe2 on pe.enc_encargado = pe2.encproy_encargado where encproy_proyecto = ${data.encproy_proyecto} `;     
    
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}


