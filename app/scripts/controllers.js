(function(){

'use strict';

angular.module('MyApp')
	.controller('DailyCtrl', ['fakeDataService', '$scope', '$mdBottomSheet',
		function( fakeDataService, $scope, $mdBottomSheet ) {
	$scope.dayRecords = fakeDataService.getDayRecords;
	$scope.selectedDay = $scope.dayRecords[0];
	$scope.selectedDate = '';
	$scope.selectedSection = 'overview';
	$scope.availableSections = fakeDataService.getAvailableSections;
	$scope.sectionToAdd = '';

	/*
	 *
	 */
	$scope.setSection = function(sectionType) {
		$scope.selectedSection = sectionType;
		var index = $scope.selectedDay.sections.map(function(item) {
			return item.type;
		}).indexOf(sectionType);
		$scope.markers = $scope.selectedDay.sections[index].markers;
	};

	/* Добавляет новую секцию в запись текущего дня. Выбранная секция
	 * удаляется из списка доступных для выбора секций, чтобы не было
	 * возможности добавить дважды одну и ту же секцию.
	 */
	$scope.addSection = function() {
		// Должна быть явно указана добавляемая секция
		if (!$scope.sectionToAdd) {
			return;
		}
		
		var removeIndex = $scope.availableSections.map(function(item) {
			return item.type;
		}).indexOf($scope.sectionToAdd);

		$scope.selectedDay.sections.push((removeIndex > -1) && $scope.availableSections.splice(removeIndex, 1)[0]);
		$scope.setSection($scope.sectionToAdd);
		$scope.sectionToAdd = '';
	};

	$scope.editDetails = function(record) {

		function DetailsController() {
			this.record = record;
			this.save = function() {
				$mdBottomSheet.hide();
			};
		}

		$mdBottomSheet.show({
			controller: DetailsController,
			controllerAs: 'detCtrl',
			templateUrl: './bottomsheet.html',
			parent: angular.element(document.querySelector('#content'))
		});

	};

	}])

	.controller('RecordController', ['$scope', function($scope) {
		$scope.addRecord = function() {
			var index = $scope.markers.map(function(item) {
				return item.symbol;
			}).indexOf($scope.marker);
			console.log($scope.marker + ' index: ' + index);


			var record = {
				type: $scope.selectedSection,
				marker: $scope.markers[index],
				short: $scope.short
			};

			$scope.selectedDay.rows.push(record);
			
			$scope.marker = '';
			$scope.short = '';				
			$scope.recordForm.$setPristine();
			$scope.recordForm.$setUntouched();
		};
	}]);

})();

