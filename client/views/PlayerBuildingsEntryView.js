var PlayerBuildingsEntryView = Backbone.View.extend({
	
	tagName: 'div',
	
	template: _.template('<span>You just added <%= name %>! Please wait <%= time %>, and then you will generate <%= resourcePerMinute %></span>'),
	
  render: function(){
		return this.$el.html(this.template(this.model.attributes));
  }
	
});