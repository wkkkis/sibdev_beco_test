$('.logout-notification').click(function () {
  $('.log-out').fadeToggle('');
});

$(document).ready(function () {
  $('.input-with-clear').on('click', function () {
    let id_input = $(this).children('input');
    let active_input = $(id_input).attr('id');
    id_input.on('keyup', function () {
      if ($('#' + active_input).val() === '') {
        $(`.${active_input}`).children('svg').fadeOut('');
      } else {
        $(`.${active_input}`).children('svg').fadeIn('');
      }
    });
    $(`.${active_input}`).children('svg').click(function () {
      $(`#${active_input}`).val('');
      $(`.${active_input}`).children('svg').fadeOut('');
    });
  });

  $('.reset-btn').click(function () {
    let block_inputs = $(this).children('button').attr('id').split('_');
    let option_id = $(`.${block_inputs[1]}-option`);
    option_id.find('*').val('');
    option_id.find('*').prop('checked', false);
    let text = option_id.find('.selectDropDown').children('.select');
    console.log(text);
    $('.options-checkbox').find('*').css('color', '#888888');
    $('.svg-clear-toggle').fadeOut('');
  });
});

$(document).ready(function () {
  $('.export, .modal-toggle').on('click', function (e) {
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

  $('.block, .modal-toggle-block').on('click', function () {
    $('.modal-block').toggleClass('is-visible');
    $('.modal-description').html(
      `Are you sure you want to block the selected users? These users will<br>
       not be able to use the platform until they are unblocked
    `);
  });
});

$(document).ready(function () {
  $('.complete-checkbox, .partial-checkbox').click(function () {
    let active_input = $(this).find('input');
    let bool_check = active_input.prop('checked');
    let id_check = active_input.attr('id');
    if (bool_check) {
      $(`.${id_check}`).css('color', 'black');
    } else {
      $(`.${id_check}`).css('color', '#888888');
    }
  });

  var chek_has_parent = (wrap) => {
    return ($(`.${wrap}`).children('input[type="checkbox"]').filter(':checked').length);
  };

  $('input[type=\'checkbox\']').change(function () {
    let announcement = chek_has_parent('user-marketplace-checkbox');
    let marketplace = chek_has_parent('user-checkbox');
    let tool_btn = $('.tool-btn');
    if (announcement === 0 && marketplace === 0) {
      tool_btn.addClass('disabled');
      tool_btn.prop('disabled', true);
    } else {
      tool_btn.removeClass('disabled');
      tool_btn.prop('disabled', false);
    }
  });

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

$(document).ready(function () {
  let array = [
    'userid', 'name', 'nick',
    'email', 'city', 'phone',
    'social', 'rating', 'register',
    'status', 'price', 'category',
    'title', 'photo', 'id'
  ];

  $('.options-users').click(function () {
    let data = $(this).attr('id');
    if ($(`.${data}`).hasClass('activesort')) {
      if (data != 'userid' && data != 'id') {
        toggleSortOptions(data);
        $(`.${data}`).addClass('disabled');
        $(`.${data}`).removeClass('activesort');
      } else {
        $('.' + data).removeClass('activesort');
        $(`.${data}-option`).addClass('option-sort-disabled');
      }
    } else {
      $(`.${data}`).removeClass('disabled');
      $(`.${data}`).addClass('activesort');
      toggleSortOptions(data);
      disabled(data);
    }
  });

  let toggleSortOptions = (data) => {
    for (let i in array) {
      if (array[i] === data) {
        if ($(`.${array[i]}-option`).hasClass('option-sort-disabled')) {
          $(`.${array[i]}-option`).removeClass('option-sort-disabled');
        } else {
          $(`.${array[i]}-option`).addClass('option-sort-disabled');
        }
      } else {
        $(`.${array[i]}-option`).addClass('option-sort-disabled');
      }
    }
  };

  let disabled = (data) => {
    for (let i in array) {
      if (array[i] === data) {
        $(`.${array[i]}`).addClass('activesort');
      } else if (array[i] != 'userid' && array[i] != 'id') {
        $(`.${array[i]}`).addClass('disabled');
        $(`.${array[i]}`).removeClass('activesort');
      } else {
        $(`.${array[i]}`).removeClass('activesort');
      }
    }
  };
});

$('.tool-with-close-save-btn').children('button').click(function () {
  let btn_id = $(this).attr('id');
  let parent = $(this).closest('.tool-with-close-save-btn');
  let user_edit_wrap = $('.user-description-with-edit');
  $(`#${btn_id}_cancel`).click(function () {
    parent.removeClass('absolute-for-tool');
    parent.children('div').removeClass('visible-save-close');
    $(`#${btn_id}`).prop('disabled', false);
  });
  $('#edit_cancel').click(function () {
    user_edit_wrap.children('span').show();
    user_edit_wrap.children('input').hide();
    user_edit_wrap.children('.select').addClass('select-visibility');
  });

  parent.toggleClass('absolute-for-tool');
  parent.children('div').toggleClass('visible-save-close');
  $(`#${btn_id}`).prop('disabled', true);

  if (btn_id === 'edit') {
    user_edit_wrap.children('span').hide();
    user_edit_wrap.children('input').show();
    user_edit_wrap.find('.select').removeClass('select-visibility');
  }
});

$(document).ready(function () {
  let indexZ = 10;
  $('.select').click(function () {
    let id = $(`#${$(this).attr('id')}`);
    id.children('.selectDropdown').toggleClass('toggle');
    id.css({ zIndex: indexZ++ });
  });

  $('.selectDropdown').children('.option').click(function () {
    let parent = $(`#${$(this).closest('.select').attr('id')}`);
    let select_text = $(this).children('span')[0].innerText;
    parent.find('.default-select').html(select_text);
  });
});
