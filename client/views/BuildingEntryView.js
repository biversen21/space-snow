var BuildingEntryView = Backbone.View.extend({
	tagName: 'span',
	
  template: _.template(' <div class="building" id ="<%= name %>"></div>'),
	
	events: {
		'click': function(){
			var that = this;
			console.log('click');
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
    // return $('.build').append(this.template(this.model.attributes));
	}
});