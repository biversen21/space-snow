var PlayerScoreView = Backbone.View.extend({

  tagName: 'div',
  
  initialize: function(){
    this.render();
  },
  
  render: function(){
    $('.playerStats').remove();
    $('.statistics').append('<span class="playerStats">Name: ' + this.model.attributes.name + '<span><br>');
    
    // loops player score and renders resources
    for (var resource in this.model.attributes) {
      $('.playerStats').append('<span>' + resource + ': ' + this.model.attributes[resource] + '<span><br>');
    }
  }
	
});