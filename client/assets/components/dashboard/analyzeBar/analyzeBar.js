(function () {
  'use strict';

  angular
    .module('lucidworksView.components.dashboard.analyzeBar', ['lucidworksView.services.d3'])
    .directive('analyzeBar', analyzeBar);

  function analyzeBar() {
    'ngInject';
    return {
      restrict: 'E',
      templateUrl: 'assets/components/dashboard/analyzeBar/analyzeBar.html',
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
