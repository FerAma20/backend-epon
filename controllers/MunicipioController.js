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

const FILENAME = 'MunicipioController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllMunicipio = async function (req,res) {
    
    const functionname = 'readAllMunicipio';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = ` select * from ccee_Municipio cm join ccee_Departamento cd  on cm.fk_Departamento = cd.Dep_NoDepartamento  `;     
    
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}


exports.readAllMunicipioId = async function (req,res) {
    
    const functionname = 'readAllMunicipo';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = ` select * from ccee_Municipio cm join ccee_Departamento cd  on cm.fk_Departamento = cd.Dep_NoDepartamento cm.Mun_NoMunicipio =   ${data.Mun_NoMunicipio}`;     
    
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.readAllMunicipioforDep= async function (req,res) {
    
    const functionname = 'readAllMunicipioforDep';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = ` select * from ccee_Municipio cm where cm.fk_Departamento   = ${data.fk_Departamento}`;     
            console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.readAllDepartamento = async function (req,res) {
    
    const functionname = 'readAllDepartamento';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = ` select * from ccee_Departamento `;     
    
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.readAllDepartamentoID = async function (req,res) {
    
    const functionname = 'readAllDepartamento';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = ` select * from ccee_Departamento where Dep_NoDepartamento = ${data.Dep_NoDepartamento}`;     
    
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}




