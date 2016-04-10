'use strict';

angular.module('myApp.admin', [])
  .controller('AdminCtrl', ['$scope','$http','Service', function($scope,$http,Service) {
    $scope.authorized = Service.authorized
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
  				Service.authorized = true;
          $scope.authorized = Service.authorized;
  				$scope.errorMessage = '';
          localStorage.setItem('auth', true);
  			}
  		})
  		.catch(function(error) {
  			console.error('error when login attempted: ', error);
  		})
  	};

    $scope.saveQuestion = function() {
      var len = $scope.answers.length - 1;
      for(var i = len; i >= 0; i--){
        if ($scope.answers[i].answerText === ''){
          $scope.answers.pop();
        };
      };
      Service.saveQuestion($scope.question, $scope.answers)
      .then(function(resp) {
        return resp.data;
      })
      .catch(function(error) {
        console.error(error);
      })
    };

    $scope.addAnswer = function() {
      $scope.answers.push( {answerText: ''} );
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