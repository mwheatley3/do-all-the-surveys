'use strict';

angular.module('myApp.admin', [])
  .controller('AdminCtrl', ['$scope','$http','$location','$state','Service','Auth', function($scope,$http,$location,$state,Service, Auth) {
    $scope.questions = [];
    $scope.questionSubmitted = false;
    $scope.admin = {
      username: '',
      password: ''      
    };
    $scope.question = '';
    $scope.answers = [{
        answerText: ''
      }, {
        answerText: ''
    }];

  	$scope.getResponses = function() {
      if($scope.questions.length) {
        $scope.questions = [];
      } else {
    		Service.getResponses()
    		.then(function(resp){
    			$scope.questions = resp.responses;
    		});
      }
  	};

    $scope.logout = function() {
      Auth.logout();
      $location.path('/main');
    }

    $scope.saveQuestion = function() {
      var len = $scope.answers.length - 1;
      for(var i = len; i >= 0; i--){
        if ($scope.answers[i].answerText === ''){
          $scope.answers.pop();
        };
      };
      Service.saveQuestion($scope.question, $scope.answers)
      .then(function(resp) {
        $scope.questionSubmitted = true;
        $scope.question = '';
        $scope.answers = [{
            answerText: ''
          }, {
            answerText: ''
        }];
      })
      .catch(function(error) {
        console.error(error);
      });
    };

    $scope.addAnswer = function() {
      $scope.answers.push( {answerText: ''} );
    };

    $scope.removeAnswer = function() {
      $scope.answers.pop();
    };

    $scope.createAdmin = function() {
      Auth.createAdmin($scope.admin)
      .then(function(resp) {
        $scope.admin.username = '';
        $scope.admin.password = '';
        $scope.adminCreated = true;
      })
      .catch(function(error) {
        console.error(error);
      });
    };

  }]);
  