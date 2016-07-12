(function() {
  'use strict';

  angular
    .module('lucidworksView.controllers.dashboard.analyze', [
      'lucidworksView.services.config',
      'lucidworksView.services.dashboard.dataset',
      'lucidworksView.services.dashboard.result',
      'lucidworksView.services.gridster',
      'lucidworksView.services.nvd3'
    ])
    .controller('DashboardAnalyzeController', DashboardAnalyzeController);

  function DashboardAnalyzeController($scope, $timeout, ConfigService, DashDataSetService, DashResultService, GridsterService, Nvd3Service) {
    'ngInject';
    var vm = this;
    vm.appName = ConfigService.config.search_app_title;
    vm.logoLocation = ConfigService.config.logo_location;

    vm.dataResult = DashResultService.getResult();

    $scope.$on('refresh', function () {
      console.log('hey I got refresh!');
      vm.dataResult = DashResultService.getResult();
    });

    vm.gridsterOptions = GridsterService.getOptions();
    vm.config = Nvd3Service.getConfig();
    vm.events = Nvd3Service.getEvents();

    angular.element(window).on('resize', function(e){
      $scope.$broadcast('resize');
    });

    $timeout(function(){
      vm.config.visible = true;
    }, 200);

    // console.log('vm.gridsterOptions = ', vm.gridsterOptions);
    // // GridsterService.printOptions();
    // vm.gridsterOptions.columns = 13;
    // console.log('Change vm.gridsterOptions.columns => 13');
    // console.log('vm.gridsterOptions = ', vm.gridsterOptions);
    // // GridsterService.printOptions();
    // console.log('GridsterService.getOptions() = ', GridsterService.getOptions());

    vm.widgets = [{
      col: 0,
      row: 0,
      sizeY: 2,
      sizeX: 3,
      name: "Discrete Bar Chart",
      chart: {
        options: Nvd3Service.discreteBarChartOptions(),  // => Nvd3Service.get...ChartOptions  OR  Nvd3Service.getChartOptions('barChart')
        data: Nvd3Service.discreteBarChartData(),
        api: {}
      }
    }, {
      col: 4,
      row: 1,
      sizeY: 2,
      sizeX: 3,
      name: 'Bar Chart 2',
      chart: {
        options: Nvd3Service.discreteBarChartOptions(),
        data: Nvd3Service.discreteBarChartData(),
        api: {}
      }
    }];
  }
})();
