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

const FILENAME = 'GenericsController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */

exports.login = async function (req,res) {
    const functionname = 'login';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();   

        let queryUser = `SELECT * FROM  ccee_Usuario where  Usu_Correo = '${data.user}'`;
            const resultUser = await pool.request().query(queryUser);
            var pass2 = crypto.MD5(data.pass).toString();

            if(resultUser.recordset.length==0)
                return responseManager.sendResponseWithDocument(res, null);

            const usuario = resultUser.recordset[0];
            if(usuario.Usu_Clave==pass2){
                let queryProfile = `SELECT per.Per_NoPerfil, per.Per_Sis_NoSistema, per.Per_Nombre, sis.Sis_Nombre 
                                    FROM  ccee_Perfil per
                                    LEFT JOIN ccee_Sistema sis on sis.Sis_NoSistema = per.Per_Sis_NoSistema
                                    where per.Per_NoPerfil = ${usuario.Usu_Per_NoPerfil}`;
                const resultProfile = await pool.request().query(queryProfile);    
                const profile = resultProfile.recordset[0];

                let queryPermiss = `SELECT co.Ope_Nombre, cpo.PerOpe_NoOperacion FROM  ccee_Perfil_Operacion cpo 
                                    LEFT JOIN ccee_Sistema sis on sis.Sis_NoSistema = ${profile.Per_Sis_NoSistema}
                                    LEFT JOIN ccee_Operacion co on co.Ope_NoOperacion = cpo.PerOpe_NoOperacion
                                    LEFT JOIN ccee_Perfil cp on cp.Per_NoPerfil = cpo.PerOpe_NoPerfil 
                                    WHERE cp.Per_NoPerfil = ${usuario.Usu_Per_NoPerfil} `;
                const resultPermiss = await pool.request().query(queryPermiss);
                
                let queryCashier = `SELECT * FROM  ccee_Cajero where fk_Usuario = ${usuario.Usu_NoUsuario}`;
                const resultCashier = await pool.request().query(queryCashier);    
                const cashier = resultCashier.recordset[0];

                const body = {profile: profile, user: resultUser.recordset[0], permission: resultPermiss.recordset, cashier: cashier};   
                return responseManager.sendResponseWithDocument(res,body);
            }
            else 
               return responseManager.sendResponseWithDocument(res, null);
        } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.readAllLanguages = async function (req,res) {
    const functionname = 'readAllLanguages';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  ccee_Idioma`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.readAllCountries = async function (req,res) {
    const functionname = 'readAllCountries';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  ccee_Pais`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.readAllTowns = async function (req,res) {
    const functionname = 'readAllTowns';
    try {
        const pool = await sqlDriver.getPool();   
            let query = `SELECT * FROM  ccee_Municipio`;
            const result = await pool.request().query(query);
            return responseManager.sendResponseWithDocument(res,result.recordset);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

