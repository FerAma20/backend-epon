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

const FILENAME = 'cceeCargoEconomicootros.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllcceeCargoEconomicootros = async function (req,res) {
    
    const functionname = 'readAllcceeCargoEconomicootros';
    try {
        const pool = await sqlDriver.getPool();   
            let    query = `SELECT top 100 * FROM ccee_CargoEconomico_otros  `;           
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.createCargoEconomico = async function (req,res) {
    
    const functionname = 'createCargoEconomico';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO ccee_CargoEconomico_otros  (
                CEcO_Monto, CEcO_FechaGeneracion, fk_Pago, fk_Sucursal, fk_producto, fk_turno, NoVale, NoPlaca, NombrePiloto, DpiPiloto, fk_manguera, fk_empleado, AutoServicio, Galones, inv_HistoricoPrecioProd
                ) VALUES ( 
                    ${data.CEcO_Monto},	'${data.CEcO_FechaGeneracion}',	${data.fk_Pago},	${data.fk_Sucursal},	${data.fk_producto},	${data.fk_turno},	'${data.NoVale? data.NoVale :'' }',	'${data.NoPlaca? data.NoPlaca :''}',	'${data.NombrePiloto? data.NombrePiloto: ''}',	'${data.DpiPiloto? data.DpiPiloto : ''}',	${data.fk_manguera},	${data.fk_empleado},	${data.AutoServicio},	${data.Galones},	${data.inv_HistoricoPrecioProd? data.inv_HistoricoPrecioProd : null}
                )`;
                const result = await pool.request().query(query);
                return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updatecceeCargoEconomicootros = async function (req,res) {
    
    const functionname = 'updatecceeCargoEconomicootros';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE ccee_CargoEconomico_otros  SET 
        fk_producto = ?,
        fk_turno = ?,
        fk_manguera = ?,
        NoVale = ?,
        NoPlaca = ?,
        NombrePiloto = ?,
        DpiPiloto = ?,
        AutoServicio = ?,
        Galones = ?,
        fk_PrecioHistorico = ?

        WHERE fk_producto = ? and fk_turno = ? and fk_manguera and fk_PrecioHistorico= ? `;        
            const result = await pool.request().query(query,data.fk_producto, data.fk_turno,data.fk_manguera,data.fk_PrecioHistorico);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deletecceeCargoEconomicootros = async function (req,res) {
    
    const functionname = 'deletecceeCargoEconomicootros';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM ccee_CargoEconomico_otros 
            WHERE fk_producto = ? and fk_turno = ?  and fk_manguera and fk_PrecioHistorico`;
            const result = await pool.request().query(query,data.turman_manguera,data.turman_turno);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}