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
}