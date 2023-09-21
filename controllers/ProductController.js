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

const FILENAME = 'ProductController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllProduct = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'readAllProduct';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  inv_Producto`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}


exports.readAllProductFuel = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'readAllProductFuel';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  inv_Producto join inv_UnidadMedida on inv_Producto.prod_unidadmedida = inv_UnidadMedida.unimed_unidadmedida where prod_tipocombustible >= 0`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}


exports.createProduct = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'createProduct';
    try {
        console.log("en createProduct")
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO inv_Producto  (
                prod_codigo,
                prod_nombre,
                prod_descripcion,
                prod_unidadmedida, 
                prod_paquete, 
                prod_metododespacho, 
                prod_metodovaloracion, 
                prod_controlminimos, 
                prod_maximo, 
                prod_minimo, 
                prod_multiplo, 
                prod_caducidad, 
                prod_tiempouso, 
                prod_tiempovida, 
                prod_tiemporemocion, 
                prod_tiempoalerta, 
                prod_loteserie, 
                prod_costoactual,
                prod_porcentajeventa1,
                prod_porcentajeventa2,
                prod_porcentajeventa3,
                prod_famproducto,
                prod_catproducto,
                prod_tipoproducto,
                prod_marca,
                prod_foto,
                prod_margen,
                prod_ctacontable,
                prod_centrocosto) VALUES (
                '${data.prod_codigo}', 
                '${data.prod_nombre}', 
                '${data.prod_descripcion}', 
                ${data.prod_unidadmedida}, 
                ${data.prod_paquete}, 
                ${data.prod_metododespacho}, 
                ${data.prod_metodovaloracion}, 
                ${data.prod_controlminimos}, 
                ${data.prod_maximo}, 
                ${data.prod_minimo}, 
                ${data.prod_multiplo}, 
                ${data.prod_caducidad}, 
                '${data.prod_tiempouso}', 
                '${data.prod_tiempovida}', 
                '${data.prod_tiemporemocion}', 
                '${data.prod_tiempoalerta}', 
                ${data.prod_loteserie}, 
                ${data.prod_costoactual}, 
                ${data.prod_porcentajeventa1}, 
                ${data.prod_porcentajeventa2}, 
                ${data.prod_porcentajeventa3}, 
                ${data.prod_famproducto}, 
                ${data.prod_catproducto}, 
                ${data.prod_tipoproducto}, 
                '${data.prod_marca}', 
                '${data.prod_foto}', 
                ${data.prod_margen}, 
                ${data.prod_ctacontable}, 
                ${data.prod_centrocosto}
                )
                SELECT SCOPE_IDENTITY() as prod_producto`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updateProduct = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'updateProduct';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE inv_Producto  SET 
        prod_codigo = '${data.prod_codigo}',  
        prod_nombre = '${data.prod_nombre}',  
        prod_descripcion = '${data.prod_descripcion}',  
        prod_unidadmedida = '${data.prod_unidadmedida}',
        prod_paquete = '${data.prod_paquete}',    
        prod_metododespacho = '${data.prod_metododespacho}',  
        prod_metodovaloracion = '${data.prod_metodovaloracion}',  
        prod_controlminimos = '${data.prod_controlminimos}',  
        prod_maximo = '${data.prod_maximo}',  
        prod_minimo = '${data.prod_minimo}',  
        prod_multiplo = '${data.prod_multiplo}',  
        prod_caducidad = '${data.prod_caducidad}',   
        ${data.prod_tiempouso == "" || data.prod_tiempouso == null || data.prod_tiempouso == "null"? "": `prod_tiempouso = '${data.prod_tiempouso}',`} 
        ${data.prod_tiempovida == "" || data.prod_tiempovida == null || data.prod_tiempovida == "null"? "": `prod_tiempovida = '${data.prod_tiempovida}',`}
        ${data.prod_tiemporemocion == "" || data.prod_tiemporemocion == null || data.prod_tiemporemocion == "null"? "": `prod_tiemporemocion = '${data.prod_tiemporemocion}',`}
        ${data.prod_tiempoalerta == "" || data.prod_tiempoalerta == null || data.prod_tiempoalerta == "null"? "": `prod_tiempoalerta = '${data.prod_tiempoalerta}',`}
        prod_loteserie = '${data.prod_loteserie}',  
        prod_costoactual = '${data.prod_costoactual}',  
        prod_porcentajeventa1 = '${data.prod_porcentajeventa1}',  
        prod_porcentajeventa2 = '${data.prod_porcentajeventa2}',  
        prod_porcentajeventa3 = '${data.prod_porcentajeventa3}',  
        prod_famproducto = '${data.prod_famproducto}',  
        prod_catproducto = '${data.prod_catproducto}',  
        prod_tipoproducto = '${data.prod_tipoproducto}',  
        prod_marca = '${data.prod_marca}',  
        prod_foto = '${data.prod_foto}',  
        prod_margen = '${data.prod_margen}',  
        prod_ctacontable = '${data.prod_ctacontable}',   
        prod_centrocosto = '${data.prod_centrocosto}' 
        WHERE prod_producto = ${data.prod_producto}`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deleteProduct = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'deleteProduct';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM inv_Producto WHERE prod_producto = ${data.prod_producto}`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}