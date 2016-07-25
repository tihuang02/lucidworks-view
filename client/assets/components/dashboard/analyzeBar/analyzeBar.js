/**
 * Analyze Bar consists of a data set drop-down, query input, sampling input, and a run button.
 * It is used for executing a query and get a result back for the dashboard.
 */
(function () {
  'use strict';

  angular
    .module('lucidworksView.components.dashboard.analyzeBar', [
      'lucidworksView.services.config',
      'lucidworksView.services.queryData',
      'lucidworksView.services.dashboard.dataset',
      'lucidworksView.services.dashboard.result'
    ])
    .directive('analyzeBar', analyzeBar);

  function analyzeBar(ConfigService, QueryDataService, DashDataSetService, DashResultService) {
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


        // Get a data set list
        DashDataSetService.getDataSets().then(function(dataSetList) {
          scope.dataSets = dataSetList;
          console.log('scope.dataSets = ', scope.dataSets);
        });

        console.log('DashDataSetService.getDataSetIds() = ', DashDataSetService.getDataSetIds());

        scope.query = {
          dataSet: {}, // dataSet to send query to.
          q: '*' // SQL or Solr query
          // No need to do sampling.
          // sample: '10' // percentage number of sample data to use for the query. Default: 10% of the total data.
        };

        scope.setDataSet = setDataSet;
        scope.submitQuery = submitQuery;

        function setDataSet() {
          ConfigService.config.collection = scope.query.dataSet.id;
          console.log('ConfigService.config.collection = ', ConfigService.config.collection);
        }

        function submitQuery() {
          console.log('scope.query =', scope.query);

          // if dataSet is empty, do nothing
          if (!scope.query.dataSet) {
            return;
          };

          // querySrv.submit(scope.query);
          // QueryService.setQuery(scope.query);

          // TODO validate and parse scope.query
          // var dummyQuery = {
          //   q: '*',
          //   wt: 'json'
          // };
          var query = {
            q: scope.query.q,
            wt: 'json'
          };

          console.log('ConfigService.config = ', ConfigService.config);
          QueryDataService.getQueryResults(query).then(function(response) {
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
