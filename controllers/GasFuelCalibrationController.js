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

const FILENAME = 'GasFuelCalibrationController.js';

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

           let    query = `select *  from gas_TablaCalibracion 
            where taca_tanque= ${data.taca_tanque}`;     
    
            console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}






exports.deleteFuelCalibration= async function (req,res) {
    
    const functionname = 'deleteFuelCalibration';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = ` delete from gas_TablaCalibracion where taca_tablacalibracion = ${data.taca_tablacalibracion} `;     
            
            console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}


exports.CreateFuelCalibration= async function (req,res) {
    
    const functionname = 'CreateFuelCalibration';
    try {
        console.log("iniciando")
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = ` insert into gas_TablaCalibracion(taca_tanque,taca_pulg,taca_galones) 
            values(${data.taca_tanque},${data.taca_pulg},${data.taca_galones}) `;     
            
            console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.UpdateFuelCalibration= async function (req,res) {
    
    const functionname = 'UpdateFuelCalibration';
    try {
        console.log("iniciando")
        const data = req.body;
        const pool = await sqlDriver.getPool();   

           
            query = ` update gas_TablaCalibracion set taca_pulg = ${data.taca_pulg}
            ,taca_galones = ${data.taca_galones}
            where taca_tablacalibracion = ${data.taca_tablacalibracion} 
             `;     
            
            console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}