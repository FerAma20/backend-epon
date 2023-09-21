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

const FILENAME = 'OrderInventaryController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllOrderInventary = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'readAllOrderInventary';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  inv_OrdenInventario`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.createOrderInventary = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'createOrderInventary';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO inv_OrdenInventario  (ordinv_fecha, ordinv_usuario, ordinv_tipoorden ) VALUES ( '${data.ordinv_fecha}', ${data.ordinv_usuario}, ${data.ordinv_tipoorden})
            SELECT SCOPE_IDENTITY() as ordinv_ordeninventario`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordsets);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updateOrderInventary = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'updateOrderInventary';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE inv_Almacen  SET  ordinv_fecha = '${data.ordinv_fecha}', ordinv_ordeninventario = '${data.ordinv_ordeninventario}', ordinv_tipoorden = '${data.ordinv_tipoorden}' WHERE ordinv_usuario = ${data.ordinv_usuario}`;        
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deleteOrderInventary = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'deleteOrderInventary';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM inv_OrdenInventario WHERE ordinv_usuario = ${data.ordinv_usuario}`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}