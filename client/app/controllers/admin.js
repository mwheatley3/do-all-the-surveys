'use strict';

angular.module('myApp.admin', [])
  .controller('AdminCtrl', ['$scope','$http','Service', function($scope,$http,Service) {
  	$scope.authorized = false;
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
    $scope.saveQuestion = function() {
      Service.saveQuestion($scope.question, $scope.answers)
      .then(function(resp) {
        return resp.data;
      })
      .catch(function(error) {
        console.error(error);
      })
    };

  }]);