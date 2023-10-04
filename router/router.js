'use strict'

var express = require('express');

const CyberSourceController = require('../controllers/CyberSourceController');
const ProductController = require('../controllers/ProductsController');


var router = express.Router();

/** Ruta default */
router.get('/', (req, res)=> {
    console.log('test')
    res.status(200).send('exitoso')
});

//*Routas cybersource APIs */
router.post('/cybersource/paymenet', CyberSourceController.paymentVoid)
router.post('/cybersource/paymenetTest', CyberSourceController.paymentTest)
router.post('/cybersource/paymentencrypt', CyberSourceController.paymentencrypt)

//*Routas productos APIs */
router.get('/epon/readAllProducts', ProductController.readAllProduct)

module.exports = router;
