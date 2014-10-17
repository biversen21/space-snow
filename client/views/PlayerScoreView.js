var PlayerScoreView = Backbone.View.extend({

  tagName: 'div',
  
  initialize: function(){
    this.render();
  },
  
  render: function(){
    $('.statistics').append('<span>Name: ' + this.model.attributes.name + '<span>');
  }
	
});