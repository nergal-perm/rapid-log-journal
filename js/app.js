'use strict';

var testApp = angular.module('testApp', [
	'ngRoute', 'testAppControllers'
]);

testApp.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
	console.log('routing procedure');
	$routeProvider
		.when('/', {
			templateUrl: 'partials/main.html',
			controller: 'MainCtrl'
		});
	$routeProvider.otherwise({ redirectTo: '/' });	
	$locationProvider.html5Mode(false).hashPrefix('!');
}]);
