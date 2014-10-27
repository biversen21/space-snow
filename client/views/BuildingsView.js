var BuildingsView = Backbone.View.extend({

  el: '.build',

  tagName: 'div',

  initialize: function(){
    this.render();
  },

  render: function(){
    this.$el.children().detach();
    this.$el.empty();
    this.$el.append(
      this.collection.map(function(building){
        return new BuildingEntryView({model: building}).render();
      })
    );

  }
});