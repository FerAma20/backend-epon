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

const FILENAME = 'WarehouseProductController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllCompany = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'readAllCompany';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  empre_Company`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.createCompany = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'createCompany';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO empre_Company  (
                com_nombre, 
                com_nit, 
                com_direccion, 
                com_telefono,
                com_mail ,
                com_contador ,
                com_nitContador 
                ) VALUES ( 
                '${data.com_nombre}', 
                '${data.com_nit}', 
                '${data.com_direccion}', 
                '${data.com_telefono}',
                '${data.com_mail}',
                '${data.com_contador}',
                '${data.com_nitContador}'
                )
                SELECT SCOPE_IDENTITY() as com_company`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordsets);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updateCompany = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'updateCompany';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE empre_Company  SET 
        almprod_cantidad = '${data.almprod_cantidad}', 
        almprod_costoactual = '${data.almprod_costoactual}', 
        almprod_fechaactualizacion = '${data.almprod_fechaactualizacion}' 
        WHERE almprod_almacen = ${data.almprod_almacen}
        AND almprod_producto = ${data.almprod_producto}`;        
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deleteCompany = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'deleteCompany';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM empre_Company 
            WHERE almprod_almacen = ${data.almprod_almacen}
            AND almprod_producto = ${data.almprod_producto}`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}