
var randomstring = require('randomstring');
var moment = require('moment');
var crypto = require('crypto-js');
var mongoose = require('mongoose');
const { Request, Response, NextFunction } = require('express');
const { CustomError } = require('../types/CustomError');

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('data/Configuration.js');
var configuration = require(filePath);
var responseManager = require('../managers/responseManager');
var errorManager = require('../managers/errorManager');
var utils = require('../managers/utilManager');
const CONFIG = require('../config/config');
const { encriptacion } = require('../config/config');


const FILENAME = 'CyberSourceController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */

exports.paymentVoid = async function (req,res) {
	var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'paymentVoid';
	try {

  /**
   * Deencripto los datos
   */
  let decrypted = utils.decrypt(req.body.data, CONFIG.encriptacion.key );
  const  datos = JSON.parse(decrypted);
  //let datos = JSON.parse(d);
   
  
    let info = datos.info;
	let card = datos.transactionInfo;
	let trans = datos.clientInfo;

		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreatePaymentRequest();

		//configurando datos de envio
		configObject.merchant_id=info.MerchantId;
		configObject.merchantId=info.MerchantId;
		configObject.merchantKeyId=info.MerchantKeyId;
		configObject.merchantsecretKey=info.MerchantSecretKey;
		configObject.runEnvironment=info.RunEnvironment;

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = card.referenceClient;
		clientReferenceInformation.transactionId = timeoutVoidTransactionId;
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
		processingInformation.capture = true;
		requestObj.processingInformation = processingInformation;

		var paymentInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
		var paymentInformationCard = new cybersourceRestApi.Ptsv2paymentsPaymentInformationCard();
		paymentInformationCard.number = card.cardNumber;
		paymentInformationCard.expirationMonth = card.expirationMonth;
		paymentInformationCard.expirationYear = card.expirationYear;
		paymentInformation.card = paymentInformationCard;



		var paymentInformationTokenizedCard = new cybersourceRestApi.Ptsv2paymentsPaymentInformationTokenizedCard();
		paymentInformationTokenizedCard.securityCode = card.securityCode;
		paymentInformation.tokenizedCard = paymentInformationTokenizedCard;



		requestObj.paymentInformation = paymentInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = trans.totalAmount;
		orderInformationAmountDetails.currency = trans.currency;
		orderInformation.amountDetails = orderInformationAmountDetails;

		var orderInformationBillTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationBillTo();
		orderInformationBillTo.firstName = trans.firstName;
		orderInformationBillTo.lastName = trans.lastName;
		orderInformationBillTo.address1 = trans.address1;
		orderInformationBillTo.locality = trans.locality;
		orderInformationBillTo.administrativeArea = trans.administrativeArea;
		orderInformationBillTo.postalCode = trans.postalCode;
		orderInformationBillTo.country = trans.country;
		orderInformationBillTo.email = trans.email;
		orderInformationBillTo.phoneNumber = trans.phoneNumber;
		orderInformation.billTo = orderInformationBillTo;

		requestObj.orderInformation = orderInformation;


		var instance = new cybersourceRestApi.PaymentsApi(configObject, apiClient);

		instance.createPayment( requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError 1 : ' + JSON.stringify(error));
                return responseManager.sendResponseWithBody(res, '',error, false);
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
                return responseManager.sendResponseWithBody(res,'',JSON.stringify(data),false);
			}

			console.log('\nResponse 2: ' + JSON.stringify(response));
			console.log('\nResponse Code of Process a Payment : ' + JSON.stringify(response['status']));

            return responseManager.sendResponseWithBody(res, '',response['status'], false);

			//callback(error, data, timeoutVoidTransactionId, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
		//return responseManager.sendResponseWithoutBody(error);
        return errorManager.handleRequestError(error, FILENAME, functionname, 500, res, 'Error en el cobro');
	}
}


/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */

exports.paymentTest = async function (req,res) {
	var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'paymenttest';
	try{

		/**
		 * Desencriptadono la peticion
		 */


        let decrypted = utils.decrypt(req.body.data, CONFIG.encriptacion.key );
        const data = JSON.parse(decrypted);
		console.log(decrypted);

        
        return responseManager.sendResponseWithDocument(res,decrypted); 
	}catch(error){

		console.log('\nException on calling the API : ' + error);
        return errorManager.handleRequestError(error, FILENAME, functionname, 500, res, 'TEST ERROR');

	}

}



/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */

exports.paymentencrypt = async function (req,res) {
	var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'paymentencrypt';
	try{ 
       //var texto ='{"establecimientoID":"tc001","fecha":"20230110","domainorip":"192.168.0.1","info":{"MerchantId":"testrest","MerchantKeyId":"08c94330-f618-42a3-b09d-e1e43be5efda","MerchantSecretKey":"yBJxy6LjM2TmcPGu+GaJrHtkke25fPpUX+UY6/L/1tE=","RunEnvironment":"apitest.cybersource.com"},"transactionInfo":{"referenceClient":"Client001","cardNumber":"4285940853801111","expirationMonth":"12","expirationYear":"2025","securityCode":"682"},"clientInfo":{"totalAmount":"1.00","currency":"GTQ","firstName":"xxxxx","lastName":"xxxx","address1":"Ciudad","locality":"GT","administrativeArea":"GT","postalCode":"01018","country":"GT","email":"luislopezoliva@infoutilitygt.com","phoneNumber":"555555"}}';
	   var texto= req.body;
       let codigo = utils.encrypt(texto,CONFIG.encriptacion.key);
        console.log(codigo);         
        return responseManager.sendResponseWithDocument(res,codigo); 
	}catch(error){

		console.log('\nException on calling the API : ' + error);
		console.log(req.body.data)
		console.log(CONFIG.encriptacion.key)
		console.log('---findata:')
        return errorManager.handleRequestError(error, FILENAME, functionname, 500, res, 'TEST ERROR');

	}

}



