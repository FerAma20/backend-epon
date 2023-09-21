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

const FILENAME = 'PagoMController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * 
 * consulta todos los pagos hechos, usa de parametros la fecha y cajero y caja, si todo viene vacio hace un top 20 de los ultimos pagos
 */


exports.createPago = async function (req,res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'createPago';
    try {
        const data = req.body;
        let total = 0;
        let totales = 0;
        let medios = [];
        let codigo = 0;
        let pago = 0;
        let respuesta = {"Codigo": -1, "Dato": -1,"Transaccion":[]}
        total = data.Pag_Monto;
        medios = data.Metodo;  
        medios.forEach(m => {
            totales = m.MPP_Monto + totales;
        });
      console.log(medios);
        if(total == totales){
            const pool = await sqlDriver.getPool();   
            let query = `EXEC	sp_pago_only
            @Cajero = ${data.fk_Cajero},
            @Caja =   ${data.fk_Caja},
            @Monto = ${data.Pag_Monto},
            @FechaHora = N'${data.Pag_Fecha}',
            @Reserva=0,
            @Rechazado=0,
            @Observacion = N'${data.Observacion}' `;

            const result = await pool.request().query(query);
            console.log(result);
            //ingreso pagos y obtengo el id para luego enviarlo
            result.recordset.forEach((row) => {
                 codigo = row.codigo;
                 pago = row.pago;
           
              });

              if(codigo == 0 && pago >= 0){

                //enciclo los medios de pagos
                   

                for (let mediop in medios){
                    let mp = medios[mediop];
                    let queryM = `EXEC	sp_Medio_Pago
                    @MedioPago = ${mp.fk_MedioPago},
                    @Monto = ${mp.MPP_Monto},
                    @CODIGO = ${pago},
                    @NoTransaccion = N'${mp.MPP_NoTransaccion}',
                    @MPP_NoDocumento = N'${mp.MPP_NoDocumento}',
                    @Observacion = N'${mp.MPP_Observacion}',
                    @Reserva = 0,
                    @Rechazado = 0,
                    @FechaHora = N'${data.Pag_Fecha}',
                    @Banco = ${mp.fk_Banco} `;
                    console.log(queryM);
                    const results = await pool.request().query(queryM);
                    console.log(results);
                    results.recordset.forEach((row) => {
                        respuesta.Transaccion.push({"R":row.pago})
                  
                     });           
                }
                 

                //

                respuesta.Codigo = 0;
                respuesta.Dato = pago;
                
              }else{
                respuesta.Codigo = -1;
                respuesta.Dato = -1; 
              }

            //

            return responseManager.sendResponseWithDocument(res,respuesta);
        }else{
            return responseManager.sendResponseWithDocument(res,[{"Error":"Totales distintos"}]);
        }

      
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}


