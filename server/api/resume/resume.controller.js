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
var Resume = require('./resume.model');

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
