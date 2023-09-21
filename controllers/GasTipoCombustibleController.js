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

const FILENAME = 'GasTipoCombustibleController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllGasTipoCombustible = async function (req,res) {
    
    const functionname = 'readAllGasTipoCombustible';
    try {
        const pool = await sqlDriver.getPool();   
            let    query = `SELECT * FROM  gas_TipoCombustible`;           
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.createGasTipoCombustible = async function (req,res) {
    
    const functionname = 'createGasTipoCombustible';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO gas_TipoCombustible  (
                tcom_nombre, 
                ) VALUES ( 
                ? 
                )`;
            const result = await pool.request().query(query,data.tcom_nombre);

            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updateGasTipoCombustible = async function (req,res) {
    
    const functionname = 'updateGasTipoCombustible';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE gas_TipoCombustible  SET 
        tcom_nombre = ?

        WHERE tcom_tipocombustible = ?`;        
            const result = await pool.request().query(query,data.tcom_nombre,data.tcom_tipocombustible);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deleteGasTipoCombustible = async function (req,res) {
    
    const functionname = 'deleteGasTipoCombustible';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM gas_TipoCombustible 
            WHERE tcom_tipocombustible = ?`;
            const result = await pool.request().query(query,data.tcom_tipocombustible);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}