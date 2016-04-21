(function(){

'use strict';

angular.module('RapidLog').controller('DailyCtrl', DailyCtrl); 

function DailyCtrl( dailyService, $mdSidenav) {
	var self = this;
	
	self.selectedDay = null;
	self.selectedModule = null;
	self.selectModule = selectModule;
	self.loadDay = loadDay;
	self.selectedDate = new Date();
	self.hasDayRecord = hasDayRecord;
	self.dayRecords = [];

	dailyService.getDayRecordsDates(function(result) {
		self.dayRecords = [];
		for (var r in result.rows) {
			self.dayRecords.push(result.rows[r].id);
		}
		console.log(JSON.stringify(self.dayRecords));
	});

	function selectModule(moduleName) {
		self.selectedModule = self.selectedDay[moduleName];
		console.log(JSON.stringify(self.selectedModule));
	}
	
	function loadDay() {
		dailyService.loadDay(self.selectedDate, function(result) {
			self.selectedDay = result;
		});
	}
	
	function hasDayRecord(d) {
    var dateAsId = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); 		
		return self.dayRecords.indexOf(dateAsId) >= 0;
	}
	
}

})();


