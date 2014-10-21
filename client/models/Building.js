var Building = Backbone.Model.extend({
  
  url: '/player',

  addToBoard: function(){
  	this.trigger('addToBoard', this);
  }
});