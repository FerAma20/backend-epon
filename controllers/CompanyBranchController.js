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

const FILENAME = 'CompanyBranchController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllCompanyBranch = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'readAllCompanyBranch';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  ccee_SucursalConta`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.createCompanyBranch = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'createCompanyBranch';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool(); 
        
        if(data.suc_empresa == 0 ) {
            let query = `INSERT INTO ccee_SucursalConta  (
                suc_nombresucursal, 
                SConta_nombre, 
                suc_direccion,
                suc_nitSucursal,
                suc_telefono,
                suc_mail,
                suc_nombreContador,
                suc_nitContador,
                suc_encargado
                ) VALUES (
                    '${data.suc_nombresucursal}', 
                    '${data.suc_nombresucursal}', 
                    '${data.suc_direccion}',
                    '${data.suc_nitSucursal}',
                    '${data.suc_telefono}',
                    '${data.suc_mail}',
                    '${data.suc_nombreContador}',
                    '${data.suc_nitContador}',
                    ${data.suc_encargado})
                    SELECT SCOPE_IDENTITY() as suc_sucursalempresa
                    `;
            const result = await pool.request().query(query);
            const resultBranch = await createCompanyBranchDefault(data, result.recordsets[0][0].suc_sucursalempresa);
            return responseManager.sendResponseWithDocument(res,resultBranch);
        }else {
            const resultBranch = await createCompanyBranchDefault(data, data.suc_empresa);
            return responseManager.sendResponseWithDocument(res,resultBranch);
        } 
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

createCompanyBranchDefault = async function (data, idBranch) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'createCompanyBranchDefault';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO ccee_SucursalConta  (
                suc_nombresucursal, 
                SConta_nombre, 
                suc_direccion,
                suc_nitSucursal,
                suc_telefono,
                suc_mail,
                suc_nombreContador,
                suc_nitContador,
                suc_encargado,
                suc_empresa 
                ) VALUES (
                    '${data.suc_nombresucursal}',  
                    '${data.suc_nombresucursal}',  
                    '${data.suc_direccion}',
                    '${data.suc_nitSucursal}',
                    '${data.suc_telefono}',
                    '${data.suc_mail}',
                    '${data.suc_nombreContador}',
                    '${data.suc_nitContador}',
                    ${data.suc_encargado},
                    ${idBranch})
                    SELECT SCOPE_IDENTITY() as suc_sucursalempresa
                    `;
            const result = await pool.request().query(query);
            return result;
    } catch (error) {
        return null;
    }
}

exports.updateCompanyBranch = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'updateCompanyBranch';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE ccee_SucursalConta  SET 
        suc_nombresucursal = '${data.suc_nombresucursal}',  
        SConta_nombre = '${data.suc_nombresucursal}',  
        suc_direccion = '${data.suc_direccion}', 
        suc_nitSucursal = '${data.suc_nitSucursal}', 
        suc_telefono = '${data.suc_telefono}', 
        suc_mail = '${data.suc_mail}', 
        suc_nombreContador = '${data.suc_nombreContador}', 
        suc_nitContador = '${data.suc_nitContador}', 
        ${data.suc_empresa == null ? `suc_encargado = ${data.suc_encargado}`: `suc_encargado = ${data.suc_encargado},`}
        ${data.suc_empresa == null ? "": `suc_empresa = ${data.suc_empresa}`}
        WHERE SConta_id = ${data.suc_sucursalempresa}`;
        console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deleteCompanyBranch = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'deleteCompanyBranch';
    try {
        const data = req.body;
        console.log(data);
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM ccee_SucursalConta WHERE SConta_id = ${data.SConta_id}`;
            console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}