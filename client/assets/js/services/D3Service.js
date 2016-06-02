(function() {
  'use strict';

  angular
    .module('lucidworksView.services.d3', [])
    .factory('D3Service', D3Service);

  function D3Service() {
    return d3;
  }
})();
