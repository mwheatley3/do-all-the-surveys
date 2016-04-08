'use strict';

angular.module('myApp.results', [])
  .controller('ResultsCtrl', ['$scope','$http','Service', function($scope,$http,Service) {
  	$scope.questions = [];

  	$scope.getResponses = function(){
  		Service.getResponses()
  		.then(function(resp){
  			$scope.questions = resp.responses;
  		})
  	};

  	$scope.getResponses();

  }]);