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

const FILENAME = 'ProjectRequestController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAll = async function (req,res) {
    const functionname = 'readAll';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM proy_solicitud`;
            const result = await pool.request().query(query);
            console.log(result.recordset);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.create = async function (req,res) {
    const functionname = 'create';
    try {
        const data = req.body;
        console.log(data);
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO proy_solicitud (sol_fecha, sol_proyecto, sol_actividad, sol_insumokm, sol_descripcion, sol_tiposol) VALUES ( '${data.sol_fecha}',${data.sol_proyecto}, '${data.sol_actividad}', '${data.sol_insumokm}','${data.sol_descripcion}',${data.sol_tiposol})`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.update = async function (req,res) {
    const functionname = 'update';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE proy_solicitud  SET  sol_fecha = '${data.sol_fecha}', sol_proyecto = ${data. sol_proyecto}, sol_actividad = '${data. sol_actividad}', sol_insumokm = '${data. sol_insumokm}', sol_descripcion = '${data. sol_descripcion}', sol_tiposol = ${data. sol_tiposol} WHERE sol_solicitud = ${data.sol_solicitud}`;        
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.delete = async function (req,res) {
    const functionname = 'delete';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM proy_solicitud WHERE sol_solicitud = ${data.sol_solicitud}`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}
