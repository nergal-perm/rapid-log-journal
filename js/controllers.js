(function(){

'use strict';

angular.module('RapidLog').controller('DailyCtrl', DailyCtrl); 

function DailyCtrl( fakeDataService, $mdDialog, $scope ) {
	var self = this;
	
	this.dayRecords = fakeDataService.dayRecords;
	this.selectedDay = this.dayRecords[0];
	this.selectedSection = 'overview';
	this.setSection = function(sectionType) {
		this.selectedSection = sectionType;
	}

	this.availableSections = fakeDataService.availableSections;
	this.sectionToAdd = '';

	this.addSection = function() {
		if (!this.sectionToAdd) {
			return;
		}
		var removeIndex = this.availableSections.map(function(item) {
			return item.type;
		}).indexOf(this.sectionToAdd);

		this.selectedDay.sections.push(~removeIndex && this.availableSections.splice(removeIndex, 1)[0]);
		this.setSection(this.sectionToAdd);
		this.sectionToAdd = '';
	}

	this.addRecord = function() {
		var record = {
			type: this.selectedSection,
			bullet: $scope.bullet,
			short: $scope.short
		};
		this.selectedDay.rows.push(record);
		$scope.bullet = '';
		$scope.short = '';
	}

} // DailyCtrl

})();

