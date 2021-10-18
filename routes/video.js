var express = require('express');
var router = express.Router();
var database = require('../database.js')

/* GET home page. */
router.get('/*', function(req, res, next) {
  var id = req.originalUrl.substr("/video/".length);
  var meta = database.getVideoMeta(id);
  res.render('video', {id: id, name: meta.name, description: meta.description});
});

module.exports = router;
