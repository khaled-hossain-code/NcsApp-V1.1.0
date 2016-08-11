var callSchema = require('../schema/callSchema');
var _ = require('underscore');

exports.getAllCalls = function (query, cb) {

  callSchema.find(query, function (err, callList) {
    cb(err, callList);
  });

}

exports.getCurrentCalls = function (req, res, cb){
  
  callSchema.find({"StopTime": ""}, function(err, callList) {
      cb(err, callList);
    });
};

