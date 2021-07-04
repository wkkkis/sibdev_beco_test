let array = [
  'userid', 'name', 'nick',
  'email', 'city', 'phone',
  'social', 'rating', 'register'
];

$('.options-users').click(function () {
  let data = $(this).attr('id');
  if ($('.' + data).hasClass('activesort')) {
    if (data != 'userid') {
      toggleSortOptions(data);
      $('.' + data).addClass('disabled');
      $('.' + data).removeClass('activesort');
    } else {
      $('.' + data).removeClass('activesort');
      $('.userid-option').addClass('option-sort-disabled');
    }
  } else {
    $('.' + data).removeClass('disabled');
    $('.' + data).addClass('activesort');
    toggleSortOptions(data);
    disabled(data);
  }
});

var toggleSortOptions = (data) => {
  for (let i in array) {
    if (array[i] === data) {
      if ($('.' + array[i] + '-option').hasClass('option-sort-disabled')) {
        $('.' + array[i] + '-option').removeClass('option-sort-disabled');
      } else {
        $('.' + array[i] + '-option').addClass('option-sort-disabled');
      }
    } else {
      $('.' + array[i] + '-option').addClass('option-sort-disabled');
    }
  }
};

var disabled = (data) => {
  for (let i in array) {
    if (array[i] === data) {
      $('.' + array[i]).addClass('activesort');
    } else if (array[i] != 'userid') {
      $('.' + array[i]).addClass('disabled');
      $('.' + array[i]).removeClass('activesort');
      if (data === 'nick') {
        $('.nick-option').removeClass('option-sort-disabled');
      }
    } else {
      $('.' + array[i]).removeClass('activesort');
    }
  }
};

$('input[type=\'checkbox\']').change(function () {
  let check = ($('.user-checkbox').children('input[type="checkbox"]').filter(':checked').length);
  if (check === 0) {
    $('.tool-btn').addClass('disabled');
    $('.tool-btn').prop('disabled', true);
  } else {
    $('.tool-btn').removeClass('disabled');
    $('.tool-btn').prop('disabled', false);
  }
});

$(document).ready(function () {
  $('#selectall').click(function () {
    if ($(this).is(':checked')) {
      $('.all-checkbox').removeClass('disabled');
    } else {
      $('.all-checkbox').addClass('disabled');
    }
    $('.selectedId').prop('checked', this.checked);
  });

  $('.selectedId').change(function () {
    let check = ($('.selectedId').filter(':checked').length == $('.selectedId').length);
    $('#selectall').prop('checked', check);
    if (!check) {
      $('.all-checkbox').addClass('disabled');
    } else {
      $('.all-checkbox').removeClass('disabled');
    }
  });
});

//for modal
//export-excel-modal
$('#export, .modal-toggle').on('click', function (e) {
  e.preventDefault();
  let modal_time = $('.modal-time-about');
  $('.modal-export').toggleClass('is-visible');
  $('.modal-description').html(
    `Export of the table to Excel will be compiled by the selected fields,<br>
     if no field or user is selected, the table will be exported in full`
  );
  modal_time.css('color', 'black');
  modal_time.html('Export will take a short period of time');
  $('.modal-footer').show();
  $('.modal-loading').css('display', 'none');
  $('.modal-download').css('display', 'none');
});

$('#apply_export').click(function (e) {
  e.preventDefault();
  $('.modal-description').html('Don’t close the page');
  $('.modal-time-about').css('color', '#888888');
  $('.modal-footer').hide();
  $('.modal-loading').show();
  setTimeout(() => {
    $('.modal-description').html('File ready, click button below, to download it');
    $('.modal-time-about').html('Users_20052020_2359.xlsx');
    $('.modal-loading').css('display', 'none');
    $('.modal-download').show();
  }, 2000);
});

$('#block, .modal-toggle-block').on('click', function () {
  $('.modal-block').toggleClass('is-visible');
  $('.modal-description').html(
    `Are you sure you want to block the selected users? These users will<br>
       not be able to use the platform until they are unblocked
    `);
});

$('.reset-btn').click(function () {
  let block_inputs = $(this).children('button').attr('id').split('_');
  let button_id = $('.' + block_inputs[1] + '-option');
  button_id.find('*').val('');
  button_id.find('*').prop('checked', false);
  $('.options-checkbox').find('*').css('color', "#888888")
  $('.svg-clear-toggle').hide('');
});

$('.complete-checkbox, .partial-checkbox').click(function () {
  let active_input = $(this).find('input');
  let bool_check = active_input.prop('checked');
  let id_check = active_input.attr('id');
  if (bool_check) {
    $('.' + id_check).css('color', 'black');
  } else {
    $('.' + id_check).css('color', '#888888');
  }
});
