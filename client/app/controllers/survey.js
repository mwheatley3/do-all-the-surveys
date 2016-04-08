'use strict';

angular.module('myApp.survey', [])
  .controller('SurveyCtrl', ['$scope','$http','$state','Service', function($scope,$http,$state,Service) {
    //implement sessions
    $scope.userId = localStorage.userId || 0;
    //definitely change to find or create
    $scope.createUser = function() {
      Service.createUser()
      .then(function(resp) {
        $scope.userId = resp.id;
        console.log('create user reposnes: ', resp);
        localStorage.setItem('userId', $scope.userId);
        $scope.getQuestion($scope.userId);
      })
      .catch(function(error) {
        console.error(error);
      })
    };

    if (!$scope.userId) {
      console.log('here');
      $scope.createUser();
    };

  	$scope.questionText = '';
    $scope.questionId = 0;
    $scope.answers = [];

    $scope.getQuestion = function(userId) {
      Service.getQuestion(userId)
      .then(function(resp) {
        console.log('get question',resp);
        $scope.questionId = resp.id;
        $scope.questionText = resp.question_text;
        $scope.answers = resp.Answers;
        if($scope.questionText === undefined) {
          $scope.questionText = "all questions answered"
        }
        console.log('$scope.questionText', $scope.questionText);
        console.log('$scope.answers', $scope.answers);
      })
      .catch(function(error) {
        console.error(error);
      })
    };

    $scope.getQuestion($scope.userId);

    $scope.answer = {};//change the name of this variable

    $scope.respond = function() {
      Service.respond($scope.userId, $scope.questionId, $scope.answer.id)
      .then(function(resp) {
        console.log('user reposne', resp);
        $state.reload();
      })
      .catch(function(error){
        console.error(error);
      })
    }
    
  }]);