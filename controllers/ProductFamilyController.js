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

const FILENAME = 'ProductFamilyController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllProductFamily = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'readAllProductFamily';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  inv_FamProducto`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.createProductFamily = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'createProductFamily';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO inv_FamProducto  (fprod_nombre, fprod_descripcion) VALUES ('${data.fprod_nombre}', '${data.fprod_descripcion}')`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updateProductFamily = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'updateProductFamily';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE inv_FamProducto  SET fprod_nombre = '${data.fprod_nombre}',  fprod_descripcion = '${data.fprod_descripcion}' WHERE fprod_famiproducto = ${data.fprod_famiproducto}`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deleteProductFamily = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'deleteProductFamily';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM inv_FamProducto WHERE fprod_famiproducto = ${data.fprod_famiproducto}`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}