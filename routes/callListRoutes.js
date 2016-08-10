var express = require('express');
var callListRouter = express.Router();
var callListCtrl = require('../controllers/callListCtrl');

/* //http://192.168.1.6:8080/currentcalls/ */
callListRouter.route('/')
  .get(function(req, res, next) {
    callListCtrl.getCurrentCalls(req, res,function(err, calls){
      if(err){
        res.status(500).send(err);
      }else if(calls){
        res.status(200).send(calls);
        //res.render('callListView',{title: 'calls List'});
      }else{
        res.status(404).send("Not Found");
      }
    });
  });

module.exports = callListRouter;
