var BuildingEntryView = Backbone.View.extend({
	tagName: 'div',
	
	template: _.template('<span>Name: <%= name %> | Time to Build: <%= time %> | Resources: <%= resourcePerMinute %></span>'),
	
	events: {
		'click': function(){
			var that = this;
			$('body').append('<span class="timetest">You are building a ' + this.model.attributes.name + '<span>');
			(function(){
				setTimeout(function(){
					that.model.addToBoard();
					$('.timetest').remove();
				}, that.model.attributes.time);
			})();
		}
	},
	
	render: function(){
		return this.$el.html(this.template(this.model.attributes));
	}
});