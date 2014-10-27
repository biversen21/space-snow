var DonutChartView = ChartView.extend({
  draw: function() {
    var color = d3.scale.category10();
    var pie = d3.layout.pie().sort(null);

    var arc = d3.svg.arc()
      .innerRadius(radius - 100)
      .outerRadius(radius - 75);
    
    var svg = d3.select("body")
      .append("svg")
      .attr("class", "donut-chart")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var path = svg.selectAll("path")
        .data(pie(this.data))
        .enter().append("path")
        .attr("fill", function(d, i) { return color(i); })
        .attr("d", arc);
  }
});