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
const EnviromentSystem = require("../utils/enviromentFunction");
const FileFunction = require("../utils/fileFunction.util");

const FILENAME = "NoteDebitCreditController.js";

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.readAllCompany = async function (req, res) {
  var timeoutVoidTransactionId = Math.floor(
    Math.random() * (1000000000 - 1000 + 1) + 1000
  );
  const functionname = "readAllCompany";
  try {
    const pool = await sqlDriver.getPool();
    let query = `SELECT * FROM  empre_Company`;
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

exports.createNoteDebitCredit = async function (req, res) {
  const functionname = "createNoteDebitCredit";

  const url = "http://e-fact.com.gt/api/receipt/document/fel/create/notac";
  try {
    const dataJson = req.body;
    const pool = await sqlDriver.getPool();
    let resp;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataJson),
    };

    await fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log("Funciono");
        console.log(data);
        resp = data;
      })
      .catch((error) => {
        console.log("No funciono");
        console.error(error);
        return errorManager.handleTransactionCatchClause(
          error,
          FILENAME,
          functionname,
          500,
          res,
          error
        );
      });
     

    let register =  await saveDocument(resp, dataJson)
      console.log(register);

    return responseManager.sendResponseWithDocument(res, register);
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

saveDocument = async function (documento, noteJson) {
  const tempData = documento.infoDocument;
  const dataNoteDesc = noteJson.notacreditodebito;
  const envNote = await EnviromentSystem.enviromentSystem("VarNotaElectronico");
  const pool = await sqlDriver.getPool();
  const urlDoc = "http://e-fact.com.gt/doc/";


  let query = `INSERT INTO ccee_DocContable  (
                DCo_FechaHora, 
                DCo_Nit, 
                DCo_Direccion, 
                DCo_Xml, 
                fk_TipoDocContable, 
                DCo_NoRecibo, 
                DCo_Observacion, 
                DCo_ANombre, 
                fk_Cajero,
                FEL_UUID,
                FEL_id
                ,
                DCo_TipoDoc
                ) VALUES ( 
                '${(new Date(Date.now())).toISOString()}', 
                '${noteJson.nit}', 
                '${noteJson.address}', 
                '${urlDoc + tempData.uuid}',
                ${envNote.Var_Valor},
                '${tempData.number}',
                '${dataNoteDesc.motivoAjuste}',
                '${noteJson.name}',
                ${1},
                '${tempData.uuid}',
                '${documento._id}' ,
               
                'pdf'
                )
                SELECT SCOPE_IDENTITY() as DCo_NoDocContable`;
                console.log(query);
                //${await FileFunction.descargarArchivo(urlDoc + tempData.uuid)} ,
  const result = await pool.request().query(query);
  console.log(result);
  return result;
};
