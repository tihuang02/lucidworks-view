(function() {
  'use strict';

  angular
    .module('lucidworksView.controllers.dashboard.analyze', [
      'lucidworksView.services.config',
      'lucidworksView.services.dashboard.dataset',
      'lucidworksView.services.dashboard.result'
    ])
    .controller('DashboardAnalyzeController', DashboardAnalyzeController);

  function DashboardAnalyzeController($scope, ConfigService, DashDataSetService, DashResultService) {
    'ngInject';
    var vm = this;
    vm.appName = ConfigService.config.search_app_title;
    vm.logoLocation = ConfigService.config.logo_location;

    vm.dataResult = DashResultService.getResult();

    $scope.$on('refresh', function () {
      console.log('hey I got refresh!');
      vm.dataResult = DashResultService.getResult();
    });
  }
})();
