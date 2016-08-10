 "use strict";

var callListModel = require('../models/callListModel');
var _ = require('underscore');


exports.getAllCalls = function (req, res, cb) {
    
    let query = filterQuery(req);


    callListModel.getAllCalls(query, function (err, callList) {

        cb(err, callList);

    });
};

exports.getCurrentCalls = function (req, res, cb) {

};

exports.getCurrentCalldetails = function(req, res, cb){
    getCurrentCalls()
    //ask device model for array of objects which ip is given in an array 
}


function filterQuery(req){

    let query = _.pick(req.query, 'IP', 'CallType', 'CallDate', 'StartTime', 'StopTime', 'DiffTime');

    query = _.mapObject(query, function (val, key) {
        try {
            val = JSON.parse(val); //if the value is not JSON it returns error
        } catch (e) { }

        return val;
    });   

    return query;
}