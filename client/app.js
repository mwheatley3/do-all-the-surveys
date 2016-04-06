'use strict';

angular.module('myApp', [
    'ui.router',
    'myApp.main'
  ])

    .config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/views/main.html',
      controller: 'MainCtrl'
    });
        
});