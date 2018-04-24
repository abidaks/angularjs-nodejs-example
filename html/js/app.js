var app = angular.module('app', ['ngRoute', 'ngResource']);

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
			.when('/reports', {
				controller: 'reportsCont',
				templateUrl: 'pages/reports.html'
			})
			.when('/settings', {
				controller: 'settingsCont',
				templateUrl: 'pages/settings.html'
			})
			.when('/home', {
				controller: 'homeCont',
				templateUrl: 'pages/home.html'
			})
			.otherwise({ redirectTo: '/home' });
		
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

app.controller('mainCont', function($scope, Page) {
	Page.setTitle("Dashboard Template for Bootstrap");
	$scope.Page = Page;
	
	var links = [];
	links.push({title : 'Dashboard', url: '/html/home', logo : 'home'});
	links.push({title : 'Orders', url: '/html/orders', logo : 'file'});
	links.push({title : 'Products', url: '/html/products', logo : 'shopping-cart'});
	links.push({title : 'Customers', url: '/html/customers', logo : 'users'});
	links.push({title : 'Reports', url: '/html/reports', logo : 'bar-chart-2'});
	links.push({title : 'Settings', url: '/html/settings', logo : 'layers'});
	$scope.navs = links;
	
	$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
		feather.replace();
	});
})
.controller('homeCont', function($scope, $http, Page) {
	Page.setTitle("Dashboard Template for Bootstrap");
	Page.seth1("Dashboard");
	$scope.Page = Page;
	
	$http.get('/home')
		.then(function(response){
			$scope.message = response.data.message;
		}, function(response){
			$scope.message = response;
		});
})
.controller('ordersCont', function($scope, $http, Page) {
	Page.setTitle("Orders - Dashboard Template for Bootstrap");
	Page.seth1("Orders");
	$scope.Page = Page;
	
	$http.get('/orders')
		.then(function(response){
			$scope.message = response.data.message;
		}, function(response){
			$scope.message = response;
		});
})
.controller('productsCont', function($scope, $http, Page) {
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
			$scope.message = response;
		});
})
.controller('customersCont', function($scope, $http, Page) {
	Page.setTitle("Customers - Dashboard Template for Bootstrap");
	Page.seth1("Customers");
	$scope.Page = Page;
	
	$http.get('/customers')
		.then(function(response){
			$scope.message = response.data.message;
		}, function(response){
			$scope.message = response;
		});
})
.controller('reportsCont', function($scope, $http, Page) {
	Page.setTitle("Reports - Dashboard Template for Bootstrap");
	Page.seth1("Reports");
	$scope.Page = Page;
	
	$http.get('/reports')
		.then(function(response){
			$scope.message = response.data.message;
		}, function(response){
			$scope.message = response;
		});
})
.controller('settingsCont', function($scope, $http, Page) {
	Page.setTitle("Settings - Dashboard Template for Bootstrap");
	Page.seth1("Settings");
	$scope.Page = Page;
	
	$http.get('/settings')
		.then(function(response){
			$scope.message = response.data.message;
		}, function(response){
			$scope.message = response;
		});
});










