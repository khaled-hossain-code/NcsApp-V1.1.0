
var deviceSchema = require('../schema/deviceSchema');
var _ = require('underscore');

exports.getAllDevices = function (query, cb) {

  deviceSchema.find(query, function (err, deviceList) {
    cb(err, deviceList);
  });

};

exports.getDeviceByIP = function(IP, cb){

  deviceSchema.findOne({'IP':IP}, function(err, device){
      cb(err, device);
  });
};

//this function takes input as array of IP
exports.getDeviceListByIP = function(IPList, cb){

  deviceSchema.find({'IP': {$in: IPList}}, function(err, deviceList){
      cb(err, deviceList);
  });
};

exports.updateDeviceSocketId = function(payload,cb){
  deviceSchema.findOneAndUpdate({IP: payload.IP}, {$set: {"SocketID" : payload.SocketID}}, function (err, updatedDevice) {
    cb(err, updatedDevice);
  });
};

exports.createDevice = function(deviceData, cb){
  var deviceObj = new deviceSchema(deviceData);

  deviceObj.save(function (err, result) {
          cb(err,result);
      });
}


