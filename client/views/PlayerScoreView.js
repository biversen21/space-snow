var PlayerScoreView = Backbone.View.extend({

  tagName: 'div',
  
  initialize: function(){
    this.render();
  },
  
  events: {
    'updateScore': function(){
      console.log('fired');
      this.render();
    }
  },
  
  render: function(){
    $('.playerStats').remove();
    $('.statistics').append('<span class="playerStats">Name: ' + this.model.attributes.name + '<span><br>');
    
    // loops player score and renders resources
    for (var resource in this.model.attributes.resources) {
      $('.playerStats').append('<span>' + resource + ': ' + this.model.attributes.resources[resource] + '<span><br>');
    }
  }
	
});