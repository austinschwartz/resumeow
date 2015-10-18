'use strict';

var express = require('express')
  , bodyParser = require("body-parser")
  , http = require('http')
  , util = require('util')
  , mu   = require('mu2')
  , fs   = require('fs')
  , shortid = require ('shortid')
  , child_process = require('child_process');

var router = express.Router();

router.post('/', function(req, res) {
  var url = req.protocol + '://' + req.get('host');
  var postFile = shortid.generate();
  var userInfo, json, template;
  if (req.headers['content-type'] != 'application/json')
    json = JSON.parse(Object.keys(req.body)[0]);
  else
    json = req.body;
  userInfo = json.userInfo;
  template = json.template;
  console.log('building ' + template + " -> " + postFile + ".tex");
    
  var texFile = mu.compileAndRender("./templates/" + template, userInfo);
  var writer = fs.createWriteStream('./temp/' + postFile + '.tex');
  texFile.pipe(writer, { end: false });
  texFile.on('end', function() {
    console.log(__dirname);
    var child = child_process.exec('TEXINPUTS="./templates:" pdflatex -output-directory ./client/assets/pdf -interaction=nonstopmode ./temp/' + postFile + '.tex', function(error, stdout, stderr) {
      //console.log(error + "\n" + stdout + "\n" + stderr);
      });
    child.on('exit', function() {
      res.send(url + '/assets/pdf/' + postFile + '.pdf');
    });
    child.on('error', function(error) {
      console.log(error);
    });
  });

});


module.exports = router;
