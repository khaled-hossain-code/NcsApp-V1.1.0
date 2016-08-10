
var deviceSchema = require('../schema/deviceSchema');
var _ = require('underscore');

exports.getAllDevices = function (query, cb) {

  deviceSchema.find(query, function (err, deviceList) {
    cb(err, deviceList);
  });

}
