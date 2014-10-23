var BuildingsView = Backbone.View.extend({
  tagName: 'div',
	
	initialize: function(){
		this.render();
	},
	
	render: function(){
		this.$el.children().detach();
		$('.build').empty();
    $('.build').append(
		  this.collection.map(function(building){
		  	return new BuildingEntryView({model: building}).render();
		  })
		);
		
	}
});