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

const FILENAME = 'GasTurnoReferenciaController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllGasTurnoReferencia = async function (req,res) {
    
    const functionname = 'readAllGasTurnoReferencia';
    try {
        const pool = await sqlDriver.getPool();   
            let    query = `SELECT * FROM  gas_turnoReferencia`;           
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.createGasTurnoReferencia = async function (req,res) {
    
    const functionname = 'createGasTurnoReferencia';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO gas_turnoReferencia  (
                turref_nombre,
                turref_horaini,
                turref_horafin
                ) VALUES ( 
                ?,
                ?,
                ?
                )`;
            const result = await pool.request().query(query,data.turman_manguera,data.turman_turno);

            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updateGasTurnoReferencia = async function (req,res) {
    
    const functionname = 'updateGasTurnoReferencia';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE gas_turnoReferencia  SET 
        turref_nombre = ?,
        turref_horaini = ?,
        turref_horafin = ?

        WHERE turref_turnoreferencia = ?`;        
            const result = await pool.request().query(query,data.turman_manguera,data.turman_turno);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deleteGasTurnoReferencia = async function (req,res) {
    
    const functionname = 'deleteGasTurnoReferencia';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM gas_turnoReferencia 
            WHERE turref_turnoreferencia = ?`;
            const result = await pool.request().query(query,data.turman_manguera,data.turman_turno);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}