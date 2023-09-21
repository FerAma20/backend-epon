var randomstring = require('randomstring');
var moment = require('moment');
var crypto = require('crypto-js');
var mongoose = require('mongoose');
const { Request, Response, NextFunction } = require('express');
const { CustomError } = require('../types/CustomError');

var path = require('path');
var filePath = path.resolve('data/Configuration.js');
var configuration = require(filePath);
var responseManager = require('../managers/responseManager');
var errorManager = require('../managers/errorManager');
var utils = require('../managers/utilManager');
const CONFIG = require('../config/config');
const { encriptacion } = require('../config/config');
const sqlDriver = require('../database/SQLDriver');

const FILENAME = 'PagoController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * 
 * consulta todos los pagos hechos, usa de parametros la fecha y cajero y caja, si todo viene vacio hace un top 20 de los ultimos pagos
 */
exports.readAll = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'readAll';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query ="";
            if  ((data.Pag_Fecha === undefined || data.Pag_Fecha === null) && (data.fk_Cajero === undefined || data.fk_Caja === null) ) {
                query = `SELECT top 20 * FROM  dbo.ccee_Pago  where Pag_NoPago >= 0  order by Pag_NoPago desc`;  

            }else{
               query = `SELECT * FROM  dbo.ccee_Pago  where Pag_NoPago >= 0`;
            
            
            if (data.Pag_Fecha === undefined || data.Pag_Fecha === null) {
                query = query +  ` and Pag_Fecha <= ${data.Pag_Fecha} `;
            }
            if (data.fk_Cajero === undefined || data.fk_Caja === null) {
                query = query +  ` and fk_Cajero = ${data.fk_Cajero} and fk_Caja = ${data.fk_Caja} `;
            }
          }
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}



exports.createPago = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'createPago';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `EXEC	sp_pago
            @Cajero = ${data.fk_Cajero},
            @Caja =   ${data.fk_Caja},
            @MedioPago = ${data.pkfk_MedioPago},
            @Monto = ${data.MPP_Monto},
            @Reserva = 0,
            @Rechazado = 0,
            @FechaHora = N'${data.Pag_Fecha}',
            @NoTransaccion = N'${data.MPP_NoTransaccion}',
            @Observacion = N'${data.MPP_Observacion}',
            @Banco = ${data.fk_Banco}`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}


exports.delete = async function (req,res) {
    const functionname = 'delete';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM ccee_Pago WHERE Pag_NoPago = ${data.id}`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}