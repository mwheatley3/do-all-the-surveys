'use strict';

angular.module('myApp.survey', [])
  .controller('SurveyCtrl', ['$scope','$http','$state','Service', function($scope,$http,$state,Service) {

    $scope.userId = localStorage.eHondaUserId || 0;

    $scope.findOrCreateUser = function() {
      Service.findOrCreateUser($scope.userId)
      .then(function(resp) {
        console.log('user resp', resp);
        $scope.userId = resp[0].id;
        localStorage.setItem('eHondaUserId', $scope.userId);
        $scope.getQuestion($scope.userId);
      })
      .catch(function(error) {
        console.error(error);
      })
    };

  	$scope.questionText = '';
    $scope.questionId = 0;
    $scope.answers = [];

    $scope.getQuestion = function(userId) {
      Service.getQuestion(userId)
      .then(function(resp) {
        console.log('q/a response', resp);
        $scope.questionId = resp.id;
        $scope.questionText = resp.question_text;
        $scope.answers = resp.Answers;
        if(!$scope.questionText) {
          $scope.questionText = "all questions answered"
        }
      })
      .catch(function(error) {
        console.error(error);
      })
    };

    $scope.userResponse = {};

    $scope.respond = function() {
      Service.respond($scope.userId, $scope.questionId, $scope.userResponse.id)
      .then(function(resp) {
        $state.reload();
      })
      .catch(function(error){
        console.error(error);
      })
    }

    $scope.findOrCreateUser();
    
  }]);