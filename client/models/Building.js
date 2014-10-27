var Building = Backbone.Model.extend({

  url: '/player',

  addToBoard: function(){
    this.trigger('addToBoard', this);
  },

  drag: function(event, that){

    var position;

    // clone building div
    var ghost = that.$el.children(':first').children(':first').clone(true);

    // superimpose transparent image
    $(ghost)
      .removeClass('example')
      .addClass('ghost')
      .appendTo('body')
      .css({
        'top': event.pageY - 50,
        'left': event.pageX - 50
      });

    $('body').on('mousemove', function(e){

      //find the bottom of the background div and the base of the ghost div, determine relative position of the latter
      var baseOfBackground = parseInt($('.background').css('height')) + 5;
      var baseOfGhost = parseInt($(ghost).offset().top) + parseInt($(ghost).css('height'));

      if (baseOfBackground >= baseOfGhost) {
        position = 'above';
        $(ghost).css({
          //so janky.
          'top': round(e.pageY - 50),
          'left': round(e.pageX - 50)
        });
      } else {
        position = 'below';
        $(ghost).css({
          'top': e.pageY - 50,
          'left': e.pageX - 50
        });
      }
    });

    // on mouseup, remove ghost and add model to collection if desired
    $('body').one('mouseup', function(e){

      if (position === 'above') {
        $(ghost).remove();
        this.addToBoard();
      } else {
        $(ghost).remove();
      }

    }.bind(this));

    // rounds the given position to the nearest increment given. This allows for the "snap" part of the drag and snap.
    round = function(position){
      var increment = 50;
      return Math.round(position/increment)*increment;
    };
  }

});