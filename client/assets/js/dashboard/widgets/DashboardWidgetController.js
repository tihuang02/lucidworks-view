(function() {
  'use strict';

  angular
    .module('lucidworksView.dashboard.widgets', [
      'lucidworksView.services.gridster',
      'lucidworksView.services.nvd3',
      'lucidworksView.services.dashboard'
    ])
    .controller('DashboardWidgetController', DashboardWidgetController);

  function DashboardWidgetController($scope, $timeout, GridsterService, Nvd3Service, DashboardService) {
    'ngInject';
    var vm = this;
    vm.openSettings = openSettings;
    vm.remove = remove;

    $scope.$on('refresh', function () {
      console.log('hey I got refresh!');

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


    function openSettings(widget) {

      console.log('Open Settings!', widget);
    }

    function remove(widget) {
      // get widgets from dashboard service
      // var index = DashboardService.getWidgets().indexOf(widget);
      //
      DashboardService.removeWidget(widget, 'analyze'); // TODO get current dashboard id
      console.log('Remove widget!', widget);

    }
  }
})();
