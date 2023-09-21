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

const FILENAME = 'SucursalEmpresaController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllSucursalEmpresa = async function (req,res) {
    
    const functionname = 'readAllSucursalEmpresa';
    try {
        const pool = await sqlDriver.getPool();   
            let    query = `SELECT * FROM  ccee_SucursalConta where suc_empresa is not null`;           
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.createSucursalEmpresa = async function (req,res) {
    
    const functionname = 'createSucursalEmpresa';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO empre_sucursalEmpresa  (
                 suc_nombresucursal, 
                 suc_direccion, 
                 suc_telefono, 
                 suc_mail,
                 suc_encargado,
                 suc_empresa
                ) VALUES ( 
                ?, 
                ?, 
                ?, 
                ?,
                ?,
                ?
                )`;
            const result = await pool.request().query(query,data.suc_nombresucursal
               ,data.suc_direccion,data.suc_telefono,data.suc_mail,data.suc_encargado,data.suc_empresa );

            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}


exports.readAllEstacionProducto = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'readAllEstacionProducto';
    
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  ccee_SucursalConta join inv_Almacen ia on  Sconta_id = ia.alm_sucursalempresa  
            where suc_empresa is not null
            and  exists (select * from inv_AlmacenProducto iap where iap.almprod_almacen= ia.alm_almacen and iap.almprod_producto = ${data.producto})`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updateSucursalEmpresa = async function (req,res) {
    
    const functionname = 'updateSucursalEmpresa';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE empre_sucursalEmpresa  SET 
        suc_nombresucursal = ?, 
        suc_direccion = ?, 
        suc_telefono = ? ,
        suc_mail     = ?,
        suc_encargado = ?,
        suc_empresa  =  ?  
        WHERE suc_sucursalempresa = ?`;        
            const result = await pool.request().query(query,data.suc_nombresucursal
                ,data.suc_direccion,data.suc_telefono,data.suc_mail,data.suc_encargado,data.suc_empresa );
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deleteSucursalEmpresa = async function (req,res) {
    
    const functionname = 'deleteSucursalEmpresa';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM empre_sucursalEmpresa 
            WHERE almprod_almacen = ?`;
            const result = await pool.request().query(query,data.suc_sucursalempresa);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}