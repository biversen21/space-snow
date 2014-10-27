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
    $('.statistics').empty();
    
    // builds html based on player attributes
    var playerStats = "<h3>Statistics</h3>";
    playerStats += '<span class="playerStats">Name: ' + this.model.attributes.name + '<span><br>';
    for (var resource in this.model.attributes.resources) {
      playerStats += '<span>' + resource + ': ' + this.model.attributes[resource] + '<span><br>';
    }
    
    // checks if player has resources and refinery to add refine option
    if (this.model.checkRefinery()) {
      playerStats += '<button class="refine">Refine</button>';      
    }
    
    return this.$el.append(playerStats);
  }
	
});