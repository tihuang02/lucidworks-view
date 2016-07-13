(function() {
  'use strict';

  angular
    .module('lucidworksView.dashboard.settings', [
      'lucidworksView.services.config'
    ])
    .controller('DashboardSettingsController', DashboardSettingsController);

  function DashboardSettingsController(ConfigService) {
    'ngInject';
    var vm = this;
    vm.appName = ConfigService.config.search_app_title;
    vm.logoLocation = ConfigService.config.logo_location;
    vm.reset = reset;
    vm.save = save;

    console.log('ConfigService.config = ', ConfigService.config);
    vm.reset();

    function reset(){
      vm.fusion = {
        host: ConfigService.config.host,
        port: ConfigService.config.port
      };
      console.log('ConfigService.config = ', ConfigService.config);
    }

    function save(){
      // TODO we cannot save the settings back to ConfigService because they are not persisted.
      // We might need to create a wrapper service around ConfigService.
      ConfigService.config.host = vm.fusion.host;
      ConfigService.config.port = vm.fusion.port;
      console.log('ConfigService.config = ', ConfigService.config);
    }
  }
})();
