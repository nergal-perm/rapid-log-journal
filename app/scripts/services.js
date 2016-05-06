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
      name: "Задачи"
    },
    {
      type: "food",
      name: "Питание"
    },
    {
      type: "diary",
      name: "Дневник"
    },
    {
      type: "chronodex",
      name: "Хронодекс"
    }
    ];
}

angular.module('MyApp').service('fakeDataService', DataService);  

})();