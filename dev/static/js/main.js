$('.logout-notification').click(function (){
  $('.log-out').fadeToggle('')
})

$('.input-with-clear').on('click', function () {
  let id_input = $(this).children('input');
  let active_input = $(id_input).attr('id');
  id_input.on('keyup', function () {
    if ($('#' + active_input).val() === '') {
      $('.' + active_input).children('svg').hide('');
    } else {
      $('.' + active_input).children('svg').show('');
    }
  });
  $('.' + active_input).children('svg').click(function () {
    $('#' + active_input).val('');
    $('.' + active_input).children('svg').hide('');
  });
});
