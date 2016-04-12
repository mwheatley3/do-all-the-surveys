'use strict';

angular.module('myApp', [
    'ui.router',
    'myApp.main',
    'myApp.auth',
    'myApp.survey',
    'myApp.services',
    'myApp.admin',
    'ui.bootstrap',
    'ngAnimate',
    'ngTouch'
  ])

    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/views/main.html',
      controller: 'MainCtrl',
      data: {
        requireLogin: false
      }
    })
    .state('auth', {
      url: '/auth',
      templateUrl: 'app/views/auth.html',
      controller: 'AuthCtrl',
      data: {
        requireLogin: false
      }
    })
    .state('survey', {
      url: '/survey',
      templateUrl: 'app/views/survey.html',
      controller: 'SurveyCtrl',
      data: {
        requireLogin: false
      }
    })
    .state('admin', {
      url: '/admin',
      templateUrl: 'app/views/admin.html',
      controller: 'AdminCtrl',
      data: {
        requireLogin: true
      }
    });

    $httpProvider.interceptors.push('AttachToken');
        
})
.factory('AttachToken', function() {
  var attach = {};
  attach.request = function(object) {
    var jwt = sessionStorage.getItem('eHonda');
    if(jwt) {
      object.headers['x-access-token'] = jwt;
    }
    return object;
  }
  return attach;
})
.run(function($rootScope, $location, Auth) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;
    if(requireLogin && !Auth.isAuth()) {
      event.preventDefault();
      $location.path('/main');
    }
  })
});