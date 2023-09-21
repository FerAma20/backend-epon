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

const FILENAME = 'GasValeSucursalController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllGasValeSucursal = async function (req,res) {
    
    const functionname = 'readAllGasValeSucursal';
    try {
        const pool = await sqlDriver.getPool();   
            let    query = `SELECT * FROM  gas_ValeSucursal`;           
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.createGasValeSucursal = async function (req,res) {
    
    const functionname = 'createGasValeSucursal';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO gas_ValeSucursal  (
                valsu_sucursal,
                valsu_cliente
                ) VALUES ( 
                ?,
                ?

                )`;
            const result = await pool.request().query(query,data.valsu_sucursal,data.valsu_cliente);

            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updateGasValeSucursal = async function (req,res) {
    
    const functionname = 'updateGasValeSucursal';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE gas_ValeSucursal  SET 
        valsu_sucursal = ?,
        valsu_cliente = ?

        WHERE valsu_sucursal = ? and valsu_cliente= ? `;        
            const result = await pool.request().query(query,data.valsu_sucursal,valsu_cliente);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deleteGasValeSucursal = async function (req,res) {
    
    const functionname = 'deleteGasValeSucursal';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM gas_ValeSucursal 
            WHERE valsu_sucursal = ? and valsu_cliente`;
            const result = await pool.request().query(query,data.turman_manguera,data.turman_turno);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}