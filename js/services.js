(function(){
'use strict';

var localDB = new PouchDB('local');
var remoteDB = new PouchDB('http://localhost:5984/bullet_journal'); 

angular.module('RapidLog')
  .service('dailyService', dailyService);
  

function dailyService() {
  
  this.loadDay = function(d, callback) {
    // Форматирование даты: http://stackoverflow.com/a/30272803/4180503
    var dateAsId = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); 
    
    localDB.get(dateAsId).then(function(doc) {
      callback(doc);
    })
  }
  
  this.getDayRecordsDates = function(callback) {
    localDB.query(function (doc, emit) {
      emit(doc._id);
    }).then(function(result) {
      callback(result);
    }).catch(function(err) {
      console.log(err);
    }); 
  } 
}

})();