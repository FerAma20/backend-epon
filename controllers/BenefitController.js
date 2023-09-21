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

const FILENAME = 'BenefitController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAll = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'readAll';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  proy_BeneficiarioProyecto`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.create = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'create';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO proy_BeneficiarioProyecto (benproy_beneficiario, benproy_proyecto, benproy_descbeneficio, benproy_tipobeneficio, benproy_monto, benproy_responsable) VALUES (${data.benproy_beneficiario}, ${data.benproy_proyecto}, '${data.benproy_descbeneficio}', ${data.benproy_tipobeneficio}, ${data.benproy_monto}, '${data.benproy_responsable}' )`;
            console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.update = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'update';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();  
        console.log(data); 
        let query = `UPDATE proy_BeneficiarioProyecto  SET  benproy_beneficiario  = '${data.benproy_beneficiario}' , benproy_proyecto = '${data.benproy_proyecto}' , benproy_descbeneficio = '${data.benproy_descbeneficio}' , benproy_tipobeneficio = '${data.benproy_tipobeneficio}' , benproy_monto = '${data.benproy_monto}' , benproy_responsable = '${data.benproy_responsable}'  WHERE benproy_beneficiarioproy = ${data.benproy_beneficiarioproy}`;        
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.delete = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'delete';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM proy_BeneficiarioProyecto WHERE benproy_beneficiarioproy = ${data.benproy_beneficiarioproy}`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.getByBeneficiary = async function (req,res) {
    const functionname = 'getByBeneficiary';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  proy_BeneficiarioProyecto WHERE benproy_beneficiario = ${data.benproy_beneficiario}`;
            const result = await pool.request().query(query);
            console.log(data.benproy_beneficiario, result.recordset);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.getByProject = async function (req,res) {
    const functionname = 'getByProject';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  proy_BeneficiarioProyecto WHERE benproy_proyecto = ${data.benproy_proyecto}`;
            const result = await pool.request().query(query);
            console.log(data.benproy_proyecto, result.recordset);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}
