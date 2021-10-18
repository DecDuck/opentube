var express = require('express');
var router = express.Router();
var database = require('../database.js');

router.get('/', function(req, res, next) {
    res.render('upload');
});

router.post('/', function(req, res, next){
    console.log(database.createVideo(req.files.video, req.body.name, req.body.description));
});

module.exports = router;
