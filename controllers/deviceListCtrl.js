var deviceListModel = require('../models/deviceListModel');
var _ = require('underscore');


exports.getAllDevices = function (req, res, cb) {
  var query = _.pick(req.query, 'IP', 'Floor', 'RoomType', 'RoomNumber', 'BedNumber');

  query = _.mapObject(query, function (val, key) {
    try {
      val = JSON.parse(val); //if the value is not JSON it returns error
    } catch (e) { }

    return val;
  });

  deviceListModel.getAllDevices(query, function (err, deviceList) {

    cb(err, deviceList);

  });
};

exports.getDeviceByIP = function(IP, cb){

    deviceListModel.getDeviceByIP(IP,function(err, device){
        cb(err, device);
    });
};

exports.updateDeviceSocketId = function (payload, cb){
    
    deviceListModel.updateDeviceSocketId(payload, function(err, updatedDevice){
        
        if(err){
          console.log("deviceListCtrl: " + err);
          //unable to update device info
        }else if(_.isEmpty(updatedDevice)){
          //means there is no device list found, so create one
          var deviceData =  {
                  IP: payload.IP,
                  Floor: '',        
                  RoomType: '',
                  RoomNumber: '',
                  BedNumber: '',
                  Status: 1,
                  SocketID: payload.SocketID         
              };
              
          deviceListModel.createDevice(deviceData, function(err, device){
              
              if(err){
                console.log("deviceListCtrl: " + err);                
              }
              else if(_.isEmpty(device)){
                console.log("No device is created");
              }else{
                //1 means creating the device is successfull
                cb(err, device);
              }
              
          });
        }
        
    });
};



