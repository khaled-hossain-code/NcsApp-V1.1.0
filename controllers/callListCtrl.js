var callListModel = require('../models/callListModel');
var deviceListModel = require('../models/deviceListModel');
var deviceListCtrl = require('../controllers/deviceListCtrl');
var _ = require('underscore');



exports.getAllCalls = function (req, res, cb) {
    'use strict';    
    let query = filterQuery(req);


    callListModel.getAllCalls(query, function (err, callList) {

        cb(err, callList);

    });
};

exports.getCurrentCalls = function (req, res, cb) {
    
    callListModel.getCurrentCalls(req, res,function(err, callList){
        cb(err, callList);
    });
};

exports.getCallStatus = function(deviceIP, cb ){
    callListModel.getCallStatus(deviceIP, function(err, deviceList){
        //device list is sorted in decending order means last call is in 0th place
        var device = deviceList[0];
        var status = 10; //10 means status is unknown

        if (err) {
            //device status is unknown giving error from database
          console.log(err);
        } else if (_.isEmpty(deviceList)) {
            //device is not in call list means this device is brand new and
            //did not generated any calls yet
        } else {
            if(device.CallType === 'Normal' && device.StopTime !== "" ){
                status = 0; //nurse pressed presence button
            }else if(device.CallType === 'Normal' && device.StopTime === "" ){
                status =1; //only patient generated normal call
            }else if(device.CallType === 'Emergency' && device.StopTime !== "" ){
                status = 4; // nurse cancelled emergency
            }else if(device.CallType === 'Emergency' && device.StopTime === "" ){
                status =2; //nurse generated emergency call
            }else if(device.CallType === 'BlueCode' && device.StopTime !== "" ){
                status = 5; //nurse cancelled bluecode
            }else if(device.CallType === 'BlueCode' && device.StopTime === "" ){
                status =3; //nurse generated bluecode
            }
        }

        cb(err, status);
    });
};

exports.getCurrentCalldetails = function(req, res, cb){
    
    //callListDetails array has to be global so that every scope can access it but 
    //we have to empty this array before each time we call for call list details
    var callListDetails = [];

    this.getCurrentCalls(req, res, function(err, callList){
        
        var myIP = [];
      
        for (var i = callList.length - 1; i >= 0; i--) {
                    
            myIP.push(callList[i].IP);          
            
        }
    
        deviceListModel.getDeviceListByIP(myIP, function(err, deviceList){

            for (var j = 0; j < callList.length;  j++) {
        
            var  devDetails = _.findWhere(deviceList, {IP: callList[j].IP});

            callListDetails[j] = {

               'IP': callList[j].IP,          
               'BedNumber': devDetails.BedNumber,
               'RoomNumber': devDetails.RoomNumber,
               'RoomType': devDetails.RoomType,
               'Floor': devDetails.Floor,
                'CallType': callList[j].CallType,
                'CallDate': callList[j].CallDate,
                'StartTime': callList[j].StartTime
              };         
            };

            cb(err, callListDetails);

        });
    });
}


function filterQuery(req){
    'use strict';
    let query = _.pick(req.query, 'IP', 'CallType', 'CallDate', 'StartTime', 'StopTime', 'DiffTime');

    query = _.mapObject(query, function (val, key) {
        try {
            val = JSON.parse(val); //if the value is not JSON it returns error
        } catch (e) { }

        return val;
    });   

    return query;
}