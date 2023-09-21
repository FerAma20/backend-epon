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

const FILENAME = 'ProyectController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllProyect = async function (req,res) {
    const functionname = 'readAllProyect';
    try {
        const pool = await sqlDriver.getPool();   
            let    query = ` select * from proy_Proyecto`;     
            const result = await pool.request().query(query);
            console.log(result.recordset);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.readAllProyectId = async function (req,res) {
    
    const functionname = 'readAllProyectId';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = ` select *,(CONVERT(VARCHAR(10),proy_fechacreacion,126))fechacreacion,(CONVERT(VARCHAR(10),proy_vigenciaInicia,126))fechavigenciainicia,(CONVERT(VARCHAR(10),proy_vigenciafin,126))fechavigenciafin  
            ,(select fk_Departamento from ccee_Municipio cm where cm.Mun_NoMunicipio = proy_municipio) Departamento
            from proy_Proyecto pp where pp.proy_proyecto =   ${data.proy_proyecto}`;     
            console.log(query); 
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}


exports.createGasTank = async function (req,res) {
    
    const functionname = 'createGasTank';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `insert into inv_AlmacenProducto (almprod_almacen,almprod_producto,almprod_cantidad,almprod_costoactual
                ) VALUES ( ${data.almprod_almacen},${data.almprod_producto},0,0,GETDATE() )`;
            const result = await pool.request().query(query);

            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updateGasTank = async function (req,res) {
    
    const functionname = 'updateGasTank';
    try {
        const data = req.body;
        let fecha = new Date().toLocaleDateString('sv-SE',{timeZone: 'America/Guatemala'});
        const pool = await sqlDriver.getPool();   
            let query = `update inv_AlmacenProducto set almprod_producto = ${data.almprod_producto}, almprod_fechaactualizacion = '${fecha}' 
            where 
            almprod_almacen = ${data.almprod_almacen}  and almprod_producto = ${data.almprod_producto}`;

            console.log(query);  

            const result = await pool.request().query(query);

            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}


