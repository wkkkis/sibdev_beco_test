$('#btn').on("click keypress", function () {
  if ($('#email').val() === '') {
    $('#email-error').html('email is required');
  } else if ($('#email').val().indexOf("@") >= 1) {
    $('#email-error').html('');
    $('.password').show('');
    $('.description').show('');
    $('.back').show('');
    $('.login').slideToggle('slow');
  } else {
    $('#email-error').html('enter right email');
  }
});

$("#email").on("keyup", function() {
  if($(this).val().length > 0){
    $('#email-error').html('');
  }else{
    $('#email-error').html('email is required');
  }
})

$(document).ready(function () {
  $(function () {
    $('form[name="registration"]').validate({
      rules: {
        password: {
          required: true
        }
      },
      messages: {
        password: {
          required: 'password is required',
        }
      },
      submitHandler: function (form) {
        form.submit();
      }
    });
  });
});

$('#back_to_login').click(function () {
  $('.password').hide('');
  $('.description').hide('');
  $('.back').hide('');
  $('.login').slideToggle('slow');
});

$('#toggle-svg').click(function () {
  if ($('input[name="password"]').attr('type') == 'password') {
    $('#view').css('display', 'block');
    $('#noview').css('display', 'none');
    $('input[name="password"]').attr('type', 'text');
  } else {
    $('#noview').css('display', 'block');
    $('#view').css('display', 'none');
    $('input[name="password"]').attr('type', 'password');
  }
  return false;
});
