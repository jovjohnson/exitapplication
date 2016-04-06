'use strict';

var app = angular.module('exitApp');


app.service('AuthService', function($http, UserService) {
  this.register = function(user) {
    return $http.post('/users/register', user)
      .then(function(res) {
        UserService.set(res.data);
      });
  };

  this.login = function(user) {
    return $http.post('/users/authenticate', user)
      .then(function(res) {
        UserService.set(res.data);
      });
  };

  this.logout = function() {
    $http.delete('/users/logout')
    .then(function() {
      UserService.destroy();
    });
  };

  this.init = function() {
    $http.get('/users/profile')
    .then(function(res) {
      UserService.set(res.data);
    });
  };
});


app.service('UserService', function($http) {
  this.set = function(user) {
    this.username = user.username;
    this._id = user._id;
    this.beers = user.beers;
    console.log(this.username);
    console.log(this._id);
  };
  
  this.destroy = function() {
    this.username = null;
    this._id = null;
  };

 //  this.getUser = function (userID) {
	// 	return $http.get(`/users/${userID}`)
	// }
});

app.service('BeerService', function($http) {
})