(function () {
  'use strict';

  angular
    .module('lucidworksView.components.dashboard.analyzeBar', [
      'lucidworksView.services.queryData',
      'lucidworksView.services.dashboard.dataset',
      'lucidworksView.services.dashboard.result'
    ])
    .directive('analyzeBar', analyzeBar);

  function analyzeBar(QueryDataService, DashDataSetService, DashResultService) {
    'ngInject';
    return {
      restrict: 'E',
      templateUrl: 'assets/components/dashboard/analyzeBar/analyzeBar.html',
      scope: {},
      link: function link(scope) {
        // TODO get the list of datasets from a DataSource service
        // scope.datasets = [
        //   {id: 'collection1'},
        //   {id: 'movielens'}
        // ];
        scope.datasets = DashDataSetService.getDataSets(); 

        scope.query = {
          dataset: '', // dataset to send query to.
          query: '', // SQL or Solr query
          sample: '10' // percentage number of sample data to use for the query. Default: 10% of the total data.
        };

        scope.submitQuery = function submitQuery() {
          console.log('scope.query =', scope.query);

          // querySrv.submit(scope.query);

          // QueryService.setQuery(scope.query);

          // TODO validate and parse scope.query
          var dummyQuery = {
            q: '*',
            wt: 'json'
          };
          QueryDataService.getQueryResults(dummyQuery).then(function(response) {
            console.log('response =', response);
            // TODO validate and parse result into D3 format or tabular format
            //      and save the result in a service
            //      the result should be an array of objects:
            //          [
            //            {key1: val1, key2: val2},
            //            {key1: val1, key2: val2},
            //          ]
            DashResultService.setResult(response.response.docs);


            // TODO broadcast rootScope 'refresh' event to update all dashboard panels
            scope.$emit('refresh');

          }, function (error) {
            console.log('error =', error);
          });
        }

      }
    };
  }
})();
