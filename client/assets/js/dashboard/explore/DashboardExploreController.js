(function() {
  'use strict';

  angular
    .module('lucidworksView.dashboard.explore', [
      'lucidworksView.services.config',
      'lucidworksView.services.dashboard.dataset'
    ])
    .controller('DashboardExploreController', DashboardExploreController);

  function DashboardExploreController($stateParams, ConfigService, DashDataSetService) {
    'ngInject';
    var vm = this;
    vm.appName = ConfigService.config.search_app_title;
    vm.logoLocation = ConfigService.config.logo_location;

    // vm.dataSetId = $stateParams.id;
    vm.dataSets = DashDataSetService.getDataSets();
    vm.dataSet = {
      id: $stateParams.id,
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

    // TODO Gridster testing
    vm.fieldItems = [
      { sizeX: 1, sizeY: 1, row: 0, col: 0 },
      { sizeX: 2, sizeY: 2, row: 0, col: 2 }
    ];

    vm.gridsterOpts = {
      width: 'auto',
      columns: 4,
      margins: [10, 10],
      pushing: true,
      isMobile: false,
      mobileModeEnabled: false,
      draggable: {
        enabled: true,
        handle: '.grid-block'
      }
    }
  }
})();
