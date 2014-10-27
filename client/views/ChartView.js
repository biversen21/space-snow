var ChartView = Backbone.View.extend({
  constructor: function(options) {
    this.default_options = {
      base_height: 320,
      breakpoints: {
        // width->height multiplier
        "768": 0.9,
        "420": 0.7
      },
      margin: {
        top: 20,
        right: 30,
        bottom: 30,
        left: 50
      },
      type: ""
    };

    this.options = $.extend(true, this.default_options, options);

    var breakpoints = _.pairs(this.options.breakpoints);
    this.options.breakpoints = _.sortBy(breakpoints, function(item) {
      return Number(item[0]);
    });

    // Fallback if d3 is unavailable, add some formatters otherwise.
    if (!this.d3) {
      this.draw = this.fallback_draw;
    }
    else {
      this.formatNumber = d3.format(".lf");
      this.formatCommas = d3.format(",");
      this.formatPercent = d3.format("%");
    }
    Backbone.View.apply(this, arguments);
  },
  
  initialize: function(options) {
    // Wrap chart
    this.$el.wrap($('<div class="chart-wrapper">'));
    this.$chart_container = this.$el.parent();
    this.chart_container = this.$chart_container.get(0);
    this.get_dimensions();

    if (this.collection)
      this.collection.on("sync", _.bind(this.render, this));
    else if (this.options.data)
      this.data = this.options.data;

    $(window).on("resize", _.debounce(_.bind(this.render, this), 100));
  },
  
  get_dimensions: function() {
    var window_width = $(window).width();

    var wrapperWidth = this.$chart_container.width();
    var width = wrapperWidth - this.options.margin.left - this.options.margin.right;
    var height = this.options.base_height - this.options.margin.bottom - this.options.margin.top;

    _.every(this.options.breakpoints, _.bind(function(breakpoint) {
      var width = breakpoint[0];
      if (window_width <= width) {
        var multiplier = breakpoint[1];
        height = (height - this.options.margin.bottom - this.options.margin.top) * multiplier;
        return false;
      }
      return true;
    }, this));

    wrapperHeight = height + this.options.margin.top + this.options.margin.bottom;

    //console.log('VIEW OPTIONS', this.options);
    this.$el
      .height(wrapperHeight)
      ;

    this.dimensions = {
      width: width,
      height: height,
      wrapperWidth: wrapperWidth,
      wrapperHeight: wrapperHeight
    };
  },
  // The render function wraps drawing with responsivosity
  render: function() {
    if (this.collection)
      this.data = this.collection.toJSON();
    this.$el.empty();
    this.get_dimensions();
    this.draw();
  },
  
  draw: function() {
    console.log("override ChartView's draw function with your d3 code");
    return this;
  },
  
  fallback_draw: function() {
    this.$el.html(
      '<div class="alert"><p><strong>Warning!</strong> You are using an unsupported browser. ' +
      'Please upgrade to Chrome, Firefox, or Internet Explorer version 9 or higher to view ' +
      'charts on this site.</p></div>');
    return this;
  },
  d3: function() {
    return (typeof d3 !== 'undefined');
  }
});

$(function() {
  // var BarChartView = ChartView.extend({
  //   draw: function() {
  //     var scale = d3.scale.linear()
  //       .domain([0, d3.max(this.data)])
  //       .range([0, this.dimensions.width]);
  //
  //     d3.select(this.el)
  //       .attr('class', 'bar-chart')
  //         .selectAll('div')
  //           .data(this.data)
  //         .enter().append('div')
  //           .style('width', function(d) { return scale(d) + 'px'; })
  //           .style('height', (this.dimensions.wrapperHeight / 5) + 'px')
  //           .html(function(d) { return '<span>' + d + '</span>'; });
  //   }
  // });
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
  })
  // var chart_one_data = [3, 8, 12, 7, 17];
  // var chart_two_data = [4, 10, 13, 14, 7];
    
  // var chart_one = new BarChartView({
  //   el: '#one',
  //   data: chart_one_data,
  //   base_height: 220
  // }).render();

  // var chart_two = new BarChartView({
  //   el: '#two',
  //   data: chart_two_data,
  //   base_height: 220
  // }).render();
    
});