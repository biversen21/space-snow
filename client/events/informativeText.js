$(document).ready(function(){

  $('.refining').on('click', function(){
    $('.refineExp').toggle();
  })

  $('.constructing').on('click', function(){
    console.log('okokokok')
    $('.buildExp').toggle();
  })

  // toggle informative building text. Buggy as hell.
  $('#hydroinfo').on('click', function(){
    display($('#hydroExp'));
  })

  $('#mineinfo').on('click', function(){
    display($('#mineExp'));
  })

  $('#refineryinfo').on('click', function(){
    display($('#refineryExp'));
  })

  $('#scienceinfo').on('click', function(){
    display($('#scienceExp'));
  })


  var display = function(element){
    $('.infocontainer').toggle()
    element.toggle();
  }
})