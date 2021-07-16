$('.logout-notification').click(function () {
  $('.log-out').fadeToggle('');
});

$('.svg-option-btn').click(function () {
  $('.chat-option-block').fadeToggle('');
});

$(document).ready(function () {
  $('.input-with-clear').on('click', function () {
    let id_input = $(this).children('input');
    id_input.on('keyup', function () {
      if (id_input.val() === '') {
        id_input.closest('.input-with-clear').children('svg').fadeOut('');
      } else {
        id_input.closest('.input-with-clear').children('svg').fadeIn('');
      }
    });
  });

  $(`.input-with-clear`).children('svg').click(function () {
    $(this).parent().children('input').val('');
    $(this).fadeOut('');
  });

  $('.reset-btn').click(function () {
    let option_id = $(this).closest('.options-sort-block');
    option_id.find('*').val('');
    option_id.find('*').prop('checked', false);
    $('.options-checkbox').find('*').css('color', '#888888');
    option_id.find('svg').fadeOut('');
  });
});

$(document).ready(function () {
  $('.export, .modal-toggle').on('click', function (e) {
    e.preventDefault();
    $('.modal-export').toggleClass('is-visible');
    $('.modal-export').find('.modal-close').show();
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
    $('.modal-export').find('.modal-close').hide();
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
    let roles = chek_has_parent('rules-checkbox');

    let tool_btn = $('.tool-btn');
    if (announcement === 0 && marketplace === 0 && user === 0 && categories === 0 && roles === 0) {
      tool_btn.addClass('disabled');
      tool_btn.prop('disabled', true);
      $('.tool-role-btn').removeClass('disabled');
      $('.tool-role-btn').prop('disabled', false);
      $('.tool-categories-btn').removeClass('disabled');
      $('.tool-categories-btn').prop('disabled', false);
    } else {
      tool_btn.removeClass('disabled');
      tool_btn.prop('disabled', false);
      $('.tool-role-btn').addClass('disabled');
      $('.tool-role-btn').prop('disabled', true);
      $('.tool-categories-btn').addClass('disabled');
      $('.tool-categories-btn').prop('disabled', true);
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
    'announcement-id', 'subm', 'subs', 'created',
    'announcements', 'filter', 'role', 'document-link'
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

  let main_parent = $('.all-photos');
  let boolean_for_all_photos = false;

  main_parent.on('change', 'input[type=\'file\']', function () {

    let parent = $(this).closest('.photos-all');

    if (this.files && this.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {

        parent.children('img').attr('src', e.target.result);
        parent.children('img').css('visibility', 'visible');
        parent.children('.close-photos-btn').css('visibility', 'visible');

        if (main_parent.children('*').length < 20) {

          main_parent.append(`<li class="photos-all">
                            <svg width="10"
                                 height="10"
                                 class="close-photos-btn"
                                 viewBox="0 0 10 10"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.70994 1.28994C8.61698 1.19621 8.50637 1.12182 8.38452 1.07105C8.26266 1.02028 8.13195 0.994141 7.99994 0.994141C7.86793 0.994141 7.73722 1.02028 7.61536 1.07105C7.4935 1.12182 7.3829 1.19621 7.28994 1.28994L4.99994 3.58994L2.70994 1.28994C2.52164 1.10164 2.26624 0.995847 1.99994 0.995847C1.73364 0.995847 1.47824 1.10164 1.28994 1.28994C1.10164 1.47824 0.995847 1.73364 0.995847 1.99994C0.995847 2.26624 1.10164 2.52164 1.28994 2.70994L3.58994 4.99994L1.28994 7.28994C1.19621 7.3829 1.12182 7.4935 1.07105 7.61536C1.02028 7.73722 0.994141 7.86793 0.994141 7.99994C0.994141 8.13195 1.02028 8.26266 1.07105 8.38452C1.12182 8.50637 1.19621 8.61698 1.28994 8.70994C1.3829 8.80367 1.4935 8.87806 1.61536 8.92883C1.73722 8.9796 1.86793 9.00574 1.99994 9.00574C2.13195 9.00574 2.26266 8.9796 2.38452 8.92883C2.50638 8.87806 2.61698 8.80367 2.70994 8.70994L4.99994 6.40994L7.28994 8.70994C7.3829 8.80367 7.4935 8.87806 7.61536 8.92883C7.73722 8.9796 7.86793 9.00574 7.99994 9.00574C8.13195 9.00574 8.26266 8.9796 8.38452 8.92883C8.50637 8.87806 8.61698 8.80367 8.70994 8.70994C8.80367 8.61698 8.87806 8.50637 8.92883 8.38452C8.9796 8.26266 9.00574 8.13195 9.00574 7.99994C9.00574 7.86793 8.9796 7.73722 8.92883 7.61536C8.87806 7.4935 8.80367 7.3829 8.70994 7.28994L6.40994 4.99994L8.70994 2.70994C8.80367 2.61698 8.87806 2.50638 8.92883 2.38452C8.9796 2.26266 9.00574 2.13195 9.00574 1.99994C9.00574 1.86793 8.9796 1.73722 8.92883 1.61536C8.87806 1.4935 8.80367 1.3829 8.70994 1.28994Z"
                                      fill="white" />
                            </svg>
                            <img class="all-pic" src="" />
                            <svg width="24"
                                 height="24"
                                 viewBox="0 0 24 24"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 10C18.7348 10 18.4804 10.1054 18.2929 10.2929C18.1054 10.4804 18 10.7348 18 11V14.38L16.52 12.9C15.9974 12.3815 15.2911 12.0906 14.555 12.0906C13.8189 12.0906 13.1126 12.3815 12.59 12.9L11.89 13.61L9.41 11.12C8.88742 10.6015 8.18113 10.3106 7.445 10.3106C6.70887 10.3106 6.00258 10.6015 5.48 11.12L4 12.61V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H13C13.2652 6 13.5196 5.89464 13.7071 5.70711C13.8946 5.51957 14 5.26522 14 5C14 4.73478 13.8946 4.48043 13.7071 4.29289C13.5196 4.10536 13.2652 4 13 4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19.22C2.00264 19.9565 2.29637 20.6621 2.81715 21.1828C3.33794 21.7036 4.04351 21.9974 4.78 22H17.22C17.491 21.9978 17.7603 21.9574 18.02 21.88C18.5974 21.718 19.1058 21.3711 19.4671 20.8924C19.8283 20.4137 20.0226 19.8297 20.02 19.23V11C20.02 10.867 19.9935 10.7353 19.942 10.6126C19.8905 10.49 19.8151 10.3789 19.7201 10.2857C19.6251 10.1926 19.5125 10.1194 19.3888 10.0703C19.2652 10.0212 19.133 9.99734 19 10ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V15.43L6.89 12.54C7.03615 12.3947 7.23389 12.3131 7.44 12.3131C7.64611 12.3131 7.84385 12.3947 7.99 12.54L15.46 20H5ZM18 19C17.9936 19.1936 17.931 19.3812 17.82 19.54L13.3 15L14.01 14.3C14.0817 14.2268 14.1673 14.1687 14.2617 14.129C14.3561 14.0893 14.4576 14.0689 14.56 14.0689C14.6624 14.0689 14.7639 14.0893 14.8583 14.129C14.9527 14.1687 15.0383 14.2268 15.11 14.3L18 17.21V19ZM21 4H20V3C20 2.73478 19.8946 2.48043 19.7071 2.29289C19.5196 2.10536 19.2652 2 19 2C18.7348 2 18.4804 2.10536 18.2929 2.29289C18.1054 2.48043 18 2.73478 18 3V4H17C16.7348 4 16.4804 4.10536 16.2929 4.29289C16.1054 4.48043 16 4.73478 16 5C16 5.26522 16.1054 5.51957 16.2929 5.70711C16.4804 5.89464 16.7348 6 17 6H18V7C18 7.26522 18.1054 7.51957 18.2929 7.70711C18.4804 7.89464 18.7348 8 19 8C19.2652 8 19.5196 7.89464 19.7071 7.70711C19.8946 7.51957 20 7.26522 20 7V6H21C21.2652 6 21.5196 5.89464 21.7071 5.70711C21.8946 5.51957 22 5.26522 22 5C22 4.73478 21.8946 4.48043 21.7071 4.29289C21.5196 4.10536 21.2652 4 21 4Z"
                                      fill="#888888" />
                            </svg>
                            <input type="file" class="file-all" accept="image/*" />
                        </li>`);
        } else {
          boolean_for_all_photos = true;
        }
      };

      reader.readAsDataURL(this.files[0]);
    }
  });

  $('.all-photos').on('click', 'svg', function () {
    $(this).parent().remove();

    if (main_parent.children('*').length < 20 && boolean_for_all_photos) {
      main_parent.append(`<li class="photos-all">
                            <svg width="10"
                                 height="10"
                                 class="close-photos-btn"
                                 viewBox="0 0 10 10"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.70994 1.28994C8.61698 1.19621 8.50637 1.12182 8.38452 1.07105C8.26266 1.02028 8.13195 0.994141 7.99994 0.994141C7.86793 0.994141 7.73722 1.02028 7.61536 1.07105C7.4935 1.12182 7.3829 1.19621 7.28994 1.28994L4.99994 3.58994L2.70994 1.28994C2.52164 1.10164 2.26624 0.995847 1.99994 0.995847C1.73364 0.995847 1.47824 1.10164 1.28994 1.28994C1.10164 1.47824 0.995847 1.73364 0.995847 1.99994C0.995847 2.26624 1.10164 2.52164 1.28994 2.70994L3.58994 4.99994L1.28994 7.28994C1.19621 7.3829 1.12182 7.4935 1.07105 7.61536C1.02028 7.73722 0.994141 7.86793 0.994141 7.99994C0.994141 8.13195 1.02028 8.26266 1.07105 8.38452C1.12182 8.50637 1.19621 8.61698 1.28994 8.70994C1.3829 8.80367 1.4935 8.87806 1.61536 8.92883C1.73722 8.9796 1.86793 9.00574 1.99994 9.00574C2.13195 9.00574 2.26266 8.9796 2.38452 8.92883C2.50638 8.87806 2.61698 8.80367 2.70994 8.70994L4.99994 6.40994L7.28994 8.70994C7.3829 8.80367 7.4935 8.87806 7.61536 8.92883C7.73722 8.9796 7.86793 9.00574 7.99994 9.00574C8.13195 9.00574 8.26266 8.9796 8.38452 8.92883C8.50637 8.87806 8.61698 8.80367 8.70994 8.70994C8.80367 8.61698 8.87806 8.50637 8.92883 8.38452C8.9796 8.26266 9.00574 8.13195 9.00574 7.99994C9.00574 7.86793 8.9796 7.73722 8.92883 7.61536C8.87806 7.4935 8.80367 7.3829 8.70994 7.28994L6.40994 4.99994L8.70994 2.70994C8.80367 2.61698 8.87806 2.50638 8.92883 2.38452C8.9796 2.26266 9.00574 2.13195 9.00574 1.99994C9.00574 1.86793 8.9796 1.73722 8.92883 1.61536C8.87806 1.4935 8.80367 1.3829 8.70994 1.28994Z"
                                      fill="white" />
                            </svg>
                            <img class="all-pic" src="" />
                            <svg width="24"
                                 height="24"
                                 viewBox="0 0 24 24"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 10C18.7348 10 18.4804 10.1054 18.2929 10.2929C18.1054 10.4804 18 10.7348 18 11V14.38L16.52 12.9C15.9974 12.3815 15.2911 12.0906 14.555 12.0906C13.8189 12.0906 13.1126 12.3815 12.59 12.9L11.89 13.61L9.41 11.12C8.88742 10.6015 8.18113 10.3106 7.445 10.3106C6.70887 10.3106 6.00258 10.6015 5.48 11.12L4 12.61V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H13C13.2652 6 13.5196 5.89464 13.7071 5.70711C13.8946 5.51957 14 5.26522 14 5C14 4.73478 13.8946 4.48043 13.7071 4.29289C13.5196 4.10536 13.2652 4 13 4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19.22C2.00264 19.9565 2.29637 20.6621 2.81715 21.1828C3.33794 21.7036 4.04351 21.9974 4.78 22H17.22C17.491 21.9978 17.7603 21.9574 18.02 21.88C18.5974 21.718 19.1058 21.3711 19.4671 20.8924C19.8283 20.4137 20.0226 19.8297 20.02 19.23V11C20.02 10.867 19.9935 10.7353 19.942 10.6126C19.8905 10.49 19.8151 10.3789 19.7201 10.2857C19.6251 10.1926 19.5125 10.1194 19.3888 10.0703C19.2652 10.0212 19.133 9.99734 19 10ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V15.43L6.89 12.54C7.03615 12.3947 7.23389 12.3131 7.44 12.3131C7.64611 12.3131 7.84385 12.3947 7.99 12.54L15.46 20H5ZM18 19C17.9936 19.1936 17.931 19.3812 17.82 19.54L13.3 15L14.01 14.3C14.0817 14.2268 14.1673 14.1687 14.2617 14.129C14.3561 14.0893 14.4576 14.0689 14.56 14.0689C14.6624 14.0689 14.7639 14.0893 14.8583 14.129C14.9527 14.1687 15.0383 14.2268 15.11 14.3L18 17.21V19ZM21 4H20V3C20 2.73478 19.8946 2.48043 19.7071 2.29289C19.5196 2.10536 19.2652 2 19 2C18.7348 2 18.4804 2.10536 18.2929 2.29289C18.1054 2.48043 18 2.73478 18 3V4H17C16.7348 4 16.4804 4.10536 16.2929 4.29289C16.1054 4.48043 16 4.73478 16 5C16 5.26522 16.1054 5.51957 16.2929 5.70711C16.4804 5.89464 16.7348 6 17 6H18V7C18 7.26522 18.1054 7.51957 18.2929 7.70711C18.4804 7.89464 18.7348 8 19 8C19.2652 8 19.5196 7.89464 19.7071 7.70711C19.8946 7.51957 20 7.26522 20 7V6H21C21.2652 6 21.5196 5.89464 21.7071 5.70711C21.8946 5.51957 22 5.26522 22 5C22 4.73478 21.8946 4.48043 21.7071 4.29289C21.5196 4.10536 21.2652 4 21 4Z"
                                      fill="#888888" />
                            </svg>
                            <input type="file" class="file-all" accept="image/*" />
                        </li>`);
      boolean_for_all_photos = false;
    }
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
    $('.select-category').hide();
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
    let parent = $(this).parent().attr('class').split(' ')[0];
    let tool_parent = $(this).closest('.subcategories-drop').find('.subcategories-tools');

    for (let i = 0; i < $(`.${parent}`).find(".tag").length; i++) {
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

$(document).ready(function () {
  let parent = $('.documents-content');
  parent.find('input[type="checkbox"]').change(function () {
    let check = ($(`.document-checkbox`).children('input[type="checkbox"]').filter(':checked').length);

    if (check === 0) {
      parent.find('.edit').addClass('disabled');
      parent.find('.edit').prop('disabled', true);

      parent.find('.document-add').removeClass('disabled');
      parent.find('.document-add').prop('disabled', false);

      parent.find('.activate').addClass('disabled');
      parent.find('.activate').prop('disabled', true);

      parent.find('.deactive').addClass('disabled');
      parent.find('.deactive').prop('disabled', true);

      parent.find('.remove').addClass('disabled');
      parent.find('.remove').prop('disabled', true);
    } else {
      parent.find('.document-add').addClass('disabled');
      parent.find('.document-add').prop('disabled', true);

      parent.find('.edit').removeClass('disabled');
      parent.find('.edit').prop('disabled', false);

      parent.find('.activate').removeClass('disabled');
      parent.find('.activate').prop('disabled', false);

      parent.find('.deactive').removeClass('disabled');
      parent.find('.deactive').prop('disabled', false);

      parent.find('.remove').removeClass('disabled');
      parent.find('.remove').prop('disabled', false);
    }
  });

  $('.document-add, .modal-toggle-create-document').click(function () {
    $('.modal-create-document').toggleClass('is-visible');
  });
});

$(document).ready(function () {
  $('.links-wrap').on('click', 'svg', function () {
    if ($('.links-wrap').children('*').length != 1) {
      $(this).closest('.input_custom').remove();
    }
  });
  $('.button-link-wrap').on('click', 'button', function () {
    $('.links-wrap').append(`<li class="input_custom">
                                <div class="edit-link">
                                    <input name="edit-link"
                                           type="text"
                                           placeholder="Enter link">

                                    <svg width="24"
                                         height="24"
                                         viewBox="0 0 24 24"
                                         fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 18C10.2652 18 10.5196 17.8946 10.7071 17.7071C10.8946 17.5196 11 17.2652 11 17V11C11 10.7348 10.8946 10.4804 10.7071 10.2929C10.5196 10.1054 10.2652 10 10 10C9.73478 10 9.48043 10.1054 9.29289 10.2929C9.10536 10.4804 9 10.7348 9 11V17C9 17.2652 9.10536 17.5196 9.29289 17.7071C9.48043 17.8946 9.73478 18 10 18ZM20 6H16V5C16 4.20435 15.6839 3.44129 15.1213 2.87868C14.5587 2.31607 13.7956 2 13 2H11C10.2044 2 9.44129 2.31607 8.87868 2.87868C8.31607 3.44129 8 4.20435 8 5V6H4C3.73478 6 3.48043 6.10536 3.29289 6.29289C3.10536 6.48043 3 6.73478 3 7C3 7.26522 3.10536 7.51957 3.29289 7.70711C3.48043 7.89464 3.73478 8 4 8H5V19C5 19.7956 5.31607 20.5587 5.87868 21.1213C6.44129 21.6839 7.20435 22 8 22H16C16.7956 22 17.5587 21.6839 18.1213 21.1213C18.6839 20.5587 19 19.7956 19 19V8H20C20.2652 8 20.5196 7.89464 20.7071 7.70711C20.8946 7.51957 21 7.26522 21 7C21 6.73478 20.8946 6.48043 20.7071 6.29289C20.5196 6.10536 20.2652 6 20 6ZM10 5C10 4.73478 10.1054 4.48043 10.2929 4.29289C10.4804 4.10536 10.7348 4 11 4H13C13.2652 4 13.5196 4.10536 13.7071 4.29289C13.8946 4.48043 14 4.73478 14 5V6H10V5ZM17 19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20H8C7.73478 20 7.48043 19.8946 7.29289 19.7071C7.10536 19.5196 7 19.2652 7 19V8H17V19ZM14 18C14.2652 18 14.5196 17.8946 14.7071 17.7071C14.8946 17.5196 15 17.2652 15 17V11C15 10.7348 14.8946 10.4804 14.7071 10.2929C14.5196 10.1054 14.2652 10 14 10C13.7348 10 13.4804 10.1054 13.2929 10.2929C13.1054 10.4804 13 10.7348 13 11V17C13 17.2652 13.1054 17.5196 13.2929 17.7071C13.4804 17.8946 13.7348 18 14 18Z"
                                              fill="#4D4D4D" />
                                    </svg>
                                </div>
                            </li>`);
  });
});


$(document).ready(function () {
  $('.role-add, .modal-toggle-add-role').on('click', function () {
    $('.modal-add-role').toggleClass('is-visible');
  });
  $('.role_edit_tool, .modal-toggle-edit-role').on('click', function () {
    $('.modal-edit-role').toggleClass('is-visible');
  });
});
