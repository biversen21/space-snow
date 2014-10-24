var Building = Backbone.Model.extend({

  url: '/player',

  addToBoard: function(){
    console.log('adding to board in model');
  	this.trigger('addToBoard', this);
  },

  drag: function(event, that){

    // clone div
    var ghost = that.$el.children(':first').clone(true);

    // superimpose transparent image
    $(ghost)
      .removeClass('example')
      .addClass('ghost')
      .appendTo('body')
      .css({
        'top': event.pageY - 50,
        'left': event.pageX - 50
      });

    // I have no idea if this is a good place to put this
    $('body').on('mousemove', function(e){
      $(ghost).css({
        'top': round(e.pageY - 50),
        'left': round(e.pageX - 50)
      });
    });

    // on mouseup, remove ghost and add model to collection
    $('body').on('mouseup', function(e){
      $(ghost).remove();
      this.addToBoard();
    }.bind(this));

    round = function(position){
      var increment = 50;
      return Math.round(position/increment)*increment;
    };
  },


});