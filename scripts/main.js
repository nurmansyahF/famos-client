(function () {
  'use strict';

  function init() {
    // INLINE SVG
    jQuery('img.svg').each(function (i) {
      var $img = jQuery(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      jQuery.get(imgURL, function (data) {
        var $svg = jQuery(data).find('svg');
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        $img.replaceWith($svg);
      }, 'xml');
    });// END OF INLINE SVG


    $('.select').selectpicker();

    mainLayout();
    runSlider();
    func();

  } init(); // END OF init()

  function mainLayout() {
    var $headerH = $('header').outerHeight(),
      $footerH = $('footer').height();
    $('main').css({ 'min-height': 'calc(100vh - ' + $footerH + 'px)', 'padding-top': +$headerH + 'px' });
  }

  function runSlider() {
    $('.slider').each(function () {
      var $slider = $(this),
        $item = $slider.find('.slider__item'),
        $autoplay = ($slider.data('autoplay') == undefined) ? true : $slider.data('autoplay'),
        $margin = ($slider.data('margin') == undefined) ? 24 : $slider.data('margin');

      if ($item.length > 1) {
        $slider.owlCarousel({
          items: 1,
          loop: false,
          dots: true,
          nav: true,
          navText: ["<span><img src='../images/ic-chevron-left.svg'></span>", "<span><img src='../images/ic-chevron-right.svg'></span>"],
          autoplay: $autoplay,
          autoplayTimeout: 6000,
          autoplaySpeed: 800,
          margin: $margin,
        });
      } else {
        $slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        $slider.find('.owl-stage-outer').children().unwrap();
      }
    });

    $('.slider-nav').each(function () {
      var $slider = $(this),
        $item = $slider.find('.slider__item'),
        $margin = ($slider.data('margin') == undefined) ? 24 : $slider.data('margin');

      if ($item.length > 3) {
        $slider.owlCarousel({
          items: 1,
          loop: false,
          dots: false,
          nav: true,
          navText: ["<span><img src='../images/ic-chevron-left.svg'></span>", "<span><img src='../images/ic-chevron-right.svg'></span>"],
          autoplay: false,
          autoplayTimeout: 6000,
          autoplaySpeed: 800,
          autoWidth:true,
          margin: $margin,
        });
      } else {
        $slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        $slider.find('.owl-stage-outer').children().unwrap();
      }
    });

    $('.head-search').each(function(){
      var t = $(this),
          btn = t.find('a'),
          bs = t.find('.box_search');
      t.click(function(e){
        e.stopPropagation();
        if (t.hasClass('hs-show')){
          t.removeClass('hs-show');
        } else {
          t.addClass('hs-show');
        }
      });
    });

    $(document.body).click( function(e) {
      if ($('.head-search').hasClass('hs-show')){
        $('.head-search').removeClass('hs-show');
      }
    });

    $('.sidebar .user-account').each(function(){
      var t = $(this),
          dd = t.find('.user-acnt_menu');
        t.click(function(){
          t.toggleClass('dd-show');
        })
    });

    $('.masthead--home').each(function () {
      var $t = $(this),
        $slider = $t.find('.slider'),
        $content = $t.find('.masthead__content');

      $slider.on('changed.owl.carousel', function (event) {
        $content.toggleClass('active')
      });
    });

    $('.block-journey').each(function () {
      var $t = $(this),
        $slider = $t.find('.slider'),
        $nav = $t.find('.block-journey__slider-nav'),
        $navItem = $nav.find('li');

      $navItem.each(function () {
        var $el = $(this),
          $data = $(this).data('item');
        $el.click(function () {
          if (!$(this).hasClass('active')) {
            $navItem.not(this).removeClass('active');
            $el.addClass('active');
            $slider.trigger('to.owl.carousel', [$data, 200]);
            $slider.find('.owl-item').addClass('transition');
            setTimeout(function () {
              $slider.find('.owl-item').removeClass('transition');
            }, 200);
          }
        });
      });

      $slider.on('changed.owl.carousel', function (e) {
        var $activeIndex = e.item.index;
        $navItem.removeClass('active');
        $navItem.eq($activeIndex).addClass('active');
        console.log($activeIndex);
      })
    });

    $('.block-accord').each(function () {
      var $t = $(this),
        $accordion = $t.find('.accordion'),
        $slider = $t.find('.slider');

      $accordion.each(function () {
        var $el = $(this),
          $card = $el.find('.card');

        $card.each(function () {
          var $data = $(this).data('item');
          $(this).click(function () {
            $slider.trigger('to.owl.carousel', [$data, 200]);
          });
        });
      });

      $slider.on('changed.owl.carousel', function (e) {
        var $activeIndex = e.item.index;
        $accordion.find('.card').removeClass('open');
        $accordion.find('.card').eq($activeIndex).addClass('open');
        $accordion.find('.card').eq($activeIndex).find('.collapse').collapse('toggle');
      });
    });
  }// end of runSlider()

  function func() {

    // STICKY HEADER
    if ($('.header').length > 0) {
      var header = $('.header'),
        pos = 10;
      $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();
        if (scroll >= pos) {
          header.addClass('sticky');
          $('body').addClass('header-stick');
        } else {
          header.removeClass('sticky');
          $('body').removeClass('header-stick');
        }
      });
    }

    $('.user-acnt a').click(function(){
      $('body').toggleClass('usracnt-open');
    });

    $('.user-header .notif a').click(function(){
      $('body').toggleClass('notif-open');
    })

    $('.accordion').each(function () {
      var $t = $(this),
        $card = $t.find('.card');

      $card.each(function () {
        var $el = $(this),
          $head = $el.find('.card-header'),
          $body = $el.find('.card-body');

        $head.click(function () {
          $card.not($el).removeClass('open');
          $el.toggleClass('open');
        });
      });
    });

    // Bootsrap Select
    $('.select').each(function(){
      $(this).selectpicker();
    });

    // Form Validation
    $('form.valthis').validate({
      focusInvalid: false,
      ignore: ":disabled, :hidden",
      errorPlacement: function(error, element) {
        var fg = $(element).closest('.form-group').find('.err-msg');
        error.appendTo(fg);
        $('select.select').selectpicker('refresh');
      },
       invalidHandler: function(form, validator) {

            if (!validator.numberOfInvalids())
                return;

            $('html, body').animate({
                scrollTop: $(validator.errorList[0].element).offset().top - 120
            }, 800);

        }
    });

    $('form.valthis').each(function(){
      var select = $(this).find('select.select');
      select.on('changed.bs.select', function(e) {
        $(this).valid();
        $(this).closest('.bootstrap-select').removeClass('error');
      });
    });

    jQuery.extend(jQuery.validator.messages, {
      required: "Kolom ini wajib diisi",
      remote: "Please fix this field.",
      email: "Please enter a valid email address.",
      url: "Please enter a valid URL.",
      date: "Please enter a valid date.",
      dateISO: "Please enter a valid date (ISO).",
      number: "Please enter a valid number.",
      digits: "Please enter only digits.",
      creditcard: "Please enter a valid credit card number.",
      equalTo: "Please enter the same value again.",
      accept: "Please enter a value with a valid extension.",
      maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
      minlength: jQuery.validator.format("Please enter at least {0} characters."),
      rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
      range: jQuery.validator.format("Please enter a value between {0} and {1}."),
      max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
      min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
    });

  $('.selectAlt').select2(
    {
      placeholder: 'Pilih Tipe Proyek'
    }
  );

  // Count Char

  $('textarea.form-control').each(function(){
    var t = $(this),
        c = $(this).siblings('.counter'),
        cntr = c.find('.cntr'),
        max = c.find('.max'),
        maxl = t.attr('maxlength');
    if(maxl > 0 && maxl != undefined){
      c.css('display', 'block');
      cntr.html('0');
      max.html(maxl);
    }
    console.log(maxl);
    t.keyup(function(){
      var len = t.val().length;
      cntr.html(len);
    });
  })

  $('.modal-settings').each(function(){
    var t = $(this),
        nl = t.find('.nav-link'),
        tt = $('#tab_title');

    nl.each(function(){
      var nlt = $(this).text();
      $(this).click(function(){
        tt.html(nlt);
      })
    })
  })

  $('.keahlian').each(function(){
    var t = $(this),
        sk = $('body').find('.select-keahlian'),
        ssk = $('body').find('.select-subkeahlian');
    sk.each(function(){
      var p = $(this),
        select = $(this).find('.select');
      select.on('change', function(){
        p.siblings('.select-subkeahlian').show();
        $('.select-subkeahlian.label').show();
      })
    })
  })

  // Datepicker
  $('.date').each(function() {
    var input = $(this).find('input');
    input.datepicker({
      autoclose: true,
      format : "dd/mm/yyyy"
    });
    input.change(function() {
      $(this).valid();
    })
  });

  $('.timeline').each(function(){
    var t = $(this),
        m = t.find('.more');
    m.click(function(){
      t.toggleClass('showall');
    })
  });

  $('.box-file__item').each(function(){
    var t = $(this),
        b = t.find('.dwnld-file');
    b.click(function(){
      t.addClass('downloading');
    })
  })

  $('.modal-ulas-proyek').each(function(){
    var t = $(this),
        btns = t.find('.action-btn'),
        kw = t.find('.komentar-wrap'),
        rev = t.find('.revise-tnggapan'),
        bxi = t.find('.box-inpt'),
        bw = t.find('.btn-wrap'),
        cls = t.find('.cls-tnggapan');
    rev.click(function(){
      $(this).parent(btns).hide();
      kw.addClass('show');
    });
    cls.click(function(){
      $(this).hide();
      bxi.hide();
      bw.hide();
      $(this).siblings().show();
    });

  });

  $('#ConfirmNotif').on('shown.bs.modal', function () {
    $('.modal').not($(this)).css('z-index', '0');
  })

  $('#ConfirmNotif').on('hidden.bs.modal', function () {
    $('.modal').not($(this)).css('z-index', '');
  })

  }// END of func()

})();



$('.multiplier').each(function(){
  var t       = $(this),
      max     = t.data('max'),
      item    = t.find('.item').eq(0),
      add     = t.find('.btn-add'),
      format;

  item.find('select').each(function(){
    $(this).selectpicker('destroy');
  });

  format = item.clone().hide();
  bind(item);

  function bind (obj) {
    $('.date').each(function() {
      var input = $(this).find('input');
      input.datepicker({
        autoclose: true
      });
      input.change(function() {
        $(this).valid();
      })
    });
    $('select.select').each(function(){
      $(this).selectpicker({
        style: 'select-control',
        width: '100%',
        size: 5
      });
    });
  }

  function reOrder(obj){
    var itm = obj.find('.item');
    itm.each(function(i){
      var tmp = i + 1;
      //re order name
      $(this).find('input').each(function(){
        if($(this).attr('name')){
          var name = $(this).attr('name').replace( /\[\d/g,'['+(i));
          $(this).attr('name',name);
        }
      });
    });
    //toggle delete button
    if(itm.length > 1){
      itm.closest('.multiplier').addClass('multiplied');
    }else{
      itm.closest('.multiplier').removeClass('multiplied');
    }
    //cek limit
    if(itm.length >= max){
      itm.closest('.multiplier').addClass('max');
    }else{
      itm.closest('.multiplier').removeClass('max');
    };
    console.log(itm.length);
  };

  add.click(function(e){
    e.preventDefault();
    var html = format.clone();
    t.append(html);
    bind(html);
    html.slideDown(300);
    reOrder(t);
  });

  // DELETE
  $('body').on('click','.btn-del',function(e){
    e.preventDefault();
    var parent = $(this).closest('.item'),
        target = parent.closest('.multiplier');

    parent.slideUp(300, function(){
      parent.remove();
      reOrder(target);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgLy8gSU5MSU5FIFNWR1xyXG4gICAgalF1ZXJ5KCdpbWcuc3ZnJykuZWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICB2YXIgJGltZyA9IGpRdWVyeSh0aGlzKTtcclxuICAgICAgdmFyIGltZ0lEID0gJGltZy5hdHRyKCdpZCcpO1xyXG4gICAgICB2YXIgaW1nQ2xhc3MgPSAkaW1nLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICAgIHZhciBpbWdVUkwgPSAkaW1nLmF0dHIoJ3NyYycpO1xyXG5cclxuICAgICAgalF1ZXJ5LmdldChpbWdVUkwsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyICRzdmcgPSBqUXVlcnkoZGF0YSkuZmluZCgnc3ZnJyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbWdJRCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGltZ0NsYXNzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cignY2xhc3MnLCBpbWdDbGFzcyArICcgcmVwbGFjZWQtc3ZnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzdmcgPSAkc3ZnLnJlbW92ZUF0dHIoJ3htbG5zOmEnKTtcclxuICAgICAgICAkaW1nLnJlcGxhY2VXaXRoKCRzdmcpO1xyXG4gICAgICB9LCAneG1sJyk7XHJcbiAgICB9KTsvLyBFTkQgT0YgSU5MSU5FIFNWR1xyXG5cclxuXHJcbiAgICAkKCcuc2VsZWN0Jykuc2VsZWN0cGlja2VyKCk7XHJcblxyXG4gICAgbWFpbkxheW91dCgpO1xyXG4gICAgcnVuU2xpZGVyKCk7XHJcbiAgICBmdW5jKCk7XHJcblxyXG4gIH0gaW5pdCgpOyAvLyBFTkQgT0YgaW5pdCgpXHJcblxyXG4gIGZ1bmN0aW9uIG1haW5MYXlvdXQoKSB7XHJcbiAgICB2YXIgJGhlYWRlckggPSAkKCdoZWFkZXInKS5vdXRlckhlaWdodCgpLFxyXG4gICAgICAkZm9vdGVySCA9ICQoJ2Zvb3RlcicpLmhlaWdodCgpO1xyXG4gICAgJCgnbWFpbicpLmNzcyh7ICdtaW4taGVpZ2h0JzogJ2NhbGMoMTAwdmggLSAnICsgJGZvb3RlckggKyAncHgpJywgJ3BhZGRpbmctdG9wJzogKyRoZWFkZXJIICsgJ3B4JyB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJ1blNsaWRlcigpIHtcclxuICAgICQoJy5zbGlkZXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyICRzbGlkZXIgPSAkKHRoaXMpLFxyXG4gICAgICAgICRpdGVtID0gJHNsaWRlci5maW5kKCcuc2xpZGVyX19pdGVtJyksXHJcbiAgICAgICAgJGF1dG9wbGF5ID0gKCRzbGlkZXIuZGF0YSgnYXV0b3BsYXknKSA9PSB1bmRlZmluZWQpID8gdHJ1ZSA6ICRzbGlkZXIuZGF0YSgnYXV0b3BsYXknKSxcclxuICAgICAgICAkbWFyZ2luID0gKCRzbGlkZXIuZGF0YSgnbWFyZ2luJykgPT0gdW5kZWZpbmVkKSA/IDI0IDogJHNsaWRlci5kYXRhKCdtYXJnaW4nKTtcclxuXHJcbiAgICAgIGlmICgkaXRlbS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgJHNsaWRlci5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgIG5hdjogdHJ1ZSxcclxuICAgICAgICAgIG5hdlRleHQ6IFtcIjxzcGFuPjxpbWcgc3JjPScuLi9pbWFnZXMvaWMtY2hldnJvbi1sZWZ0LnN2Zyc+PC9zcGFuPlwiLCBcIjxzcGFuPjxpbWcgc3JjPScuLi9pbWFnZXMvaWMtY2hldnJvbi1yaWdodC5zdmcnPjwvc3Bhbj5cIl0sXHJcbiAgICAgICAgICBhdXRvcGxheTogJGF1dG9wbGF5LFxyXG4gICAgICAgICAgYXV0b3BsYXlUaW1lb3V0OiA2MDAwLFxyXG4gICAgICAgICAgYXV0b3BsYXlTcGVlZDogODAwLFxyXG4gICAgICAgICAgbWFyZ2luOiAkbWFyZ2luLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICRzbGlkZXIudHJpZ2dlcignZGVzdHJveS5vd2wuY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnb3dsLWNhcm91c2VsIG93bC1sb2FkZWQnKTtcclxuICAgICAgICAkc2xpZGVyLmZpbmQoJy5vd2wtc3RhZ2Utb3V0ZXInKS5jaGlsZHJlbigpLnVud3JhcCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuc2xpZGVyLW5hdicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJHNsaWRlciA9ICQodGhpcyksXHJcbiAgICAgICAgJGl0ZW0gPSAkc2xpZGVyLmZpbmQoJy5zbGlkZXJfX2l0ZW0nKSxcclxuICAgICAgICAkbWFyZ2luID0gKCRzbGlkZXIuZGF0YSgnbWFyZ2luJykgPT0gdW5kZWZpbmVkKSA/IDI0IDogJHNsaWRlci5kYXRhKCdtYXJnaW4nKTtcclxuXHJcbiAgICAgIGlmICgkaXRlbS5sZW5ndGggPiAzKSB7XHJcbiAgICAgICAgJHNsaWRlci5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgICBuYXY6IHRydWUsXHJcbiAgICAgICAgICBuYXZUZXh0OiBbXCI8c3Bhbj48aW1nIHNyYz0nLi4vaW1hZ2VzL2ljLWNoZXZyb24tbGVmdC5zdmcnPjwvc3Bhbj5cIiwgXCI8c3Bhbj48aW1nIHNyYz0nLi4vaW1hZ2VzL2ljLWNoZXZyb24tcmlnaHQuc3ZnJz48L3NwYW4+XCJdLFxyXG4gICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgYXV0b3BsYXlUaW1lb3V0OiA2MDAwLFxyXG4gICAgICAgICAgYXV0b3BsYXlTcGVlZDogODAwLFxyXG4gICAgICAgICAgYXV0b1dpZHRoOnRydWUsXHJcbiAgICAgICAgICBtYXJnaW46ICRtYXJnaW4sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJHNsaWRlci50cmlnZ2VyKCdkZXN0cm95Lm93bC5jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdvd2wtY2Fyb3VzZWwgb3dsLWxvYWRlZCcpO1xyXG4gICAgICAgICRzbGlkZXIuZmluZCgnLm93bC1zdGFnZS1vdXRlcicpLmNoaWxkcmVuKCkudW53cmFwKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5oZWFkLXNlYXJjaCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgYnRuID0gdC5maW5kKCdhJyksXHJcbiAgICAgICAgICBicyA9IHQuZmluZCgnLmJveF9zZWFyY2gnKTtcclxuICAgICAgdC5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGlmICh0Lmhhc0NsYXNzKCdocy1zaG93Jykpe1xyXG4gICAgICAgICAgdC5yZW1vdmVDbGFzcygnaHMtc2hvdycpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0LmFkZENsYXNzKCdocy1zaG93Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQuYm9keSkuY2xpY2soIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgaWYgKCQoJy5oZWFkLXNlYXJjaCcpLmhhc0NsYXNzKCdocy1zaG93Jykpe1xyXG4gICAgICAgICQoJy5oZWFkLXNlYXJjaCcpLnJlbW92ZUNsYXNzKCdocy1zaG93Jyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5zaWRlYmFyIC51c2VyLWFjY291bnQnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgIGRkID0gdC5maW5kKCcudXNlci1hY250X21lbnUnKTtcclxuICAgICAgICB0LmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB0LnRvZ2dsZUNsYXNzKCdkZC1zaG93Jyk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5tYXN0aGVhZC0taG9tZScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICRzbGlkZXIgPSAkdC5maW5kKCcuc2xpZGVyJyksXHJcbiAgICAgICAgJGNvbnRlbnQgPSAkdC5maW5kKCcubWFzdGhlYWRfX2NvbnRlbnQnKTtcclxuXHJcbiAgICAgICRzbGlkZXIub24oJ2NoYW5nZWQub3dsLmNhcm91c2VsJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgJGNvbnRlbnQudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmJsb2NrLWpvdXJuZXknKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyICR0ID0gJCh0aGlzKSxcclxuICAgICAgICAkc2xpZGVyID0gJHQuZmluZCgnLnNsaWRlcicpLFxyXG4gICAgICAgICRuYXYgPSAkdC5maW5kKCcuYmxvY2stam91cm5leV9fc2xpZGVyLW5hdicpLFxyXG4gICAgICAgICRuYXZJdGVtID0gJG5hdi5maW5kKCdsaScpO1xyXG5cclxuICAgICAgJG5hdkl0ZW0uZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyICRlbCA9ICQodGhpcyksXHJcbiAgICAgICAgICAkZGF0YSA9ICQodGhpcykuZGF0YSgnaXRlbScpO1xyXG4gICAgICAgICRlbC5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICRuYXZJdGVtLm5vdCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICRlbC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICRzbGlkZXIudHJpZ2dlcigndG8ub3dsLmNhcm91c2VsJywgWyRkYXRhLCAyMDBdKTtcclxuICAgICAgICAgICAgJHNsaWRlci5maW5kKCcub3dsLWl0ZW0nKS5hZGRDbGFzcygndHJhbnNpdGlvbicpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAkc2xpZGVyLmZpbmQoJy5vd2wtaXRlbScpLnJlbW92ZUNsYXNzKCd0cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJHNsaWRlci5vbignY2hhbmdlZC5vd2wuY2Fyb3VzZWwnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciAkYWN0aXZlSW5kZXggPSBlLml0ZW0uaW5kZXg7XHJcbiAgICAgICAgJG5hdkl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICRuYXZJdGVtLmVxKCRhY3RpdmVJbmRleCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCRhY3RpdmVJbmRleCk7XHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuYmxvY2stYWNjb3JkJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciAkdCA9ICQodGhpcyksXHJcbiAgICAgICAgJGFjY29yZGlvbiA9ICR0LmZpbmQoJy5hY2NvcmRpb24nKSxcclxuICAgICAgICAkc2xpZGVyID0gJHQuZmluZCgnLnNsaWRlcicpO1xyXG5cclxuICAgICAgJGFjY29yZGlvbi5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgJGVsID0gJCh0aGlzKSxcclxuICAgICAgICAgICRjYXJkID0gJGVsLmZpbmQoJy5jYXJkJyk7XHJcblxyXG4gICAgICAgICRjYXJkLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdmFyICRkYXRhID0gJCh0aGlzKS5kYXRhKCdpdGVtJyk7XHJcbiAgICAgICAgICAkKHRoaXMpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNsaWRlci50cmlnZ2VyKCd0by5vd2wuY2Fyb3VzZWwnLCBbJGRhdGEsIDIwMF0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJHNsaWRlci5vbignY2hhbmdlZC5vd2wuY2Fyb3VzZWwnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciAkYWN0aXZlSW5kZXggPSBlLml0ZW0uaW5kZXg7XHJcbiAgICAgICAgJGFjY29yZGlvbi5maW5kKCcuY2FyZCcpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgJGFjY29yZGlvbi5maW5kKCcuY2FyZCcpLmVxKCRhY3RpdmVJbmRleCkuYWRkQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAkYWNjb3JkaW9uLmZpbmQoJy5jYXJkJykuZXEoJGFjdGl2ZUluZGV4KS5maW5kKCcuY29sbGFwc2UnKS5jb2xsYXBzZSgndG9nZ2xlJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfS8vIGVuZCBvZiBydW5TbGlkZXIoKVxyXG5cclxuICBmdW5jdGlvbiBmdW5jKCkge1xyXG5cclxuICAgIC8vIFNUSUNLWSBIRUFERVJcclxuICAgIGlmICgkKCcuaGVhZGVyJykubGVuZ3RoID4gMCkge1xyXG4gICAgICB2YXIgaGVhZGVyID0gJCgnLmhlYWRlcicpLFxyXG4gICAgICAgIHBvcyA9IDEwO1xyXG4gICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIGlmIChzY3JvbGwgPj0gcG9zKSB7XHJcbiAgICAgICAgICBoZWFkZXIuYWRkQ2xhc3MoJ3N0aWNreScpO1xyXG4gICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdoZWFkZXItc3RpY2snKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaGVhZGVyLnJlbW92ZUNsYXNzKCdzdGlja3knKTtcclxuICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaGVhZGVyLXN0aWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAkKCcudXNlci1hY250IGEnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ3VzcmFjbnQtb3BlbicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLnVzZXItaGVhZGVyIC5ub3RpZiBhJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdub3RpZi1vcGVuJyk7XHJcbiAgICB9KVxyXG5cclxuICAgICQoJy5hY2NvcmRpb24nKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyICR0ID0gJCh0aGlzKSxcclxuICAgICAgICAkY2FyZCA9ICR0LmZpbmQoJy5jYXJkJyk7XHJcblxyXG4gICAgICAkY2FyZC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgJGVsID0gJCh0aGlzKSxcclxuICAgICAgICAgICRoZWFkID0gJGVsLmZpbmQoJy5jYXJkLWhlYWRlcicpLFxyXG4gICAgICAgICAgJGJvZHkgPSAkZWwuZmluZCgnLmNhcmQtYm9keScpO1xyXG5cclxuICAgICAgICAkaGVhZC5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAkY2FyZC5ub3QoJGVsKS5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgJGVsLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQm9vdHNyYXAgU2VsZWN0XHJcbiAgICAkKCcuc2VsZWN0JykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAkKHRoaXMpLnNlbGVjdHBpY2tlcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRm9ybSBWYWxpZGF0aW9uXHJcbiAgICAkKCdmb3JtLnZhbHRoaXMnKS52YWxpZGF0ZSh7XHJcbiAgICAgIGZvY3VzSW52YWxpZDogZmFsc2UsXHJcbiAgICAgIGlnbm9yZTogXCI6ZGlzYWJsZWQsIDpoaWRkZW5cIixcclxuICAgICAgZXJyb3JQbGFjZW1lbnQ6IGZ1bmN0aW9uKGVycm9yLCBlbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIGZnID0gJChlbGVtZW50KS5jbG9zZXN0KCcuZm9ybS1ncm91cCcpLmZpbmQoJy5lcnItbXNnJyk7XHJcbiAgICAgICAgZXJyb3IuYXBwZW5kVG8oZmcpO1xyXG4gICAgICAgICQoJ3NlbGVjdC5zZWxlY3QnKS5zZWxlY3RwaWNrZXIoJ3JlZnJlc2gnKTtcclxuICAgICAgfSxcclxuICAgICAgIGludmFsaWRIYW5kbGVyOiBmdW5jdGlvbihmb3JtLCB2YWxpZGF0b3IpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghdmFsaWRhdG9yLm51bWJlck9mSW52YWxpZHMoKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJCh2YWxpZGF0b3IuZXJyb3JMaXN0WzBdLmVsZW1lbnQpLm9mZnNldCgpLnRvcCAtIDEyMFxyXG4gICAgICAgICAgICB9LCA4MDApO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdmb3JtLnZhbHRoaXMnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciBzZWxlY3QgPSAkKHRoaXMpLmZpbmQoJ3NlbGVjdC5zZWxlY3QnKTtcclxuICAgICAgc2VsZWN0Lm9uKCdjaGFuZ2VkLmJzLnNlbGVjdCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAkKHRoaXMpLnZhbGlkKCk7XHJcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuYm9vdHN0cmFwLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGpRdWVyeS5leHRlbmQoalF1ZXJ5LnZhbGlkYXRvci5tZXNzYWdlcywge1xyXG4gICAgICByZXF1aXJlZDogXCJLb2xvbSBpbmkgd2FqaWIgZGlpc2lcIixcclxuICAgICAgcmVtb3RlOiBcIlBsZWFzZSBmaXggdGhpcyBmaWVsZC5cIixcclxuICAgICAgZW1haWw6IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcy5cIixcclxuICAgICAgdXJsOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIFVSTC5cIixcclxuICAgICAgZGF0ZTogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBkYXRlLlwiLFxyXG4gICAgICBkYXRlSVNPOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGRhdGUgKElTTykuXCIsXHJcbiAgICAgIG51bWJlcjogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBudW1iZXIuXCIsXHJcbiAgICAgIGRpZ2l0czogXCJQbGVhc2UgZW50ZXIgb25seSBkaWdpdHMuXCIsXHJcbiAgICAgIGNyZWRpdGNhcmQ6IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgY3JlZGl0IGNhcmQgbnVtYmVyLlwiLFxyXG4gICAgICBlcXVhbFRvOiBcIlBsZWFzZSBlbnRlciB0aGUgc2FtZSB2YWx1ZSBhZ2Fpbi5cIixcclxuICAgICAgYWNjZXB0OiBcIlBsZWFzZSBlbnRlciBhIHZhbHVlIHdpdGggYSB2YWxpZCBleHRlbnNpb24uXCIsXHJcbiAgICAgIG1heGxlbmd0aDogalF1ZXJ5LnZhbGlkYXRvci5mb3JtYXQoXCJQbGVhc2UgZW50ZXIgbm8gbW9yZSB0aGFuIHswfSBjaGFyYWN0ZXJzLlwiKSxcclxuICAgICAgbWlubGVuZ3RoOiBqUXVlcnkudmFsaWRhdG9yLmZvcm1hdChcIlBsZWFzZSBlbnRlciBhdCBsZWFzdCB7MH0gY2hhcmFjdGVycy5cIiksXHJcbiAgICAgIHJhbmdlbGVuZ3RoOiBqUXVlcnkudmFsaWRhdG9yLmZvcm1hdChcIlBsZWFzZSBlbnRlciBhIHZhbHVlIGJldHdlZW4gezB9IGFuZCB7MX0gY2hhcmFjdGVycyBsb25nLlwiKSxcclxuICAgICAgcmFuZ2U6IGpRdWVyeS52YWxpZGF0b3IuZm9ybWF0KFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgYmV0d2VlbiB7MH0gYW5kIHsxfS5cIiksXHJcbiAgICAgIG1heDogalF1ZXJ5LnZhbGlkYXRvci5mb3JtYXQoXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gezB9LlwiKSxcclxuICAgICAgbWluOiBqUXVlcnkudmFsaWRhdG9yLmZvcm1hdChcIlBsZWFzZSBlbnRlciBhIHZhbHVlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB7MH0uXCIpXHJcbiAgICB9KTtcclxuXHJcbiAgJCgnLnNlbGVjdEFsdCcpLnNlbGVjdDIoXHJcbiAgICB7XHJcbiAgICAgIHBsYWNlaG9sZGVyOiAnUGlsaWggVGlwZSBQcm95ZWsnXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgLy8gQ291bnQgQ2hhclxyXG5cclxuICAkKCd0ZXh0YXJlYS5mb3JtLWNvbnRyb2wnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgYyA9ICQodGhpcykuc2libGluZ3MoJy5jb3VudGVyJyksXHJcbiAgICAgICAgY250ciA9IGMuZmluZCgnLmNudHInKSxcclxuICAgICAgICBtYXggPSBjLmZpbmQoJy5tYXgnKSxcclxuICAgICAgICBtYXhsID0gdC5hdHRyKCdtYXhsZW5ndGgnKTtcclxuICAgIGlmKG1heGwgPiAwICYmIG1heGwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgYy5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgY250ci5odG1sKCcwJyk7XHJcbiAgICAgIG1heC5odG1sKG1heGwpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2cobWF4bCk7XHJcbiAgICB0LmtleXVwKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciBsZW4gPSB0LnZhbCgpLmxlbmd0aDtcclxuICAgICAgY250ci5odG1sKGxlbik7XHJcbiAgICB9KTtcclxuICB9KVxyXG5cclxuICAkKCcubW9kYWwtc2V0dGluZ3MnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgbmwgPSB0LmZpbmQoJy5uYXYtbGluaycpLFxyXG4gICAgICAgIHR0ID0gJCgnI3RhYl90aXRsZScpO1xyXG5cclxuICAgIG5sLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIG5sdCA9ICQodGhpcykudGV4dCgpO1xyXG4gICAgICAkKHRoaXMpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdHQuaHRtbChubHQpO1xyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICAkKCcua2VhaGxpYW4nKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgc2sgPSAkKCdib2R5JykuZmluZCgnLnNlbGVjdC1rZWFobGlhbicpLFxyXG4gICAgICAgIHNzayA9ICQoJ2JvZHknKS5maW5kKCcuc2VsZWN0LXN1YmtlYWhsaWFuJyk7XHJcbiAgICBzay5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciBwID0gJCh0aGlzKSxcclxuICAgICAgICBzZWxlY3QgPSAkKHRoaXMpLmZpbmQoJy5zZWxlY3QnKTtcclxuICAgICAgc2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIHAuc2libGluZ3MoJy5zZWxlY3Qtc3Via2VhaGxpYW4nKS5zaG93KCk7XHJcbiAgICAgICAgJCgnLnNlbGVjdC1zdWJrZWFobGlhbi5sYWJlbCcpLnNob3coKTtcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfSlcclxuXHJcbiAgLy8gRGF0ZXBpY2tlclxyXG4gICQoJy5kYXRlJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIHZhciBpbnB1dCA9ICQodGhpcykuZmluZCgnaW5wdXQnKTtcclxuICAgIGlucHV0LmRhdGVwaWNrZXIoe1xyXG4gICAgICBhdXRvY2xvc2U6IHRydWUsXHJcbiAgICAgIGZvcm1hdCA6IFwiZGQvbW0veXl5eVwiXHJcbiAgICB9KTtcclxuICAgIGlucHV0LmNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgICAgJCh0aGlzKS52YWxpZCgpO1xyXG4gICAgfSlcclxuICB9KTtcclxuXHJcbiAgJCgnLnRpbWVsaW5lJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgIG0gPSB0LmZpbmQoJy5tb3JlJyk7XHJcbiAgICBtLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHQudG9nZ2xlQ2xhc3MoJ3Nob3dhbGwnKTtcclxuICAgIH0pXHJcbiAgfSk7XHJcblxyXG4gICQoJy5ib3gtZmlsZV9faXRlbScpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICBiID0gdC5maW5kKCcuZHdubGQtZmlsZScpO1xyXG4gICAgYi5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICB0LmFkZENsYXNzKCdkb3dubG9hZGluZycpO1xyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICAkKCcubW9kYWwtdWxhcy1wcm95ZWsnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgYnRucyA9IHQuZmluZCgnLmFjdGlvbi1idG4nKSxcclxuICAgICAgICBrdyA9IHQuZmluZCgnLmtvbWVudGFyLXdyYXAnKSxcclxuICAgICAgICByZXYgPSB0LmZpbmQoJy5yZXZpc2UtdG5nZ2FwYW4nKSxcclxuICAgICAgICBieGkgPSB0LmZpbmQoJy5ib3gtaW5wdCcpLFxyXG4gICAgICAgIGJ3ID0gdC5maW5kKCcuYnRuLXdyYXAnKSxcclxuICAgICAgICBjbHMgPSB0LmZpbmQoJy5jbHMtdG5nZ2FwYW4nKTtcclxuICAgIHJldi5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAkKHRoaXMpLnBhcmVudChidG5zKS5oaWRlKCk7XHJcbiAgICAgIGt3LmFkZENsYXNzKCdzaG93Jyk7XHJcbiAgICB9KTtcclxuICAgIGNscy5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgYnhpLmhpZGUoKTtcclxuICAgICAgYncuaGlkZSgpO1xyXG4gICAgICAkKHRoaXMpLnNpYmxpbmdzKCkuc2hvdygpO1xyXG4gICAgfSk7XHJcblxyXG4gIH0pO1xyXG5cclxuICAkKCcjQ29uZmlybU5vdGlmJykub24oJ3Nob3duLmJzLm1vZGFsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnLm1vZGFsJykubm90KCQodGhpcykpLmNzcygnei1pbmRleCcsICcwJyk7XHJcbiAgfSlcclxuXHJcbiAgJCgnI0NvbmZpcm1Ob3RpZicpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcubW9kYWwnKS5ub3QoJCh0aGlzKSkuY3NzKCd6LWluZGV4JywgJycpO1xyXG4gIH0pXHJcblxyXG4gIH0vLyBFTkQgb2YgZnVuYygpXHJcblxyXG59KSgpO1xyXG5cclxuXHJcblxyXG4kKCcubXVsdGlwbGllcicpLmVhY2goZnVuY3Rpb24oKXtcclxuICB2YXIgdCAgICAgICA9ICQodGhpcyksXHJcbiAgICAgIG1heCAgICAgPSB0LmRhdGEoJ21heCcpLFxyXG4gICAgICBpdGVtICAgID0gdC5maW5kKCcuaXRlbScpLmVxKDApLFxyXG4gICAgICBhZGQgICAgID0gdC5maW5kKCcuYnRuLWFkZCcpLFxyXG4gICAgICBmb3JtYXQ7XHJcblxyXG4gIGl0ZW0uZmluZCgnc2VsZWN0JykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS5zZWxlY3RwaWNrZXIoJ2Rlc3Ryb3knKTtcclxuICB9KTtcclxuXHJcbiAgZm9ybWF0ID0gaXRlbS5jbG9uZSgpLmhpZGUoKTtcclxuICBiaW5kKGl0ZW0pO1xyXG5cclxuICBmdW5jdGlvbiBiaW5kIChvYmopIHtcclxuICAgICQoJy5kYXRlJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKS5maW5kKCdpbnB1dCcpO1xyXG4gICAgICBpbnB1dC5kYXRlcGlja2VyKHtcclxuICAgICAgICBhdXRvY2xvc2U6IHRydWVcclxuICAgICAgfSk7XHJcbiAgICAgIGlucHV0LmNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLnZhbGlkKCk7XHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuICAgICQoJ3NlbGVjdC5zZWxlY3QnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICQodGhpcykuc2VsZWN0cGlja2VyKHtcclxuICAgICAgICBzdHlsZTogJ3NlbGVjdC1jb250cm9sJyxcclxuICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgIHNpemU6IDVcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlT3JkZXIob2JqKXtcclxuICAgIHZhciBpdG0gPSBvYmouZmluZCgnLml0ZW0nKTtcclxuICAgIGl0bS5lYWNoKGZ1bmN0aW9uKGkpe1xyXG4gICAgICB2YXIgdG1wID0gaSArIDE7XHJcbiAgICAgIC8vcmUgb3JkZXIgbmFtZVxyXG4gICAgICAkKHRoaXMpLmZpbmQoJ2lucHV0JykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKCQodGhpcykuYXR0cignbmFtZScpKXtcclxuICAgICAgICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKCduYW1lJykucmVwbGFjZSggL1xcW1xcZC9nLCdbJysoaSkpO1xyXG4gICAgICAgICAgJCh0aGlzKS5hdHRyKCduYW1lJyxuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICAvL3RvZ2dsZSBkZWxldGUgYnV0dG9uXHJcbiAgICBpZihpdG0ubGVuZ3RoID4gMSl7XHJcbiAgICAgIGl0bS5jbG9zZXN0KCcubXVsdGlwbGllcicpLmFkZENsYXNzKCdtdWx0aXBsaWVkJyk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgaXRtLmNsb3Nlc3QoJy5tdWx0aXBsaWVyJykucmVtb3ZlQ2xhc3MoJ211bHRpcGxpZWQnKTtcclxuICAgIH1cclxuICAgIC8vY2VrIGxpbWl0XHJcbiAgICBpZihpdG0ubGVuZ3RoID49IG1heCl7XHJcbiAgICAgIGl0bS5jbG9zZXN0KCcubXVsdGlwbGllcicpLmFkZENsYXNzKCdtYXgnKTtcclxuICAgIH1lbHNle1xyXG4gICAgICBpdG0uY2xvc2VzdCgnLm11bHRpcGxpZXInKS5yZW1vdmVDbGFzcygnbWF4Jyk7XHJcbiAgICB9O1xyXG4gICAgY29uc29sZS5sb2coaXRtLmxlbmd0aCk7XHJcbiAgfTtcclxuXHJcbiAgYWRkLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIGh0bWwgPSBmb3JtYXQuY2xvbmUoKTtcclxuICAgIHQuYXBwZW5kKGh0bWwpO1xyXG4gICAgYmluZChodG1sKTtcclxuICAgIGh0bWwuc2xpZGVEb3duKDMwMCk7XHJcbiAgICByZU9yZGVyKHQpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBERUxFVEVcclxuICAkKCdib2R5Jykub24oJ2NsaWNrJywnLmJ0bi1kZWwnLGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLml0ZW0nKSxcclxuICAgICAgICB0YXJnZXQgPSBwYXJlbnQuY2xvc2VzdCgnLm11bHRpcGxpZXInKTtcclxuXHJcbiAgICBwYXJlbnQuc2xpZGVVcCgzMDAsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIHBhcmVudC5yZW1vdmUoKTtcclxuICAgICAgcmVPcmRlcih0YXJnZXQpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pOyJdLCJmaWxlIjoibWFpbi5qcyJ9

//# sourceMappingURL=main.js.map
