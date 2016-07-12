(function() {
  'use strict';

  angular
    .module('lucidworksView.services.dashboard.result', [])
    .factory('DashResultService', DashResultService);

  function DashResultService($log, _) {
    'ngInject';
    var vm = this;
    vm.result = {
      headers: [],
      rows: []
    };

    return {
      setResult: setResult,
      getResult: getResult
    };

    /**
     * This method will get an array of objects and extract field keys and values into separate arrays.
     * @param result
       */
    function setResult(result) {
      vm.result = result;

      // angular.forEach(result, function(value, key) {
      //
      // });

      // TODO create a data frame that will be shared among panels.
      // TODO get schema (field names) of the dataset where the result came from.

    }

    function getResult() {
      return vm.result;
    }
  }
})();
