'use strict';

angular.module('myApp.results', [])
  .controller('ResultsCtrl', ['$scope','$http','$location','Service', function($scope,$http,$location,Service) {
  	Service.authorized = localStorage.auth;
    $scope.questions = [];
    if(!Service.authorized) {
      $location.path('/main');
    };

  	$scope.getResponses = function(){
  		Service.getResponses()
  		.then(function(resp){
  			$scope.questions = resp.responses;
  		})
  	};

  	$scope.getResponses();


  }]);