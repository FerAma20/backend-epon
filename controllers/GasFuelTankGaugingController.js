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

const FILENAME = 'GasFuelTankGauging.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readHistory = async function (req,res) {
    
    const functionname = 'readHistory';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   

            let inicio = data.inicio;
            let fin = data.fin;
            let where = "";
            let top = "";
            let order = "";
            
            if((inicio == null || fin == null) || (inicio == '1969-12-31' || fin == "1969-12-31") ){
                order = " order by medta_mediciontanque desc"
                top = " top 10 ";
                
            }else{
                where =  ` and medta_fecha between '${data.inicio}' and '${data.fin}'`;
            }

            let    query = `Select ${top}  *,(CONVERT(VARCHAR(10),medta_fecha,126))fecha,(CONVERT(VARCHAR(8),medta_hora,108))hora from gas_MedicionTanque 
            where medta_tanque = ${data.medta_tanque}
            ${where}`;     
    
            console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deleteFuelTankGauging= async function (req,res) {
    
    const functionname = 'deleteFuelTankGauging';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = ` delete from gas_MedicionTanque where medta_mediciontanque = ${data.medta_mediciontanque} `;     
            console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}


exports.CreateFuelTankGauging= async function (req,res) {
    
    const functionname = 'CreateFuelTankGauging';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = ` insert into gas_MedicionTanque(medta_tanque,medta_pulg,medta_galones,medta_fecha,medta_hora,medta_observacion,medta_usuario) 
            values(${data.medta_tanque},${data.medta_pulg},${data.medta_galones},'${data.medta_fecha}','${data.medta_hora}','${data.medta_observacion}', ${data.medta_usuario}) `;     
            console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.UpdateFuelTankGauging= async function (req,res) {
    
    const functionname = 'UpdateFuelTankGauging';
    try {
        console.log("iniciando")
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query =``;
            let inicio = data.medta_fecha;
            let fin = data.medta_hora;
            
            if((inicio == undefined || fin == undefined) || (inicio == '1969-12-31' || fin == "1969-12-31") ){

            query = ` update gas_MedicionTanque set medta_tanque = ${data.medta_tanque}
            ,medta_pulg = ${data.medta_pulg},medta_galones = ${data.medta_galones} ,medta_observacion = '${data.medta_observacion}'
            where medta_mediciontanque = ${data.medta_mediciontanque} 
             `;     
                console.log(query);
            }else{
                query = ` update gas_MedicionTanque set medta_tanque = ${data.medta_tanque}
                ,medta_pulg = ${data.medta_pulg},medta_galones = ${data.medta_galones} ,medta_fecha = '${inicio}' ,medta_hora = '${fin}' ,medta_observacion = '${data.medta_observacion}'
                where medta_mediciontanque = ${data.medta_mediciontanque} 
                 `;     

            }
            console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}


