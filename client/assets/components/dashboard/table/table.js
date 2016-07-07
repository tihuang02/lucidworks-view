(function () {
  'use strict';

  angular
    .module('lucidworksView.components.dashboard.table', [])
    .directive('tablePanel', tablePanel);

  function tablePanel() {
    'ngInject';
    return {
      restrict: 'E',
      templateUrl: 'assets/components/dashboard/table/table.html',
      scope: {
        panelData: '='
      },
      link: function link(scope) {
        scope.$watch('panelData', function(newVal, oldVal) {
          console.log('panelData has changed! newVal =', newVal);
          // TODO refresh the table
        }, true);
      }
    };
  }
})();
