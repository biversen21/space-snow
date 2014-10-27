var BarChartView = ChartView.extend({
  draw: function() {
    console.log(this.el);
    var scale = d3.scale.linear()
      .domain([0, d3.max(this.data)])
      .range([0, this.dimensions.width]);

    d3.select('.statistics')
      .attr('class', 'bar-chart')
        .selectAll('div')
          .data(this.data)
        .enter().append('div')
          .style('width', function(d) { return scale(d) + 'px'; })
          .style('height', (this.dimensions.wrapperHeight / 5) + 'px')
          .html(function(d) { return '<span>' + d + '</span>'; });
  }
});