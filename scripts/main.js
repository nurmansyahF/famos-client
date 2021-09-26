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
      // if($(this).text()=="Selengkapya"){
      //   t.addClass('showall');
      //   $(this).text('Sembunyikan');
      // }else{
      //   $(this).text('Selengkapnya');
      //   t.removeClass('showall');
      // }
    })
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgLy8gSU5MSU5FIFNWR1xyXG4gICAgalF1ZXJ5KCdpbWcuc3ZnJykuZWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICB2YXIgJGltZyA9IGpRdWVyeSh0aGlzKTtcclxuICAgICAgdmFyIGltZ0lEID0gJGltZy5hdHRyKCdpZCcpO1xyXG4gICAgICB2YXIgaW1nQ2xhc3MgPSAkaW1nLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICAgIHZhciBpbWdVUkwgPSAkaW1nLmF0dHIoJ3NyYycpO1xyXG5cclxuICAgICAgalF1ZXJ5LmdldChpbWdVUkwsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyICRzdmcgPSBqUXVlcnkoZGF0YSkuZmluZCgnc3ZnJyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbWdJRCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGltZ0NsYXNzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cignY2xhc3MnLCBpbWdDbGFzcyArICcgcmVwbGFjZWQtc3ZnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzdmcgPSAkc3ZnLnJlbW92ZUF0dHIoJ3htbG5zOmEnKTtcclxuICAgICAgICAkaW1nLnJlcGxhY2VXaXRoKCRzdmcpO1xyXG4gICAgICB9LCAneG1sJyk7XHJcbiAgICB9KTsvLyBFTkQgT0YgSU5MSU5FIFNWR1xyXG5cclxuXHJcbiAgICAkKCcuc2VsZWN0Jykuc2VsZWN0cGlja2VyKCk7XHJcblxyXG4gICAgbWFpbkxheW91dCgpO1xyXG4gICAgcnVuU2xpZGVyKCk7XHJcbiAgICBmdW5jKCk7XHJcblxyXG4gIH0gaW5pdCgpOyAvLyBFTkQgT0YgaW5pdCgpXHJcblxyXG4gIGZ1bmN0aW9uIG1haW5MYXlvdXQoKSB7XHJcbiAgICB2YXIgJGhlYWRlckggPSAkKCdoZWFkZXInKS5vdXRlckhlaWdodCgpLFxyXG4gICAgICAkZm9vdGVySCA9ICQoJ2Zvb3RlcicpLmhlaWdodCgpO1xyXG4gICAgJCgnbWFpbicpLmNzcyh7ICdtaW4taGVpZ2h0JzogJ2NhbGMoMTAwdmggLSAnICsgJGZvb3RlckggKyAncHgpJywgJ3BhZGRpbmctdG9wJzogKyRoZWFkZXJIICsgJ3B4JyB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJ1blNsaWRlcigpIHtcclxuICAgICQoJy5zbGlkZXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyICRzbGlkZXIgPSAkKHRoaXMpLFxyXG4gICAgICAgICRpdGVtID0gJHNsaWRlci5maW5kKCcuc2xpZGVyX19pdGVtJyksXHJcbiAgICAgICAgJGF1dG9wbGF5ID0gKCRzbGlkZXIuZGF0YSgnYXV0b3BsYXknKSA9PSB1bmRlZmluZWQpID8gdHJ1ZSA6ICRzbGlkZXIuZGF0YSgnYXV0b3BsYXknKSxcclxuICAgICAgICAkbWFyZ2luID0gKCRzbGlkZXIuZGF0YSgnbWFyZ2luJykgPT0gdW5kZWZpbmVkKSA/IDI0IDogJHNsaWRlci5kYXRhKCdtYXJnaW4nKTtcclxuXHJcbiAgICAgIGlmICgkaXRlbS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgJHNsaWRlci5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgIG5hdjogdHJ1ZSxcclxuICAgICAgICAgIG5hdlRleHQ6IFtcIjxzcGFuPjxpbWcgc3JjPScuLi9pbWFnZXMvaWMtY2hldnJvbi1sZWZ0LnN2Zyc+PC9zcGFuPlwiLCBcIjxzcGFuPjxpbWcgc3JjPScuLi9pbWFnZXMvaWMtY2hldnJvbi1yaWdodC5zdmcnPjwvc3Bhbj5cIl0sXHJcbiAgICAgICAgICBhdXRvcGxheTogJGF1dG9wbGF5LFxyXG4gICAgICAgICAgYXV0b3BsYXlUaW1lb3V0OiA2MDAwLFxyXG4gICAgICAgICAgYXV0b3BsYXlTcGVlZDogODAwLFxyXG4gICAgICAgICAgbWFyZ2luOiAkbWFyZ2luLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICRzbGlkZXIudHJpZ2dlcignZGVzdHJveS5vd2wuY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnb3dsLWNhcm91c2VsIG93bC1sb2FkZWQnKTtcclxuICAgICAgICAkc2xpZGVyLmZpbmQoJy5vd2wtc3RhZ2Utb3V0ZXInKS5jaGlsZHJlbigpLnVud3JhcCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuc2xpZGVyLW5hdicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJHNsaWRlciA9ICQodGhpcyksXHJcbiAgICAgICAgJGl0ZW0gPSAkc2xpZGVyLmZpbmQoJy5zbGlkZXJfX2l0ZW0nKSxcclxuICAgICAgICAkbWFyZ2luID0gKCRzbGlkZXIuZGF0YSgnbWFyZ2luJykgPT0gdW5kZWZpbmVkKSA/IDI0IDogJHNsaWRlci5kYXRhKCdtYXJnaW4nKTtcclxuXHJcbiAgICAgIGlmICgkaXRlbS5sZW5ndGggPiAzKSB7XHJcbiAgICAgICAgJHNsaWRlci5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgICBuYXY6IHRydWUsXHJcbiAgICAgICAgICBuYXZUZXh0OiBbXCI8c3Bhbj48aW1nIHNyYz0nLi4vaW1hZ2VzL2ljLWNoZXZyb24tbGVmdC5zdmcnPjwvc3Bhbj5cIiwgXCI8c3Bhbj48aW1nIHNyYz0nLi4vaW1hZ2VzL2ljLWNoZXZyb24tcmlnaHQuc3ZnJz48L3NwYW4+XCJdLFxyXG4gICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgYXV0b3BsYXlUaW1lb3V0OiA2MDAwLFxyXG4gICAgICAgICAgYXV0b3BsYXlTcGVlZDogODAwLFxyXG4gICAgICAgICAgYXV0b1dpZHRoOnRydWUsXHJcbiAgICAgICAgICBtYXJnaW46ICRtYXJnaW4sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJHNsaWRlci50cmlnZ2VyKCdkZXN0cm95Lm93bC5jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdvd2wtY2Fyb3VzZWwgb3dsLWxvYWRlZCcpO1xyXG4gICAgICAgICRzbGlkZXIuZmluZCgnLm93bC1zdGFnZS1vdXRlcicpLmNoaWxkcmVuKCkudW53cmFwKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5oZWFkLXNlYXJjaCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgYnRuID0gdC5maW5kKCdhJyksXHJcbiAgICAgICAgICBicyA9IHQuZmluZCgnLmJveF9zZWFyY2gnKTtcclxuICAgICAgdC5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGlmICh0Lmhhc0NsYXNzKCdocy1zaG93Jykpe1xyXG4gICAgICAgICAgdC5yZW1vdmVDbGFzcygnaHMtc2hvdycpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0LmFkZENsYXNzKCdocy1zaG93Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgJChkb2N1bWVudC5ib2R5KS5jbGljayggZnVuY3Rpb24oZSkge1xyXG4gICAgICBpZiAoJCgnLmhlYWQtc2VhcmNoJykuaGFzQ2xhc3MoJ2hzLXNob3cnKSl7XHJcbiAgICAgICAgJCgnLmhlYWQtc2VhcmNoJykucmVtb3ZlQ2xhc3MoJ2hzLXNob3cnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLm1hc3RoZWFkLS1ob21lJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciAkdCA9ICQodGhpcyksXHJcbiAgICAgICAgJHNsaWRlciA9ICR0LmZpbmQoJy5zbGlkZXInKSxcclxuICAgICAgICAkY29udGVudCA9ICR0LmZpbmQoJy5tYXN0aGVhZF9fY29udGVudCcpO1xyXG5cclxuICAgICAgJHNsaWRlci5vbignY2hhbmdlZC5vd2wuY2Fyb3VzZWwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAkY29udGVudC50b2dnbGVDbGFzcygnYWN0aXZlJylcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuYmxvY2stam91cm5leScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICRzbGlkZXIgPSAkdC5maW5kKCcuc2xpZGVyJyksXHJcbiAgICAgICAgJG5hdiA9ICR0LmZpbmQoJy5ibG9jay1qb3VybmV5X19zbGlkZXItbmF2JyksXHJcbiAgICAgICAgJG5hdkl0ZW0gPSAkbmF2LmZpbmQoJ2xpJyk7XHJcblxyXG4gICAgICAkbmF2SXRlbS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgJGVsID0gJCh0aGlzKSxcclxuICAgICAgICAgICRkYXRhID0gJCh0aGlzKS5kYXRhKCdpdGVtJyk7XHJcbiAgICAgICAgJGVsLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgJG5hdkl0ZW0ubm90KHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJGVsLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJHNsaWRlci50cmlnZ2VyKCd0by5vd2wuY2Fyb3VzZWwnLCBbJGRhdGEsIDIwMF0pO1xyXG4gICAgICAgICAgICAkc2xpZGVyLmZpbmQoJy5vd2wtaXRlbScpLmFkZENsYXNzKCd0cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICRzbGlkZXIuZmluZCgnLm93bC1pdGVtJykucmVtb3ZlQ2xhc3MoJ3RyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkc2xpZGVyLm9uKCdjaGFuZ2VkLm93bC5jYXJvdXNlbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyICRhY3RpdmVJbmRleCA9IGUuaXRlbS5pbmRleDtcclxuICAgICAgICAkbmF2SXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJG5hdkl0ZW0uZXEoJGFjdGl2ZUluZGV4KS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJGFjdGl2ZUluZGV4KTtcclxuICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5ibG9jay1hY2NvcmQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyICR0ID0gJCh0aGlzKSxcclxuICAgICAgICAkYWNjb3JkaW9uID0gJHQuZmluZCgnLmFjY29yZGlvbicpLFxyXG4gICAgICAgICRzbGlkZXIgPSAkdC5maW5kKCcuc2xpZGVyJyk7XHJcblxyXG4gICAgICAkYWNjb3JkaW9uLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciAkZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgJGNhcmQgPSAkZWwuZmluZCgnLmNhcmQnKTtcclxuXHJcbiAgICAgICAgJGNhcmQuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB2YXIgJGRhdGEgPSAkKHRoaXMpLmRhdGEoJ2l0ZW0nKTtcclxuICAgICAgICAgICQodGhpcykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2xpZGVyLnRyaWdnZXIoJ3RvLm93bC5jYXJvdXNlbCcsIFskZGF0YSwgMjAwXSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkc2xpZGVyLm9uKCdjaGFuZ2VkLm93bC5jYXJvdXNlbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyICRhY3RpdmVJbmRleCA9IGUuaXRlbS5pbmRleDtcclxuICAgICAgICAkYWNjb3JkaW9uLmZpbmQoJy5jYXJkJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAkYWNjb3JkaW9uLmZpbmQoJy5jYXJkJykuZXEoJGFjdGl2ZUluZGV4KS5hZGRDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICRhY2NvcmRpb24uZmluZCgnLmNhcmQnKS5lcSgkYWN0aXZlSW5kZXgpLmZpbmQoJy5jb2xsYXBzZScpLmNvbGxhcHNlKCd0b2dnbGUnKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9Ly8gZW5kIG9mIHJ1blNsaWRlcigpXHJcblxyXG4gIGZ1bmN0aW9uIGZ1bmMoKSB7XHJcblxyXG4gICAgLy8gU1RJQ0tZIEhFQURFUlxyXG4gICAgaWYgKCQoJy5oZWFkZXInKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHZhciBoZWFkZXIgPSAkKCcuaGVhZGVyJyksXHJcbiAgICAgICAgcG9zID0gMTA7XHJcbiAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgaWYgKHNjcm9sbCA+PSBwb3MpIHtcclxuICAgICAgICAgIGhlYWRlci5hZGRDbGFzcygnc3RpY2t5Jyk7XHJcbiAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2hlYWRlci1zdGljaycpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBoZWFkZXIucmVtb3ZlQ2xhc3MoJ3N0aWNreScpO1xyXG4gICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdoZWFkZXItc3RpY2snKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICQoJy51c2VyLWFjbnQgYScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygndXNyYWNudC1vcGVuJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcudXNlci1oZWFkZXIgLm5vdGlmIGEnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ25vdGlmLW9wZW4nKTtcclxuICAgIH0pXHJcblxyXG4gICAgJCgnLmFjY29yZGlvbicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICRjYXJkID0gJHQuZmluZCgnLmNhcmQnKTtcclxuXHJcbiAgICAgICRjYXJkLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciAkZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgJGhlYWQgPSAkZWwuZmluZCgnLmNhcmQtaGVhZGVyJyksXHJcbiAgICAgICAgICAkYm9keSA9ICRlbC5maW5kKCcuY2FyZC1ib2R5Jyk7XHJcblxyXG4gICAgICAgICRoZWFkLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICRjYXJkLm5vdCgkZWwpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAkZWwudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBCb290c3JhcCBTZWxlY3RcclxuICAgICQoJy5zZWxlY3QnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICQodGhpcykuc2VsZWN0cGlja2VyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBGb3JtIFZhbGlkYXRpb25cclxuICAgICQoJ2Zvcm0udmFsdGhpcycpLnZhbGlkYXRlKHtcclxuICAgICAgZm9jdXNJbnZhbGlkOiBmYWxzZSxcclxuICAgICAgaWdub3JlOiBcIjpkaXNhYmxlZCwgOmhpZGRlblwiLFxyXG4gICAgICBlcnJvclBsYWNlbWVudDogZnVuY3Rpb24oZXJyb3IsIGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgZmcgPSAkKGVsZW1lbnQpLmNsb3Nlc3QoJy5mb3JtLWdyb3VwJykuZmluZCgnLmVyci1tc2cnKTtcclxuICAgICAgICBlcnJvci5hcHBlbmRUbyhmZyk7XHJcbiAgICAgICAgJCgnc2VsZWN0LnNlbGVjdCcpLnNlbGVjdHBpY2tlcigncmVmcmVzaCcpO1xyXG4gICAgICB9LFxyXG4gICAgICAgaW52YWxpZEhhbmRsZXI6IGZ1bmN0aW9uKGZvcm0sIHZhbGlkYXRvcikge1xyXG5cclxuICAgICAgICAgICAgaWYgKCF2YWxpZGF0b3IubnVtYmVyT2ZJbnZhbGlkcygpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKHZhbGlkYXRvci5lcnJvckxpc3RbMF0uZWxlbWVudCkub2Zmc2V0KCkudG9wIC0gMTIwXHJcbiAgICAgICAgICAgIH0sIDgwMCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJ2Zvcm0udmFsdGhpcycpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIHNlbGVjdCA9ICQodGhpcykuZmluZCgnc2VsZWN0LnNlbGVjdCcpO1xyXG4gICAgICBzZWxlY3Qub24oJ2NoYW5nZWQuYnMuc2VsZWN0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICQodGhpcykudmFsaWQoKTtcclxuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5ib290c3RyYXAtc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgalF1ZXJ5LmV4dGVuZChqUXVlcnkudmFsaWRhdG9yLm1lc3NhZ2VzLCB7XHJcbiAgICAgIHJlcXVpcmVkOiBcIktvbG9tIGluaSB3YWppYiBkaWlzaVwiLFxyXG4gICAgICByZW1vdGU6IFwiUGxlYXNlIGZpeCB0aGlzIGZpZWxkLlwiLFxyXG4gICAgICBlbWFpbDogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzLlwiLFxyXG4gICAgICB1cmw6IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgVVJMLlwiLFxyXG4gICAgICBkYXRlOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGRhdGUuXCIsXHJcbiAgICAgIGRhdGVJU086IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZGF0ZSAoSVNPKS5cIixcclxuICAgICAgbnVtYmVyOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIG51bWJlci5cIixcclxuICAgICAgZGlnaXRzOiBcIlBsZWFzZSBlbnRlciBvbmx5IGRpZ2l0cy5cIixcclxuICAgICAgY3JlZGl0Y2FyZDogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBjcmVkaXQgY2FyZCBudW1iZXIuXCIsXHJcbiAgICAgIGVxdWFsVG86IFwiUGxlYXNlIGVudGVyIHRoZSBzYW1lIHZhbHVlIGFnYWluLlwiLFxyXG4gICAgICBhY2NlcHQ6IFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgd2l0aCBhIHZhbGlkIGV4dGVuc2lvbi5cIixcclxuICAgICAgbWF4bGVuZ3RoOiBqUXVlcnkudmFsaWRhdG9yLmZvcm1hdChcIlBsZWFzZSBlbnRlciBubyBtb3JlIHRoYW4gezB9IGNoYXJhY3RlcnMuXCIpLFxyXG4gICAgICBtaW5sZW5ndGg6IGpRdWVyeS52YWxpZGF0b3IuZm9ybWF0KFwiUGxlYXNlIGVudGVyIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLlwiKSxcclxuICAgICAgcmFuZ2VsZW5ndGg6IGpRdWVyeS52YWxpZGF0b3IuZm9ybWF0KFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgYmV0d2VlbiB7MH0gYW5kIHsxfSBjaGFyYWN0ZXJzIGxvbmcuXCIpLFxyXG4gICAgICByYW5nZTogalF1ZXJ5LnZhbGlkYXRvci5mb3JtYXQoXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBiZXR3ZWVuIHswfSBhbmQgezF9LlwiKSxcclxuICAgICAgbWF4OiBqUXVlcnkudmFsaWRhdG9yLmZvcm1hdChcIlBsZWFzZSBlbnRlciBhIHZhbHVlIGxlc3MgdGhhbiBvciBlcXVhbCB0byB7MH0uXCIpLFxyXG4gICAgICBtaW46IGpRdWVyeS52YWxpZGF0b3IuZm9ybWF0KFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHswfS5cIilcclxuICAgIH0pO1xyXG5cclxuICAkKCcuc2VsZWN0QWx0Jykuc2VsZWN0MihcclxuICAgIHtcclxuICAgICAgcGxhY2Vob2xkZXI6ICdQaWxpaCBUaXBlIFByb3llaydcclxuICAgIH1cclxuICApO1xyXG5cclxuICAvLyBDb3VudCBDaGFyXHJcblxyXG4gICQoJ3RleHRhcmVhLmZvcm0tY29udHJvbCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICBjID0gJCh0aGlzKS5zaWJsaW5ncygnLmNvdW50ZXInKSxcclxuICAgICAgICBjbnRyID0gYy5maW5kKCcuY250cicpLFxyXG4gICAgICAgIG1heCA9IGMuZmluZCgnLm1heCcpLFxyXG4gICAgICAgIG1heGwgPSB0LmF0dHIoJ21heGxlbmd0aCcpO1xyXG4gICAgaWYobWF4bCA+IDAgJiYgbWF4bCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICBjLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICBjbnRyLmh0bWwoJzAnKTtcclxuICAgICAgbWF4Lmh0bWwobWF4bCk7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhtYXhsKTtcclxuICAgIHQua2V5dXAoZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIGxlbiA9IHQudmFsKCkubGVuZ3RoO1xyXG4gICAgICBjbnRyLmh0bWwobGVuKTtcclxuICAgIH0pO1xyXG4gIH0pXHJcblxyXG4gICQoJy5tb2RhbC1zZXR0aW5ncycpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICBubCA9IHQuZmluZCgnLm5hdi1saW5rJyksXHJcbiAgICAgICAgdHQgPSAkKCcjdGFiX3RpdGxlJyk7XHJcblxyXG4gICAgbmwuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgbmx0ID0gJCh0aGlzKS50ZXh0KCk7XHJcbiAgICAgICQodGhpcykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICB0dC5odG1sKG5sdCk7XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH0pXHJcblxyXG4gICQoJy5rZWFobGlhbicpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICBzayA9ICQoJ2JvZHknKS5maW5kKCcuc2VsZWN0LWtlYWhsaWFuJyksXHJcbiAgICAgICAgc3NrID0gJCgnYm9keScpLmZpbmQoJy5zZWxlY3Qtc3Via2VhaGxpYW4nKTtcclxuICAgIHNrLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIHAgPSAkKHRoaXMpLFxyXG4gICAgICAgIHNlbGVjdCA9ICQodGhpcykuZmluZCgnLnNlbGVjdCcpO1xyXG4gICAgICBzZWxlY3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcC5zaWJsaW5ncygnLnNlbGVjdC1zdWJrZWFobGlhbicpLnNob3coKTtcclxuICAgICAgICAkKCcuc2VsZWN0LXN1YmtlYWhsaWFuLmxhYmVsJykuc2hvdygpO1xyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICAvLyBEYXRlcGlja2VyXHJcbiAgJCgnLmRhdGUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGlucHV0ID0gJCh0aGlzKS5maW5kKCdpbnB1dCcpO1xyXG4gICAgaW5wdXQuZGF0ZXBpY2tlcih7XHJcbiAgICAgIGF1dG9jbG9zZTogdHJ1ZSxcclxuICAgICAgZm9ybWF0IDogXCJkZC9tbS95eXl5XCJcclxuICAgIH0pO1xyXG4gICAgaW5wdXQuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAkKHRoaXMpLnZhbGlkKCk7XHJcbiAgICB9KVxyXG4gIH0pO1xyXG5cclxuICAkKCcudGltZWxpbmUnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgbSA9IHQuZmluZCgnLm1vcmUnKTtcclxuICAgIG0uY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgdC50b2dnbGVDbGFzcygnc2hvd2FsbCcpO1xyXG4gICAgICAvLyBpZigkKHRoaXMpLnRleHQoKT09XCJTZWxlbmdrYXB5YVwiKXtcclxuICAgICAgLy8gICB0LmFkZENsYXNzKCdzaG93YWxsJyk7XHJcbiAgICAgIC8vICAgJCh0aGlzKS50ZXh0KCdTZW1idW55aWthbicpO1xyXG4gICAgICAvLyB9ZWxzZXtcclxuICAgICAgLy8gICAkKHRoaXMpLnRleHQoJ1NlbGVuZ2thcG55YScpO1xyXG4gICAgICAvLyAgIHQucmVtb3ZlQ2xhc3MoJ3Nob3dhbGwnKTtcclxuICAgICAgLy8gfVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICB9Ly8gRU5EIG9mIGZ1bmMoKVxyXG5cclxufSkoKTtcclxuXHJcblxyXG5cclxuJCgnLm11bHRpcGxpZXInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHQgICAgICAgPSAkKHRoaXMpLFxyXG4gICAgICBtYXggICAgID0gdC5kYXRhKCdtYXgnKSxcclxuICAgICAgaXRlbSAgICA9IHQuZmluZCgnLml0ZW0nKS5lcSgwKSxcclxuICAgICAgYWRkICAgICA9IHQuZmluZCgnLmJ0bi1hZGQnKSxcclxuICAgICAgZm9ybWF0O1xyXG5cclxuICBpdGVtLmZpbmQoJ3NlbGVjdCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykuc2VsZWN0cGlja2VyKCdkZXN0cm95Jyk7XHJcbiAgfSk7XHJcblxyXG4gIGZvcm1hdCA9IGl0ZW0uY2xvbmUoKS5oaWRlKCk7XHJcbiAgYmluZChpdGVtKTtcclxuXHJcbiAgZnVuY3Rpb24gYmluZCAob2JqKSB7XHJcbiAgICAkKCcuZGF0ZScpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBpbnB1dCA9ICQodGhpcykuZmluZCgnaW5wdXQnKTtcclxuICAgICAgaW5wdXQuZGF0ZXBpY2tlcih7XHJcbiAgICAgICAgYXV0b2Nsb3NlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG4gICAgICBpbnB1dC5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS52YWxpZCgpO1xyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcbiAgICAkKCdzZWxlY3Quc2VsZWN0JykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAkKHRoaXMpLnNlbGVjdHBpY2tlcih7XHJcbiAgICAgICAgc3R5bGU6ICdzZWxlY3QtY29udHJvbCcsXHJcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICBzaXplOiA1XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZU9yZGVyKG9iail7XHJcbiAgICB2YXIgaXRtID0gb2JqLmZpbmQoJy5pdGVtJyk7XHJcbiAgICBpdG0uZWFjaChmdW5jdGlvbihpKXtcclxuICAgICAgdmFyIHRtcCA9IGkgKyAxO1xyXG4gICAgICAvL3JlIG9yZGVyIG5hbWVcclxuICAgICAgJCh0aGlzKS5maW5kKCdpbnB1dCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICBpZigkKHRoaXMpLmF0dHIoJ25hbWUnKSl7XHJcbiAgICAgICAgICB2YXIgbmFtZSA9ICQodGhpcykuYXR0cignbmFtZScpLnJlcGxhY2UoIC9cXFtcXGQvZywnWycrKGkpKTtcclxuICAgICAgICAgICQodGhpcykuYXR0cignbmFtZScsbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgLy90b2dnbGUgZGVsZXRlIGJ1dHRvblxyXG4gICAgaWYoaXRtLmxlbmd0aCA+IDEpe1xyXG4gICAgICBpdG0uY2xvc2VzdCgnLm11bHRpcGxpZXInKS5hZGRDbGFzcygnbXVsdGlwbGllZCcpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIGl0bS5jbG9zZXN0KCcubXVsdGlwbGllcicpLnJlbW92ZUNsYXNzKCdtdWx0aXBsaWVkJyk7XHJcbiAgICB9XHJcbiAgICAvL2NlayBsaW1pdFxyXG4gICAgaWYoaXRtLmxlbmd0aCA+PSBtYXgpe1xyXG4gICAgICBpdG0uY2xvc2VzdCgnLm11bHRpcGxpZXInKS5hZGRDbGFzcygnbWF4Jyk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgaXRtLmNsb3Nlc3QoJy5tdWx0aXBsaWVyJykucmVtb3ZlQ2xhc3MoJ21heCcpO1xyXG4gICAgfTtcclxuICAgIGNvbnNvbGUubG9nKGl0bS5sZW5ndGgpO1xyXG4gIH07XHJcblxyXG4gIGFkZC5jbGljayhmdW5jdGlvbihlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBodG1sID0gZm9ybWF0LmNsb25lKCk7XHJcbiAgICB0LmFwcGVuZChodG1sKTtcclxuICAgIGJpbmQoaHRtbCk7XHJcbiAgICBodG1sLnNsaWRlRG93bigzMDApO1xyXG4gICAgcmVPcmRlcih0KTtcclxuICB9KTtcclxuXHJcbiAgLy8gREVMRVRFXHJcbiAgJCgnYm9keScpLm9uKCdjbGljaycsJy5idG4tZGVsJyxmdW5jdGlvbihlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5pdGVtJyksXHJcbiAgICAgICAgdGFyZ2V0ID0gcGFyZW50LmNsb3Nlc3QoJy5tdWx0aXBsaWVyJyk7XHJcblxyXG4gICAgcGFyZW50LnNsaWRlVXAoMzAwLCBmdW5jdGlvbigpe1xyXG4gICAgICBwYXJlbnQucmVtb3ZlKCk7XHJcbiAgICAgIHJlT3JkZXIodGFyZ2V0KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTsiXSwiZmlsZSI6Im1haW4uanMifQ==

//# sourceMappingURL=main.js.map
