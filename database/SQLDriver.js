//var mysql = require('mysql');
var sql = require('mssql');
var config = require('../config/config');
var errorManager = require('../managers/errorManager')

var SQLPool = undefined

const dbConfig = {
    user: config.dbUserMS,
    password: config.dbPasswordMS,
    server: config.dbServerMS,
    database: config.dbDatabaseNameMS,
    connectionTimeout: 60000,
    trustServerCertificate: true,
  options: {
    port: config.dbPortMS
  }
}


/** 
 * Crea una connection pool hacia la BD
 * @returns {Promise<void>} Promesa de la conexión
*/
const connection = async function(){
    return new Promise(async(resolve, reject) => {
        try {
            SQLPool = await new sql.ConnectionPool(dbConfig).connect();
            console.log('Connection pool de MSSQL creado y conectado');
            resolve();
        } catch (error) {
            errorManager.handleFunctionError('No fue posible realizar la conexión a SQL server', 'SQLDriver.js', 'connection');
            reject(error);
        }
    })
}

/*const connection = async function(){
    console.log(dbConfig);
    SQLPool = mysql.createPool(dbConfig);
    return new Promise(async(resolve, reject) => {
        try {
            SQLPool.getConnection(function (err) {
                if (err) {  
                    console.log("dio error");                
                    return reject(err);
                }
                console.log('Connection pool de MYSQL creado y conectado');
                
                resolve();
            });
        
        } catch (error) {
            errorManager.handleFunctionError('No fue posible realizar la conexión a SQL server', 'SQLDriver.js', 'connection');
            reject(error);
        }
    })
}*/

/**
 * Devuelve un objeto de tipo connectionPool de la libreria mssql. Si la conexión no existe la crea.
 * @returns {Promise<sql.ConnectionPool>} Pool de conexiones para base de datos MS SQL
 */
const getPool = async function(){
    return new Promise(async(resolve, reject) => {
        try {
            if(SQLPool){
                resolve(SQLPool)
            } else {
                await connection()
                resolve(SQLPool)
            }
        } catch (error) {
            reject(error);
        }
    })
}

exports.sql = sql
//exports.dbConfig = dbConfig
exports.SQLPool = SQLPool
exports.connection = connection
exports.getPool = getPool