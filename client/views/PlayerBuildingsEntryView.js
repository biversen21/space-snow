var PlayerBuildingsEntryView = Backbone.View.extend({
	
	tagName: 'div',
	
	template: _.template('<span>Test Player Buildings Entry View</span>'),
	
  render: function(){
  	return this.$el.html(this.template(this.model.attributes));
  }
	
});