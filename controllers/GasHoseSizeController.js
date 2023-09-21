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

const FILENAME = 'GasHoseZiseController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */

exports.CreateFuelHoseSize= async function (req,res) {
    
    const functionname = 'CreateFuelHoseSize';
    try {
        console.log("iniciando")
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = ` insert into gas_MedicionManguera(
                medma_manguera,
                medma_fecha,
                medma_hora,
                medma_lecturadigitalgal,
                medma_lecturadigitalquet,
                medma_difgal,
                medma_difquet,
                medma_lateralgal,
                medma_diflateral,
                medma_venta,
                medma_usuario,
                medma_tipolectura
                )values(
                    ${data.medma_manguera},
                    '${data.medma_fecha}',
                    '${data.medma_hora}',
                    ${data.medma_lecturadigitalgal},
                    ${data.medma_lecturadigitalquet},
                    ${data.medma_difgal},
                    ${data.medma_difquet},
                    ${data.medma_lateralgal},
                    ${data.medma_diflateral},
                    ${data.medma_venta},
                    ${data.medma_usuario},
                    ${data.medma_tipolectura}
   
            ) `;     
            
            console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.UpdateFuelHoseSize= async function (req,res) {
    
    const functionname = 'UpdateFuelHoseSize';
    try {
        console.log("iniciando")
        const data = req.body;
        const pool = await sqlDriver.getPool();   

           
            query = ` update gas_MedicionManguera 
            set medma_lecturadigitalgal = ${data.medma_lecturadigitalgal},
            medma_lecturadigitalquet = ${data.medma_lecturadigitalquet},
            medma_difgal = ${data.medma_difgal},
            medma_difquet = ${data.medma_difquet},
            medma_lateralgal = ${data.medma_lateralgal},
            medma_diflateral = ${data.medma_diflateral},
            medma_venta = ${data.medma_venta}

            where medma_medicionmanguera = ${data.medma_medicionmanguera}
             `;     
            
            console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.readHistory = async function (req,res) {
    
    const functionname = 'readHistory';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   

           let    query = `select * ,IIF(medma_tipolectura = 0, 'DIARIO', 'REINICIO') AS Tipo,(CONVERT(VARCHAR(10),medma_fecha,126))fecha,(CONVERT(VARCHAR(8),medma_hora,108))hora from gas_MedicionManguera 
            where medma_manguera= ${data.medma_manguera} and (medma_fecha between '${data.fechai}' and  '${data.fechaf}' )`;         
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deleteFuelHoseSize= async function (req,res) {
    
    const functionname = 'deleteFuelHoseSize';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = ` delete from gas_MedicionManguera where medma_medicionmanguera = ${data.medma_medicionmanguera} `;     
            
            console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.CreateFuelHoseSizeMobile= async function (req,res) {
    
    const functionname = 'CreateFuelHoseSizeMobile';
    try {
        const data = req.body;
        let last = await calculation(data.medma_manguera, data.medma_fecha, data.medma_hora, data.medma_usuario);       
        if(data.medma_lecturadigitalgal < last.medma_lecturadigitalgal)
            return responseManager.sendResponseWithDocument(res,null);
        else{
            const pool = await sqlDriver.getPool();   
                let query = ` insert into gas_MedicionManguera(
                    medma_manguera,
                    medma_fecha,
                    medma_hora,
                    medma_lecturadigitalgal,
                    medma_lecturadigitalquet,
                    medma_difgal,
                    medma_difquet,
                    medma_lateralgal,
                    medma_diflateral,
                    medma_venta,
                    medma_usuario,
                    medma_tipolectura
                    )values(
                        ${data.medma_manguera},
                        '${data.medma_fecha}',
                        '${data.medma_hora}',
                        ${data.medma_lecturadigitalgal},
                        ${data.medma_lecturadigitalquet},
                        ${last? Math.abs(data.medma_lecturadigitalgal - last.medma_lecturadigitalgal) : 0},
                        ${last? Math.abs(data.medma_lecturadigitalquet - last.medma_lecturadigitalquet) : 0},
                        ${data.medma_lateralgal},
                        ${last? Math.abs(data.medma_lateralgal - last.medma_lateralgal) : 0},
                        ${data.medma_lecturadigitalquet},
                        ${data.medma_usuario},
                        ${data.medma_tipolectura}
       
                ) `;                 
                const result = await pool.request().query(query);
                return responseManager.sendResponseWithDocument(res,true);            
        }        
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.UpdateFuelHoseSizeMobile= async function (req,res) {
    
    const functionname = 'UpdateFuelHoseSizeMobile';
    try {
        const data = req.body;
        let last = await calculation(data.medma_manguera, data.medma_fecha, data.medma_hora, data.medma_usuario);
    
        if(data.medma_lecturadigitalgal < last.medma_lecturadigitalgal)
            return responseManager.sendResponseWithDocument(res,null);
        else{
            const pool = await sqlDriver.getPool();   
                query = ` update gas_MedicionManguera 
                set medma_lecturadigitalgal = ${data.medma_lecturadigitalgal},
                medma_lecturadigitalquet = ${data.medma_lecturadigitalquet},
                medma_difgal = ${last? Math.abs(data.medma_lecturadigitalgal - last.medma_lecturadigitalgal) : 0},
                medma_difquet = ${last? Math.abs(data.medma_lecturadigitalquet - last.medma_lecturadigitalquet) : 0},
                medma_lateralgal = ${data.medma_lateralgal},
                medma_diflateral = ${last? Math.abs(data.medma_lateralgal - last.medma_lateralgal) : 0},
                medma_venta = ${data.medma_lecturadigitalquet}
                where medma_medicionmanguera = ${data.medma_medicionmanguera}
                 `;     
                const result = await pool.request().query(query);
                return responseManager.sendResponseWithDocument(res,true);
        }
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }    
}

calculation = async function(manguera, fecha, hora, usuario){
    try { //SOLO SI ES TIPO 0 DE LECTURA DIARIA Y NO PUEDE SER LECTURA MENOR A LA ANTERIOR
        const pool = await sqlDriver.getPool();   

           let query = `select * from gas_MedicionManguera 
            where medma_manguera= ${manguera}  and  (medma_fecha < '${fecha}')`;     
            const result = await pool.request().query(query);
            result.recordset.sort(function (a, b) {
                return a.medma_fecha - b.medma_fecha || a.medma_hora - b.medma_hora;
              }); 
            let last = result.recordset.length>0? result.recordset[result.recordset.length-1] : null;
            return last;
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }

}