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

const FILENAME = 'GasFuelPriceController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllFuelPrice = async function (req,res) {
    
    const functionname = 'readAllFuelPrice';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = `Historial_Fuel`;     
    
            const result = await pool.request().input('sucursal',data.alm_sucursalempresa).input('fecha',data.hispre_fecha).execute(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */

exports.createFuelPrice = async function (req,res) {
    
    const functionname = 'CreateFuelPrice';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `insert into inv_historicoprecioprod(hispre_precio,hispre_fecha,hispre_autoservicio,hispre_almacen,hispre_producto) values
                        (${data.precio_gal_auto},'${data.fecha}',${data.auto},${data.hispre_almacen},${data.hispre_producto})`;

            console.log(query);
            const result = await pool.request().query(query);

            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */

exports.createFuelPriceF = async function (req,res) {
    
    const functionname = 'CreateFuelPriceF';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `insert into inv_historicoprecioprod(hispre_precio,hispre_fecha,hispre_autoservicio,hispre_almacen,hispre_producto) values
                        (${data.precio_gal_auto},'${data.fecha}',${data.auto},${data.hispre_almacen},${data.hispre_producto})`;

            console.log(query);
            const result = await pool.request().query(query);

            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}


exports.deleteFuelPrice = async function (req,res) {
    
    const functionname = 'deleteFuelPrice';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE top(1) FROM inv_historicoprecioprod 
            WHERE hispre_precio = ${data.precio_gal_auto} and hispre_fecha = '${data.fecha}'  and hispre_autoservicio= ${data.auto}  and hispre_almacen= ${data.hispre_almacen} and hispre_producto = ${data.hispre_producto}` ;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}









