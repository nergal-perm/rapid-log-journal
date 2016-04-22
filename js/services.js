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

angular.module('Weather')
.service('weatherService', weatherService);

function weatherService() {
  var request = require('request'),
  conf = require('nconf');

  conf.argv()
  .env()
  .file({ file: 'config.json'});

  this.getForecast = function(callback) {
    var api_key = conf.get('weatherAPI');
    process.env.http_proxy = conf.get('workProxy');
    request.get({
      uri: 'http://api.wunderground.com/api/' + api_key + '/forecast/lang:RU/q/uspp.json',
      headers: {'Accept': 'application/json'}
    }, function(err, res, body) {
      if (err) {
        callback(err);  
      } else {
        var forecast = JSON.parse(body);
        var fc_day = forecast.forecast.txt_forecast.forecastday[0];
        var fc_night = forecast.forecast.txt_forecast.forecastday[1];
        var result = [];
        result.push({ 
          bullet: fc_day.title,
          short: fc_day.fcttext_metric
        });
        result.push({
          bullet: fc_night.title,
          short: fc_night.fcttext_metric
        });
        callback(null, result);
      }
    }); 
  }
}


})();