(function () {
  'use strict';

  angular
    .module('lucidworksView.components.dashboard.table', [

    ])
    .directive('tablePanel', tablePanel);

  function tablePanel() {
    'ngInject';
    return {
      restrict: 'E',
      templateUrl: 'assets/components/dashboard/table/table.html',
      scope: {
        headers: '=',
        rows: '='
      },
      link: function link(scope) {

        console.log('scope = ', scope);

               

        scope.$watch('rows', function(newVal, oldVal) {
          console.log('rows has changed! newVal =', newVal);
          // TODO refresh the table
        }, true);

        // This 'refresh' event will not be hit by emit() in analyzeBar
        scope.$on('refresh', function(){
          console.log('I got refreshed!');
        });
      }
    };
  }
})();
