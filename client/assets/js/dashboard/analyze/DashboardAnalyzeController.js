(function() {
  'use strict';

  angular
    .module('lucidworksView.dashboard.analyze', [
      'lucidworksView.services.config',
      'lucidworksView.services.dashboard',
      'lucidworksView.services.dashboard.dataset',
      'lucidworksView.services.dashboard.result',
      'lucidworksView.services.gridster',
      'lucidworksView.services.nvd3'
    ])
    .controller('DashboardAnalyzeController', DashboardAnalyzeController);

  function DashboardAnalyzeController($scope, $timeout, ConfigService, DashboardService, DashDataSetService, DashResultService, GridsterService, Nvd3Service) {
    'ngInject';
    var vm = this;
    vm.appName = ConfigService.config.search_app_title;
    vm.logoLocation = ConfigService.config.logo_location;

    vm.dataResults = DashResultService.getResult();

    // For Table panel


    $scope.$on('refresh', function () {
      console.log('hey I got refresh!');
      vm.dataResults = DashResultService.getResult();
      console.log('vm.dataResults = ', vm.dataResults);
    });

    vm.widgets = [];
    vm.gridsterOptions = GridsterService.getOptions();
    vm.config = Nvd3Service.getConfig();
    vm.events = Nvd3Service.getEvents();

    angular.element(window).on('resize', function(e){
      $scope.$broadcast('resize');
    });

    $timeout(function(){
      vm.config.visible = true;
    }, 200);

    vm.dashboardId = 'analyze';
    DashboardService.createDashboard(vm.dashboardId);   // return Boolean, true if create successfully
    DashboardService.setCurrentDashboard(vm.dashboardId); // set current dashboard
    vm.widgets = DashboardService.getWidgets(vm.dashboardId);

    // vm.widgets = DashService.getWidgets();  // get default widgets Or we can specify the dash_id
    // vm.widgets = DashService.getWidgets(vm.dashboardId);

    // DashService.saveWidgets(vm.widgets)  => maybe we don't need to save because data is pass by reference.
    // DashService.saveWidgets(vm.dashboardId, vm.widgets);

    // check if dashboard already exist, if not create with default widgets TODO => move this check logic to DashboardService?
    // if (DashboardService.isExist(vm.dashboardId)) {
    //   console.log('Found a dashboard: ' + vm.dashboardId);
    //
    //   vm.widgets = DashboardService.getWidgets(vm.dashboardId);
    //   console.log('vm.widgets = ', vm.widgets);
    // } else {
    //   console.log('Create a dashboard with default widgets');
    //
    //   var defaultWidgets = [{
    //     col: 0,
    //     row: 0,
    //     sizeY: 2,
    //     sizeX: 3,
    //     name: "Discrete Bar Chart",
    //     chart: {
    //       options: Nvd3Service.discreteBarChartOptions(),  // => Nvd3Service.get...ChartOptions  OR  Nvd3Service.getChartOptions('barChart')
    //       data: Nvd3Service.discreteBarChartData(),
    //       api: {}
    //     }
    //   }, {
    //     col: 4,
    //     row: 1,
    //     sizeY: 2,
    //     sizeX: 3,
    //     name: 'Bar Chart 2',
    //     chart: {
    //       options: Nvd3Service.discreteBarChartOptions(),
    //       data: Nvd3Service.discreteBarChartData(),
    //       api: {}
    //     }
    //   }];
    //
    //   _.forEach(defaultWidgets, function(v) {
    //     vm.widgets.push(v);
    //   });
    // }


  }
})();
