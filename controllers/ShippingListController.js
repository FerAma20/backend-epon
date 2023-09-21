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

const FILENAME = "ShippingListController.js";

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.readAllShippingList = async function (req, res) {
  const functionname = "readAllShippingList";
  try {
    const pool = await sqlDriver.getPool();
    let query = `SELECT * FROM  pto_ListaEnvio`;
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

exports.createShippingList = async function (req, res) {
  const functionname = "createShippingList";

  try {
    const { lenv_noenvio, fk_tipoenvio, lenv_estado, lenv_tdescuento, lenv_valordescuentoc } = req.body;

    const pool = await sqlDriver.getPool();
    let query = `INSERT INTO pto_ListaEnvio  
            (lenv_noenvio, fk_tipoenvio, lenv_estado, lenv_tdescuento, lenv_valordescuentoc) VALUES (
                '${lenv_noenvio}', 
                ${fk_tipoenvio}, 
                '${lenv_estado}',
                '${lenv_tdescuento}',
                '${lenv_valordescuentoc}'
                ) SELECT SCOPE_IDENTITY() as lenv_listaenvio `;
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

exports.updateShippingList = async function (req, res) {
  const functionname = "updateShippingList";
  try {
    const { tenv_nombretipoenvio, tenv_formula, tenv_webservice, tenv_tipoenvio } = req.body;
    const pool = await sqlDriver.getPool();
    let query = `UPDATE pto_ListaEnvio  SET 
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

exports.deleteShippingList = async function (req, res) {
  const functionname = "deleteShippingList";
  try {
    const { tenv_tipoenvio } = req.body;
    const pool = await sqlDriver.getPool();
    let query = `DELETE FROM pto_ListaEnvio WHERE tenv_tipoenvio = ${tenv_tipoenvio}`;
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
