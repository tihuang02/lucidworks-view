(function() {
  'use strict';

  angular
    .module('lucidworksView.services.dashboard.result', [])
    .factory('DashResultService', DashResultService);

  function DashResultService($log, _) {
    'ngInject';
    var vm = this;

    // mock data
    vm.result = {
      headers: ['id', 'name', 'price'],
      rows: [
        ['1', 'Macbook Pro', '50000'],
        ['2', 'TV', '400'],
        ['3', 'Watch', '500'],
        ['4', 'PS4', '399']
      ]
    };

    return {
      setResult: setResult,
      getResult: getResult,
      getResultHeaders: getResultHeaders,
      getResultRows: getResultRows
    };

    /**
     * This method will get an array of objects and extract field keys and values into separate arrays.
     * @param result
       */
    function setResult(result) {
      // TODO parse result to create a data frame that will be shared among panels.
      // TODO get schema (field names) of the dataset where the result came from.

      // vm.result = result;

    }

    function getResult() {
      return vm.result;
    }

    function getResultHeaders() {
      return vm.result.headers;
    }

    function getResultRows() {
      return vm.result.rows;
    }
  }
})();
