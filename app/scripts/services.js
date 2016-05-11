(function(){

'use strict';

function DataService() {
    this.getDayRecords = [{
      _id: "2016-04-27",
      sections: [
      {
        type: "overview",
        name: "Обзор"
      }],
      rows: [
      {
        type: "overview",
        marker: "Д",
        short: "Значительная облачность. Повышение 12C. Ветер ВСВ от 10 до 15 км/ч."
      },
      {
        type: "overview",
        marker: "Н",
        short: "Переменная облачность. Понижение 0C. Ветер СВ от 10 до 15 км/ч."
      }]
    }];

    this.getAvailableSections = [
    {
      type: "plan",
      name: "Задачи",
      markers: [{
        marker: 'A',
        order: 1,
        unique: false
      },
      {
        marker: 'B',
        order: 2,
        unique: false
      },
      {
        marker: 'C',
        order: 3,
        unique: false
      }]
    },
    {
      type: "food",
      name: "Питание",
      markers: [{
        marker: 'З',
        order: 1,
        unique: true
      },
      {
        marker: 'О',
        order: 2,
        unique: true
      },
      {
        marker: 'У',
        order: 3,
        unique: true
      },
      {
        marker: 'П',
        order: 4,
        unique: true
      }]
    },
    {
      type: "diary",
      name: "Дневник",
      markers: [{
        marker: 'Событие',
        order: 0,
        unique: false
      },
      {
        marker: 'Инфо',
        order: 0,
        unique: false
      }]
    }];
}

angular.module('MyApp').service('fakeDataService', DataService);  

})();