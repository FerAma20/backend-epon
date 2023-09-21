var randomstring = require('randomstring');
var moment = require('moment');
var crypto = require('crypto-js');
var mongoose = require('mongoose');
const { Request, Response, NextFunction } = require('express');
const { CustomError } = require('../types/CustomError');

var path = require('path');
var filePath = path.resolve('data/Configuration.js');
var configuration = require(filePath);
var responseManager = require('../managers/responseManager');
var errorManager = require('../managers/errorManager');
var utils = require('../managers/utilManager');
const CONFIG = require('../config/config');
const { encriptacion } = require('../config/config');
const sqlDriver = require('../database/SQLDriver');

const FILENAME = 'CargaController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * 
 * Crea un producto en base a la lista que se envia. en json
 */

exports.createproducto = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'createproducto';
    try {
        const data = req.body;
        console.log(data);
        let resultado = [];
        const pool = await sqlDriver.getPool(); 
           for (const element of data){
             console.log('dentro del for');
             console.log(element);
            let query = `EXEC	sp_create_producto
            @prod_codigo = N'${element.codigo}',
            @prod_nombre = N'${element.nombre}',
            @prod_descripcion = N'${element.descripcion}',
            @prod_unidadmedida = ${element.unidad},
            @prod_paquete = ${element.paquete},
            @prod_metododespacho = ${element.despacho},
            @prod_metodovaloracion = ${element.valoracion},
            @prod_controlminimos = ${element.controlminimos},
            @prod_maximo = ${element.maximo},
            @prod_minimo = ${element.minimo},
            @prod_multiplo = ${element.multiplo},
            @prod_caducidad = ${element.caducidad},
            @prod_tiempouso = N'${element.tiempouso}',
            @prod_tiempovida = N'${element.tiempovida}',
            @prod_tiemporemocion = N'${element.tiemporemocion}',
            @prod_tiempoalerta = N'${element.tiempoalerta}',
            @prod_loteserie = ${element.loteserie},
            @prod_costoactual = ${element.costo},
            @prod_porcentajeventa1 = ${element.venta1},
            @prod_porcentajeventa2 = ${element.venta2},
            @prod_porcentajeventa3 = ${element.venta3},
            @prod_famproducto = ${element.famproducto},
            @prod_catproducto = ${element.catproducto},
            @prod_tipoproducto = ${element.tipoproducto},
            @prod_marca = N'${element.marca}',
            @prod_margen = ${element.margen},
            @prod_ctacontable = ${element.ctacontable},
            @prod_centrocosto = ${element.centrocosto},
            @prod_tipocombustible = ${element.tipocombustible}
            `;
    console.log(query);
                
            const result = await pool.request().query(query);
            let r = {"codigo": result.recordset[0].codigo ,"descripcion": result.recordset[0].descripcion }
            
            resultado.push(r)
          };
          console.log(resultado); 
            return responseManager.sendResponseWithDocument(res,resultado);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * 
 * Crea un cliente en base a una lista de json
 */
exports.createuser = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'createuser';
    try {
        const data = req.body;
        let resultado = [];
         
        for (const element of data){
            const pool = await sqlDriver.getPool();  
            let query = `EXEC	sp_nocolegiado
            @NoC_Nombre = N'${element.nombre}',
            @NoC_Apellido = N'${element.apellido}',
            @NoC_Nit = N'${element.nit}',
            @NoC_NumTelefono = N'${element.telefono}',
            @NoC_Direccion = N'${element.direccion}',
            @NoC_Observacion = N'${element.observacion}',
            @NoC_Telefonos = N'${element.telefono}',
            @NoC_mail = N'${element.mail}',
            @NoC_Cliente = ${element.cliente},
            @NoC_Proveedor = ${element.proveedor},
            @NoC_Retencion = ${element.retencion},
            @NoC_DPI = N'${element.dpi}',
            @fk_ImpuestoProveedor = ${element.impuestoproveedor}
            `
    
            const result = await pool.request().query(query);
            let r = {"codigo": result.recordset[0].codigo ,"descripcion": result.recordset[0].descripcion }
            
            resultado.push(r)
          };
            return responseManager.sendResponseWithDocument(res,resultado);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}


/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * 
 * Crea cuentas contables
 */
exports.createcta = async function (req,res) {
  var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
  const functionname = 'createcta';
  try {
      const data = req.body;
      let resultado = [];
      const pool = await sqlDriver.getPool();  
      for (const element of data){
          
          let query = `EXEC	sp_cuenta_contable
          @cta_codigo = N'${element.cta_codigo}',
          @cta_nombre = N'${element.cta_nombre}',
          @cta_descripcion = N'${element.cta_descripcion}',
          @cta_nivel = ${element.cta_nivel},
          @cta_suspender = ${element.cta_suspender},
          @cta_obligatorio = ${element.cta_obligatorio},
          @cta_obsoleto = ${element.cta_obsoleto},
          @cta_concilia = ${element.cta_concilia},
          @cta_impuestodefault = ${element.cta_impuestodefault},
          @cta_codigopadre = N'${element.cta_codigopadre}',
          @cta_tipoctacontable = ${element.cta_tipoctacontable},
          @cta_ctapago = ${element.cta_ctapago},
          @cta_ctahoja = ${element.cta_ctahoja},
          @cta_SaldoActual = ${element.cta_SaldoActual},
          @cta_IsTax = ${element.cta_IsTax},
          @cta_Naturaleza = ${element.cta_Naturaleza}
          `
          console.log(query);
  
          const result = await pool.request().query(query);
          console.log(result);
          let r = {"codigo": result.recordset[0].codigo ,"descripcion": result.recordset[0].descripcion }
          console.log(r);
          resultado.push(r)
        };
          return responseManager.sendResponseWithDocument(res,resultado);
  } catch (error) {
      return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
  }
}
