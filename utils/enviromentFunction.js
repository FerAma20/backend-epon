const sqlDriver = require('../database/SQLDriver');

const FILENAME = 'WarehouseOrdinaryProductController.js';


exports.enviromentSystem = async function(nameEnviroment){

    try{
        const pool = await sqlDriver.getPool();   
        let query = `SELECT Var_Valor FROM  ccee_Variables WHERE Var_Clave = '${nameEnviroment}'`;
        const result = await pool.request().query(query);
        return result.recordset[0].Var_Valor;
    }catch(error){
        return null;
    }
}