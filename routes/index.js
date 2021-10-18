var express = require('express');
var router = express.Router();
var database = require("../database");

router.get('/', function(req, res, next) {
  var ids = database.getRandomVideos(4);
  res.render('index', {ids: ids, database: database});
});

module.exports = router;
