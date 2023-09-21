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

const FILENAME = 'CashierPointOfSaleController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */

exports.readAllCashierPOS = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'readAllCashier';
    try {
        const { almpto_caja } = req.query;
        const pool = await sqlDriver.getPool();   
            let query = `SELECT pt.almpto_nombre, al.alm_almacen, al.alm_nombre, cs.SConta_id, cs.SConta_nombre FROM pto_ptoAlmacen pt
            INNER JOIN inv_Almacen al ON pt.almpto_almacen  = al.alm_almacen 
            INNER JOIN ccee_SucursalConta cs ON al.alm_sucursal = cs.SConta_id 
            WHERE pt.almpto_caja  = ${almpto_caja}`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.createCashier = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'createCashier';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO inv_Almacen  (alm_nombre, alm_tipoubicacion, alm_direccion ${data.alm_reabastece== null? "" :", alm_reabastece"}, alm_sucursal ) VALUES ( '${data.alm_nombre}', ${data.alm_tipoubicacion}, '${data.alm_direccion}'  ${data.alm_reabastece== null? "" :"," + data.alm_reabastece} , ${data.alm_sucursal} )`;
            console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updateCashier = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'updateCashier';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE inv_Almacen  SET  alm_nombre = '${data.alm_nombre}', alm_tipoubicacion = '${data.alm_tipoubicacion}', alm_direccion = '${data.alm_direccion}', alm_reabastece = '${data.alm_reabastece}', alm_sucursal = '${data.alm_sucursal}' WHERE alm_almacen = ${data.alm_almacen}`;        
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deleteCashier = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'deleteCashier';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM inv_Almacen WHERE alm_almacen = ${data.alm_almacen}`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}