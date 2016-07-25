/**
 * Chart Picker is used for selecting a chart to be added to the dashboard.
 */
(function () {
  'use strict';

  angular
    .module('lucidworksView.components.dashboard.chartPicker', [
      'lucidworksView.services.nvd3'
    ])
    .directive('chartPicker', chartPicker);

  function chartPicker(Nvd3Service) {
    'ngInject';
    return {
      restrict: 'AE',
      templateUrl: 'assets/components/dashboard/chartPicker/chartPicker.html',
      scope: {
        widgets: '='
      },
      link: function link(scope) {
        scope.addDiscreteBarChart = addDiscreteBarChart;
        scope.addMultiBarHorizontalChart = addMultiBarHorizontalChart;
        scope.addPieChart = addPieChart;
        scope.addLineChart = addLineChart;
        scope.addStackedAreaChart = addStackedAreaChart;
        scope.addScatterChart = addScatterChart;

        // Return a widget with default settings
        function getBaseWidget() {
          return {
            sizeY: 2,
            sizeX: 3,
            name: 'New Chart',
            chart: {
              options: null,
              data: null,
              api: {}
            }
          };
        }

        function addDiscreteBarChart() {
          var widget = getBaseWidget();
          widget.chart.options = Nvd3Service.discreteBarChartOptions();
          widget.chart.data = Nvd3Service.discreteBarChartData();

          console.log('scope = ', scope);
          scope.widgets.push(widget);
        }

        function addMultiBarHorizontalChart() {
          var widget = getBaseWidget();
          widget.chart.options = Nvd3Service.multiBarHorizontalChartOptions();
          widget.chart.data = Nvd3Service.multiBarHorizontalChartData();
          widget.sizeY = 4;

          scope.widgets.push(widget);
        }

        function addPieChart() {
          var widget = getBaseWidget();
          widget.chart.options = Nvd3Service.pieChartOptions();
          widget.chart.data = Nvd3Service.pieChartData();
          widget.sizeY = 3;

          scope.widgets.push(widget);
        }

        function addLineChart() {
          var widget = getBaseWidget();
          widget.chart.options = Nvd3Service.lineChartOptions();
          widget.chart.data = Nvd3Service.lineChartData();
          widget.sizeY = 4;
          widget.sizeX = 4;

          scope.widgets.push(widget);
        }

        function addStackedAreaChart() {
          var widget = getBaseWidget();
          widget.chart.options = Nvd3Service.stackedAreaChartOptions();
          widget.chart.data = Nvd3Service.stackedAreaChartData();
          widget.sizeY = 4;
          widget.sizeX = 4;

          scope.widgets.push(widget);
        }

        function addScatterChart() {
          var widget = getBaseWidget();
          widget.chart.options = Nvd3Service.scatterChartOptions();
          widget.chart.data = Nvd3Service.scatterChartData();
          widget.sizeY = 4;
          widget.sizeX = 4;

          scope.widgets.push(widget);
        }
      }
    };
  }
})();
