var express = require('express');
var callListRouter = express.Router();
var callListCtrl = require('../controllers/callListCtrl');

/* //http://192.168.1.6:8080/calls/ */
callListRouter.route('/')
  .get(function(req, res, next) {
    callListCtrl.getCurrentCalldetails(req, res,function(err, callList){
      if(err){
        res.status(500).send(err);
      }else if(callList){
        res.status(200).send(callList);
        //res.render('callListView',{title: 'calls List'});
      }else{
        res.status(404).send("Not Found");
      }
    });
  });

module.exports = callListRouter;
