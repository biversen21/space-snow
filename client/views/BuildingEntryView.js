var BuildingEntryView = Backbone.View.extend({
  tagName: 'span',

  template: _.template(' <div class="example" id ="<%= name %>"></div>'),

  events: {

    'mousedown': function(event){
      var clickEvent = event;
      that = this;
      this.model.drag(clickEvent, that);
    }
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
	}
});