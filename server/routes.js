/**
 * Main application routes
 */

'use strict';

module.exports = function(app) {

  // Insert routes below
  app.use('/api/resumes', require('./api/resume'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
};
