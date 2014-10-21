var BuildingEntryView = Backbone.View.extend({
	tagName: 'span',
	
  template: _.template(' <div class="example" id ="<%= name %>"></div>'),
	
	events: {
		'click': function(){
      
      this.model.addToBoard();
      
      // var that = this;
      			
      // (function(){
      //   setTimeout(function(){
      //     that.model.addToBoard();
      //   }, that.model.attributes.time);
      // })();
		}
	},
	
	render: function(){
    return this.$el.html(this.template(this.model.attributes));
    // return $('.build').append(this.template(this.model.attributes));
	}
});