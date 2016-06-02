(function () {
  'use strict';

  angular
    .module('lucidworksView.components.dashboard.table', ['lucidworksView.services.d3'])
    .directive('tablePanel', tablePanel);

  function tablePanel() {
    'ngInject';
    return {
      restrict: 'E',
      templateUrl: 'assets/components/dashboard/table/table.html',
      controller: Controller,
      controllerAs: 'vm',
      bindToController: true
    };
  }

  function Controller(D3Service) {
    'ngInject';
    var vm = this;


  }
})();
