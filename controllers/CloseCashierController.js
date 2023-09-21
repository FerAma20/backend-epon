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

const FILENAME = 'CloseCashierController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */

exports.checkActual = async function (req,res) {
    const functionname = 'checkActual';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   

        let queryA = `SELECT * FROM  ccee_AperturaCierre apc
        LEFT JOIN ccee_Caja cj on apc.fk_Caja = cj.Cja_NoCaja
        WHERE ApC_AbreCierra = 1 and fk_Caja= ${data.fk_Caja} and fk_Cajero <> ${data.fk_Cajero}`;
        const resultA = await pool.request().query(queryA);

        if(resultA.recordset.length > 0)
            return responseManager.sendResponseWithDocument(res,true);
        else
            return responseManager.sendResponseWithDocument(res,false);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.getActual = async function (req,res) {
    const functionname = 'getActual';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   

        let query = `SELECT * FROM  ccee_AperturaCierre apc
        LEFT JOIN ccee_Caja cj on apc.fk_Caja = cj.Cja_NoCaja
        WHERE ApC_AbreCierra <> 0 and fk_Cajero = ${data.fk_Cajero}
        ORDER BY ApC_Fecha DESC`;
        const result = await pool.request().query(query);
        var actual = result.recordset.length>0? result.recordset[0] : null;
        var actualClosed = null;
        if(actual){
            let query2 = `SELECT * FROM  ccee_AperturaCierre apc
            LEFT JOIN ccee_Caja cj on apc.fk_Caja = cj.Cja_NoCaja
            WHERE ApC_AbreCierra = 0 and fk_Cajero = ${data.fk_Cajero} and fk_Caja = ${actual.fk_Caja} and ApC_Fecha >= '${actual.ApC_Hora}'`;
            const result2 = await pool.request().query(query2);
            actualClosed = result2.recordset.length>0? result2.recordset[0] : null;
        }
        return responseManager.sendResponseWithDocument(res,actualClosed? null : actual);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.readAll = async function (req,res) {
    const functionname = 'readAll';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  ccee_AperturaCierre
                        where (ApC_Fecha between '${data.fechai}' and  '${data.fechaf}' )`;
            const result = await pool.request().query(query);
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
            let recibo = 1;
            let query = `INSERT INTO ccee_AperturaCierre  (ApC_Hora, ApC_Fecha, ApC_MontoEfectivo, ApC_MontoDocumento, ApC_MontoTransaccionElectronica, ApC_Total, ApC_AbreCierra, fk_Caja, fk_Cajero, ApC_NoRecibo, ApC_Observaciones, ApC_MontoEfectivoDolar, ApC_MontoDocumentoDolar, ApC_MontoTransaccionElectronicaDolar) 
                        VALUES ('${data.ApC_Hora}',	'${ data.ApC_Fecha}', ${ data.ApC_MontoEfectivo},	${ data.ApC_MontoDocumento},	${ data.ApC_MontoTransaccionElectronica}, ${ data.ApC_Total},	${ data.ApC_AbreCierra},	${ data.fk_Caja}, ${ data.fk_Cajero},	${recibo}, '${ data.ApC_Observaciones}', ${ data.ApC_MontoEfectivoDolar}, ${ data.ApC_MontoDocumentoDolar}, ${ data.ApC_MontoTransaccionElectronicaDolar})`;
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
        let query = `UPDATE ccee_AperturaCierre  SET 
        ApC_Hora = '${data.ApC_Hora}',	  ApC_Fecha = '${ data.ApC_Fecha}',	  ApC_MontoEfectivo = ${ data.ApC_MontoEfectivo},	  ApC_MontoDocumento = ${ data.ApC_MontoDocumento},	  ApC_MontoTransaccionElectronica = ${ data.ApC_MontoTransaccionElectronica},	  ApC_Total = ${ data.ApC_Total},	  ApC_AbreCierra = ${ data.ApC_AbreCierra},	  fk_Caja = ${ data.fk_Caja},	  fk_Cajero = ${ data.fk_Cajero},	  ApC_NoRecibo = ${ data.ApC_NoRecibo},	  ApC_Observaciones = '${ data.ApC_Observaciones}',	  ApC_MontoEfectivoDolar = ${ data.ApC_MontoEfectivoDolar},	  ApC_MontoDocumentoDolar = ${ data.ApC_MontoDocumentoDolar},	  ApC_MontoTransaccionElectronicaDolar = ${ data.ApC_MontoTransaccionElectronicaDolar} 
        WHERE ApC_NoAperturaCierre = ${data.ApC_NoAperturaCierre}`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.temporalyClose = async function (req,res) {
    const functionname = 'temporalyClose';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE ccee_AperturaCierre  SET 
        ApC_AbreCierra = ${ data.ApC_AbreCierra} WHERE ApC_NoAperturaCierre = ${data.ApC_NoAperturaCierre}`;
        console.log(query);
            const result = await pool.request().query(query);
            console.log(result);
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
            let query = `DELETE FROM ccee_AperturaCierre WHERE ApC_NoAperturaCierre = ${data.ApC_NoAperturaCierre}`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.getAllPayments = async function (req,res) {
    const functionname = 'getAllPayments';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * from ccee_Pago cp LEFT JOIN ccee_MedioPago_Pago_C cmppc ON cmppc.fk_Pago = cp.Pag_NoPago
            where cp.fk_Caja = ${data.fk_caja} and cp.fk_Cajero = ${data.fk_cajero} and (cp.Pag_Fecha between '${data.fechai}' and  '${data.fechaf}' )`;
            const result = await pool.request().query(query);
            let {cashGTQ, cashUSD, cardGTQ, cardUSD, totalGTQ, totalUSD, voucherGTQ, voucherUSD} = 0;
                // filtrar efectivo quetzales ID 1
                cashGTQ = result.recordset.filter(x=> x.fk_MedioPago === 1).reduce((accumulator, object) => {
                    return accumulator + object.Pag_Monto;
                  }, 0);
                // filtrar tarjeta quetzales ID 2
                cardGTQ = result.recordset.filter(x=> x.fk_MedioPago === 2).reduce((accumulator, object) => {
                    return accumulator + object.Pag_Monto;
                  }, 0);
                // filtrar efectivo dolares ID 6
                cashUSD = result.recordset.filter(x=> x.fk_MedioPago === 6).reduce((accumulator, object) => {
                    return accumulator + object.Pag_Monto;
                  }, 0);
                // filtrar tarjeta dolares ID 7
                cardUSD = result.recordset.filter(x=> x.fk_MedioPago === 7).reduce((accumulator, object) => {
                    return accumulator + object.Pag_Monto;
                  }, 0);
                // filtrar vales quetzales ID 4
                voucherGTQ = result.recordset.filter(x=> x.fk_MedioPago === 4).reduce((accumulator, object) => {
                    return accumulator + object.Pag_Monto;
                }, 0);
                // filtrar vales dolares ID 8
                voucherUSD = result.recordset.filter(x=> x.fk_MedioPago === 8).reduce((accumulator, object) => {
                    return accumulator + object.Pag_Monto;
                    }, 0);
                totalGTQ = cashGTQ + cardGTQ + voucherGTQ;
                totalUSD = cashUSD + cardUSD + voucherUSD;
            return responseManager.sendResponseWithDocument(res,{cashGTQ: cashGTQ, cashUSD: cashUSD, cardGTQ: cardGTQ, cardUSD: cardUSD, totalGTQ: totalGTQ, totalUSD: totalUSD, voucherGTQ: voucherGTQ, voucherUSD: voucherUSD});
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}