var randomstring = require("randomstring");
var moment = require("moment");
var crypto = require("crypto-js");
var mongoose = require("mongoose");
const { Request, Response, NextFunction } = require("express");
const { CustomError } = require("../types/CustomError");

var cybersourceRestApi = require("cybersource-rest-client");
var path = require("path");
var filePath = path.resolve("data/Configuration.js");
var configuration = require(filePath);
var responseManager = require("../managers/responseManager");
var errorManager = require("../managers/errorManager");
var utils = require("../managers/utilManager");
const CONFIG = require("../config/config");
const { encriptacion } = require("../config/config");
const sqlDriver = require("../database/SQLDriver");

const FILENAME = "ProductTypeController.js";

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.readAllProductPointOfSale = async function (req, res) {
  const functionname = "readAllProductType";
  try {
    const { warehouse } = req.body;
    const pool = await sqlDriver.getPool();
    let query = `SELECT ip.prod_producto, ip.prod_codigo, ip.prod_nombre, ip.prod_descripcion, ip.prod_unidadmedida, ip.prod_paquete, ip.prod_catproducto , ip.prod_famproducto,
            ip.prod_tipoproducto, ip.prod_foto, iap.almprod_cantidad, iap.almprod_costoactual 
            FROM inv_AlmacenProducto iap 
            INNER JOIN inv_Producto ip ON iap.almprod_producto = ip.prod_producto 
            WHERE iap.almprod_almacen = ${warehouse}`;
    const result = await pool.request().query(query);
    return responseManager.sendResponseWithDocument(res, result.recordset);
  } catch (error) {
    return errorManager.handleTransactionCatchClause(
      error,
      FILENAME,
      functionname,
      500,
      res,
      "Error en login"
    );
  }
};

exports.createEconomicCharge = async function (req, res) {
  const functionname = "createEconomicChargePointOfSale";
  try {
    const data = req.body;
    console.log(functionname)
    console.log(data)
    const pool = await sqlDriver.getPool();
    let query = `INSERT INTO ccee_CargoEconomico_otros  (
                CEcO_Monto, 
                CEcO_FechaGeneracion, 
                fk_Pago, 
                fk_DocContable,
                fk_Sucursal, 
                fk_producto, 
                fk_turno, 
                NoVale, 
                fk_empleado, 
                inv_HistoricoPrecioProd
                ) VALUES ( 
                    ${data.CEcO_Monto},	
                    '${data.CEcO_FechaGeneracion}',	
                    ${data.fk_Pago},	
                    ${data.fk_DocContable},	
                    ${data.fk_Sucursal},	
                    ${data.fk_producto},	
                    ${data.fk_turno},	
                    '${data.NoVale ? data.NoVale : ""}',		
                    ${data.fk_empleado},	
                    ${
                      data.inv_HistoricoPrecioProd
                        ? data.inv_HistoricoPrecioProd
                        : null
                    }
                )`;
                console.log(query)
    const result = await pool.request().query(query);
    return responseManager.sendResponseWithDocument(res, {
        codeStatus: 200,
        status: "success",
        data: {
          result
        }
      });
  } catch (error) {
    console.log(error)
    return errorManager.handleTransactionCatchClause(
      error,
      FILENAME,
      functionname,
      500,
      res,
      "Error en login"
    );
  }
};

exports.readAllDiscountPointOfSale = async function (req, res) {
  const functionname = "readAllDiscountPointOfSale";
  try {
    const pool = await sqlDriver.getPool();
    let query = `SELECT * FROM pto_TipoDescuento ptd `;
    const result = await pool.request().query(query);
    return responseManager.sendResponseWithDocument(res, result.recordset);
  } catch (error) {
    return errorManager.handleTransactionCatchClause(
      error,
      FILENAME,
      functionname,
      500,
      res,
      "Error en login"
    );
  }
};
