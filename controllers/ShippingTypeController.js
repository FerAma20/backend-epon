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

const FILENAME = "ShippingTypeController.js";

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.readAllShippingType = async function (req, res) {
  const functionname = "readAllShippingType";
  try {
    const pool = await sqlDriver.getPool();
    let query = `SELECT * FROM  pto_TipoEnvio`;
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

exports.createShippingType = async function (req, res) {
  const functionname = "createShippingType";

  try {
    const { tenv_nombretipoenvio, tenv_formula, tenv_webservice } = req.body;

    const pool = await sqlDriver.getPool();
    let query = `INSERT INTO pto_TipoEnvio  
            (tenv_nombretipoenvio, tenv_formula, tenv_webservice) VALUES (
                '${tenv_nombretipoenvio}', 
                '${tenv_formula}', 
                '${tenv_webservice}'
                ) SELECT SCOPE_IDENTITY() as tenv_tipoenvio `;
    const result = await pool.request().query(query);
    return responseManager.sendResponseWithDocument(res, result.recordset[0]);
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

exports.updateShippingType = async function (req, res) {
  const functionname = "updateShippingType";
  try {
    const { tenv_nombretipoenvio, tenv_formula, tenv_webservice, tenv_tipoenvio } = req.body;
    const pool = await sqlDriver.getPool();
    let query = `UPDATE pto_TipoEnvio  SET 
            tenv_nombretipoenvio = '${tenv_nombretipoenvio}',  
            tenv_formula = '${tenv_formula}',
            tenv_webservice = '${tenv_webservice}'
            WHERE tenv_tipoenvio = ${tenv_tipoenvio}`;
    const result = await pool.request().query(query);
    return responseManager.sendResponseWithDocument(res, result);
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

exports.deleteShippingType = async function (req, res) {
  const functionname = "deleteShippingType";
  try {
    const { tenv_tipoenvio } = req.body;
    const pool = await sqlDriver.getPool();
    let query = `DELETE FROM pto_TipoEnvio WHERE tenv_tipoenvio = ${tenv_tipoenvio}`;
    const result = await pool.request().query(query);
    return responseManager.sendResponseWithDocument(res, result);
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
