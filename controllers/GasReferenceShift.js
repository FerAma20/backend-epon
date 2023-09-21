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

const FILENAME = 'GasTuroShiftController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllReference = async function (req,res) {
    
    const functionname = 'readAllReference';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = `Select *,(CONVERT(VARCHAR(8),turref_horaini,108))inicio,(CONVERT(VARCHAR(8),turref_horafin,108))fin from gas_turnorefrencia`;     
    
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}






exports.deleteTurnoShift= async function (req,res) {
    
    const functionname = 'deleteTurnoShift';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = ` delete from gas_turnorefrencia where turref_turnoreferencia = ${data.turref_turnoreferencia} `;     
            
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}


exports.CreateReferenceShift= async function (req,res) {
    
    const functionname = 'CreateReferenceShift';
    try {
        console.log("iniciando")
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = ` insert into gas_turnorefrencia(turref_nombre,turref_horaini,turref_horafin) values ('${data.turref_nombre}' ,'${data.turref_horaini}' , '${data.turref_horafin}' )`;     
            
            console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}



exports.getGasTurnoByShift = async function (req,res) {
    
    const functionname = 'getGasTurnoByShift';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = `select * from gas_turnomanguera gtm  
            LEFT JOIN gas_turnorefrencia gtr on gtr.turref_turnoreferencia = gtm.turman_turno 
            where gtm.turman_empleado = ${data.turman_empleado} and ('${moment(data.date).format('hh:mm:ss')}' BETWEEN CONVERT(VARCHAR(8), gtr.turref_horaini, 108) and CONVERT(VARCHAR(8), gtr.turref_horafin, 108))`;  
            const result = await pool.request().query(query);
            
            var shift = null;
            var station = null;
            if(result.recordset.length > 0){
                shift = result.recordset[0];
                let    query2 = `SELECT bm.bom_estacion FROM gas_bomba bm
                LEFT JOIN gas_manguera gm on gm.man_bomba = bm.bom_bomba 
                WHERE gm.man_manguera = ${shift.turman_manguera};`;  
                const result2 = await pool.request().query(query2);    
                if(result2.recordset.length > 0 ) station = result2.recordset[0].bom_estacion;
            }

        return responseManager.sendResponseWithDocument(res,{shift : shift, station : station});
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}
exports.getGasTurnoByShiftAndHose = async function (req,res) {
    
    const functionname = 'getGasTurnoByShiftAndHose';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = `select * from gas_turnomanguera gtm  
            LEFT JOIN gas_turnorefrencia gtr on gtr.turref_turnoreferencia = gtm.turman_turno 
            where gtm.turman_empleado = ${data.turman_empleado} and ('${moment(data.date).format('hh:mm:ss')}' BETWEEN CONVERT(VARCHAR(8), gtr.turref_horaini, 108) and CONVERT(VARCHAR(8), gtr.turref_horafin, 108)) 
            and gtm.turman_manguera = ${data.turman_manguera}`;  
            const result = await pool.request().query(query);
        return responseManager.sendResponseWithDocument(res,result.recordset.length > 0? result.recordset[0] : null);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}