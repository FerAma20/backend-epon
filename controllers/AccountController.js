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

const FILENAME = 'AccountController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */

exports.readAllAccountingItems = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'readAllAccountingItems';
    try {
        const { DateI, DateF, Status, Branch } = req.body;
        const pool = await sqlDriver.getPool();   
            let query = ` SELECT * FROM Poliza p
            WHERE p.pol_fecha BETWEEN '${DateI}' AND '${DateF}'
            ${Status != '-1'? `AND p.pol_id_estatus = ${Status}`: ''}
            ${Branch != -1? `AND p.pol_sucursal = ${Branch}`: ''}`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}
exports.readAllAccount = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'readAllAccount';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  CtaContable`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.readAllCostCenter = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'readAllCostCenter';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  centro_costo`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.readAllSucursal = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'readAllSucursal';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  ccee_SucursalConta`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.readAllUsers = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'readAllUsers';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  ccee_Usuario`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.getAccountingItemTemplate = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'getAccountingItemTemplate';
    try {
        var data = {
            listaDiarios : await getAllDayliType(),
            listaCuentas : await getAllAcconunts(),
            codigoMax : await getMaxCodigo()
        }
        console.log("antes del return");
            return responseManager.sendResponseWithDocument(res,data);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

getAllDayliType = async function() {
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM tipodiario t 
                        ORDER BY t.tdiario_nombre `;
                        console.log(query);
            const result = await pool.request().query(query);
            console.log(result.recordsets[0]);
            return result.recordsets[0];
    } catch (error) {
        console.log(error);
        return error;
    }
}

getAllAcconunts = async function() {
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM CtaContable`;
                        console.log(query);
            const result = await pool.request().query(query);
            console.log(result.recordsets[0]);
            return result.recordsets[0];
    } catch (error) {
        console.log(error);
        return error;
    }
}

getMaxCodigo = async function() {
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT  MAX(ppoliza_codigo) as codigo FROM plantilla_poliza`;
            const result = await pool.request().query(query);
            console.log(result.recordsets[0]);
            return result.recordsets[0][0].codigo;
    } catch (error) {
        console.log(error);
        return error;
    }
}


