var PlayerScoreView = Backbone.View.extend({

  tagName: 'div',
  
  initialize: function(){
    this.render();
  },
  
  render: function(){
    $('.statistics').append('<span>Name: ' + this.model.attributes.name + '<span><br>');
    
    // loops player score and renders resources
    for (var resource in this.model.attributes.resources) {
      $('.statistics').append('<span>' + resource + ': ' + this.model.attributes.resources[resource] + '<span><br>');
    }
  }
	
});