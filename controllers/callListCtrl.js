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

//asynchronous method
exports.getCurrentCalls = function (req, res, cb) {
    
    callListModel.getCurrentCalls(req, res,function(err, callList){
        cb(err, callList);
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