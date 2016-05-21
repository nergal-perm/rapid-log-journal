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
        marker: {
          symbol: "Д",
          order: 1,
          unique: true,
          style: 'default'
        },
        short: "Значительная облачность. Повышение 12C. Ветер ВСВ от 10 до 15 км/ч."
      },
      {
        type: "overview",
        marker: {
          symbol: "Н",
          order: 1,
          unique: true,
          style: 'default'
        },
        short: "Переменная облачность. Понижение 0C. Ветер СВ от 10 до 15 км/ч."
      },
      {
        type: "plan",
        marker: {
          symbol: "A",
          order: 1,
          unique: true,
          style: 'danger'
        },
        short: "Неважная задача"
      }]
    },{
      _id: "2016-04-28",
      sections: [
      {
        type: "overview",
        name: "Обзор"
      }],
      rows: [
      {
        type: "overview",
        marker: {
          symbol: "Д",
          order: 1,
          unique: true,
          style: 'default'
        },
        short: "Плохая погода"
      },
      {
        type: "overview",
        marker: {
          symbol: "Н",
          order: 1,
          unique: true,
          style: 'default'
        },
        short: "Хорошая погода"
      },
      {
        type: "plan",
        marker: {
          symbol: "B",
          order: 1,
          unique: true,
          style: "warning"
        },
        short: "Важная задача",
        tags: [{
          name:'Важно',
          type:'!'
        }]
      }]
    }];


    this.getDayById = function(id) {
      var found = this.getDayRecords.filter(function(item) {
          return item._id === id;
        });
      if (found.length > 0) {
        console.log(found[0]);
        return found[0];
      } else {
        console.log('Day ' + id + ' not found'); 
        return {};
      }
    };

    this.getAvailableSections = [
    {
      type: "plan",
      name: "Задачи",
      markers: [{
        symbol: 'A',
        order: 1,
        unique: false,
        style: 'danger'
      },
      {
        symbol: 'B',
        order: 2,
        unique: false,
        style: 'warning'
      },
      {
        symbol: 'C',
        order: 3,
        unique: false,
        style: 'success'
      },
      {
        symbol: 'D',
        order: 4,
        unique: false,
        style: 'default'
      }
      ],
      tags: [{
        name:'Работа',
        type:'Сфера'
      },
      {
        name:'Досуг',
        type:'Сфера'
      },
      {
        name:'Важно',
        type:'!'
      }
      ]
    },
    {
      type: "food",
      name: "Питание",
      markers: [{
        symbol: 'З',
        order: 1,
        unique: true,
        style: 'info'
      },
      {
        symbol: 'О',
        order: 2,
        unique: true,
        style: 'info'
      },
      {
        symbol: 'У',
        order: 3,
        unique: true,
        style: 'info'
      },
      {
        symbol: 'П',
        order: 4,
        unique: true,
        style: 'info'
      }],
      tags: [{
        name:'Важно',
        type:'!'
      }]
    },
    {
      type: "diary",
      name: "Дневник",
      markers: [{
        symbol: 'Событие',
        order: 0,
        unique: false,
        style: 'warning'
      },
      {
        symbol: 'Инфо',
        order: 0,
        unique: false,
        style: 'info'
      }],
      tags: [{
        name:'Важно',
        type:'!'
      }]
    }];
}

angular.module('MyApp').service('fakeDataService', DataService);  

})();