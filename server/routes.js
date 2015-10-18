'use strict';

module.exports = function(app) {

  app.use('/api/resumes', require('./api/resume'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/post', require('./api/post'));

  app.use('/auth', require('./auth'));


};
