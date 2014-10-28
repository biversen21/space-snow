var PlayerScoreView = Backbone.View.extend({

  el: '.statistics',

  tagName: 'div',

  initialize: function(){
    this.render();
  },

  events: {
    'click .refine': function(){
      this.model.refine();
    }
  },

  render: function(){
    $('.buy').empty();
    $('.statistics').empty();

    var playerStats = '<h3>Statistics</h3>';
    playerStats += '<span class="playerStats">Name: ' + this.model.attributes.name + '<span><br>';
    
    // create and populate data array of resource values
    var data = [];
    var theResource = [];
    for (var resource in this.model.attributes.resources) {
      theResource.push(resource)
      data.push(this.model.attributes[resource]);
    }

    // checks if player has resources and refinery to add refine option
    if (this.model.checkRefinery()) {
      playerStats += '<button class="refine">Refine</button>';      
    }

    // creates bar chart for each resource value in data array
    d3.select('.buy')
    .selectAll('div')
    .data(data)
    .enter().append('div')
    .style('width', function(d) { return d + 'px'; })
    .style('background-color', 'green')
    .style('border', '2px solid black')
    .style('margin-bottom', '10px')
    .text(function(d, i) { return theResource[i] + ': ' + d; });

    return this.$el.append(playerStats);
  }
});