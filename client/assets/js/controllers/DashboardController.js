(function() {
  'use strict';

  angular
    .module('lucidworksView.controllers.dashboard', ['lucidworksView.services.config'])
    .controller('DashboardController', DashboardController);

  function DashboardController(ConfigService) {
    'ngInject';
    var vm = this;
    vm.appName = ConfigService.config.search_app_title;
    vm.logoLocation = ConfigService.config.logo_location;

    vm.cardClick = cardClick;

    function cardClick() {
      console.log('click!');
    }
  }
})();
