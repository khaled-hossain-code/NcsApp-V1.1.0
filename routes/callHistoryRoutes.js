var express = require('express');
var callHistoryRouter = express.Router();
var callListCtrl = require('../controllers/callListCtrl');

//http://192.168.1.6:8080/callhistory/
callHistoryRouter.route('/')
  .get( function(req, res, next) {
    callListCtrl.getAllCalls(req, res,function(err, callList){
      if(err){
        res.status(500).send(err);
      }else if(callList){
        res.status(200).send(callList);
        //res.render('CallHistoryView',{title: 'Call History'});
      }else{
        res.status(404).send("Not Found");
      }
    });
    
  });

module.exports = callHistoryRouter;