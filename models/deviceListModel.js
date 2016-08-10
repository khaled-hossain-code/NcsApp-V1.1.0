
var deviceSchema = require('../schema/deviceSchema');
var _ = require('underscore');

exports.createDeviceList = function(req, res){

    var device = new Device(req.body);

  device.save(function(err){
    if(err)
    {
      return err;
    }else{
      return null;
    }
  });
} 


exports.getAllDevice = function(query, cb){
  
  deviceSchema.find(query,function(err,deviceList){
    cb(err, deviceList);
  });

}
