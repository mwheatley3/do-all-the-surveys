'use strict';

angular.module('myApp.admin', [])
  .controller('AdminCtrl', ['$scope','$http','$state','$location', 'Service', function($scope,$http,$state,$location,Service) {
    $scope.authorized = localStorage.auth;
  	$scope.errorMessage = '';
  	$scope.question = '';
    $scope.answers = [{
      answerText: ''
    },{
      answerText: ''
    }];
  	$scope.user = {
  		username: '',
  		password: ''
  	};
    $scope.admin = {
      username: '',
      password: ''      
    };
  	$scope.login = function() {
  		Service.login($scope.user)
  		.then(function(resp){
  			if (resp.error) {
  				$scope.errorMessage = resp.error;
  			} else {
          $scope.authorized = true;
  				$scope.errorMessage = '';
  			}
  		})
  		.catch(function(error) {
  			console.error('error when login attempted: ', error);
  		})
  	};

    $scope.logout = function(){
      Service.logout();
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
        $state.reload();
      })
      .catch(function(error) {
        console.error(error);
      })
    };

    $scope.addAnswer = function() {
      $scope.answers.push( {answerText: ''} );
    };

    $scope.removeAnswer = function() {
      $scope.answers.pop();
    };

    $scope.createAdmin = function() {
      Service.createAdmin($scope.admin)
      .then(function(resp) {
        console.log('admin created');
      })
      .catch(function(error) {
        console.error(error);
      })
    };

  }]);