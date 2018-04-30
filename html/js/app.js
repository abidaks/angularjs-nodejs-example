var app = angular.module('app', ['ngRoute', 'ngResource', 'ngCookies']);

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
			.otherwise({ redirectTo: '/login' });
		
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

app.controller('mainCont', function($rootScope, $cookieStore, $scope, Page) {
	Page.setTitle("Dashboard Template for Bootstrap");
	$scope.Page = Page;
	
	var links = [];
	$rootScope.globals = $cookieStore.get('globals') || {};
	if ($rootScope.globals.currentUser) {
		links.push({title : 'Dashboard', url: '/html/home', logo : 'home'});
		links.push({title : 'Orders', url: '/html/orders', logo : 'file'});
		links.push({title : 'Products', url: '/html/products', logo : 'shopping-cart'});
		links.push({title : 'Customers', url: '/html/customers', logo : 'users'});
		links.push({title : 'Settings', url: '/html/settings', logo : 'layers'});
	}
	
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
})
.controller('userCont', function($rootScope, $cookieStore, $scope, $http, Page) {
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
				$scope.message = response.data.message;
			}, function(response) {
				$scope.message = response.data.message;
			});
	};
	
	$rootScope.globals = $cookieStore.get('globals') || {};
	var loggedIn = $rootScope.globals.currentUser;
	if (loggedIn) {
		$location.path('/home');
	}
});

/*
run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
*/









