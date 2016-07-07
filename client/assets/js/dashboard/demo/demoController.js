(function() {
  'use strict';

  angular
    .module('lucidworksView.dashboard.demo', [
      'lucidworksView.services.config',
      'lucidworksView.services.dashboard.dataset'
    ])
    .controller('DashboardDemoController', DashboardDemoController);

  function DashboardDemoController($stateParams, $timeout, ConfigService, DashDataSetService) {
    'ngInject';
    var vm = this;
    vm.appName = ConfigService.config.search_app_title;
    vm.logoLocation = ConfigService.config.logo_location;

    // vm.dataSetId = $stateParams.id;
    vm.dataSets = DashDataSetService.getDataSets();
    vm.dataSet = {
      id: $stateParams.id
    };

    vm.schema = DashDataSetService.getSchema(vm.dataSet.id);

    // mock data for string field type
    vm.fieldSummaryDataForString = [
      {x:'Apache Software', y:2},
      {x:'Belkin', y:3},
      {x:'Canon Inc.', y:4}
    ];

    // mock data for number field type
    vm.fieldSummaryDataForNumber = [
      5, 10, 15, 20
    ];

    vm.getSchema = function getSchema() {
      vm.schema = DashDataSetService.getSchema(vm.dataSet.id);
      console.log('vm.schema = ', vm.schema);
    };

    // return an array of summary data of the specified field. This will be used in field visualizer.
    vm.getFieldSummaryData = function getFieldSummaryData(fieldName) {
      // TODO
      if (fieldName === 'id') {

        return vm.fieldSummaryDataForString;
      } else if (fieldName === 'price') {

        return vm.fieldSummaryDataForNumber;
      }
      return vm.fieldSummaryDataForString;
    };

    // Gridster options
    vm.gridsterOptions = {
      margins: [10, 10],
      columns: 10,
      mobileModeEnabled: false,
      draggable: {
        handle: 'h3'
      },
      resizable: {
        enabled: true,
        handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],

        // optional callback fired when resize is started
        start: function(event, $element, widget) {},

        // optional callback fired when item is resized,
        resize: function(event, $element, widget) {
          if (widget.chart.api) widget.chart.api.update();
        },

        // optional callback fired when item is finished resizing
        stop: function(event, $element, widget) {
          $timeout(function() {
            if (widget.chart.api) widget.chart.api.update();
          }, 400);
        }
      }
    };


    vm.widgets = [{
      col: 0,
      row: 0,
      sizeY: 1,
      sizeX: 3,
      name: "Discrete Bar Chart",
      chart: {
        options: discreteBarChartOptions(),
        data: discreteBarChartData(),
        api: {}
      }
    }, {
      col: 4,
      row: 1,
      sizeY: 1,
      sizeX: 3,
      name: 'Bar Chart 2',
      chart: {
        options: discreteBarChartOptions(),
        data: discreteBarChartData(),
        api: {}
      }
    }];


    function discreteBarChartOptions() {
      return {
        chart: {
          type: 'discreteBarChart',
          margin : {
            top: 40,
            right: 20,
            bottom: 30,
            left: 55
          },
          x: function(d){return d.label;},
          y: function(d){return d.value;},
          showValues: true,
          valueFormat: function(d){
            return d3.format(',.0f')(d);
          },
          duration: 500,
          xAxis: {
            axisLabel: 'X Axis',
            axisLabelDistance: -10
          },
          yAxis: {
            axisLabel: 'Y Axis',
            axisLabelDistance: -10
          }
        }
      }
    }
    function discreteBarChartData() {
      return [
        {
          key: "Cumulative Return",
          values: [
            {
              "label" : "A" ,
              "value" : 29.765957771107
            } ,
            {
              "label" : "B" ,
              "value" : 0
            } ,
            {
              "label" : "C" ,
              "value" : 32.807804682612
            } ,
            {
              "label" : "D" ,
              "value" : 196.45946739256
            } ,
            {
              "label" : "E" ,
              "value" : 0.19434030906893
            } ,
            {
              "label" : "F" ,
              "value" : 98.079782601442
            } ,
            {
              "label" : "G" ,
              "value" : 13.925743130903
            } ,
            {
              "label" : "H" ,
              "value" : 5.1387322875705
            }
          ]
        }
      ];
    }
    
    // We want to manually handle `windows.resize` event in each directive.
    // So that we emulate `resize` event using $broadcast method and internally subscribe to this event in each directive.
    // Define event handler
    vm.events = {
      resize: function(e, scope) {
        $timeout(function(){
          scope.api.update();
        }, 200);
      }
    };
    angular.element(window).on('resize', function(e){
      vm.$broadcast('resize');
    });
    
    // We want to hide the charts until the grid will be created and all widths and heights will be defined.
    // So that use `visible` property in config attribute
    vm.config = {
      visible: false
    };
    $timeout(function(){
      vm.config.visible = true;
    }, 200);
  }
})();
