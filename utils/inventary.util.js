const sqlDriver = require("../database/SQLDriver");

exports.updateInventary  =async (products, warehouse) =>{
    const pool = await sqlDriver.getPool()
    for(const product of products){
        const {count, cod} = product
        const query = `UPDATE inv_AlmacenProducto 
        SET almprod_cantidad = almprod_cantidad - ${count}, 
        almprod_fechaactualizacion = '${new Date(Date.now()).toISOString()}'
        WHERE almprod_almacen = ${warehouse}
        AND almprod_producto = ${cod}`
        const result = await pool.request().query(query)
        
    }

}