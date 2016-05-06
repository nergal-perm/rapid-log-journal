(function(){

'use strict';

var DailyCtrl = function( fakeDataService, $mdDialog, $scope ) {
	this.dayRecords = fakeDataService.getDayRecords;
	this.selectedDay = this.dayRecords[0];
	this.selectedDate = '';
	this.selectedSection = 'overview';
	this.availableSections = fakeDataService.getAvailableSections;
	this.sectionToAdd = '';

	/*
	 *
	 */
	this.setSection = function(sectionType) {
		this.selectedSection = sectionType;
	};

	/* Добавляет новую секцию в запись текущего дня. Выбранная секция
	 * удаляется из списка доступных для выбора секций, чтобы не было
	 * возможности добавить дважды одну и ту же секцию.
	 */
	this.addSection = function() {
		// Должна быть явно указана добавляемая секция
		if (!this.sectionToAdd) {
			return;
		}
		
		var removeIndex = this.availableSections.map(function(item) {
			return item.type;
		}).indexOf(this.sectionToAdd);

		this.selectedDay.sections.push((removeIndex > -1) && this.availableSections.splice(removeIndex, 1)[0]);
		this.setSection(this.sectionToAdd);
		this.sectionToAdd = '';
	};

	this.addRecord = function() {
		var record = {
			type: this.selectedSection,
			marker: $scope.marker,
			short: $scope.short
		};
		this.selectedDay.rows.push(record);
		$scope.marker = '';
		$scope.short = '';
	};

}; // DailyCtrl

angular.module('MyApp').controller('dailyCtrl', DailyCtrl); 

})();

