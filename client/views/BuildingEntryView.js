var BuildingEntryView = Backbone.View.extend({
  tagName: 'span',

  template: _.template(' <div class="example" id ="<%= name %>"></div>'),

  events: {
    
    'click': function(building){
      this.model.addToBoard(building);
    }
    // 'mousedown': function(event){
    //   var clickEvent = event;
    //   var that = this;
    //   console.log(event);
    //   console.log(this);
    //   this.model.drag(clickEvent, that);
    // },
    //
    // 'mouseup': function(){
    //   console.log('adding to board in view');
    //   this.model.addToBoard();
    // }
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
	}
});