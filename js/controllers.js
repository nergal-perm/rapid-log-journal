'use strict';

var testAppControllers = angular.module('testAppControllers', []);

testAppControllers.controller('MainCtrl', 
['$scope', '$location', '$http',
function($scope, $location, $http) {
	$scope.message = 'Hello, world';
}]);
