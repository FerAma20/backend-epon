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

const FILENAME = 'WarehouseOrdinaryProductController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllWarehouseOrdinaryProduct = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'readAllWarehouseOrdinaryProduct';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  inv_AlmProdOrd`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.createWarehouseOrdinaryProduct = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'createWarehouseOrdinaryProduct';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `INSERT INTO inv_AlmProdOrd  (
                apo_producto, 
                apo_almacen, 
                apo_orden, 
                apo_lote, 
                apo_serie, 
                apo_ubicacionenalmacen, 
                apo_cantidad, 
                apo_origen, 
                apo_costo
                ) VALUES ( 
                ${data.apo_producto}, 
                ${data.apo_almacen}, 
                ${data.apo_orden}, 
                '${data.apo_lote}',
                '${data.apo_serie}',
                '${data.apo_ubicacionenalmacen}',
                '${data.apo_cantidad}',
                '${data.apo_origen}',
                ${data.apo_costo} )
                SELECT SCOPE_IDENTITY() as apo_almacenprodorden`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.createWarehouseOrdinaryProductList = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'createWarehouseOrdinaryProductList';
    try {
        let ids = [];

        const data = req.body;
        const idOrder = data[0].apo_orden;
        const idUser = data[0].ordinv_usuario;
        const InitialState =await enviromentSystem("InitialState");
        const pool = await sqlDriver.getPool(); 
        for(const element of data){

            await validateRegisterWarehouseProduct(element.apo_producto, element.apo_almacen, element.apo_cantidad, element.apo_tipoorden, 10);

            let query = `INSERT INTO inv_AlmProdOrd  (
                apo_producto, 
                apo_almacen, 
                apo_orden, 
                apo_lote, 
                apo_serie, 
                apo_ubicacionenalmacen, 
                apo_cantidad, 
                apo_origen, 
                apo_costo
                ) VALUES ( 
                ${element.apo_producto}, 
                ${element.apo_almacen}, 
                ${element.apo_orden}, 
                '${element.apo_lote}',
                '${element.apo_serie}',
                '${element.apo_ubicacionenalmacen}',
                '${element.apo_cantidad}',
                '${idOrder}',
                ${element.apo_costo} )
                SELECT SCOPE_IDENTITY() as apo_almacenprodorden `;
            const result = await pool.request().query(query);
            await registerStateWPO(result.recordsets[0][0].apo_almacenprodorden, InitialState.Var_Valor,idUser);

            ids.push( result.recordsets[0][0].apo_almacenprodorden);
        }
            return  responseManager.sendResponseWithDocument(res, ids);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

validateRegisterWarehouseProduct = async function (product, warehouse, amount, typeOrder, currentCost){
    const pool = await sqlDriver.getPool();   
    let query = `SELECT * FROM  inv_AlmacenProducto WHERE almprod_almacen = ${warehouse} AND almprod_producto = ${product}`;
    const result = await pool.request().query(query);
    const data = result.recordset[0];
    if(result.rowsAffected == 0){
        let query2 = `INSERT INTO inv_AlmacenProducto  (
            almprod_almacen, 
            almprod_producto, 
            almprod_cantidad, 
            almprod_costoactual,
            almprod_fechaactualizacion 
            ) VALUES ( 
            ${warehouse}, 
            ${product}, 
            ${amount}, 
            ${currentCost},
            '${new Date().toISOString().slice(0,10)}'
            )`;
        const result = await pool.request().query(query2);
    }else {

        const MinimumLimitStock = await enviromentSystem("MinimumLimitStock");

        if(MinimumLimitStock.Var_Valor == "true"){
//agregar validacion para que verifique el minimo de las cantidades
        }else{
            let query = `UPDATE inv_AlmacenProducto  SET 
        almprod_cantidad = '${typeOrder == 1? (parseFloat(data.almprod_cantidad)  + parseFloat(amount) ) :(parseFloat(data.almprod_cantidad) - parseFloat(amount)) }', 
        almprod_costoactual = '${currentCost}', 
        almprod_fechaactualizacion = '${new Date().toISOString().slice(0,10)}' 
        WHERE almprod_almacen = ${warehouse}
        AND almprod_producto = ${product}`;   
        const result = await pool.request().query(query);
        }
    }
}

enviromentSystem = async function(nameEnviroment){
    const pool = await sqlDriver.getPool();   
    let query = `SELECT Var_Valor FROM  ccee_Variables WHERE Var_Clave = '${nameEnviroment}'`;
    const result = await pool.request().query(query);

    return result.recordset[0];
}

registerStateWPO = async function (warehousePO, initialState ,user,) {
    console.log("entro a registerStateWPO");
    const pool = await sqlDriver.getPool();   
    let query = `INSERT INTO inv_DetEstAPO  ( apod_almacenprodorden, apod_detalleestatus, apod_usuario, apod_fecha) 
    VALUES ( 
        ${warehousePO}, 
        ${initialState}, 
        ${user}, 
        '${new Date().toISOString().slice(0,10)}' 
    )`;
    console.log(query);
    const result = await pool.request().query(query);
}

exports.updateWarehouseOrdinaryProduct = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'updateWarehouseOrdinaryProduct';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
        let query = `UPDATE inv_AlmProdOrd  SET 
        apo_producto = ${data.apo_producto}, 
        apo_almacen = ${data.apo_almacen}, 
        apo_orden = ${data.apo_orden}, 
        apo_lote = '${data.apo_lote}', 
        apo_serie = '${data.apo_serie}', 
        apo_ubicacionenalmacen = '${data.apo_ubicacionenalmacen}', 
        apo_cantidad = '${data.apo_cantidad}', 
        apo_origen = '${data.apo_origen}', 
        apo_costo = ${data.apo_costo}
        WHERE apo_almacenprodorden = ${data.apo_almacenprodorden}`;        
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deleteWarehouseOrdinaryProduct = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'deleteWarehouseOrdinaryProduct';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = `DELETE FROM inv_AlmProdOrd 
            WHERE apo_almacenprodorden = ${data.apo_almacenprodorden}`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}