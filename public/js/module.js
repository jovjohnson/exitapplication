'use strict';

var app = angular.module('exitApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', { url: '/', templateUrl: '/html/home.html' })
    // .state('auth', { url: '/auth', templateUrl: '/html/auth.html' })
    .state('login', { url: '/login',    templateUrl: '/html/login.html', controller: 'loginCtrl' })
    .state('register', { url: '/register', templateUrl: '/html/login.html', controller: 'loginCtrl' })
    .state('beers', { url: '/beers', templateUrl: '/html/beers.html', controller: 'beersCtrl' })
    .state('profile', { url: '/profile', templateUrl: '/html/profile.html', controller: 'profileCtrl'})

  $urlRouterProvider.otherwise('/');
});

app.run(function(AuthService, BeerService) {
  AuthService.init();
});

app.filter('titlecase', function() {
  return function(input) {
    return input[0].toUpperCase() + input.slice(1).toLowerCase();
  };
});