var express = require('express');
var deviceListRouter = express.Router();
var deviceListCtrl = require('../controllers/deviceListCtrl');

//http://192.168.1.6:8080/devices/ 
deviceListRouter.route('/')
  .get(function(req, res, next) {
    deviceListCtrl.getAllDevice(req, res,function(err, devices){
      if(err){
        res.status(500).send(err);
      }else if(devices){
        res.status(200).send(devices);
        //res.render('deviceListView',{title: 'Device List'});
      }else{
        res.status(404).send("Not Found");
      }
    });
  });

module.exports = deviceListRouter;