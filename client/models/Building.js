var Building = Backbone.Model.extend({

  addToBoard: function(){
  	this.trigger('addToBoard', this);
  }
});