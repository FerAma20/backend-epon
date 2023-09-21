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

const FILENAME = 'GasBombaController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllGasBomba = async function (req,res) {
    
    const functionname = 'readAllGasBomba';
    try {
        const pool = await sqlDriver.getPool();   
            let    query = `SELECT * FROM  gas_bomba ` ;           
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}


exports.readCodeGasBomba = async function (req,res) {
    
    const functionname = 'readCodeGasBomba';
    try {
        const pool = await sqlDriver.getPool(); 
        const data = req.body;  
            let    query = `SELECT * FROM  gas_bomba  where bom_estacion =${data.bom_estacion}` ;           
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.createGasBomba = async function (req,res) {
    
    const functionname = 'createGasBomba';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO gas_bomba  (
                bom_nombre, 
                bom_estacion
                ) VALUES ( 
                 '${data.bom_nombre}',
                 ${data.bom_estacion}
                )`;
            const result = await pool.request().query(query);

            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updateGasBomba = async function (req,res) {
    
    const functionname = 'updateGasBomba';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE gas_bomba  SET 
        bom_nombre = ?, 
        bom_estacion = ?

        WHERE bom_bomba = ?
        `;        
            const result = await pool.request().query(query,data.bom_nombre,data.bom_estacion,data.bom_bomba);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deleteGasBomba = async function (req,res) {
    
    const functionname = 'deleteGasBomba';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM gas_bomba 
            WHERE bom_bomba = ${data.bom_bomba}`;
            const result = await pool.request().query(query,data.bom_bomba);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}