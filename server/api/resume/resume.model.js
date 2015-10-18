'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ResumeSchema = new Schema({
  "file_name": {"type": String, "required": true},
  "template": {"type": String, "required": true, "enum": ['t1.tex', 't2.tex']},
  "userInfo": {
    "name": {"type": String, "required": true},
    "website": String,
    "email": {"type": String, "required": true},
    "location": {"type": String, "required": true},
    "phone": {"type": String, "required": true},
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
