/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /resumes              ->  index
 * POST    /resumes              ->  create
 * GET     /resumes/:id          ->  show
 * PUT     /resumes/:id          ->  update
 * DELETE  /resumes/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Resume = require('./resume.model')
  , bodyParser = require("body-parser")
  , http = require('http')
  , util = require('util')
  , mu   = require('mu2')
  , fs   = require('fs')
  , shortid = require ('shortid')
  , child_process = require('child_process');

// Get list of resumes
exports.index = function(req, res) {
  Resume.find(function (err, resumes) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(resumes);
  });
};

// Get a single resume
exports.show = function(req, res) {
  Resume.findById(req.params.id, function (err, resume) {
    if(err) { return handleError(res, err); }
    if(!resume) { return res.status(404).send('Not Found'); }
    return res.json(resume);
  });
};

// Creates a new resume in the DB.
exports.create = function(req, res) {
  Resume.create(req.body, function(err, resume) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(resume);
  });
};

exports.pdf = function(req, res) {
  Resume.findById(req.params.id, function (err, resume) {
    if(err) { return handleError(res, err); }
    if(!resume) { return res.status(404).send('Not Found'); }
    var url = req.protocol + '://' + req.get('host');
    //var postFile = shortid.generate();
    console.log(resume);
    //json = JSON.parse(resume);
    var json = resume;
    console.log(json);
    var userInfo = json.userInfo;
    var template = json.template;
    var postFile = json.file_name;
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
        //return res.send(url + '/assets/pdf/' + postFile + '.pdf');      
        return res.redirect('/pdf/' + postFile + '.pdf');

      });
      child.on('error', function(error) {
        console.log(error);
      });
    });
  }); 
}

// Updates an existing resume in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Resume.findById(req.params.id, function (err, resume) {
    if (err) { return handleError(res, err); }
    if(!resume) { return res.status(404).send('Not Found'); }
    var updated = _.merge(resume, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(resume);
    });
  });
};

// Deletes a resume from the DB.
exports.destroy = function(req, res) {
  Resume.findById(req.params.id, function (err, resume) {
    if(err) { return handleError(res, err); }
    if(!resume) { return res.status(404).send('Not Found'); }
    resume.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
