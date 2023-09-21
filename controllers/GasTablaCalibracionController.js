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

const FILENAME = 'gasTablaCalibracionController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllgasTablaCalibracion = async function (req,res) {
    
    const functionname = 'readAllgasTablaCalibracion';
    try {
        const pool = await sqlDriver.getPool();   
            let    query = `SELECT * FROM  gas_TablaCalibracion`;           
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.creategasTablaCalibracion = async function (req,res) {
    
    const functionname = 'creategasTablaCalibracion';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO gas_TablaCalibracion  (
                taca_tanque
                ,taca_pulg
                ,taca_galones
                ) VALUES ( 
                ?, 
                ?, 
                ? 
                )`;
            const result = await pool.request().query(query,data.taca_tanque,data.taca_pulg,data.taca_galones);

            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updategasTablaCalibracion = async function (req,res) {
    
    const functionname = 'updategasTablaCalibracion';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE gas_TablaCalibracion  SET 
        taca_tanque = ?
        ,taca_pulg = ?
        ,taca_galones = ?
        WHERE taca_tablacalibracion = ?`;        
            const result = await pool.request().query(query,data.taca_tanque,data.taca_pulg,data.taca_galones,data.taca_tablacalibracion );
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deletegasTablaCalibracion = async function (req,res) {
    
    const functionname = 'deletegasTablaCalibracion';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM gas_TablaCalibracion 
            WHERE taca_tablacalibracion = ?`;
            const result = await pool.request().query(query,data.taca_tablacalibracion);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}