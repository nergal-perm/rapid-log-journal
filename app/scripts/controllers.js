(function(){

'use strict';

angular.module('MyApp')
	.controller('DailyCtrl', ['fakeDataService', '$scope', '$mdBottomSheet', '$location', '$stateParams',
		function( fakeDataService, $scope, $mdBottomSheet, $location, $stateParams ) {

	$scope.dayRecords = fakeDataService.getDayRecords;
	$scope.availableSections = fakeDataService.getAvailableSections;

	$scope.selections = {
		selectedSection: 'overview'
	};
	$scope.selections.selectedDay = fakeDataService.getDayById(parseInt($stateParams.id), 10);

	/*
	 *
	 */
	$scope.setSection = function(section) {
		$scope.selections.selectedSection = section;
		$scope.markers = section.markers;
	};

	$scope.changeDate = function() {
		$scope.selections.selectedDate = 
			new Date(Number($scope.selections.selectedDate) - 
			$scope.selections.selectedDate.getTimezoneOffset() * 60000);
		var s = $scope.selections.selectedDate;
		$location.url('/day/' + s.getFullYear() + '-' +
			String('0' + (s.getMonth() + 1)).split('').slice(-2).join('') + '-' + s.getDate());
		$scope.selections.selectedDay = fakeDataService.getDayById($stateParams.id);
	};

	/* Добавляет новую секцию в запись текущего дня. Выбранная секция
	 * удаляется из списка доступных для выбора секций, чтобы не было
	 * возможности добавить дважды одну и ту же секцию.
	 */
	$scope.addSection = function() {
		// Должна быть явно указана добавляемая секция
		if (!$scope.selections.sectionToAdd) {
			return;
		}
		
		var removeIndex = $scope.availableSections.map(function(item) {
			return item.type;
		}).indexOf($scope.selections.sectionToAdd);

		var section = (removeIndex > -1) && $scope.availableSections.splice(removeIndex, 1)[0];
		if (section) {
			$scope.selections.selectedDay.sections.push(section);
			$scope.setSection(section);			
		}
		$scope.sectionToAdd = '';
	};

	$scope.criteriaMatch = function() {
		return function(item) {
			var match = false;
			if (item.tags) {
				var foundIndex = item.tags.map(function(tag) {
					return tag.name;
				}).indexOf('Важно');
				match = (foundIndex > -1 && $scope.selections.selectedSection.type === 'overview');
			}
			var result = (item.type === $scope.selections.selectedSection.type) || match;
			return result;
		};
	};

	$scope.editDetails = function(record) {

		function DetailsController() {
			this.loadTags = function() {
				var tags = $scope.selections.selectedSection.tags;
				return tags.map(function(tag) {
					tag._lowername = tag.name.toLowerCase();
					tag._lowertype = tag.type.toLowerCase();
					return tag;
				});
			};			
			this.selectedTag = null;
			this.searchText = null;
			this.record = record;
			if (!record.tags) {
				record.tags = [];
			}
			this.tags = this.loadTags();
			this.markers = $scope.selections.selectedSection.markers;
			this.save = function() {
				$mdBottomSheet.hide();
			};
			this.transformTag = function(chip) {
				if(angular.isObject(chip)) {
					return chip;
				}
				return {name: chip, type: 'new'};
			};
			this.querySearch = function(query) {
				var results = query ? this.tags.filter(this.createFilterFor(query)) : [];
				return results;
			};
			this.createFilterFor = function(query) {
				var lcQuery = angular.lowercase(query);
				return function filterFn(tag) {
					return (tag._lowername.indexOf(lcQuery) === 0) ||
					(tag._lowertype.indexOf(lcQuery) === 0);
				};
			};
		}
		console.log('editing record:' + JSON.stringify(record));
		$mdBottomSheet.show({
			controller: DetailsController,
			controllerAs: 'detCtrl',
			templateUrl: './bottomsheet.html',
			parent: angular.element(document.querySelector('#content')),
			clickOutsideToClose: true
		});

	};

	}])

	.controller('RecordController', ['$scope', function($scope) {
		$scope.addRecord = function() {
			var index = $scope.markers.map(function(item) {
				return item.symbol;
			}).indexOf($scope.marker);

			var record = {
				type: $scope.selections.selectedSection.type,
				marker: $scope.markers[index],
				short: $scope.short
			};

			$scope.selections.selectedDay.rows.push(record);
			
			$scope.marker = '';
			$scope.short = '';				
			$scope.recordForm.$setPristine();
			$scope.recordForm.$setUntouched();
		};
	}]);

})();

