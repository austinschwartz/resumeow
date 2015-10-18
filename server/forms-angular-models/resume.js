'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResumeSchema = new Schema({
  name: {type:String, required:true, index:true}
});

var Resume;
var modelName = 'Resume';

try {
  Resume = mongoose.model(modelName);
} catch(e) {
  Resume = mongoose.model(modelName, ResumeSchema);
}

module.exports = Resume;
