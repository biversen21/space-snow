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

    // builds html based on player attributes
    var playerStats = '<h3>Statistics</h3>';
    playerStats += '<span class="playerStats">Name: ' + this.model.attributes.name + '<span><br>';
    var data = [];
    for (var resource in this.model.attributes.resources) {
      data.push(this.model.attributes[resource]);
    }

    // checks if player has resources and refinery to add refine option
    if (this.model.checkRefinery()) {
      playerStats += '<button class="refine">Refine</button>';      
    }

    d3.select('.buy')
    .selectAll('div')
    .data(data)
    .enter().append('div')
    .style('width', function(d) { return d + 'px'; })
    .style('background-color', 'green')
    .style('border', '2px solid black')
    .style('margin-bottom', '10px')
    .text(function(d) { return d; });

    return this.$el.append(playerStats);
  }
});