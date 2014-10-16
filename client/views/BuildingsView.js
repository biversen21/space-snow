var BuildingsView = Backbone.View.extend({
	tagName: 'div',	
	
	initialize: function(){
		this.render();
		this.listenTo(this.collection, 'add', this.render());
	},
	
	render: function(){
		this.$el.children().detach();
		
		this.$el.html('<span>Test Building View</span>').append(
		  this.collection.map(function(building){
		  	return new BuildingEntryView({model: building}).render();
		  })
		);
		
	}
});