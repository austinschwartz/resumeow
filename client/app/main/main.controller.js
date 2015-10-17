'use strict';

angular.module('resumeowApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeResumes = [];

    $http.get('/api/resumes').success(function(lastResumes) {
      $scope.lastResumes = lastResumes;
    });

    $scope.addResume = function() {
      if($scope.newResume === '') {
        return;
      }
      $http.post('/api/resumes', { name: $scope.newResume });
      $scope.newResume = '';
    };

    $scope.deleteResume = function(resume) {
      $http.delete('/api/resumes/' + resume._id);
    };
  });
