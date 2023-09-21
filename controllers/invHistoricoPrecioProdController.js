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

const FILENAME = 'invHistoricoPrecioProdController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllinvHistoricoPrecioProd = async function (req,res) {
    
    const functionname = 'readAllinvHistoricoPrecioProd';
    try {
        const pool = await sqlDriver.getPool();   
            let    query = `SELECT * FROM  inv_HistoricoPrecioProd`;           
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.createinvHistoricoPrecioProd = async function (req,res) {
    
    const functionname = 'createinvHistoricoPrecioProd';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO inv_HistoricoPrecioProd  (
                hispre_precio,
                hispre_fecha,
                hispre_autoservicio,
                hispre_responsable,
                hispre_almacen,
                hispre_producto 
                ) VALUES ( 
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
                )`;
            const result = await pool.request().query(query,data.hispre_precio,data.hispre_fecha,data.hispre_autoservicio,hispre_responsable,hispre_almacen,hispre_producto);

            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updateinvHistoricoPrecioProd = async function (req,res) {
    
    const functionname = 'updateinvHistoricoPrecioProd';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE inv_HistoricoPrecioProd  SET 
        hispre_precio = ?,
        hispre_fecha  = ?,
        hispre_autoservicio = ?,
        hispre_responsable  = ?,
        hispre_almacen = ?,
        hispre_producto = ? 

        WHERE hispre_historicoprecioprod = ?`;        
            const result = await pool.request().query(query,data.hispre_precio,data.hispre_fecha,data.hispre_autoservicio,hispre_responsable,hispre_almacen,hispre_producto,data.hispre_historicoprecioprod);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deleteinvHistoricoPrecioProd = async function (req,res) {
    
    const functionname = 'deleteinvHistoricoPrecioProd';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM inv_HistoricoPrecioProd 
            WHERE hispre_historicoprecioprod = ?`;
            const result = await pool.request().query(query,data.hispre_historicoprecioprod);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.readInvHistoricoByHose = async function (req,res) {
    
    const functionname = 'readInvHistoricoByHose';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            var historic = null;
            var prod = null;
            let    query = `SELECT * FROM  inv_HistoricoPrecioProd where hispre_producto = ${data.product} and hispre_autoservicio = ${data.autoservice} order by hispre_fecha DESC`;           
            const result = await pool.request().query(query);
            if(result.recordset.length > 0)
                historic = result.recordset[0];
            else{
                let    query2= `SELECT * FROM  inv_Producto where prod_producto = ${data.product}`;           
                const result2 = await pool.request().query(query2);
                if(result2.recordset.length > 0) prod = result2.recordset[0];
            }
            var currencyChange = 0;
            if(data.quetzales===0){
                let    query3 = `SELECT * FROM  ccee_CambioMoneda where fk_TipoMoneda = 1 order by CM_FechaIngreso DESC`;           
                const result3 = await pool.request().query(query3);    
                if(result3.recordset.length > 0) currencyChange = result3.recordset[0].CM_MonedaQuetzal;
            }
            return responseManager.sendResponseWithDocument(res,{historic: historic, product: prod, exchange : currencyChange});
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

