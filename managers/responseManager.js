const utils = require('../managers/utilManager');

const { Request } = require('express');
const { encriptacion } = require('../config/config');

/**
 * envía respuesta exitosa al usuario con información
 * @param {Request} res 
 * @param {object} body 
 * @param {string} message 
 * @param {string} key 
 */
exports.sendResponseWithBody = function(res, body, message = '', error=false){
    let response = {
        error: error,
        successMessage: message,
        body: body
    }
    var cipheredBody = utils.encrypt(response, encriptacion.key);
    res.status(200).send({data: cipheredBody});
}

exports.sendResponseWithoutBody = function(res, message = ''){
    let response = {
        error: false,
        status: 200,
        successMessage: message,
        body: ''
    }
    res.status(200).send(response);
}

/**
 * Envía una respuesta que contiene un documento
 * @param {Response} res 
 * @param {any} body 
 */
exports.sendResponseWithDocument = function(res, body) {
    res.status(200).send(body);
}