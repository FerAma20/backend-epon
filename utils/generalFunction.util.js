const sqlDriver = require('../database/SQLDriver');

const FILENAME = 'GeneralFunction.util.js';


exports.establishmentFEL = async function(idEstablishment){

    try{
        const pool = await sqlDriver.getPool();   
        let query = `SELECT suc_EstablecimientoFEL FROM  ccee_SucursalConta WHERE SConta_id = '${idEstablishment}'`;
        const result = await pool.request().query(query);
        return result.recordset[0].suc_EstablecimientoFEL;
    }catch(error){
        return null;
    }
}

exports.updateStock = async function(products, warehouse){

    try{
      
        for(const product of products){
            let query = `SELECT * FROM  inv_AlmacenProducto WHERE almprod_almacen = ${warehouse} AND almprod_producto = ${product.cod}`;
            const result = await pool.request().query(query);
            const data = result.recordset[0];
            let query2 = `UPDATE inv_AlmacenProducto  SET 
            almprod_cantidad = ' ${(parseFloat(data.almprod_cantidad)  + parseFloat(product.count) )}',  
            almprod_fechaactualizacion = '${new Date().toISOString().slice(0,10)}' 
            WHERE almprod_almacen = ${warehouse}
            AND almprod_producto = ${product}`;                
            const result2 = await pool.request().query(query2);

            
        }
        return true
    }catch(error){
        return false
    }
}