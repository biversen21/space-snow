var Building = Backbone.Model.extend({

  // current: undefined,

  url: '/player',

  addToBoard: function(){
  	this.trigger('addToBoard', this);
  },

  drag: function(clickEvent, that){
    that.clone(true).addClass('ghost').appendTo('body');
  }

});