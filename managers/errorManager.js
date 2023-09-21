'use strict'

const { Response } = require('express');
const { Transaction } = require("mssql");
const {  } = require('mongoose');
const { CustomError } = require("../types/CustomError");
const SessionLog = require('../database/schema/SessionLogSchema');
const moment = require('moment');
const { ErrorCodes, NoCancelError } = require('../config/config');

/** maneja los errores dando una respuesta e indicando el código del error */
var handleRequestError = function (err, fileName, functionName, code, res, message = ''){
    let formatted_date = getServerDate()
    
    console.error(
        '>>>>>>>FECHA: ', formatted_date,
        '\n>>>>>>>ERROR EN EL ARCHIVO: ', fileName,
        '\n>>>>>>>ERROR EN LA FUNCIÓN: ', functionName, 
        '\n>>>>>>>TEXTO DEL ERROR: ', err,
        '\n-----------------------');
    
    let response = {
        error: true,
        status: code,
        errorMessage: message,
        body: {valid: false}
    }

    evaluateBlockError(err, response);

    res.status(code).send(response);
}

/**
 * Maneja un error con datos específicos para la respuesta
 * @param {any} err 
 * @param {string} fileName 
 * @param {string} functionName 
 * @param {Request} res 
 * @param {CustomError} customError 
 * @param {boolean} blockError
 * @returns 
 */
var handleRequestCustomError = function (err, fileName, functionName, res, customError){
    let formatted_date = getServerDate()

    console.error(
        '>>>>>>>FECHA: ', formatted_date,
        '\n>>>>>>>ERROR EN EL ARCHIVO: ', fileName,
        '\n>>>>>>>ERROR EN LA FUNCIÓN: ', functionName, 
        '\n>>>>>>>TEXTO DEL ERROR: ', err,
        '\n-----------------------');

    let response = {
        error: true,
        status: customError.code,
        errorMessage: customError.message,
        body: err,
        data: customError.data
    }

    evaluateBlockError(err, response);

    res.status(customError.code).send(response)

    return true;
}

/**
 * Maneja un error debido a la información enviada por parte del usuario
 * @param {any} err 
 * @param {Request} res 
 * @param {CustomError} customError 
 * @returns 
 */
 exports.handleRequestUserError = function (err, res, customError){

    const response = {
        error: true,
        status: customError.code,
        errorMessage: customError.message,
        body: err,
        data: customError.data
    }

    res.status(customError.code).send(response);

    return true;
}

/** Maneja errores sobre funciones sin devolver respuesta al cliente */
var handleFunctionError = function (err, fileName, functionName){
    let formatted_date = getServerDate();
    console.error(
        '>>>>>>>FECHA: ', formatted_date,
        '\n>>>>>>>ERROR EN EL ARCHIVO: ', fileName,
        '\n>>>>>>>ERROR EN LA FUNCIÓN: ', functionName, 
        '\n>>>>>>>TEXTO DEL ERROR: ', err,
        '\n-----------------------');
}

/**
 * Maneja error por token no válido
 * @param {Response} res 
 * @param {string} message 
 */
exports.handleTokenError = async function (username, res, message = 'La sesión ha expirado'){

    // Cierre de sesión
    await SessionLog.updateMany({idUser: username, endTime: {$exists: false} }, {endTime: moment()}).exec();

    // envío de respuesta
    var response = {
        invalidToken: true,
        status: 401,
        errorMessage: message,
        body: 'error'
    }
    res.status(401);
    res.statusMessage = "Expired";
    res.send(response);
}

/** Maneja mensajes de alerta en las funciones */
exports.handleFunctionWarning = function (warning, fileName, functionName){
    let formatted_date = getServerDate()

    console.warn(
        '!!!!!!!FECHA: ', formatted_date,
        '\n!!!!!!!ALERTA EN EL ARCHIVO: ', fileName,
        '\n!!!!!!!ALERTA EN LA FUNCIÓN: ', functionName, 
        '\n!!!!!!!TEXTO DE LA ALERTA: ', warning,
        '\n-----------------------');
}

/**
 * Maneja el catch clause para un try que incluye una transacción
 * @param {any} err 
 * @param {string} fileName 
 * @param {string} functionName 
 * @param {Transaction} transaction 
 * @param {Response} res 
 * @param {any} errorContent 
 */
 exports.handleTransactionCatchClause = function (error, fileName, functionName, transaction, res, errorContent){
    if(typeof errorContent == 'object'){
        handleRequestError(error, fileName, functionName, errorContent.code, res, errorContent.message);
        transaction.rollback().catch(err => {
            handleFunctionError(err, fileName, functionName);
        })
    } else if(transaction) {
        handleRequestError(error, fileName, functionName, 500, res, errorContent);
        transaction.rollback().catch(err => {
            handleFunctionError(err, fileName, functionName);
        })
    } else {
        handleRequestError(error, fileName, functionName, 500, res, errorContent);
    }
}

/**
 * 
 * @param {string} filename 
 * @param {string} functionname 
 * @param {Response} res 
 * @param {{Error, Mensaje, Num_solicitud}} data 
 * @param {string} message 
 * @param {string} submessage
 */
exports.handleCapServiceError = function(filename, functionname, res, data, errorMessage, submessage) {
    var errorData = {
        internalCode: Number(data.Error)
    };
    data.Error == NoCancelError ? errorData.state = data.Estado : '';
    var customError = new CustomError(400, submessage ? data.Mensaje + '. ' + submessage : data.Mensaje,  errorData);
    handleRequestCustomError(new Error(errorMessage), filename, functionname, res, customError);
}

/** retorna la fecha y hora del servidor */
function getServerDate(){
    let current_datetime = new Date()
    let formatted_date = current_datetime.getFullYear() 
        + "-" + ((current_datetime.getMonth() + 1)<10?'0'+(current_datetime.getMonth() + 1):(current_datetime.getMonth() + 1)) 
        + "-" + (current_datetime.getDate()<10?'0'+current_datetime.getDate():current_datetime.getDate()) 
        + "T" + (current_datetime.getHours()<10?'0'+current_datetime.getHours():current_datetime.getHours()) 
        + ":" + (current_datetime.getMinutes()<10?'0'+current_datetime.getMinutes():current_datetime.getMinutes())
        + ":" + (current_datetime.getSeconds()<10?'0'+current_datetime.getSeconds():current_datetime.getSeconds())
    return formatted_date
}

/**
 * Verifica si el error produce un bloqueo del frontend
 * @param {*} error 
 * @param {*} response
 */
function evaluateBlockError(error, response) {
    if (typeof error == 'object') {
        if (error.code == ErrorCodes.timeout || error.code == ErrorCodes.socket) { // Timeout por desconexión
            response.blockError = true;
        } else if (error instanceof Error && error.customCode >= 500 ) { // Código de error numérico
            response.blockError = true;
        } else if ( error.response && error.response.status >= 500 ) { // Error de la librería para SOAP
            response.blockError = true;
        } else if ( error.name && typeof error.name == 'string' && error.name.startsWith('Mongo') ) { // Error de Mongodb
            response.blockError = true;
        }
    }
}

exports.handleRequestError = handleRequestError;
exports.handleFunctionError = handleFunctionError;
exports.handleRequestCustomError = handleRequestCustomError;
