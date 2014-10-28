var BuildingEntryView = Backbone.View.extend({
  tagName: 'span',

  template: _.template(
    '<div class="container"><div class="example" id ="<%= name %>"></div><ul><li><b><% if(name==="hydro"){%>hydrofarm<%}else if(name==="science"){%>science lab<%} else {%><%= name %><%}%> </b></li><li>Cost: <%= cost %></li><li>Maintenance: <%= waterConsumed%> water</li><li>Production: <%= waterProduced === 0 ? mineralsProduced : waterProduced %> <%= waterProduced === 0 ? "minerals" : "water" %></li></ul></div>'),

  events: {

    'mousedown': function(event){
      var clickEvent = event;
      var that = this;
      this.model.drag(clickEvent, that);
    },
    // currently useless
    'mouseover': function(event){
      var id = this.$el.children(':first').children(':first').attr('id');
    }
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
	}
});