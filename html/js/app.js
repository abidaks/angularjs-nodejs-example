var app = angular.module('app', ['ngRoute', 'ngResource', 'ngCookies']);
var home_page = 'http://'+window.location.hostname+':3000';
app.factory('Page', function() {
	var title = 'default';
	var h1 = 'default';
	return {
		title: function() { return title; },
		setTitle: function(newTitle) { title = newTitle },
		h1: function() { return h1; },
		seth1: function(newh1) { h1 = newh1 }
	};
});

app.factory('homePage', function($resource) {
  return $resource('/home');
});

app.config( function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				controller: 'mainCont'
			})
			.when('/orders', {
				controller: 'ordersCont',
				templateUrl: 'pages/orders.html'
			})
			.when('/products', {
				controller: 'productsCont',
				templateUrl: 'pages/products.html'
			})
			.when('/customers', {
				controller: 'customersCont',
				templateUrl: 'pages/customers.html'
			})
			.when('/settings', {
				controller: 'settingsCont',
				templateUrl: 'pages/settings.html'
			})
			.when('/home', {
				controller: 'homeCont',
				templateUrl: 'pages/home.html'
			})
			.when('/login', {
				controller: 'userCont',
				templateUrl: 'pages/login.html'
			})
			.otherwise({ redirectTo: '/' });
		
		$locationProvider.html5Mode(true);
	});

app.directive('onFinishRender', function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			if (scope.$last === true) {
				$timeout(function () {
					scope.$emit('ngRepeatFinished');
				});
			}
		}
	}
});

app.controller('mainCont', function($rootScope, $cookies, $scope, $location, $http, Page) {
	Page.setTitle("Dashboard Template for Bootstrap");
	$scope.Page = Page;
	
	var links = [];
	$rootScope.is_login = $cookies.get('is_login') || {};
	if ($rootScope.is_login.length > 0) {
		links.push({title : 'Dashboard', url: '/html/home', logo : 'home'});
		links.push({title : 'Orders', url: '/html/orders', logo : 'file'});
		links.push({title : 'Products', url: '/html/products', logo : 'shopping-cart'});
		links.push({title : 'Customers', url: '/html/customers', logo : 'users'});
		links.push({title : 'Settings', url: '/html/settings', logo : 'layers'});
		$location.path('/home');
	}else{
		$location.path('/login');
	}
	
	$scope.navs = links;
	
	$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
		feather.replace();
	});
	
	$scope.logout = function () {
		var res = $http.get('/users/logout')
			.then(function(response) {
				if(response.data.errors){
					$scope.message = response.data.message;
				}else{
					$cookies.remove('is_login',{ path: '/' });
					window.location = home_page;
				}
			}, function(response) {
				$scope.message = response.data.message;
			});
	};
})
.controller('homeCont', function($scope, $http, $cookies, $location, Page) {
	Page.setTitle("Dashboard Template for Bootstrap");
	Page.seth1("Dashboard");
	$scope.Page = Page;
	
	$http.get('/home')
		.then(function(response){
			$scope.message = response.data.message;
		}, function(response){
			$cookies.remove('is_login', { path: '/' });
			window.location = home_page;
		});
})
.controller('ordersCont', function($scope, $http, $cookies, Page) {
	Page.setTitle("Orders - Dashboard Template for Bootstrap");
	Page.seth1("Orders");
	$scope.Page = Page;
	
	$http.get('/orders')
		.then(function(response){
			$scope.message = response.data.message;
		}, function(response){
			$cookies.remove('is_login', { path: '/' });
			window.location = home_page;
		});
})
.controller('productsCont', function($scope, $http, $cookies, Page) {
	Page.setTitle("Products - Dashboard Template for Bootstrap");
	Page.seth1("Products");
	$scope.Page = Page;
	
	$http.get('/products')
		.then(function(response){
			if(response.data.length > 0){
				$scope.message = 'Products found in database';
			}else{
				$scope.message = 'products not found';
			}
			$scope.products = response.data;
		}, function(response){
			$cookies.remove('is_login',{ path: '/' });
			window.location = home_page;
		});
})
.controller('customersCont', function($scope, $http, $cookies, Page) {
	Page.setTitle("Customers - Dashboard Template for Bootstrap");
	Page.seth1("Customers");
	$scope.Page = Page;
	
	$http.get('/customers')
		.then(function(response){
			$scope.message = response.data.message;
		}, function(response){
			$cookies.remove('is_login',{ path: '/' });
			window.location = home_page;
		});
})
.controller('settingsCont', function($scope, $http, $cookies, Page) {
	Page.setTitle("Settings - Dashboard Template for Bootstrap");
	Page.seth1("Settings");
	$scope.Page = Page;
	
	$http.get('/settings')
		.then(function(response){
			$scope.message = response.data.message;
		}, function(response){
			$cookies.remove('is_login',{ path: '/' });
			window.location = home_page;
		});
})
.controller('userCont', function($scope, $http, $cookies, $location, Page) {
	Page.setTitle("Login - Dashboard Template for Bootstrap");
	Page.seth1("Login");
	$scope.Page = Page;
	$scope.message = '';
	
	$('#nav-tab a').on('click', function (e) {
		e.preventDefault();
		$(this).tab('show');
	});
	
	$scope.register = function () {
		var dataObj = {
				name : $scope.name,
				email : $scope.email,
				pass : $scope.pass
		};
		var res = $http.post('/users/register', dataObj)
			.then(function(response) {
				console.log(response.data);
				$scope.message = response.data.message;
			}, function(response) {
				$scope.message = response.data.message;
			});
	};
	
	$scope.login = function () {
		var dataObj = {
				email : $scope.loginEmail,
				pass : $scope.loginPass
		};
		var res = $http.post('/users/login', dataObj)
			.then(function(response) {
				console.log(response.data);
				if(response.data.errors){
					$scope.message = response.data.message;
				}else{
					$cookies.put('is_login', 'yes',{ path: '/' });
					//console.log($cookies.getAll());
					console.log($cookies.get('is_login'));
					window.location = home_page;
				}
			}, function(response) {
				$scope.message = response.data.message;
			});
	};
	
	var loggedIn = $cookies.get('is_login') || {};
	if (loggedIn.length > 0 && $location.path() == '/login') {
		window.location = home_page;
	}else if (loggedIn.length > 0){
		$cookies.remove('is_login', { path: '/' });
	}
});









