'use strict';

angular.module('myApp', [
    'ui.router',
    'myApp.main',
    'myApp.admin',
    'myApp.survey',
    'myApp.services',
    'myApp.results',
    'ui.bootstrap',
    'ngAnimate',
    'ngTouch'
  ])

    .config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/views/main.html',
      controller: 'MainCtrl'
    })
    .state('admin', {
      url: '/admin',
      templateUrl: 'app/views/admin.html',
      controller: 'AdminCtrl'
    })
    .state('survey', {
      url: '/survey',
      templateUrl: 'app/views/survey.html',
      controller: 'SurveyCtrl'
    })
    .state('results', {
      url: '/results',
      templateUrl: 'app/views/results.html',
      controller: 'ResultsCtrl'
    });
        
});