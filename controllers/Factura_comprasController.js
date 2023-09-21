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

const FILENAME = 'factura_comprasController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllfacturacompras = async function (req,res) {
    
    const functionname = 'readAllfacturacompras';
    try {
        const pool = await sqlDriver.getPool();   
            let    query = `SELECT top 10 * FROM  factura_compras `;           
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.createfacturacompras = async function (req,res) {
    
    const functionname = 'createfacturacompras';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO factura_compras
            ([fac_fecha_facturacion]
            ,[fac_fecha_vencimiento]
            ,[fac_no_factura]
            ,[fac_serie]
            ,[fac_monto]
            ,[fac_impuesto]
            ,[fac_nota]
            ,[fac_archivo_importacion]
            ,[fac_colegiado]
            ,[fac_perfil_colegiado]
            ,[fac_no_colegiado]
            ,[fac_nit]
            ,[fac_nombre]
            ,[fac_sucursal]
            ,[fac_centroCosto]
            ,[fac_flete]
            ,[fac_transporte]
            ,[fac_conductor])
      VALUES
      (  ?
        ,?
        ,?
        ,?
        ,?
        ,?
        ,?
        ,?
        ,?
        ,?
        ,?
        ,?
        ,?
        ,?
        ,?
        ,?
        ,?
        ,?
        )
      
      `;
            const result = await pool.request().query(query,
                (data.fac_fecha_facturacion
                    ,data.fac_fecha_vencimiento
                    ,data.fac_no_factura
                    ,data.fac_serie
                    ,data.fac_monto
                    ,data.fac_impuesto
                    ,data.fac_nota
                    ,data.fac_archivo_importacion
                    ,data.fac_colegiado
                    ,data.fac_perfil_colegiado
                    ,data.fac_no_colegiado
                    ,data.fac_nit
                    ,data.fac_nombre
                    ,data.fac_sucursal
                    ,data.fac_centroCosto
                    ,data.fac_flete
                    ,data.fac_transporte
                    ,data.fac_conductor));

            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updatefacturacompras = async function (req,res) {
    
    const functionname = 'updatefacturacompras';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE factura_compras  SET 
         fac_fecha_facturacion = ?
        ,fac_fecha_vencimiento = ?
        ,fac_no_factura = ?
        ,fac_serie = ?
        ,fac_monto = ?
        ,fac_impuesto = ?
        ,fac_nota = ?
        ,fac_archivo_importacion = ?
        ,fac_colegiado = ?
        ,fac_perfil_colegiado = ?
        ,fac_no_colegiado = ?
        ,fac_nit = ?
        ,fac_nombre = ?
        ,fac_sucursal = ?
        ,fac_centroCosto = ?
        ,fac_flete = ?
        ,fac_transporte = ?
        ,fac_conductor = ?

        WHERE factura_compras = ?`;        
            const result = await pool.request().query(query,(data.fac_fecha_facturacion
                ,data.fac_fecha_vencimiento
                ,data.fac_no_factura
                ,data.fac_serie
                ,data.fac_monto
                ,data.fac_impuesto
                ,data.fac_nota
                ,data.fac_archivo_importacion
                ,data.fac_colegiado
                ,data.fac_perfil_colegiado
                ,data.fac_no_colegiado
                ,data.fac_nit
                ,data.fac_nombre
                ,data.fac_sucursal
                ,data.fac_centroCosto
                ,data.fac_flete
                ,data.fac_transporte
                ,data.fac_conductor
                ,data.factura_compras));

            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deletefacturacompras = async function (req,res) {
    
    const functionname = 'deletefacturacompras';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM factura_compras 
            WHERE factura_compras = ?`;
            const result = await pool.request().query(query,data.factura_compras);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}