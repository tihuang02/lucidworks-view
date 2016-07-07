(function () {
  'use strict';

  angular
    .module('lucidworksView.components.dashboard.fieldVisualizer', [
      'lucidworksView.services.d3'
    ])
    .directive('fieldVisualizer', fieldVisualizer);

  function fieldVisualizer(D3Service) {
    'ngInject';
    return {
      restrict: 'E',
      // templateUrl: 'assets/components/dashboard/fieldVisualizer/fieldVisualizer.html',
      scope: {
        fieldName: '=',
        fieldData: '=',
        fieldType: '='   // can be string, number, datetime, or latlon
      },
      link: function link(scope, element, attrs) {
        // TODO use NVD3 to create the chart instead of pure D3.

        var d3 = D3Service;
        var svg = d3.select(element[0])
          .append('svg')
          .style('width', '100%');

        var margin = parseInt(attrs.margin) || 20,
          barHeight = parseInt(attrs.barHeight) || 20,
          barPadding = parseInt(attrs.barPadding) || 5;

        // Browser onresize event
        window.onresize = function () {
          scope.$apply();
        };

        // TODO parse fieldData according to field type: string or number, create a mapping function()
        scope.data = [];

        if (scope.fieldType === 'string') {
          scope.data = scope.fieldData;
        } else if (scope.fieldType === 'double') {
          angular.forEach(scope.fieldData, function(v) {
            console.log('v =',v);
            this.push({y: v});
          }, scope.data);
        } else {
          scope.data = scope.fieldData;
        }
        console.log('scope.data =', scope.data);


        scope.render = function render(data) {
          // remove all previous items before render
          svg.selectAll('*').remove();

          // If we don't pass any data, return out of the element
          if (!data) return;

          // setup variables
          var width = d3.select(element[0]).node().offsetWidth - margin,
          // calculate the height
            height = scope.data.length * (barHeight + barPadding),
            color = d3.scale.category20(),
            xScale = d3.scale.linear()
              .domain([0, d3.max(data, function (d) {
                return d.y;
              })])
              .range([0, width]);

          // set the height based on the calculations above
          svg.attr('height', height);

          // create the rectangles for the bar chart
          svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('height', barHeight)
            .attr('width', 140)
            .attr('x', Math.round(margin/2))
            .attr('y', function(d,i) {
              return i * (barHeight + barPadding);
            })
            .attr('fill', function(d) { return color(d.y); })
            .transition()
            .duration(1000)
            .attr('width', function(d) {
              return xScale(d.y);
            });

          // add labels to each bar
          svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text(function(d) {
              if (d.x) {
                return d.x;
              } else {
                return d.y;
              }
            })
            .attr('x', function(d, i) {
              return 10;
            })
            .attr('y', function(d, i) {
              return i * (barHeight + barPadding) + 15;
            });

          // TODO add field name at the bottom of the chart

        };

        // Watch for resize event
        scope.$watch(function () {
          return angular.element(window)[0].innerWidth;
        }, function () {
          scope.render(scope.data);
        });
      }
    };
  }
})();
