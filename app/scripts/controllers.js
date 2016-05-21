(function(){

'use strict';

angular.module('MyApp')
	/*
	 * Контроллер, связывающий воедино все секции веб-страницы: даты, секции 
	 * и область данных
	 */
	.controller('DispatchCtrl', ['$scope',
	function($scope) {
		$scope.displayedItem = {};
	}])

	/*
	 * Контроллер, отвечающий за представление данных одного конкретного дня
	 */
	.controller('DayCtrl', ['$scope', 'fakeDataService', '$stateParams',
	function($scope, fakeDataService, $stateParams) {
		$scope.$parent.displayedItem = fakeDataService.getDayById($stateParams.id);
		
		$scope.$parent.selections = {
			selectedSection: {
				type: 'overview'
			}
		};

		$scope.criteriaMatch = function() {
			return function(item) {
				var match = false;
				var sectionType = $scope.$parent.selections.selectedSection.type;
				if (item.tags) {
					var foundIndex = item.tags.map(function(tag) {
						return tag.name;
					}).indexOf('Важно');
					match = (foundIndex > -1 && sectionType === 'overview');
				}
				var result = (item.type === sectionType) || match;
				return result;
			};
		};

	}])

	/* 
	 * Контроллер, отвечающий за корректное переключение периодов и выбор 
	 * конкретного периода для отображения
	 */
	.controller('PeriodsCtrl', ['$scope', '$location',
	function($scope, $location) {
		$scope.changeDate = function() {
			var s = new Date(Number($scope.selectedDate) - 
				$scope.selectedDate.getTimezoneOffset() * 60000);
			$location.url('/day/' + s.getFullYear() + '-' +
				String('0' + (s.getMonth() + 1)).split('').slice(-2).join('') + '-' + 
				String('0' + s.getDate()).split('').slice(-2).join(''));
		};
	}])

	.controller('DailyCtrl', ['fakeDataService', '$scope', '$mdBottomSheet', 
	function( fakeDataService, $scope, $mdBottomSheet ) {

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
	}])



	.controller('DailySectionsCtrl', ['$scope', 'fakeDataService', 
	function($scope, fakeDataService) {
		$scope.availableSections = fakeDataService.getAvailableSections;

		$scope.setSection = function(section) {
			$scope.$parent.selections.selectedSection = section;
			$scope.markers = section.markers;
		};	

		/* Добавляет новую секцию в запись текущего дня. Выбранная секция
		 * удаляется из списка доступных для выбора секций, чтобы не было
		 * возможности добавить дважды одну и ту же секцию.
		 */
		$scope.addSection = function() {
			// Должна быть явно указана добавляемая секция
			if (!$scope.$parent.selections.sectionToAdd) {
				return;
			}
			
			var removeIndex = $scope.availableSections.map(function(item) {
				return item.type;
			}).indexOf($scope.$parent.selections.sectionToAdd);

			var section = (removeIndex > -1) && $scope.availableSections.splice(removeIndex, 1)[0];
			if (section) {
				$scope.$parent.displayedItem.sections.push(section);
				$scope.setSection(section);		
			}
			$scope.$parent.selections.sectionToAdd = '';
		};
	}]);

})();

