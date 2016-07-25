(function() {
  'use strict';

  angular
    .module('lucidworksView.services.dashboard', [

    ])
    .factory('DashboardService', DashboardService);

  function DashboardService($log, _) {
    'ngInject';
    var vm = this;
    vm.dashboards = [];
    // vm.dashboards = [
    //   {
    //     id: 'dash_id',
    //     widgets: []
    //   }
    // ]
    vm.currentDashboard;

    return {
      isExist: isExist,
      createDashboard: createDashboard,
      getDashboard: getDashboard,
      getWidgets: getWidgets,
      removeWidget: removeWidget,
      setCurrentDashboard: setCurrentDashboard
    };

    function isExist(id) {
      if (_.find(vm.dashboards, {'id': id})) {
        // $log.info('Dashboard already existed: ' + id);
        return true;
      }
      return false;
    }

    function createDashboard(id) {
      if (id && !isExist(id)) {
        vm.dashboards.push({
          id: id,
          widgets: []
        });
        $log.info('Created a dashboard with id = ' + id);

        return true;
      } else if (isExist(id)) {
        $log.info('Dashboard already existed with id = ' + id);
        return false;
      }
      $log.info('Failed to create a dashboard with id = ' + id);
      return false;
    }

    function getDashboard(id) {
      return _.find(vm.dashboards, {'id': id});
    }

    function getWidgets(id) {
      if (isExist(id)) {
        return getDashboard(id).widgets;
      }
      return null;
    }

    // function removeWidget(dashId, widgetIndex) {
    //   if (isExist(dashId) && getDashboard(dashId).widgets.length > widgetIndex) {
    //     getDashboard(dashId).widgets.splice(widgetIndex, 1);
    //     return true;
    //   }
    //
    //   return false;
    // }
    function removeWidget(widget, dashId) {
      if (isExist(dashId)) {
        var widgets = getWidgets(dashId);
        var widgetIndex = widgets.indexOf(widget)
        if (widgetIndex > -1) {
          widgets.splice(widgetIndex, 1);
          return true;
        }
      }
      return false;
    }

    function setCurrentDashboard(id) {
      // TODO

    }
  }
})();
