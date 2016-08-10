var express = require('express');
var devicesApiRouter = express.Router();
var deviceListCtrl = require('../controllers/deviceListCtrl');

/* GET /devices */
devicesApiRouter.route('/')
    .get(function(req, res, next) {
    deviceListCtrl.getAllDevice(req, res,function(err, devices){
        if(err){
        res.send({'Error':err});
        }else if(devices){
        res.send(devices);
        }else{
        res.send({});
        }
    });
    });

module.exports = devicesApiRouter;