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

const FILENAME = 'GasTuroShiftController.js';

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

exports.readAllEmpleadoCode = async function (req,res) {
    
    const functionname = 'readAllEmpleado';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = ` SELECT * FROM ccee_Cajero where  like '%'${data.Cjo_Name}'%'`;     
    
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}
exports.readAllTurno = async function (req,res) {
    
    const functionname = 'readAllTurno';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = ` SELECT *,(CONVERT(VARCHAR(8),turref_horaini,108))inicio,(CONVERT(VARCHAR(8),turref_horafin,108))fin FROM gas_turnorefrencia`;     
    
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.readAllEmpleado = async function (req,res) {
    
    const functionname = 'readAllEmpleado';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = ` SELECT * FROM ccee_Cajero where  Cjo_Activo=0`;     
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.readAllTurnoFor= async function (req,res) {
    
    const functionname = 'readAllTurnoFor';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = ` SELECT *,(select ip.prod_nombre from inv_Producto ip where ip.prod_producto=gas_manguera.man_producto)nombre_producto FROM gas_turnomanguera join gas_manguera
            on gas_turnomanguera.turman_manguera =  gas_manguera.man_manguera join gas_bomba gb on  gb.bom_bomba = gas_manguera.man_bomba
            where bom_estacion= ${data.bom_estacion} and turman_turno = ${data.turman_turno} and turman_empleado = ${data.turman_empleado}`;     
            
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deleteTurnoShift= async function (req,res) {
    
    const functionname = 'deleteTurnoShift';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let    query = ` delete from gas_turnomanguera where turman_manguera = ${data.turman_manguera} and turman_turno = ${data.turman_turno} and turman_empleado = ${data.turman_empleado} `;     
            
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}


exports.CreateTurnoShift= async function (req,res) {
    
    const functionname = 'CreateTurnoShift';
    try {
        console.log("iniciando")
        const data = req.body;
        const pool = await sqlDriver.getPool();   
            let query = ` insert into gas_turnomanguera(turman_manguera,turman_turno,turman_empleado) values (${data.turman_manguera} ,${data.turman_turno} , ${data.turman_empleado} )`;     
            
            console.log(query);
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}









