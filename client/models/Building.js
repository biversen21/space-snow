var Building = Backbone.Model.extend({

  addToBoard: function(){
  	this.trigger('addToBoard', this);
  },
	
	startResources: function(){
		var that = this;
		setInterval(function(){
      that.trigger('increaseResources', that);
		}, that.attributes.time);
	}
});