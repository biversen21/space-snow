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
    var playerStats = "<h3>Statistics</h3>";
    
    playerStats += '<span class="playerStats">Name: ' + this.model.attributes.name + '<span><br>';
    for (var resource in this.model.attributes) {
      playerStats += '<span>' + resource + ': ' + this.model.attributes[resource] + '<span><br>';
    }
    if (this.model.attributes['minerals'] > 50) {
      playerStats += '<button class="refine">Refine</button>';      
    }
    return this.$el.append(playerStats);
  }
	
});