(function () {
  angular
    .module('lucidworksView.services.dashboard.dataset', [
      'lucidworksView.services.config',
      'lucidworksView.services.apiBase'

    ])
    /** Default config for Fusion endpoints **/
    .constant('CONFIG_DEFAULT', {
      api: {
        fusion: {
          collections: '/api/apollo/collections',
          schemaFields: '/schema/fields',
          schemaDynamicFields: '/schema/dynamicfields'
        }
      }
    })
    // .config(Config)
    .provider('DashDataSetService', DashDataSetService);

  // function Config(DashDataSetServiceProvider) {
  //   'ngInject';
  //   // DashDataSetServiceProvider.getDataSets();
  //
  // }

  function DashDataSetService(CONFIG_DEFAULT) {
    'ngInject';
    var vm = this;
    vm.config = CONFIG_DEFAULT;

    console.log('vm.config = ', vm.config);

    vm.dataSets = [];
    // Data Set obj
    // {
    //   id: 'collection1'
    //   totalRecords: 10000,
    //   filteredRecords: 5000,
    //   totalFields: 50,
    //
    //   fields: [{
    //     name: 'id',
    //     type: 'string'
    //   },{
    //     name: 'price',
    //     type: 'double'
    //   }],
    //
    // }

    // mock data
    vm.schemas = [
      {
        dataSetId: 'collection1',
        fields: [
          { name: 'id', type: 'string' },
          { name: 'name', type: 'string' },
          { name: 'price', type: 'double' },
          { name: 'inStock', type: 'boolean' }
        ]
      },
      {
        dataSetId: 'biketrip',
        fields: [
          { name: 'id', type: 'string' },
          { name: 'name', type: 'string' },
          { name: 'price', type: 'double' }
        ]
      },
      {
        dataSetId: 'movielens',
        fields: [
          { name: 'id', type: 'string' },
          { name: 'name', type: 'string' },
          { name: 'genre', type: 'string' }
        ]
      }
    ];

    vm.$get = $get;

    init(); // initialize

    /////////////

    function init() {
      // init() will run first, before $get()
      // TODO get datasets, schemas, and etc.
      console.log('Run init() !!!');

    }

    function $get($log, $q, _, ConfigService, ApiBase, $http) {
      'ngInject';

      console.log('Run $get !!!');

      // getDataSets();

      return {
        reload: reload,
        getDataSets: getDataSets,
        getDataSetIds: getDataSetIds,
        getSchemas: getSchemas,
        getSchema: getSchema,
        getFields: getFields
      };

      /**
       * Reload the data source.
       */
      function reload() {
        // TODO
      }

      // TODO getDataSets() might need to be private method.
      /**
       * Return a list of data set objects available.
       */
      function getDataSets() {
        // TODO store dataSet in cache, no need to issue http request everytime
        // if (vm.dataSets) {
        //   var deferred = $q.deferred();
        //
        // }

        // TODO Cannot use fusionCollectionsEndpoint because View send requests through localhost:3000
        var fusionCollectionsEndpoint = ConfigService.config.host + ':' + ConfigService.config.port + vm.config.api.fusion.collections;
        $log.info('fusionCollectionsEndpoint = ', fusionCollectionsEndpoint);

        var apiBase = ApiBase.getEndpoint().replace(/\/$/,''); // Trim a slash at the end
        $log.info('apiBase = ', apiBase);

        var collectionsUrl = apiBase + vm.config.api.fusion.collections;
        $log.info('collectionsUrl = ', collectionsUrl);

        // Empty vm.dataSets first
        vm.dataSets = [];

        return $http.get(collectionsUrl).then(function(resp){
          $log.info('resp = ', resp);

          angular.forEach(resp.data, function(v) {
            // TODO remove hard coded values
            var dataSet = {
              id: v.id,
              totalRecords: 100000,
              filteredRecords: 5000,
              totalFields: 40
            };
            this.push(dataSet);
          }, vm.dataSets);

          $log.info('vm.dataSets = ', vm.dataSets);
          return vm.dataSets;
        }, function(error) {
          $log.error('Error: ' + error);
        });
      }

      /**
       * Return a list of data set ids.
       */
      function getDataSetIds() {
        console.log('_.map(vm.dataSets, "id") = ', _.map(vm.dataSets, 'id'));
        return _.map(vm.dataSets, 'id');
      }

      /**
       * Return a list of schemas.
       * @returns {Array|*[]}
       */
      function getSchemas() {
        return vm.schemas;
      }

      /**
       * Return a schema of the specified Fusion collection name.
       * @param {string} dataSet
       */
      function getSchema(dataSetId) {
        // TODO get a list of fields from dataSet
        return _.find(vm.schemas, function(s) {
          return s.dataSetId === dataSetId;
        });
      }

      /**
       * Get a list of field names for the data set.
       * @param dataSetId
       */
      function getFields(dataSetId) {


      }
    }
  }
})();
