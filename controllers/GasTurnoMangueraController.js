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

const FILENAME = 'GasTurnoMangueraController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllGasTurnoManguera = async function (req,res) {
    
    const functionname = 'readAllGasTurnoManguera';
    try {
        const pool = await sqlDriver.getPool();   
            let    query = `SELECT * FROM  gas_turnoManguera`;           
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.createGasTurnoManguera = async function (req,res) {
    
    const functionname = 'createGasTurnoManguera';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO gas_turnoManguera  (
                turman_manguera,
                turman_turno
                ) VALUES ( 
                ?,
                ?
                )`;
            const result = await pool.request().query(query,data.turman_manguera,data.turman_turno);

            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updateiGasTurnoManguera = async function (req,res) {
    
    const functionname = 'updateGasTurnoManguera';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE gas_turnoManguera  SET 
        turman_manguera,
        turman_turno

        WHERE turman_manguera = ? and turman_turno = ?`;        
            const result = await pool.request().query(query,data.turman_manguera,data.turman_turno);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deleteGasTurnoManguera = async function (req,res) {
    
    const functionname = 'deleteGasTurnoManguera';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM gas_turnoManguera 
            WHERE turman_manguera = ? and turman_turno = ?`;
            const result = await pool.request().query(query,data.turman_manguera,data.turman_turno);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}