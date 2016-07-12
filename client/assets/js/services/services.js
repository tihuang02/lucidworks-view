// Module initialization
angular.module('lucidworksView.services', [
  'lucidworksView.services.apiBase',
  'lucidworksView.services.auth',
  'lucidworksView.services.authInterceptor',
  'lucidworksView.services.config',
  'lucidworksView.services.landingPage',
  'lucidworksView.services.query',
  'lucidworksView.services.queryData',
  'lucidworksView.services.signals',
  'lucidworksView.services.url',
  'lucidworksView.services.localParams',
  'lucidworksView.services.clientStats',

  'lucidworksView.services.d3',
  'lucidworksView.services.dashboard.dataset',
  'lucidworksView.services.dashboard.result',
  'lucidworksView.services.gridster',
  'lucidworksView.services.nvd3'
]);
