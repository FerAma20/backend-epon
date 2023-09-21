var randomstring = require('randomstring');
var moment = require('moment');
var crypto = require('crypto-js');
var mongoose = require('mongoose');
const { Request, Response, NextFunction } = require('express');
const { CustomError } = require('../types/CustomError');
const { ResetTypes, ResetStates, ServiceNames, userActions, ActionDescription, COMETCHAT_CONSTANTS } = require('../config/config');
const { ConnectionPool } = require('mssql');
var responseManager = require('../managers/responseManager');
var errorManager = require('../managers/errorManager');
var utils = require('../managers/utilManager');
const SessionLog = require('../database/schema/SessionLogSchema');
const ResetLog = require('../database/schema/ResetLogSchema');
const PasswordLog = require('../database/schema/PasswordLogSchema');
const sqlDriver = require('../database/SQLDriver');
const CONFIG = require('../config/config');
const logManager = require('../managers/logManager');

const FILENAME = 'OauthController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
 exports.login = async function(req, res) {
    const functionname = 'login';
    try {
        let decrypted = utils.decrypt(req.body.data, CONFIG.encriptacion.key );
        const data = JSON.parse(decrypted);
        const pool = await sqlDriver.getPool();   
        if(req.body){
            let query = `SELECT * FROM users WHERE users.username = \'${data.username}\' AND users.password =\'${data.password}\' AND users.estado = 'A'`;
            pool.query(query, async (error, results)=>{
                if(error) throw error;
                if(results.length >0){
                   await logManager.addToActionLog(data.username, userActions.login, req, '', ActionDescription.requestConsult);
                   return responseManager.sendResponseWithBody(res, '',results, false);
                }else{
                    return errorManager.handleRequestUserError(new Error(`Usuario o password incorrecto`)
                    , res
                    , new CustomError(400, 'Usuario o password incorrecto'));
                }
            })
        }else{
            return errorManager.handleRequestUserError(new Error(`Usuario No existe`)
            , res
            , new CustomError(400, 'Usuario no existe'));
        }  
    } catch (error) {
        errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}
/**
 * Crea los datos para la sesión
 * @param {Request} req 
 * @param {Response} res 
 */
 exports.getSessionData = async function(req, res) {
    var functionname = 'getSessionData';
    try {
        const pool = await sqlDriver.getPool();

        // Datos de la petición
        let decrypted = utils.decrypt(req.body.data, CONFIG.encriptacion.key );
        const data = JSON.parse(decrypted);



      //////      

        // Obtención de datos de la sesión
        const response = await generateNewSession(data.username, req, pool);
        // Envío de la respuesta
        
        responseManager.sendResponseWithBody(res, response, '');

    } catch (error) {
        errorManager.handleRequestError(error, FILENAME, functionname, 500, res, 'No fue posible obtener la información para la sesión');
    }
}


/**
 * Registro del cierre de sesión
 * @param {Request} req 
 * @param {Response} res 
 */
exports.closeSession = async function(req, res) {
    var functionname = 'closeSession';
    try {
        const decrypResult = utils.decryptRequest(req, CONFIG.encriptacion.key );
        const data = decrypResult.data;
        await logManager.addToActionLog(data.username, userActions.logout, req, '', ActionDescription.closeSession);
        return responseManager.sendResponseWithoutBody(res);

    } catch (error) {
        return errorManager.handleRequestError(error, FILENAME, functionname, 500, res, 'No fue posible cerrar la sesión');
    }
}

/**
 * Valida el token de la sesión
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
exports.validateSession = async function(req, res, next){
    console.log(req);
    var functionname = 'validateSession';
    const token = utils.getTokenFromHeader(req.get('Authorization'));
    const username = req.get('X-ucode');
   
    try {
        var tokenInfo = await SessionToken.findOne({token, idUser: username}).exec();
        
        if (!tokenInfo) {
            errorManager.handleTokenError(username, res, 'La sesión ha sido cerrada debido a que no fue posible su verificación');
        }
        
        var tokenEnd = moment(tokenInfo.dateExpired);
        var now = moment();

        if(now.isBefore(tokenEnd)) {
            next();
        } else {
            const refreshToken = req.get('X-refresh');
            var refreshInfo = await RefreshToken.findOne({token: refreshToken, idUser: username}).exec();

            if (!refreshInfo) {
                errorManager.handleTokenError(username, res, 'La sesión ha sido cerrada debido a que no fue posible su verificación');
            }

            var refreshEnd = moment(refreshInfo.expirationDate);

            if (now.isBefore(refreshEnd)) {
                var tokens = await createSessionTokens(username);
                res.set('X-token', tokens.token.token);
                res.set('X-refresh', tokens.refreshToken);
                console.log('Token de sesión actualizado');
                next();
            } else {
                errorManager.handleTokenError(username, res);
            }
        }
    } catch(err) {
       errorManager.handleRequestError(err, FILENAME, functionname, 500, res, 'Error en la autorización de la sesión')
    }
}

/**
 * Obtiene los datos iniciales para la generación de nueva contraseña
 * @param {Request} req 
 * @param {Response} res 
 */
exports.initResetPassword = async function(req, res) {
    const functionname = 'initResetPassword';
    try {
        // Datos de la petición
        let decrypted = utils.decrypt(req.body.data, req.get('time'));
        const data = JSON.parse(decrypted);
        const pool = await sqlDriver.getPool();

      
    } catch (error) {
        errorManager.handleRequestError(error, FILENAME, functionname, 500, 'No fue posible obtener el listado de preguntas secretas del usuario')
    }
}

/**
 * Verifica los datos enviados para el reinicio de contraseña
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
exports.verifyResetPassword = async function(req, res) {
    const functionname = 'verifyResetPassword';
    try {
        // Datos de la petición
        let decrypted = utils.decrypt(req.body.data, req.get('time'));
        const data = JSON.parse(decrypted);
        const pool = await sqlDriver.getPool();

      

    } catch (error) {
        errorManager.handleRequestError(error, FILENAME, functionname, 500, 'No fue posible verificar la información')
    }
}

/**
 * Genera un nuevo password para el usuario
 * @param {Request} req 
 * @param {Response} res 
 */
exports.resetPassword = async function(req, res) {
    const functionname = 'resetPassword';
    var transaction;
    try {
        const decrypted = utils.decrypt(req.body.data, req.get('time'));
        const data = JSON.parse(decrypted);
        
    } catch (error) {
        errorManager.handleTransactionCatchClause(error, FILENAME, functionname, transaction, res, 'No fue posible reiniciar la contraseña');
    }
}

/**
 * Actualiza la contraseña por vencimiento
 * @param {Request} req 
 * @param {Response} res 
 */
exports.doUpdatePassword = async function(req, res) {
    const functionname = 'doUpdatePassword';
    var transaction;
    try {
        const decrypted = utils.decrypt(req.body.data, req.get('time'));
        const data = JSON.parse(decrypted);
        
        
    } catch (error) {
        errorManager.handleTransactionCatchClause(error, FILENAME, functionname, transaction, res, 'No fue posible actualizar la contraseña');
    }
}


/**
 * Verifica el status de los servicios
 * @param {Request} req 
 * @param {Response} res 
 */
exports.checkStatus = async function (req, res) {
    const functionname = 'checkStatus';
    try {
        let pool = await sqlDriver.getPool();
        
        if (mongoose.connection.readyState == 0) {
            throw new Error('Conexión a MongoDB no establecida')
        };

    } catch (error) {
        var newError = new Error('Fue encontrado un error en las conexiones. ' + error);
        newError.customCode = 500;
        errorManager.handleRequestError(newError, FILENAME, functionname, 500, res, 'No todas las conexiones se encuentran establecidas');
    }
}

/**
 * Obtiene el mensaje para la página de mantenimiento
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getMaintenanceMsg = function (req, res) {
    const functionname = 'getMaintenanceMsg';
    try {
        const token = utils.getRequestToken(req);
        let body = {
            title: CONFIG.maintenanceTitle,
            msg: CONFIG.maintenanceMessage
        }
        res.set('time', req.get('time'));
        responseManager.sendResponseWithBody(res, body, token?token:req.get('time'));
    } catch (error) {
        errorManager.handleFunctionError(error, FILENAME, functionname);
        responseManager.sendResponseWithoutBody(res);
    }
}

/**
 * Genera los datos para una nueva sesión
 * @param {string} username 
 * @param {Request} req 
 * @param {ConnectionPool} pool 
 * @returns {Promise<{user, permissionList, urlList}>}
 */
 var generateNewSession = async function(username, req, pool = undefined) {
    const functionname = 'generateNewSession';
    let res;
    return new Promise(async(resolve, reject) => {
        try {

            // Obtención de datos del usuario
            let query = `select * from users u  where u.username ='${username}'`;
            pool.query(query, (error, results)=>{
                        if(error) throw error;
                        if(results.length > 0){
                            res= results[0]
                            const user = {
                                id: res.id,
                                username: res.username,
                                perfil_id: res.perfil_id,
                                name: res.nombre
    
                            };
                            let query = `select u.username , p.id ,p.descripcion, p2.perfil_id, v.id ,v.descripcion  from users u inner join perfil p on u.perfil_id = p.id  inner join permiso p2 on p.id = p2.perfil_id  inner join vista v on p2.vista_id = v.id
                            where u.username = '${username}'`;
                            pool.query(query, (error,results)=>{
                                if(error) throw error;
                                if(results.length > 0){
                                    permissionList = results.map(m => m.descripcion) 
                                    let sessionData = {
                                        user: user,
                                        permissionList: permissionList,
                                    }
                                     resolve(sessionData);
                                }
                            });
                        }
                    });
    

        } catch (error) {
            errorManager.handleFunctionError('No fue posible generar la información de la sesión', FILENAME, functionname);
            reject(error);
        }
    });
}

