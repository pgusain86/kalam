var express = require('express');
var utils = require('../utils/utilProvider.js');
var modelfactory =  require('../models/modelFactory.js');
var router = express.Router();

var logger = utils.getLogger();
var reqId = 999;
//check if security token exists 
//get and populate user details in req
//if payload is to be looged
router.all('/*', function (req, res, next) {
    var env = utils.getConfiguration().getProperty('node.env');
    var logPayload = utils.getConfiguration().getProperty(env)['logPayload'];
   
    //add a unique request identifier
    req.id=++reqId;

    //log request url
    logger.info(req.id +':'+'Request URL : '+ req.originalUrl);
    //check if security token exists
    if (req.headers.sectoken) {
        //get and populate session from store
        var session = utils.getSessionStore().get(req.headers.sectoken);
        if(session){
        req.session = session;
        logger.info(req.id +':'+'new request from : ' + session.user.userId);
    }
     }
    else{
         logger.info(req.id +':'+ 'new request from : ' + req.connection.remoteAddress);
    }

    if (logPayload) {
        logger.info(req.id+':'+'Request Payload:');
        logger.info(req.id+':'+'Request URL:'+ req.originalUrl);
        logger.info(req.id+':'+'Request Body:'+ JSON.stringify(req.body));
        logger.info(req.id+':'+'Request Header:'+ JSON.stringify(req.headers));
    }
    next();
});

router.post('/client', function (req, res) {
   // adminMapping.saveClient(req.body);
   modelfactory.getModel("USER").createUser(req.body);
   var users=modelfactory.getModel("USER").getUserById(req.body);
   console.log(users);
});


module.exports = router;