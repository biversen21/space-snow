var PlayerBuildingsView = Backbone.View.extend({
	tagName: 'div',
	
	initialize: function(){
		this.render();
    
    // calls render function when new item added to collection
		this.listenTo(this.collection, 'add', this.render);
	},
	
	render: function(){
    
    // clear board before rendering to prevent duplicates
		this.$el.children().detach();
		$('.dump').empty();

    $('.dump').append(
		  this.collection.map(function(building){
		  	return new PlayerBuildingsEntryView({model: building}).render();
		  });
		);
	}
});