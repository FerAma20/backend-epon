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
exports.readAllWarehouseProduct = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'readAllWarehouseProduct';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  inv_AlmacenProducto`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.createWarehouseProduct = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'createWarehouseProduct';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO inv_AlmacenProducto  (
                almprod_almacen, 
                almprod_producto, 
                almprod_cantidad, 
                almprod_costoactual,
                almprod_fechaactualizacion 
                ) VALUES ( 
                ${data.almprod_almacen}, 
                ${data.almprod_producto}, 
                ${data.almprod_cantidad}, 
                ${data.almprod_costoactual},
                '${data.almprod_fechaactualizacion}'
                )`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updateWarehouseProduct = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'updateWarehouseProduct';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE inv_AlmacenProducto  SET 
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

exports.deleteWarehouseProduct = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'deleteWarehouseProduct';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM inv_AlmacenProducto 
            WHERE almprod_almacen = ${data.almprod_almacen}
            AND almprod_producto = ${data.almprod_producto}`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}