var deviceListModel = require('../models/deviceListModel');
var _ = require('underscore');


exports.getAllDevice = function(req, res, cb){
  var query = _.pick(req.query, 'IP', 'Floor', 'RoomType', 'RoomNumber', 'BedNumber');

  deviceListModel.getAllDevice(query,function(err, deviceList){

      cb(err, deviceList);

    });
}