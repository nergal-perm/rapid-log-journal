(function(){

'use strict';

angular.module('MyApp')
	.controller('DailyCtrl', ['fakeDataService', '$mdDialog', '$scope', 
		function( fakeDataService, $mdDialog, $scope ) {
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

	$scope.addRecord = function() {
		var record = {
			type: $scope.selectedSection,
			marker: $scope.marker,
			short: $scope.short
		};
		$scope.selectedDay.rows.push(record);
		$scope.marker = '';
		$scope.short = '';
	};

}]);

})();

