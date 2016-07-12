(function() {
  'use strict';

  angular
    .module('lucidworksView.services.gridster', ['gridster'])
    .factory('GridsterService', GridsterService);

  function GridsterService($timeout, $log, _) {
    'ngInject';
    var vm = this;

    return {
      getOptions: getOptions
      
    };

    function getOptions() {
      return {
        margins: [10, 10],
        columns: 12,
        mobileModeEnabled: false,
        draggable: {
          handle: 'h4'
        },
        resizable: {
          enabled: true,
          handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],

          // optional callback fired when resize is started
          start: function(event, $element, widget) {},

          // optional callback fired when item is resized,
          resize: function(event, $element, widget) {
            if (widget.chart.api) widget.chart.api.update();
          },

          // optional callback fired when item is finished resizing
          stop: function(event, $element, widget) {
            $timeout(function() {
              if (widget.chart.api) widget.chart.api.update();
            }, 400);
          }
        }
      };
    }
    
  }
})();
