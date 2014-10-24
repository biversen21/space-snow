var Building = Backbone.Model.extend({

  url: '/player',

  addToBoard: function(){
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
      })
    })

    $('body').on('mouseup', function(e){
      $(ghost).remove();
    })

    round = function(position){
      var increment = 50;
      return Math.round(position/increment)*increment;
    }
  },


});