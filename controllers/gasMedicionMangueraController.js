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

const FILENAME = 'gasMedicionTanqueController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllgasMedicionManguera= async function (req,res) {
    
    const functionname = 'readAllgasMedicionManguera';
    try {
        const pool = await sqlDriver.getPool();   
            let    query = `SELECT * FROM  gas_MedicionManguera`;           
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.creategasMedicionManguera = async function (req,res) {
    
    const functionname = 'creategasMedicionTanque';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO gas_MedicionTanque  (
                (    medma_manguera
                    ,medma_fecha
                    ,medma_hora
                    ,medma_lecturadigitalgal
                    ,medma_lecturadigitalquet
                    ,medma_difgal
                    ,medma_difquet
                    ,medma_lateralgal
                    ,medma_diflateral
                    ,medma_venta
                    ,medma_usuario
                    ,medma_tipolectura)
              VALUES
                    (?
                    ,?
                    ,?
                    ,?
                    ,?
                    ,?
                    ,?
                    ,?
                    ,?
                    ,?
                    ,?
                    ,?)`;
            const result = await pool.request().query(query,data.medma_manguera,data.medma_fecha,data.medma_hora,data.medma_lecturadigitalgal,data.medma_lecturadigitalquet,data.medma_difgal,
                data.medma_difquet,data.medma_lateralgal,data.medma_diflateral,data.medma_venta,data.medma_usuario,data.medma_tipolectura);

            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updategasMedicionTanque = async function (req,res) {
    
    const functionname = 'updategasMedicionTanque';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE gas_MedicionTanque  SET 
         medma_manguera = ?
        ,medma_fecha = ?
        ,medma_hora = ?
        ,medma_lecturadigitalgal = ?
        ,medma_lecturadigitalquet = ?
        ,medma_difgal = ?
        ,medma_difquet = ?
        ,medma_lateralgal = ?
        ,medma_diflateral = ?
        ,medma_venta = ?
        ,medma_usuario = ?
        ,medma_tipolectura = ?
        WHERE medma_medicionmanguera = ?`;        
            const result = await pool.request().query(querydata.medma_manguera,data.medma_fecha,data.medma_hora,data.medma_lecturadigitalgal,data.medma_lecturadigitalquet,data.medma_difgal,
                data.medma_difquet,data.medma_lateralgal,data.medma_diflateral,data.medma_venta,data.medma_usuario,data.medma_tipolectura,data.medma_medicionmanguera);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deletegasMedicionTanque = async function (req,res) {
    
    const functionname = 'deletegasMedicionTanque';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM gas_MedicionTanque 
            WHERE medma_medicionmanguera = ?`;
            const result = await pool.request().query(query,data.medma_medicionmanguera);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}