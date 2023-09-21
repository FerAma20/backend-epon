'use strict'

const errorManager = require('./errorManager');
const crypto = require('crypto-js');
const moment = require('moment');
const { Request, Response, NextFunction } = require('express');
const { ServiceNames } = require('../config/config');

const FILENAME = 'utilManager.js';

/**
 * Encripta el objeto enviado
 * @param {object} data objeto a encriptar
 * @param {string} key clave a utilizar
 * @returns {string} texto encriptado
 */
var encrypt = function(data, key) {
    let jsonData = JSON.stringify(data);
    var bytes = crypto.AES.encrypt(jsonData, key);
    var cipheredText = bytes.toString();
    return cipheredText;
}

/**
 * Desencripta un texto con Crypto-js
 * @param {string} cipherText texto a descifrar
 * @param {string} key clave
 * @returns 
 */
var decrypt = function(cipherText, key) 
{
    console.log("encriptando");
    var bytes = crypto.AES.decrypt(cipherText, key);
    var originalText = bytes.toString(crypto.enc.Utf8);

    return originalText;
}

/**
 * Devuelve el objeto con los datos de la petición
 * @param {object} body 
 * @param {string} authorization 
 * @returns {{data, token}} objeto con los datos de la petición
 */
var decryptRequestBody = function(body, authorization){
    var functionname = 'decryptRequestBody';
    try {
        const token = getTokenFromHeader(authorization);
        const decrypted = decrypt(body.data, token);
        const result = {
            data: JSON.parse(decrypted),
            token
        };

        return result;
    } catch (error) {
        errorManager.handleFunctionError(error, FILENAME, functionname);
        throw new Error('No fue posible desencriptar el cuerpo de la petición');
    }
}

/**
 * Devuelve un objeto con los datos de la petición
 * @param {Request} req 
 * @param {Response} res
 * @returns {{data, token}}
 */
var decryptRequest = function(req, res) {
    var functionname = 'decryptRequest';
    try {
       
        var decrypted = '';
        if (req.body && req.body.data) {
            decrypted = decrypt(req.body.data, res);
            decrypted = JSON.parse(decrypted);
        }
        const result = {
            data: decrypted
        };

        return result;
    } catch (error) {
        errorManager.handleFunctionError(error, FILENAME, functionname);
        throw new Error('No fue posible desencriptar la petición');
    }
}

/**
 * Devuelve la fecha del servidor en formato YYYY-MM-DD HH:mm:ss
 * @returns {string}
 */
var getServerDate = function() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

/**
 * Obtiene el valor del token del header "Authorization"
 * @param {string} header 
 * @returns {string}
 */
var getTokenFromHeader = function(header) {
    return header.split(' ')[1];
}

/**
 * Convierte un objeto Date a string con formato "DD/MM/YYYY"
 * @param {Date} date
 */
var formatDateToLocal = function(date) {
    const functionname = 'formatDateToLocal';
    try {
        var momentDate = moment(date);
        var stringDate = momentDate.format('DD/MM/YYYY');
        return stringDate;
    } catch (error) {
        errorManager.handleFunctionError(error, FILENAME, functionname);
        throw new Error('Hubo un error al momento de convertir la fecha');
    }
}

/**
 * Envía un mensaje al medio disponible del usuario
 * @param {string} username 
 * @param {string} message 
 * @param {string} title 
 */
var sendMessageToUser = function(username, message, title='') {
    const functionname = 'sendMessageToUser';
    return new Promise(async(resolve, reject) => {
        try {
            // información del medio del envío
            
        } catch (error) {
            errorManager.handleFunctionError('No fue posible enviar el mensaje al usuario', FILENAME, functionname);
            reject(error);
        }
    })
}

/**
 * Agrega una propiedad a la lista convirtiendo la fecha en objeto Moment
 * @param {Array<Object>} array 
 * @param {string} propertyDate 
 * @param {string} newPropertyName 
 */
var setMomentDateArray = function(array, propertyDate, newPropertyName) {
    const functionname = 'setMomentDateArray';
    try {
        for(let element of array) {
            element[newPropertyName] = moment(element[propertyDate], 'DD/MM/YYYY');
        }
    } catch {
        errorManager.handleFunctionError(error, FILENAME, functionname);
        throw new Error('Hubo un error al momento de asignar la fecha tipo "moment"');
    }
}

/**
 * Obtiene la fecha y hora en formato para fecha 'DD/MM/YYYY y para hora 'HH:mm'
 * @returns {{date, time}}
 */
var getBritishServerDate = function() {
    let localMoment = moment();
    let date = localMoment.format('DD/MM/YYYY');
    let time = localMoment.format('HH:mm');

    return {date, time};
}

/**
 * Calcula el nuevo tiempo de vencimiento para un password
 * @param {Date} date 
 * @returns {import('moment').Moment}
 */
var calculatePwrdDueDate = function(date=undefined) {
    const functionname = 'calculatePwrdDueDate';
    try {
        date ? '' : date = new Date();
        let mDate = moment(date);
        return mDate.add(90, 'days');
    } catch (error) {
        errorManager.handleFunctionError();
        throw new Error('No fue posible calcular la nueva fecha de vencimiento de la contraseña');
    }
}

/**
 * Obtiene el token del encabezado
 * @param {Request} req 
 * @returns {string}
 */
var getRequestToken = function(req) {
    let authHeader = req.get('Authorization');
    if (authHeader) {
        return getTokenFromHeader(authHeader);
    } else {
        return undefined;
    }
}

var isProductionEnv = function() {
    return process.env.NODE_ENV == 'production' ? true : false;
}

exports.decrypt = decrypt;
exports.encrypt = encrypt;
exports.decryptRequestBody = decryptRequestBody;
exports.decryptRequest = decryptRequest;
exports.getServerDate = getServerDate;
exports.getTokenFromHeader = getTokenFromHeader;
exports.formatDateToLocal = formatDateToLocal;
exports.sendMessageToUser = sendMessageToUser;
exports.setMomentDateArray = setMomentDateArray;
exports.getBritishServerDate = getBritishServerDate;
exports.calculatePwrdDueDate = calculatePwrdDueDate;
exports.isProductionEnv = isProductionEnv;
exports.getRequestToken = getRequestToken;
