const mongoose = require('mongoose');
const errorManager = require('../managers/errorManager');
const CONFIG = require('../config/config');

const FILENAME = 'MongoDriver.js';

mongoose.connection.on('connecting', () => {
    console.info('Conectandose a MongoDB...');
});
  
mongoose.connection.on('error', (error) => {
    errorManager.handleFunctionError(error, FILENAME, 'Mongoose evento "error"');
    mongoose.disconnect();
});
  
mongoose.connection.on('connected', () => {
    console.info('Conexión a MongoDB realizada');
});
  
mongoose.connection.once('open', () => {
    console.info('Conexión a MongoDB abierta');
});
  
mongoose.connection.on('reconnected', () => {
    console.info('MongoDB conectada nuevamente');
});
  
mongoose.connection.on('disconnected', () => {
    console.error(`MongoDB desconectada! Reconectando en ${30000 / 1000}s...`);
    setTimeout(() => makeConnection().catch(() => {}), 30000);
});

/**
 * Crea la conexión a Mongo
 * @returns {Promise<void>} Promesa de la conexión realizada
 */
var makeConnection = async function() {
    var functionName = 'makeConnection';
    return new Promise( async (resolve, reject) => {
        try {


            await mongoose.connect(CONFIG.dbMongoStringConnection, {useNewUrlParser: true});
            resolve();
        } catch (error) {
            reject('No fue posible realizar la conexión a la BD Mongo');
        }
    });
}

exports.makeConnection = makeConnection;
