var express = require('express');
var router = express.Router();
var callListCtrl = require('../controllers/callListCtrl');

/* GET /calls */
router.get('/', function(req, res, next) {
  res.render('callListView',{title: 'CallList'});
});

module.exports = router;
