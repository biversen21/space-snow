var BuildingEntryView = Backbone.View.extend({
	tagName: 'div',
	
	template: _.template('<span>Test</span>'),
	
	events: {
		'click': function(){
			this.model.addToBoard();
		}
	},
	
	render: function(){
		return this.$el.html(this.template(this.model.attributes));
	}
});