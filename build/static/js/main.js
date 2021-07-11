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
        console.log('deded');
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
    $('.modal-export').toggleClass('is-visible');
    $('.modal-export').find('.modal-close').show()
    $('.description1').show();
    $('.description2').hide();
    $('.description3').hide();
    $('.modal-footer').show();
    $('.modal-download').hide();
    $('.time-about1').show();
    $('.time-about1').css('color', 'black');
    $('.time-about2').hide();
  });

  $('#apply_export').click(function (e) {
    e.preventDefault();
    $('.modal-export').find('.modal-close').hide()
    $('.description1').hide();
    $('.description2').show();
    $('.modal-loading').show();
    $('.modal-footer').hide();
    $('.time-about1').css('color', '#888888');
    setTimeout(() => {
      $('.modal-loading').hide();
      $('.description2').hide();
      $('.description3').show();
      $('.modal-download').show();
      $('.time-about1').hide();
      $('.time-about2').show();
    }, 2000);
  });

  $('.block, .modal-toggle-block').on('click', function () {
    $('.modal-block').toggleClass('is-visible');
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
    let marketplace = chek_has_parent('user-marketplace-checkbox');
    let user = chek_has_parent('user-checkbox');
    let announcement = chek_has_parent('announcement-checkbox');
    let categories = chek_has_parent('categories-checkbox');
    let tool_btn = $('.tool-btn');
    if (announcement === 0 && marketplace === 0 && user === 0 && categories === 0) {
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
    'title', 'photo', 'id', 'author',
    'announcement-id', 'sumb', 'subs', 'created',
    'announcements'
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
    user_edit_wrap.children('.select').hide();
    user_edit_wrap.children('.select').addClass('select-visibility');
  });

  parent.toggleClass('absolute-for-tool');
  parent.children('div').toggleClass('visible-save-close');
  $(`#${btn_id}`).prop('disabled', true);

  if (btn_id === 'edit') {
    user_edit_wrap.children('span').hide();
    user_edit_wrap.children('input').show();
    user_edit_wrap.children('.select').show();
    user_edit_wrap.find('.select').removeClass('select-visibility');
  }
});

$(document).ready(function () {
  $('.select').each(function () {
    const _this = $(this),
      selectOption = _this.find('option'),
      selectOptionLength = selectOption.length,
      selectedOption = selectOption.filter(':selected'),
      duration = 350,
      indexZ = 5;

    _this.hide();
    _this.wrap('<div class="select"></div>');
    $('<div>', {
      class: 'new-select',
      text: _this.children('option:disabled').text(),
    }).insertAfter(_this);

    const selectHead = _this.next('.new-select');
    $('<div>', {
      class: 'new-select__list'
    }).insertAfter(selectHead);

    const selectList = selectHead.next('.new-select__list');
    for (let i = 1; i < selectOptionLength; i++) {
      $('<div>', {
        class: 'new-select__item',
        html: $('<span>', {
          text: selectOption.eq(i).text()
        })
      })
        .attr('data-value', selectOption.eq(i).val())
        .appendTo(selectList);
    }

    const selectItem = selectList.find('.new-select__item');
    selectList.slideUp(0);
    selectHead.on('click', function () {
      if (!$(this).hasClass('on')) {
        $(this).addClass('on');
        selectList.slideDown(duration);

        selectItem.on('click', function () {
          let chooseItem = $(this).data('value');

          $('select').val(chooseItem).attr('selected', 'selected');
          selectHead.text($(this).find('span').text());

          selectList.slideUp(duration);
          selectHead.removeClass('on');
        });

      } else {
        $(this).removeClass('on');
        selectList.slideUp(duration);
      }
    });
  });
});

$(document).ready(function () {
  let toggle_class = $('.modal-announcement');
  $('.announcement').click(function () {
    toggle_class.toggleClass('is-visible');
  });
  $('.modal-toggle-announcement').click(function () {
    toggle_class.removeClass('is-visible');
  });
  $('.tool-seller-btn').click(function () {
    if ($(this).hasClass('edit')) {
      $('.modal-announcement').find('.modal-preview-wrap').fadeToggle('');
      $('.modal-editmode-wrap').fadeToggle('');
      $('.announcement-tools-preview').toggle();
      $('.announcement-tools-editmode ').toggle();
    } else if ($(this).hasClass('cancel-edit')) {
      $('.modal-announcement').find('.modal-preview-wrap').fadeToggle('');
      $('.modal-editmode-wrap').fadeToggle('');
      $('.announcement-tools-preview').toggle();
      $('.announcement-tools-editmode ').toggle();
    }
  });
});


$(document).ready(function () {

  let readURL = function (input) {
    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        $('.profile-pic').attr('src', e.target.result);
        $('.profile-pic').css('visibility', 'visible');
        $('.about-image-close-btn').css('visibility', 'visible');
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  $('.file-upload').on('change', function () {
    readURL(this);
  });

  $('.upload-button').on('click', function () {
    $('.file-upload').click();
  });

  $('.about-image-close-btn').children('svg').on('click', function () {
    $('.file-upload').val('');
    $('.profile-pic').css('visibility', 'hidden');
    $('.about-image-close-btn').css('visibility', 'hidden');
    setTimeout(() => {
      $('.profile-pic').attr('src', '');
    }, 300);
  });

  $('.photos-all').children('input[type="file"]').change(function () {
    let parent = $(`.${$(this).attr('class')}`).parent().attr('class').split(' ');
    let close_btn = $(`.${parent[1]}`).children('.close-photos-btn');
    if (this.files && this.files[0]) {
      let photos_reader = new FileReader();

      for (let i = 0; i < 16; i++) {
        if ($(`.photos-${i}`).css('display') === 'none') {
          $(`.photos-${i}`).css('display', 'flex');
          break;
        }
      }

      photos_reader.onload = e => {
        $(`.${parent[1]}`).children('img').attr('src', e.target.result);
        $(`.${parent[1]}`).children('img').css('visibility', 'visible');
        close_btn.css('visibility', 'visible');
      };

      photos_reader.readAsDataURL(this.files[0]);
    }

    close_btn.click(function () {
      $(`.${parent[1]}`).children('img').attr('src', '');
      $(`.${parent[1]}`).children('img').css('visibility', 'hidden');
      $(this).css('visibility', 'hidden');
    });
  });
});

$(document).ready(function () {
  $('.categories-padding').children('button').click(function (e) {
    e.preventDefault();
    $(this).closest('.categories').children('.subcategories-drop').slideToggle(400);
    $(this).closest('.categories').toggleClass('categories-active');
    $(this).children('svg').toggleClass('active-subcategories');
  });
});

$(document).ready(function () {
  $('.categories-add, .modal-toggle-add-category').on('click', function () {
    $('.modal-add-category').toggleClass('is-visible');
  });
  $('.categories-edit, .modal-toggle-edit-category').on('click', function () {
    $('.modal-edit-category').toggleClass('is-visible');
  });

  $('.categories-remove, .modal-toggle-delete-category').on('click', function () {
    $('.modal-delete-category').toggleClass('is-visible');
    $('.select-category').show();
    $('.enter-category-name-input').hide();
    $('.about-category-delete').hide();
    $('.delete-category-pt1').show();
    $('.delete-category-pt2').hide();
    $('.category-description-modal').show();
  });
  $('#delete_category1').on('click', function () {
    $('.select-category-input').hide();
    $('.enter-category-name-input').show();
    $('.about-category-delete').show();
    $('.delete-category-pt1').hide();
    $('.delete-category-pt2').show();
    $('.category-description-modal').hide();
  });
  $('.categories-deactive, .modal-toggle-deactivate-category').on('click', function () {
    $('.modal-deactivate-category').toggleClass('is-visible');
  });

  $('.subs-add, .modal-toggle-add-subs').click(function () {
    $('.modal-add-subs').toggleClass('is-visible');
  });

  $('.subs-edit, .modal-toggle-edit-subs').click(function () {
    $('.modal-edit-subs').toggleClass('is-visible');
  });
});

$(document).ready(function () {
  $('.tag').click(function () {
    let parent = $(this).parent().attr('class').split(" ")[0]
    let tool_parent = $(this).closest(".subcategories-drop").find(".subcategories-tools")

    for (let i = 0; i <  $(`.${parent}`).find(".tag").length; i++) {
      if (this === $(`.${parent}`).children()[i]) {
        $($(`.${parent}`).children()[i]).toggleClass('active-tag');
      } else {
        $($(`.${parent}`).children()[i]).removeClass('active-tag');
      }
    }

    if ($(this).hasClass('active-tag')) {

      tool_parent.find('.subs-add').attr('disabled', true);
      tool_parent.find('.subs-add').addClass('disabled');

      tool_parent.find('.subs-edit').attr('disabled', false);
      tool_parent.find('.subs-edit').removeClass('disabled');

      tool_parent.find('.subs-remove').attr('disabled', false);
      tool_parent.find('.subs-remove').removeClass('disabled');
    } else {
      tool_parent.find('.subs-add').attr('disabled', false);
      tool_parent.find('.subs-add').removeClass('disabled');

      tool_parent.find('.subs-edit').attr('disabled', true);
      tool_parent.find('.subs-edit').addClass('disabled');

      tool_parent.find('.subs-remove').attr('disabled', true);
      tool_parent.find('.subs-remove').addClass('disabled');
    }
  });
});
