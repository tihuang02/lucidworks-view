(function () {
  angular
    .module('lucidworksView.services.dashboard.dataset', [
      'lucidworksView.services.config'
    ])
    /** Default config for Fusion endpoints **/
    .constant('CONFIG_DEFAULT', {
      api: {
        fusion: {
          collection: '/api/apollo/collections',
          schemaFields: '/schema/fields',
          schemaDynamicFields: '/schema/dynamicfields'
        }
      }
    })
    .provider('DashDataSetService', DashDataSetService);

  function DashDataSetService(CONFIG_DEFAULT) {
    'ngInject';
    var vm = this;
    vm.config = CONFIG_DEFAULT;

    // mock data
    vm.dataSets = [{
      id: 'collection1',
      totalRecords: 100000,
      filteredRecords: 50000,
      totalFields: 50
    }, {
      id: 'biketrip',
      totalRecords: 200000,
      filteredRecords: 40000,
      totalFields: 30
    }, {
      id: 'movielens',
      totalRecords: 900000,
      filteredRecords: 30000,
      totalFields: 40
    }];

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
      // TODO get datasets, schemas, and etc.

    }

    function $get($log, _, ConfigService) {
      'ngInject';

      // $log.log('ConfigService =', ConfigService);
      // ConfigService.getFusionUrl()

      return {
        reload: reload,
        getDataSets: getDataSets,
        getSchemas: getSchemas,
        getSchema: getSchema
      };

      /**
       * Reload the data source.
       */
      function reload() {
        // TODO
      }

      /**
       * Return a list of data sets available.
       */
      function getDataSets() {
        // TODO
        return vm.dataSets;
      }

        /**
         * Return a list of schemas.
         * @returns {Array|*[]}
         */
      function getSchemas() {
        return vm.schemas;
      }

      /**
       * Return a schmea of the specified Fusion collection name.
       * @param {string} dataSet
       */
      function getSchema(dataSetId) {
        // TODO get a list of fields from dataSet
        return _.find(vm.schemas, function(s) {
          return s.dataSetId === dataSetId;
        });
      }
    }
  }
})();
