'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var device = require('express-device');
var config = require('./config/config');
var router = require('./router/router');
var sqlDb = require('./database/SQLDriver');
var mongoDb = require('./database/MongoDriver');
/** Variables globales */
var app = express();
app.disable('x-powered-by');
var port = config.nodePort;

/* --  Middleware -- */
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(device.capture());
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Origin, Referer, X-Requested-Width, Content-Type, Accept, Access-Control-Allow-Request-Method, Time, X-refresh, X-ucode, X-token');
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.set('Access-Control-Expose-Headers', 'Time, X-refresh, X-token, X-ShowError');
    next();
});

/** --- Conexión a BD --- */
/*sqlDb.connection()
.then( () => {
           
    mongoDb.makeConnection()
    .then(() => {
        app.use('/', router);

        var server = app.listen(port, f => {
            var host = server.address().address;
            var port = server.address().port;
            var d = new Date();
            var utc = d.getTime() + (d.getTimezoneOffset()*60000)
            var date = new Date(utc + (3600000*-6))
            console.log(config.messageTerminal, 'host:'+host, 'port:'+port, 'BD:'+process.env.dbDatabaseNameMS, 'date:'+date);
        });
    })
    .catch(error => {
        console.error(error);
    });
})
.catch(error => {
    console.error(error);
});*/

app.use('/', router);

var server = app.listen(port, f => {
    var host = server.address().address;
    var port = server.address().port;
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset()*60000)
    var date = new Date(utc + (3600000*-6))
    console.log(config.messageTerminal, 'host:'+host, 'port:'+port, 'BD:'+process.env.dbDatabaseNameMS, 'date:'+date);
});
