'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ResumeSchema = new Schema({
  "template": String,
  "name": String,
  "pdfURL": String,
  "userInfo": {
    "website": String,
    "name": String,
    "email": String,
    "location": String,
    "phone": String,
    "schools": [{
        "name": String,
        "location": String,
        "degree": String,
        "graduating": String,
        "gpa": String
    }],
    "works": [{
        "name": String,
        "location": String,
        "position": String,
        "date": String,
        "lines": [{"line": String}]
    }],
    "projects": [{
        "name": String,
        "date": String,
        "desc": String
    }],
    "languages": [{"name": String}],
    "technologies": [{"name": String}]
  }
});

module.exports = mongoose.model('Resume', ResumeSchema);
