const randomstring = require("randomstring");
const moment = require("moment");
const crypto = require("crypto-js");
const mongoose = require("mongoose");
const {Request, Response, NextFunction} = require("express");
const {CustomError} = require("../types/CustomError");

const cybersourceRestApi = require("cybersource-rest-client");
const path = require("path");
const filePath = path.resolve("data/Configuration.js");
const configuration = require(filePath);
const responseManager = require("../managers/responseManager");
const errorManager = require("../managers/errorManager");
const utils = require("../managers/utilManager");
const CONFIG = require("../config/config");
const {encriptacion} = require("../config/config");
const sqlDriver = require("../database/SQLDriver");
const EnviromentSystem = require("../utils/enviromentFunction");
const FileFunction = require("../utils/fileFunction.util");
const GeneralFunction = require("../utils/generalFunction.util");
const InventaryUtil = require("../utils/inventary.util");

const FILENAME = "NoteDebitCreditController.js";
const urlDoc = "http://e-fact.com.gt/doc/";

//Local
//const urlDocDown = "http://localhost:4201/docFEL/getInvoiceFEL/";

//Server Test
const urlDocDown = "http://198.38.89.221:4201/docFEL/getInvoiceFEL/";

/**
 *
 * @param {Request} req
 * @param {Response} res
 */

exports.getInvoiceFEL = async function (req, res) {
    const functionname = "getInvoiceFEL";
    const {DCo_NoDocContable} = req.query;

    let newFile = {
        codeStatus: 404,
        status: "error",
        message: "wrong invoice type -- typeInvoice",
        data: {}
    }
    const pool = await sqlDriver.getPool();
    try {

        let query = `SELECT DCo_Documento
                     FROM ccee_DocContable
                     WHERE DCo_NoDocContable = ${DCo_NoDocContable}`;
        const result = await pool.request().query(query);

        const buffer = Buffer.from(result.recordset[0].DCo_Documento, 'base64');

// Luego, creamos un stream de lectura (Readable stream) a partir del buffer
        const readableStream = new require('stream').Readable();
        readableStream.push(buffer);
        readableStream.push(null);
        return readableStream.pipe(res);
    } catch (ex) {

    }
    return responseManager.sendResponseWithDocument(res, newFile);
};

exports.createInvoiceFEL = async function (req, res) {
    const functionname = "createInvoiceFEL";
    const {typeInvoice} = req.body;
    let newFile;
    switch (typeInvoice) {
        case 1:
            newFile = await createInvoice(req.body);
            break;
        case 2 :
            newFile = await createInvoicePetroleum(req.body);
            break;
        default:
            newFile = {
                codeStatus: 404,
                status: "error",
                message: "wrong invoice type -- typeInvoice",
                data: {}
            }
            break;
    }
    console.log(newFile)
    return responseManager.sendResponseWithDocument(res, newFile);
};

createInvoice = async function (data) {
    const {
        idEstablishment,
        email,
        nit,
        name,
        address,
        zip,
        municipality,
        departament,
        products,
        specialType
    } = data;

    const url = "http://e-fact.com.gt/api/v1/receipt/document/fel/create";
    const jsonDoc = {
        idUser: parseInt(await EnviromentSystem.enviromentSystem("IdUserEfact")),
        email,
        nit,
        name,
        address,
        zip,
        municipality,
        departament,
        establishment: parseInt(
            await GeneralFunction.establishmentFEL(idEstablishment)
        ),
        products,
    }
    if (specialType === 'CUI') jsonDoc.specialType = specialType
    try {
        let resp;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonDoc),
        };
        console.log(jsonDoc)
        await fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
                resp = data;
                console.log(data)
                console.log('respuesta de efact success')
                console.log(resp)
            })
            .catch((error) => {
                console.log('respuesta de efact error')
                console.log(error)
                return errorManager.handleTransactionCatchClause(
                    error,
                    FILENAME,
                    functionname,
                    500,
                    res,
                    error
                );
            });
        return await saveDocument(resp, data);
    } catch (error) {
        console.log('respuesta de efact error, error')
        console.log(error)
        return error;
    }
};

createInvoicePetroleum = async function (data) {
    const {
        idEstablishment,
        email,
        nit,
        name,
        address,
        zip,
        municipality,
        departament,
        products,
        specialType
    } = data;

    const url = 'http://e-fact.com.gt/api/receipt/document/fel/create/petroleo';
    const jsonDoc = {
        idUser: parseInt(await EnviromentSystem.enviromentSystem("IdUserEfact")),
        email,
        nit,
        name,
        address: address === "" ? "Guatemala" : address,
        zip,
        municipality,
        departament,
        fixed: '4',
        establishment: parseInt(
            await GeneralFunction.establishmentFEL(idEstablishment)
        ),
        products,
    };
    if (specialType === 'CUI') jsonDoc.specialType = specialType;
    try {
        let resp;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonDoc),
        };

        await fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
                resp = data;
            })
            .catch((error) => {
                return errorManager.handleTransactionCatchClause(
                    error,
                    FILENAME,
                    functionname,
                    500,
                    res,
                    error
                );
            });
        return await saveDocument(resp, data);
    } catch (error) {
        return error;
    }
};

saveDocument = async function (documento, noteJson) {
    const pool = await sqlDriver.getPool();
    try {
        const {infoDocument, _id} = noteJson.typeInvoice === 1 ? documento : documento.msg;
        const {uuid, number} = infoDocument;

        let query = `INSERT INTO ccee_DocContable (DCo_FechaHora,
                                                   DCo_Nit,
                                                   DCo_Direccion,
                                                   DCo_Xml,
                                                   fk_TipoDocContable,
                                                   DCo_NoRecibo,
                                                   DCo_Observacion,
                                                   DCo_ANombre,
                                                   fk_Cajero,
                                                   FEL_UUID,
                                                   FEL_id,
                                                   DCo_Documento,
                                                   DCo_TipoDoc)
                     VALUES ('${new Date(Date.now()).toISOString()}',
                             '${noteJson.nit}',
                             '${noteJson.address}',
                             '${urlDoc + uuid}',
                             ${await EnviromentSystem.enviromentSystem("VarNotaElectronico")},
                             '${number}',
                             '',
                             '${noteJson.name}',
                             ${1},
                             '${uuid}',
                             '${_id}',
                             '${await FileFunction.downloadFile(urlDoc + uuid)}',
                             'pdf')
        SELECT SCOPE_IDENTITY() as DCo_NoDocContable`;
        const result = await pool.request().query(query);
        InventaryUtil.updateInventary(noteJson.products, noteJson.warehouse)
        return (res = {
            codeStatus: 200,
            status: "success",
            data: {
                idDocument: result.recordset[0].DCo_NoDocContable,
                linkDocument: urlDocDown + '?DCo_NoDocContable=' + result.recordset[0].DCo_NoDocContable
            },
        });
    } catch (error) {
        let query = `INSERT INTO ccee_DocContable (DCo_FechaHora,
                                                   DCo_Nit,
                                                   DCo_Direccion,
                                                   DCo_Xml,
                                                   fk_TipoDocContable,
                                                   DCo_NoRecibo,
                                                   DCo_Observacion,
                                                   DCo_ANombre,
                                                   fk_Cajero,
                                                   FEL_UUID,
                                                   FEL_id,
                                                   DCo_Documento,
                                                   DCo_TipoDoc)
                     VALUES ('${new Date(Date.now()).toISOString()}',
                             '${noteJson.nit}',
                             '${noteJson.address}',
                             '',
                             ${await EnviromentSystem.enviromentSystem("VarNotaElectronico")},
                             '',
                             '',
                             '${noteJson.name}',
                             ${1},
                             '',
                             '',
                             '',
                             'pdf')
        SELECT SCOPE_IDENTITY() as DCo_NoDocContable`;
        const result = await pool.request().query(query);
        InventaryUtil.updateInventary(noteJson.products, noteJson.warehouse)
        return (res = {
            codeStatus: 504,
            status: "error",
            message: "Record generated without invoice.",
            data: {
                idDocument: result.recordset[0].DCo_NoDocContable,
                linkDocument: ""
            },
        });
    }
};


exports.listInvoice = async function (req, res) {
    const functionname = "listInvoice";
    let r;
    try {
        const {dateInit, dateEnd, cash, cashier} = req.body;
        const pool = await sqlDriver.getPool();

        const query = ` SELECT cdc.DCo_FechaHora,
                               cdc.DCo_NoRecibo,
                               cdc.FEL_UUID,
                               cdc.DCo_ANombre,
                               cdc.DCo_Nit,
                               cdc.DCo_NoDocContable,
                               cp.Pag_Monto
                        FROM ccee_Pago cp
                                 INNER JOIN ccee_CargoEconomico_otros cceo ON cp.Pag_NoPago = cceo.fk_Pago
                                 INNER JOIN ccee_DocContable cdc ON cceo.fk_DocContable = cdc.DCo_NoDocContable
                        WHERE cp.fk_Cajero = ${cashier}
                          AND cp.fk_Caja = ${cash}
                          AND cp.Pag_Fecha BETWEEN '${dateInit}' AND '${dateEnd}'`;
        const result = await pool.request().query(query);
        r = {
            codeStatus: 200,
            status: "success",
            data: result.recordset,
        };
    } catch (error) {
        r = {
            codeStatus: 504,
            status: "error",
            message: error,
            data: {},
        };
    }
    console.log(r)
    return responseManager.sendResponseWithDocument(res, r);
};

exports.listCargosInvoice = async function (req, res) {
    const functionname = "listCargosInvoice";
    let r;
    try {
        const {idDocument} = req.body;
        const pool = await sqlDriver.getPool();

        const query = `SELECT cceo.CEcO_Monto, ip.prod_nombre, ip.prod_producto
                       FROM ccee_CargoEconomico_otros cceo
                                INNER JOIN inv_Producto ip ON cceo.fk_producto = ip.prod_producto
                       WHERE fk_DocContable = ${idDocument}`;
        const result = await pool.request().query(query);
        r = {
            codeStatus: 200,
            status: "success",
            data: result.recordset,
        };
    } catch (error) {
        r = {
            codeStatus: 504,
            status: "error",
            message: error,
            data: {},
        };
    }
    console.log(r)
    return responseManager.sendResponseWithDocument(res, r);
}