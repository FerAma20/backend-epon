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

const FILENAME = 'GasMangueraController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllGasManguera = async function (req,res) {
    
    const functionname = 'readAllGasManguera';
    try {
        const pool = await sqlDriver.getPool();   
            let    query = `SELECT * FROM  gas_manguera`;           
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}



exports.readAllGasMangueraBomba = async function (req,res) {
    
    const functionname = 'readAllGasMangueraBomba';
    try {
        const data = req.body;
 

        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  gas_manguera join inv_Producto on gas_manguera.man_producto=inv_producto.prod_producto
                         where gas_manguera.man_bomba =${data.man_bomba}`;           
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}


exports.readAllGasMangueraProducto = async function (req,res) {
    
    const functionname = 'readAllGasMangueraProducto';
    try {
        const data = req.body;
 

        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  inv_Producto where prod_tipocombustible is not null`;           
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.createGasManguera = async function (req,res) {
    
    const functionname = 'createGasManguera';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO gas_manguera  (
                man_nombre, 
                man_bomba,
                man_producto
                ) VALUES ( 
                (select prod_nombre from inv_producto where prod_producto= '${data.man_producto}' ), 
                ${data.man_bomba}, 
                ${data.man_producto}
                )`;
            const result = await pool.request().query(query);

            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updateGasManguera = async function (req,res) {
    
    const functionname = 'updateGasManguera';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE gas_manguera  SET 
        man_nombre = ?, 
        man_bomba = ?,
        man_producto=?

        WHERE man_manguera = ?`;        
            const result = await pool.request().query(query,data.man_nombre,data.man_bomba,data.man_producto,data.man_manguera);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deleteGasManguera = async function (req,res) {
    
    const functionname = 'deleteGasManguera';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM gas_manguera 
            WHERE man_manguera = ${data.man_manguera}`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}