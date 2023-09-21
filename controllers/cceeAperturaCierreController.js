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

const FILENAME = 'cceeAperturaCierreController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllcceeAperturaCierre = async function (req,res) {
    
    const functionname = 'readAllcceeAperturaCierre';
    try {
        const pool = await sqlDriver.getPool();   
            let    query = `SELECT * FROM  ccee_AperturaCierre`;           
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.createcceeAperturaCierre = async function (req,res) {
    
    const functionname = 'createcceeAperturaCierre';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO ccee_AperturaCierre 
            (    ApC_Hora
                ,ApC_Fecha
                ,ApC_MontoEfectivo
                ,ApC_MontoDocumento
                ,ApC_MontoTransaccionElectronica
                ,ApC_Total
                ,ApC_AbreCierra
                ,fk_Caja
                ,fk_Cajero
                ,ApC_NoRecibo
                ,ApC_Observaciones
                ,ApC_MontoEfectivoDolar
                ,ApC_MontoDocumentoDolar
                ,ApC_MontoTransaccionElectronicaDolar]
                ) VALUES ( 
                ?, 
                ?, 
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
                )`;
            const result = await pool.request().query(query,
                data.ApC_Hora,data.ApC_Fecha,data.ApC_MontoEfectivo,data.ApC_MontoDocumento,data.ApC_MontoTransaccionElectronica,data.ApC_Total,
                data.ApC_AbreCierra,data.fk_caja,data.fk_cajero,data.ApC_NoRecibo,data.ApC_Observaciones,data.ApC_MontoEfectivoDolar,data.ApC_MontoDocumentoDolar,
                data.ApC_MontoTransaccionElectronicaDolar
                );

            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updatecceeAperturaCierre = async function (req,res) {
    
    const functionname = 'updatecceeAperturaCierre';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE ccee_AperturaCierre  SET 
         ApC_Hora = ?
        ,ApC_Fecha = ?
        ,ApC_MontoEfectivo = ?
        ,ApC_MontoDocumento = ?
        ,ApC_MontoTransaccionElectronica = ?
        ,ApC_Total = ?
        ,ApC_AbreCierra = ?
        ,fk_Caja = ?
        ,fk_Cajero = ?
        ,ApC_NoRecibo = ?
        ,ApC_Observaciones = ?
        ,ApC_MontoEfectivoDolar = ?
        ,ApC_MontoDocumentoDolar = ?
        ,ApC_MontoTransaccionElectronicaDolar = ?
        WHERE ApC_NoAperturaCierre = ?`;        
            const result = await pool.request().query(query,
                data.ApC_Hora,data.ApC_Fecha,data.ApC_MontoEfectivo,data.ApC_MontoDocumento,data.ApC_MontoTransaccionElectronica,data.ApC_Total,
                data.ApC_AbreCierra,data.fk_caja,data.fk_cajero,data.ApC_NoRecibo,data.ApC_Observaciones,data.ApC_MontoEfectivoDolar,data.ApC_MontoDocumentoDolar,
                data.ApC_MontoTransaccionElectronicaDolar,data.ApC_NoAperturaCierre
                );
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deletecceeAperturaCierre = async function (req,res) {
    
    const functionname = 'deletecceeAperturaCierre';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM ccee_AperturaCierre 
            WHERE ApC_NoAperturaCierre = ?`;
            const result = await pool.request().query(query,data.ApC_NoAperturaCierre);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}