(function() {
	'use strict';
	
	angular.module('MyApp', ['ngMaterial', 'ui.router'])
		.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
			$stateProvider
			.state('app', {
				url:'/',
				views: {
					'header': {
						templateUrl: 'views/header.html'
					},
					'sidePeriods': {
						templateUrl: 'views/periods.html'
					},
					'sideSections': {
						templateUrl: 'views/sections.html'
					},
					'content': {
						template: '<h1>To be implemented</h1>'
					}
				}
			})
			.state('app.day', {
				url: 'day/:id',
				views: {
					'content@': {
						templateUrl: 'views/day.html'
					}
				}
			});

			$urlRouterProvider.otherwise('/');
		}])
	;	

})();
