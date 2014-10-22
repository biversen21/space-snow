var PlayerBuildingsEntryView = Backbone.View.extend({
	
	tagName: 'span',
	
	template: _.template(' <div class="onScreen" id="<%= name %>"></div>'),
	
  render: function(){
		return this.$el.html(this.template(this.model.attributes));
  }
	
});