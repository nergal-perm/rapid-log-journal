(function(){

'use strict';

angular.module('RapidLog').controller('DailyCtrl', DailyCtrl); 

function DailyCtrl( fakeDataService, $mdDialog ) {
	var self = this;
	this.dayRecords = fakeDataService.dayRecords;
	this.selectedDay = this.dayRecords[0];
	this.selDate = Date.parse(this.selectedDay._id);
	this.selectedSection = 'overview';
	this.setSection = function(sectionType) {
		this.selectedSection = sectionType;
	}

} // DailyCtrl

})();

