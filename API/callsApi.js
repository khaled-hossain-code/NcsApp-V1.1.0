var express = require('express');
var callsApiRouter = express.Router();
var callListCtrl = require('../controllers/callListCtrl');

//http://192.168.1.6:8080/apiv1/calls/ 
callsApiRouter.route('/')
    .get( function(req, res, next) {
        callListCtrl.getAllCalls(req, res, function(err, callList) {
            if (err) {
                res.send({ 'Error': err });
            } else if (callList) {
                res.send(callList);
            } else {
                res.send({});
            }
        });
    });

module.exports = callsApiRouter;