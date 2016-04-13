'use strict';

angular.module('myApp.auth', [])
  .controller('AuthCtrl', ['$scope','$http','$state','$location','Service','Auth', function($scope,$http,$state,$location,Service, Auth) {
  	$scope.errorMessage = '';
  	$scope.user = {
  		username: '',
  		password: ''
  	};
  	$scope.login = function() {
  		Auth.login($scope.user)
  		.then(function(resp){
  			if (resp.error) {
  				$scope.errorMessage = resp.error;
          $scope.user.username = '';
          $scope.user.password = '';
  			} else {
          sessionStorage.setItem('eHonda', resp.token);
          $location.path('/admin');
  			}
  		})
  		.catch(function(error) {
  			console.error('error when login attempted: ', error);
  		});
  	};

  }]);
  