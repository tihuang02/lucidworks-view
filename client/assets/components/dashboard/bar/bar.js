(function () {
  'use strict';

  angular
    .module('lucidworksView.components.dashboard.bar', ['lucidworksView.services.d3'])
    .directive('barChart', barChart);

  function barChart(D3Service) {
    'ngInject';

    return {
      restrict: 'E',
      // templateUrl: 'assets/components/dashboard/bar/bar.html',
      scope: {
        chartData: '=',
        chartConfig: '='
      },
      link: function link(scope, element, attrs) {
        var svg = D3Service.select(element[0])
          .append('svg')
          .style('width', '100%');

        var margin = parseInt(attrs.margin) || 20,
            barHeight = parseInt(attrs.barHeight) || 20,
            barPadding = parseInt(attrs.barPadding) || 5;


        // Browser onresize event
        window.onresize = function () {
          scope.$apply();
        }

        // TODO hard-coded data
        scope.data = [
          {name: 'Greg', score: 98},
          {name: 'Ari', score: 96},
          {name: 'Q', score: 75},
          {name: 'Loser', score: 48}
        ];

        

        scope.render = function render(data) {
          // remove all previous items before render
          svg.selectAll('*').remove();

          // If we don't pass any data, return out of the element
          if (!data) return;

          // setup variables
          var width = D3Service.select(element[0]).node().offsetWidth - margin,
            // calculate the height
            height = scope.data.length * (barHeight + barPadding),
            color = D3Service.scale.category20(),
            xScale = D3Service.scale.linear()
              .domain([0, D3Service.max(data, function (d) {
                return d.score;
              })])
              .range([0, width]);

          // set the height based on the calculations above
          svg.attr('height', height);

          // create the rectangles for the bar chart
          svg.selectAll('rect')
            .data(data).enter()
            .append('rect')
            .attr('height', barHeight)
            .attr('width', 140)
            .attr('x', Math.round(margin/2))
            .attr('y', function(d,i) {
              return i * (barHeight + barPadding);
            })
            .attr('fill', function(d) { return color(d.score); })
            .transition()
              .duration(1000)
              .attr('width', function(d) {
                return xScale(d.score);
              });
        }

        // Watch for resize event
        scope.$watch(function () {
          return angular.element(window)[0].innerWidth;
        }, function () {
          scope.render(scope.data);
        });

        // scope.$watch('panelData', function(newVal, oldVal) {
        //   console.log('panelData has changed! newVal =', newVal);
        //   // TODO redraw the chart
        //
        // }, true);
      }
    };
  }
})();
