var express = require('express');
var router = express.Router();
var callListCtrl = require('../controllers/callListCtrl');

/* GET /devices */
router.get('/', function(req, res, next) {
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

module.exports = router;