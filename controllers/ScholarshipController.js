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

const FILENAME = 'ScholarshipController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAll = async function (req,res) {
    const functionname = 'readAll';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM proy_escolaridad`;
            const result = await pool.request().query(query);
            console.log(result.recordset);
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
            let query = `INSERT INTO proy_escolaridad (esc_nombre) VALUES ( '${data.esc_nombre}' )`;
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
        let query = `UPDATE proy_escolaridad  SET  esc_nombre = '${data.esc_nombre}' WHERE esc_escolaridad = ${data.esc_escolaridad}`;        
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
            let query = `DELETE FROM proy_escolaridad WHERE esc_escolaridad = ${data.esc_escolaridad}`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}