var PlayerScoreView = Backbone.View.extend({

  el: '.statistics',

  tagName: 'div',
  
  initialize: function(){
    this.render();
  },
  
  events: {
    "click .refine": function(){
      console.log('fired');
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
    playerStats += '<span class="refine">Refine</span>';
    return this.$el.append(playerStats);
    
    // $('.playerStats').remove();
    // $('.statistics').append('<span class="playerStats">Name: ' + this.model.attributes.name + '<span><br>');
    
    // loops player score and renders resources
    // for (var resource in this.model.attributes) {
    //   $('.playerStats').append('<span>' + resource + ': ' + this.model.attributes[resource] + '<span><br>');
    // }
    // $('.playerStats').append('<button class="refine">Refine</button>');
  }
	
});