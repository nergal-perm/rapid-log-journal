(function(){
  'use strict';

  angular.module('RapidLog')
    .service('fakeDataService', dataService);


  function dataService() {
    this.dayRecords = [{
      _id: "2016-04-27",
      sections: [
      {
        type: "overview",
        name: "Обзор"
      }],
      rows: [
      {
        type: "overview",
        bullet: "Д",
        short: "Значительная облачность. Повышение 12C. Ветер ВСВ от 10 до 15 км/ч."
      },
      {
        type: "overview",
        bullet: "Н",
        short: "Переменная облачность. Понижение 0C. Ветер СВ от 10 до 15 км/ч."
      }]
    }];

    this.availableSections = [
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
    ]

  };
})();