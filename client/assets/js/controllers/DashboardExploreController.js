(function() {
  'use strict';

  angular
    .module('lucidworksView.controllers.dashboard.explore', ['lucidworksView.services.config'])
    .controller('DashboardExploreController', DashboardExploreController);

  function DashboardExploreController($stateParams, ConfigService) {
    'ngInject';
    var vm = this;
    vm.appName = ConfigService.config.search_app_title;
    vm.logoLocation = ConfigService.config.logo_location;
    
    vm.dataSourceId = $stateParams.dataSourceId;

    vm.cardClick = function cardClick() {
      console.log('click!');
    };


  }
})();
