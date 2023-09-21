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

const FILENAME = 'UnitMeasurementCategoryController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllUnitMeasurementCategory = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'readAllCategoryUM';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  inv_CategoriaUniMed`;
            
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.createUnitMeasurementCategory = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'createCategoryUM';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO inv_CategoriaUniMed (catun_nombre, catun_descripcion) VALUES ('${data.catun_nombre}', '${data.catun_descripcion}')`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updateUnitMeasurementCategory = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'updateCategoryUM';
    try {
        const data = req.body;
        console.log(data);
        const pool = await sqlDriver.getPool();   
            let query = `UPDATE inv_CategoriaUniMed SET catun_nombre = '${data.catun_nombre}', catun_descripcion = '${data.catun_descripcion}' WHERE catun_categoriaunidadmedia = ${data.catun_categoriaunidadmedia}`;
            console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deleteUnitMeasurementCategory = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'deleteCategoryUM';
    try {
        const data = req.body;
        console.log(data);
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM inv_CategoriaUniMed WHERE catun_categoriaunidadmedia = ${data.catun_categoriaunidadmedia}`;
            console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}