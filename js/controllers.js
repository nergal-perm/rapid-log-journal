(function(){

'use strict';

angular.module('RapidLog').controller('DailyCtrl', DailyCtrl); 

function DailyCtrl( dailyService, weatherService, $mdSidenav, $q, $scope) {
	var self = this;
	
	// fields
	self.selectedDay = {};
	self.selectedModule = null;
	self.selectedDate = new Date();
	self.dayRecords = [];
	
	// methods
	self.hasDayRecord = hasDayRecord;
	self.selectModule = selectModule;
	self.loadDay = loadDay;
	self.getForecast = getForecast;

	dailyService.getDayRecordsDates(function(result) {
		self.dayRecords = [];
		for (var r in result.rows) {
			self.dayRecords.push(result.rows[r].id);
		}
		console.log(JSON.stringify(self.dayRecords));
	});

	function selectModule(moduleName) {
		if (moduleName == "weather") {
			if (!self.selectedDay['weather']) {
				self.selectedDay['weather'] = [];
			}
			getForecast(function(result) {
				self.selectedDay[moduleName].length = 0;
				$scope.$apply(function () {
					for (var r in result) {
						self.selectedDay[moduleName].push(result[r]);
					}
					self.selectedModule = self.selectedDay[moduleName];					
				})
			})
		} else {
			self.selectedModule = self.selectedDay[moduleName];
		}
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
	
	function getForecast(callback) {
		if (self.selectedDay['weather'].length > 0) {
			callback(self.selectedDay['weather']);
		} else {
			weatherService.getForecast(function(err, result) {
				if (err) {
					callback([{
						bullet: "err",
						short: err
					}]);
				} else {
					callback(result);
				}
			});			
		}
	}
}

})();


