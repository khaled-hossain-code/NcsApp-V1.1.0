var express = require('express');
var deviceListRouter = express.Router();
var deviceListCtrl = require('../controllers/deviceListCtrl');

//http://192.168.1.6:8080/devices/ 
deviceListRouter.route('/')
  .get(function(req, res, next) {
    deviceListCtrl.getAllDevices(req, res,function(err, deviceList){
      if(err){
        res.status(500).send(err);
      }else if(deviceList){
        res.status(200).send(deviceList);
        //res.render('deviceListView',{title: 'Device List'});
      }else{
        res.status(404).send("Not Found");
      }
    });
  });

module.exports = deviceListRouter;