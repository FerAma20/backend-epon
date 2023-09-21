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

const FILENAME = 'ProjectBeneficiaryController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAll = async function (req,res) {
    const functionname = 'readAll';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  proy_BeneficiarioProy`;
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
            let query = `INSERT INTO proy_BeneficiarioProy (bproy_primernombre, bproy_segundonombre, bproy_primerapellido, bproy_segundoapellido, bproy_apellidocasada, bproy_esbeneficiario, bproy_fechanacimiento, bproy_lugarnacimiento, bproy_nacionalidad, bproy_CUI, bproy_sexo, bproy_discapacidad, bproy_etnia, bproy_tiposanguineo, bproy_observaciones, bproy_escolaridad, bproy_idioma, bproy_nocasa, bproy_calleave, bproy_zona, bproy_barrio, bproy_municipio, bproy_geolocalizacion, bproy_telefono, bproy_email, bproy_foto) 
                        VALUES ('${data.bproy_primernombre}' , '${data.bproy_segundonombre}' , '${data.bproy_primerapellido}' , '${data.bproy_segundoapellido}' , '${data.bproy_apellidocasada}' , ${data.bproy_esbeneficiario} , '${data.bproy_fechanacimiento}' , '${data.bproy_lugarnacimiento}' , ${data.bproy_nacionalidad} , '${data.bproy_CUI}' , ${data.bproy_sexo} , ${data.bproy_discapacidad} , ${data.bproy_etnia} , ${data.bproy_tiposanguineo} , '${data.bproy_observaciones}' , ${data.bproy_escolaridad} , ${data.bproy_idioma} , '${data.bproy_nocasa}' , '${data.bproy_calleave}' , '${data.bproy_zona}' , '${data.bproy_barrio}' , ${data.bproy_municipio} , '${data.bproy_geolocalizacion}' , '${data.bproy_telefono}' , '${data.bproy_email}' , '${data.bproy_foto}')`;
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
        let query = `UPDATE proy_BeneficiarioProy  SET  bproy_primernombre='${data.bproy_primernombre}' , bproy_segundonombre='${data.bproy_segundonombre}' , bproy_primerapellido='${data.bproy_primerapellido}' , bproy_segundoapellido='${data.bproy_segundoapellido}' , bproy_apellidocasada='${data.bproy_apellidocasada}' , bproy_esbeneficiario=${data.bproy_esbeneficiario} , bproy_fechanacimiento='${data.bproy_fechanacimiento}' , bproy_lugarnacimiento='${data.bproy_lugarnacimiento}' , bproy_nacionalidad=${data.bproy_nacionalidad} , bproy_CUI='${data.bproy_CUI}' , bproy_sexo=${data.bproy_sexo} , bproy_discapacidad=${data.bproy_discapacidad} , bproy_etnia=${data.bproy_etnia} , bproy_tiposanguineo=${data.bproy_tiposanguineo} , bproy_observaciones='${data.bproy_observaciones}' , bproy_escolaridad=${data.bproy_escolaridad} , bproy_idioma=${data.bproy_idioma} , bproy_nocasa='${data.bproy_nocasa}' , bproy_calleave='${data.bproy_calleave}' , bproy_zona='${data.bproy_zona}' , bproy_barrio='${data.bproy_barrio}' , bproy_municipio=${data.bproy_municipio} , bproy_geolocalizacion='${data.bproy_geolocalizacion}' , bproy_telefono='${data.bproy_telefono}' , bproy_email='${data.bproy_email}' , bproy_foto='${data.bproy_foto}'`;        
            const result = await pool.request().query(query);
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
            let query = `DELETE FROM proy_BeneficiarioProy WHERE bproy_beneficiarioproy = ${data.bproy_beneficiarioproy}`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.filter = async function (req,res) {
    const functionname = 'filter';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  proy_BeneficiarioProy WHERE bproy_CUI like '${data.val}' `;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}
