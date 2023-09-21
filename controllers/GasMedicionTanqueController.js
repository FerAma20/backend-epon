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
exports.readAllgasMedicionTanque = async function (req,res) {
    
    const functionname = 'readAllgasMedicionTanque';
    try {
        const pool = await sqlDriver.getPool();   
            let    query = `SELECT * FROM  gas_MedicionTanque`;           
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.creategasMedicionTanque = async function (req,res) {
    
    const functionname = 'creategasMedicionTanque';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO gas_MedicionTanque  (
                     medta_tanque
                    ,medta_pulg
                    ,medta_galones
                    ,medta_fecha
                    ,medta_hora
                    ,medta_observacion
                    ,medta_usuario
                ) VALUES ( 
                ?, 
                ?, 
                ?,
                ?,
                ?,
                ?,
                ?
                )`;
            const result = await pool.request().query(query,data.medta_tanque,data.medta_pulg,data.medta_galones,data.medta_fecha,data.medta_hora,data.medta_observacion,data.medta_usuario);

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
         medta_tanque = ?
        ,medta_pulg = ?
        ,medta_galones = ?
        ,medta_fecha = ?
        ,medta_hora = ?
        ,medta_observacion = ?
        ,medta_usuario = ?
        WHERE medta_mediciontanque = ?`;        
            const result = await pool.request().query(query,data.medta_tanque,data.medta_pulg,data.medta_galones,data.medta_fecha,data.medta_hora,data.medta_observacion,data.medta_usuario,data.medta_mediciontanque);
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
            WHERE medta_mediciontanque = ?`;
            const result = await pool.request().query(query,data.medta_mediciontanque);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}