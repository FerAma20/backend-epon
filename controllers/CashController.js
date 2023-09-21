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

const FILENAME = 'CashController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAll = async function (req,res) {
    const functionname = 'readAll';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `SELECT Cja_NoCaja, Cja_Activo, Cja_Nombre, fk_CentroPago, Cja_EsPtoVenta FROM ccee_Caja cj
            JOIN ccee_CentroPago ccp on ccp.fk_SucursalConta = ${data.fk_sucursal}
            WHERE  cj.fk_CentroPago = ccp.CeP_NoCentroPago`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.create = async function (req,res) {
    const functionname = 'create';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO ccee_Caja  (Cja_Activo, Cja_Nombre, fk_CentroPago, Cja_EsPtoVenta) VALUES ('${data.Cja_Nombre}', '${data.Cja_Activo}', ${data.fk_CentroPago}, ${data.Cja_EsPtoVenta})`;
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
        let query = `UPDATE ccee_Caja  SET Cja_Nombre = '${data.Cja_Nombre}',  Cja_Activo = '${data.Cja_Activo}', fk_CentroPago= ${data.fk_CentroPago}, Cja_EsPtoVenta = ${data.Cja_EsPtoVenta} WHERE Cja_NoCaja = ${data.Cja_NoCaja}`;
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
            let query = `DELETE FROM ccee_Caja WHERE Cja_NoCaja = ${data.Cja_NoCaja}`;
            console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}