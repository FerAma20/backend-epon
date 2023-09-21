'use strict'
var errorManager = require('./errorManager');

const { Transaction } = require('mssql');

/** Variables globales */
const LOCALFILENAME = 'databaseManager.js'

/** Cierra la conexión del pool de SQL */
exports.closeSQLPool = function(pool, fileName, functionName){
    if(pool) pool.close().catch(error => errorManager.handleFunctionError(error, fileName, functionName))
}

/** Realiza el rollback de la transacción de SQL */
exports.rollbackSQLTransaction = function(transaction, fileName, functionName){
    if(transaction) transaction.rollback().catch(err => errorManager.handleFunctionError(err, fileName, functionName));
}

/**
 * Función que maneja errores de otras funciones que incluyen una transacción
 * @param {*} err Error
 * @param {String} fileName Nombre del archivo 
 * @param {String} functionName Nombre de la función
 * @param {Transaction} transaction Transacción en ejecución
 * @returns {Promise} Promesa con el resultado
 */
exports.handleFunctionTransactionError = async function(err, fileName, functionName, transaction){
    var localFunctionName = 'handleFunctionTransactionError'

    return new Promise(async(resolve, reject) => {

        errorManager.handleFunctionError(err, fileName, functionName)
        
        await transaction.rollback()
        .then(result => { resolve() })
        .catch(err => {
            errorManager.handleFunctionError(err, LOCALFILENAME, localFunctionName)
            reject(err)
        })
    })
        
        
}
