const moment = require('moment');
const ActionLog = require('../database/schema/ActionLogSchema');
const errorManager = require('./errorManager');
const { Request } = require('express');

const FILENAME = 'logManager.js';

/**
 * 
 * @param {string} user 
 * @param {{id, name}} action 
 * @param {Request} req 
 * @param {string} token 
 * @param {{id, text}} description
 * @param {string} append
 * @returns {Promise<void>}
 */
exports.addToActionLog = async function(user, action, req, token = undefined, description = undefined, append = '') {
    return new Promise(async(resolve, reject) => {
        var functionname = 'addToActionLog';
        try {
            let ip = (req.headers['x-forwarded-for'] || '').split(',').shift();
            //limpiamos la ip
            let clean_str = ip.match(/\w{1,3}\.\w{1,3}\.\w{1,3}\.\w{1,3}/g);
            //si no es null
            if (clean_str) {
                //validamos la rango de ip
                let matchArray = clean_str[0].match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g);
                //si no es null tomamos la ip
                if(matchArray){
                    matchArray.length > 0 ? ip = matchArray[0] : ip = '';
                //si matchArray es null ip es undefined
                } else {
                      ip = 'undefined';
                }
            //si clean_str es null ip es undefined      
            } else {
                ip = 'undefined';
            }
            //user ? '' : user = req.get('X-ucode');

            const logInfo = {
                idUser: user,
                date: moment(),
                idAction: action.id,
                action: action.name,
                ipAddress: ip,
                device: req.device.type,
                token,
                description: description ? description.text + append : undefined,
                idDescription: description ? description.id : undefined
            }
            const newLog = new ActionLog(logInfo);
            await newLog.save();
            resolve();
        } catch (error) {
            errorManager.handleFunctionError('No fue posible guardar la información en el log de acciones', FILENAME, functionname);
            reject(error);
        }
    })
}
