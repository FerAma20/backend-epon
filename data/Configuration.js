'use strict';

/*
* Merchant configuration properties are taken from Configuration module
*/

// common parameters
const AuthenticationType = 'HTTP_SIGNATURE';

// http_signature parameters Generales
const RunEnvironment = 'apitest.cybersource.com';
const MerchantId = 'visanetgt_colegioingenieros';
const MerchantKeyId = '08c94330-f618-42a3-b09d-e1e43be5efda';
const MerchantSecretKey = 'yBJxy6LjM2TmcPGu+GaJrHtkke25fPpUX+UY6/L/1tE=';

//arqu dev
/*const RunEnvironment = 'apitest.cybersource.com';
const MerchantId = 'testrest';
const MerchantKeyId = '642f3ead-5d92-45ee-a5cf-c254cb007508';
const MerchantSecretKey = 'W9/bUgpE+LAq+k3wVgm8ztbxLgYSAbHw4F9Szqq7OUM=';*/

//arqui prod
/*const RunEnvironment = 'api.cybersource.com';
const MerchantId = 'visanetgt_cdatimbres';
const MerchantKeyId = '2fa68509-9f1d-4cec-8663-aa7efb65d795';
const MerchantSecretKey = 'GonD0TAanqunEk/zMINs+gkb2B+XHmEvk63FsG/sjno=';
*/

// jwt parameters
const KeysDirectory = 'Resource';
const KeyFileName = 'testrest';
const KeyAlias = 'testrest';
const KeyPass = 'testrest';

//meta key parameters
const UseMetaKey = false;
const PortfolioID = '';

// logging parameters
const EnableLog = true;
const LogFileName = 'cybs';
const LogDirectory = 'log';
const LogfileMaxSize = '5242880'; //10 MB In Bytes
const EnableMasking = true;

// Constructor for Configuration
function Configuration() {

    var configObj = {
        'authenticationType': AuthenticationType,
        'runEnvironment': RunEnvironment,

        'merchantID': MerchantId,
        'merchant_id': MerchantId,
        'merchantKeyId': MerchantKeyId,
        'merchantsecretKey': MerchantSecretKey,

        'keyAlias': KeyAlias,
        'keyPass': KeyPass,
        'keyFileName': KeyFileName,
        'keysDirectory': KeysDirectory,

        'useMetaKey': UseMetaKey,
        'portfolioID': PortfolioID,

        'logConfiguration': {
            'enableLog': EnableLog,
            'logFileName': LogFileName,
            'logDirectory': LogDirectory,
            'logFileMaxSize': LogfileMaxSize,
            'loggingLevel': 'debug',
            'enableMasking': EnableMasking
        }
    };
    return configObj;

}

module.exports = Configuration;