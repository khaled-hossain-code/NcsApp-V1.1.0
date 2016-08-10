var callListModel = require('../models/callListModel');
var _ = require('underscore');


exports.getAllCalls = function(req, res, cb){
  var query = _.pick(req.query, 'IP', 'CallType', 'CallDate', 'StartTime', 'StopTime', 'DiffTime');

  query = _.mapObject( query, function(val, key) {
      try{
        val = JSON.parse(val); //if the value is not JSON it returns error
      }catch(e){}

      return val;
  });


  callListModel.getAllCalls(query,function(err, callList){

      cb(err, callList);

    });
}