'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResumeSchema = new Schema({
  name: {type:String, required:true, index:true}
});

var Resume;

try {
  Resume = mongoose.model('Resume');
} catch(e) {
  Resume = mongoose.model('Resume', ResumeSchema);
}

module.exports = Resume;
