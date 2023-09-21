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

const FILENAME = 'GasTankController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllGasTank = async function (req,res) {
    
    const functionname = 'readAllGasTank';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = ` SELECT * FROM  inv_Almacen  left join inv_AlmacenProducto iap 
            on  inv_Almacen.alm_almacen  = iap.almprod_almacen 
            left join inv_Producto ip on ip.prod_producto = iap.almprod_producto 
            where alm_tanque=1 and alm_sucursal =   ${data.alm_sucursal}`;     
    
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








