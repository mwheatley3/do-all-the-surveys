angular.module('myApp.services',[])

.factory('Service', function($http, $window, $location){
	var service = {};

  service.login = function(user){
    return $http({
      method: 'POST',
      url: '/admin/login',
      data: user
    })
    .then(function(res){
      localStorage.setItem('auth', true);
      return res.data;
    })
    .catch(function(error){
      console.error('Error logging into the ADMIN page:', error);
    })
  };

  service.logout = function(){
    localStorage.removeItem('auth');
  }

  service.createAdmin = function(admin) {
    return $http({
      method: 'POST',
      url: '/admin/create',
      data: admin
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(error) {
      console.error('error creating new admin:', error);
    })
  }

  service.saveQuestion = function(question, answers) {
    return $http({
      method: 'POST',
      url: '/admin/question',
      data: { question:question, answers:answers }
    })
    .then(function(res){
      return res.data;
    })
    .catch(function(error){
      console.log('Error posting question', error);
    })
  };

  service.getQuestion = function(userId) {
    console.log('get question');
    console.log('userId', userId);
    return $http({
      method: 'GET',
      url: '/user/question/?user_id=' + userId
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(error) {
      console.log('Error getting quesiton', error);
    })
  }

  service.createUser = function() {
    return $http({
      method: 'POST',
      url: '/user/create',
      data: {}
    })
    .then(function(res) {
      console.log('res', res);
      return res.data;
    })
    .catch(function(error) {
      console.log('Error creating user', error);
    })    
  }

  service.respond = function(userId, questionId, answerId) {
    return $http({
      method: 'POST',
      url: '/user/respond',
      data: {userId: userId, questionId: questionId, answerId: answerId}
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(error) {
      console.log('Error saving response', error);
    })
  }

  service.getResponses = function() {
    console.log('service get responses');
    return $http({
      method: 'GET',
      url: '/admin/response'
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(error) {
      console.log('Error saving response', error);
    })
  }
	
	return service;

})