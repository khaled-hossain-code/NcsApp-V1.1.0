var express = require('express');
var devicesApiRouter = express.Router();
var deviceListCtrl = require('../controllers/deviceListCtrl');

//http://192.168.1.6:8080/apiv1/devices/ 
devicesApiRouter.route('/')
    .get(function (req, res, next) {
        deviceListCtrl.getAllDevices(req, res, function (err, deviceList) {
            if (err) {
                res.send({ 'Error': err });
            } else if (deviceList) {
                res.send(deviceList);
            } else {
                res.send({});
            }
        });
    });

module.exports = devicesApiRouter;