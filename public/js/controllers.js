'use strict';

var app = angular.module('exitApp');

app.controller('navCtrl', function($scope, UserService, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
  };
  $scope.$watch(function() {
    return UserService.username;
  }, function(username) {
    $scope.username = username;
  });
});

app.controller('loginCtrl', function($scope, $state, AuthService) {
  $scope.state = $state.current.name;
  $scope.submit = function(user) {
    if($scope.state === 'register') {
      // submit register form
      if(user.password !== user.password2) {
        $scope.user.password = $scope.user.password2 = '';
        alert('Please make sure your passwords match!');
      } else {
        AuthService.register(user)
          .then(function() {
            $state.go('home');
          }, function(err) {
            console.error(err);
          });
      }
    } else {
      // submit login form
      AuthService.login(user)
        .then(function() {
          $state.go('profile');
        }, function(err) {
          console.error(err);
        });
    }
  };
});

app.controller('profileCtrl', function($scope, UserService, BeerService, $state) {

	UserService.set;
  var user = UserService.user;

  $scope.$watch(function() {
    return BeerService.beers;
  }, function(beers) {

    console.log('scope.beers', $scope.beers);
    $scope.beers = user.beers;
  });

// 	function render(user) {
// 	UserService.getUser(UserService.set)
// 	.then(function(res) {
// 		UserService.set(res.data);
// 		console.log("data:", res);
// 	}, function(err) {
// 		console.log(err);
// 	});
// }

// 	render();


});

app.controller('beersCtrl', function($scope, BeerService, UserService, $http) {

	// UserService.set;


	BeerService.getBeer()
	.then(function(res) {
		console.log('res:', res.data.data);
		$scope.beer = res.data.data;
	}, function(err) {
		console.log(err);
	})

	$scope.submit = function(){
    BeerService.addBeer($scope.newBeer)
    .then(function(res) {
      console.log('added!');

      BeerService.beers.push($scope.newBeer);
      $scope.newBeer = {};
    }, function(err) {
      console.log(err);
    });
  };

	

	console.log('beeeeeeer');
})