var PlayerBuildingsView = Backbone.View.extend({
	tagName: 'div',
	
	initialize: function(){
		this.render();
		this.listenTo(this.collection, 'add', this.render);
	},
	
	render: function(){
		this.$el.children().detach();
		$('.dump').empty();

      $('.dump').append(
		  this.collection.map(function(building){
		  	return new PlayerBuildingsEntryView({model: building}).render();
		  })
		);
	}
});