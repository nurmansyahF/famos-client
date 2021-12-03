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


    $('.proyek-list_filter .select').selectpicker();

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
    });

    $('.nav-mobile').each(function(){
      $(this).click(function(){
        $('#wrap').toggleClass('menu-show');
      })
    });

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
    // $('.select').each(function(){
    //   $(this).selectpicker();
    // });

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

  $('table').each(function(){
    var t = $(this),
        tr = t.find('tr'),
        ln = t.find('a'),
        lnk = ln.attr("href");
    console.log(lnk);
    tr.each(function(){
      $(this).click(function(){
        window.location = lnk;
      })
    });
  })

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

  // $('.keahlian').each(function(){
  //   var t = $(this),
  //       sk = $('body').find('.select-keahlian'),
  //       ssk = $('body').find('.select-subkeahlian');
  //   sk.each(function(){
  //     var p = $(this),
  //       select = $(this).find('.select');
  //     select.on('change', function(){
  //       p.siblings('.select-subkeahlian').show();
  //       $('.select-subkeahlian.label').show();
  //     })
  //   })
  // })

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

  $('.icon-date').each(function() {
    var ic = $(this);
    ic.datepicker({
      autoclose: true,
      format : "dd/mm/yyyy"
    });
    ic.change(function() {
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

  $('.proyek-list_table_mobile').each(function(){
    var t = $(this),
        pi = t.find('.proyek-item');
    pi.each(function(){
      $(this).click(function(){
        $(this).toggleClass('expanded');
      });
    })
  });


  }// END of func()

})();



$('.multiplier').each(function(){
  var t       = $(this),
      max     = t.data('max'),
      item    = t.find('.item').eq(0),
      add     = t.find('.btn-add'),
      format;

  item.find('.select').each(function(){
    // $(this).selectpicker('destroy');
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
    $('.select').selectpicker();
    // $('select.select').each(function(){
    //   $(this).selectpicker({
    //     style: 'select-control',
    //     width: '100%',
    //     size: 5
    //   });
    // });
  }

  function reOrder(obj){
    var itm = obj.find('.item');
    itm.each(function(i){
      var tmp = i + 1;
      //re order name
      $(this).find('select').each(function(){
        if($(this).attr('name')){
          var name = $(this).attr('name').replace( /\[\d/g,'['+(i));
          $(this).attr('name',name);
        }
        if($(this).attr('id')){
          var name = $(this).attr('id').replace( /\[\d/g,'['+(i));
          $(this).attr('id',name);
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
    getBudget();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgLy8gSU5MSU5FIFNWR1xyXG4gICAgalF1ZXJ5KCdpbWcuc3ZnJykuZWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICB2YXIgJGltZyA9IGpRdWVyeSh0aGlzKTtcclxuICAgICAgdmFyIGltZ0lEID0gJGltZy5hdHRyKCdpZCcpO1xyXG4gICAgICB2YXIgaW1nQ2xhc3MgPSAkaW1nLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICAgIHZhciBpbWdVUkwgPSAkaW1nLmF0dHIoJ3NyYycpO1xyXG5cclxuICAgICAgalF1ZXJ5LmdldChpbWdVUkwsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyICRzdmcgPSBqUXVlcnkoZGF0YSkuZmluZCgnc3ZnJyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbWdJRCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGltZ0NsYXNzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cignY2xhc3MnLCBpbWdDbGFzcyArICcgcmVwbGFjZWQtc3ZnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzdmcgPSAkc3ZnLnJlbW92ZUF0dHIoJ3htbG5zOmEnKTtcclxuICAgICAgICAkaW1nLnJlcGxhY2VXaXRoKCRzdmcpO1xyXG4gICAgICB9LCAneG1sJyk7XHJcbiAgICB9KTsvLyBFTkQgT0YgSU5MSU5FIFNWR1xyXG5cclxuXHJcbiAgICAkKCcucHJveWVrLWxpc3RfZmlsdGVyIC5zZWxlY3QnKS5zZWxlY3RwaWNrZXIoKTtcclxuXHJcbiAgICBtYWluTGF5b3V0KCk7XHJcbiAgICBydW5TbGlkZXIoKTtcclxuICAgIGZ1bmMoKTtcclxuXHJcbiAgfSBpbml0KCk7IC8vIEVORCBPRiBpbml0KClcclxuXHJcbiAgZnVuY3Rpb24gbWFpbkxheW91dCgpIHtcclxuICAgIHZhciAkaGVhZGVySCA9ICQoJ2hlYWRlcicpLm91dGVySGVpZ2h0KCksXHJcbiAgICAgICRmb290ZXJIID0gJCgnZm9vdGVyJykuaGVpZ2h0KCk7XHJcbiAgICAkKCdtYWluJykuY3NzKHsgJ21pbi1oZWlnaHQnOiAnY2FsYygxMDB2aCAtICcgKyAkZm9vdGVySCArICdweCknLCAncGFkZGluZy10b3AnOiArJGhlYWRlckggKyAncHgnIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcnVuU2xpZGVyKCkge1xyXG4gICAgJCgnLnNsaWRlcicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJHNsaWRlciA9ICQodGhpcyksXHJcbiAgICAgICAgJGl0ZW0gPSAkc2xpZGVyLmZpbmQoJy5zbGlkZXJfX2l0ZW0nKSxcclxuICAgICAgICAkYXV0b3BsYXkgPSAoJHNsaWRlci5kYXRhKCdhdXRvcGxheScpID09IHVuZGVmaW5lZCkgPyB0cnVlIDogJHNsaWRlci5kYXRhKCdhdXRvcGxheScpLFxyXG4gICAgICAgICRtYXJnaW4gPSAoJHNsaWRlci5kYXRhKCdtYXJnaW4nKSA9PSB1bmRlZmluZWQpID8gMjQgOiAkc2xpZGVyLmRhdGEoJ21hcmdpbicpO1xyXG5cclxuICAgICAgaWYgKCRpdGVtLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAkc2xpZGVyLm93bENhcm91c2VsKHtcclxuICAgICAgICAgIGl0ZW1zOiAxLFxyXG4gICAgICAgICAgbG9vcDogZmFsc2UsXHJcbiAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgbmF2OiB0cnVlLFxyXG4gICAgICAgICAgbmF2VGV4dDogW1wiPHNwYW4+PGltZyBzcmM9Jy4uL2ltYWdlcy9pYy1jaGV2cm9uLWxlZnQuc3ZnJz48L3NwYW4+XCIsIFwiPHNwYW4+PGltZyBzcmM9Jy4uL2ltYWdlcy9pYy1jaGV2cm9uLXJpZ2h0LnN2Zyc+PC9zcGFuPlwiXSxcclxuICAgICAgICAgIGF1dG9wbGF5OiAkYXV0b3BsYXksXHJcbiAgICAgICAgICBhdXRvcGxheVRpbWVvdXQ6IDYwMDAsXHJcbiAgICAgICAgICBhdXRvcGxheVNwZWVkOiA4MDAsXHJcbiAgICAgICAgICBtYXJnaW46ICRtYXJnaW4sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJHNsaWRlci50cmlnZ2VyKCdkZXN0cm95Lm93bC5jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdvd2wtY2Fyb3VzZWwgb3dsLWxvYWRlZCcpO1xyXG4gICAgICAgICRzbGlkZXIuZmluZCgnLm93bC1zdGFnZS1vdXRlcicpLmNoaWxkcmVuKCkudW53cmFwKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5zbGlkZXItbmF2JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciAkc2xpZGVyID0gJCh0aGlzKSxcclxuICAgICAgICAkaXRlbSA9ICRzbGlkZXIuZmluZCgnLnNsaWRlcl9faXRlbScpLFxyXG4gICAgICAgICRtYXJnaW4gPSAoJHNsaWRlci5kYXRhKCdtYXJnaW4nKSA9PSB1bmRlZmluZWQpID8gMjQgOiAkc2xpZGVyLmRhdGEoJ21hcmdpbicpO1xyXG5cclxuICAgICAgaWYgKCRpdGVtLmxlbmd0aCA+IDMpIHtcclxuICAgICAgICAkc2xpZGVyLm93bENhcm91c2VsKHtcclxuICAgICAgICAgIGl0ZW1zOiAxLFxyXG4gICAgICAgICAgbG9vcDogZmFsc2UsXHJcbiAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgIG5hdjogdHJ1ZSxcclxuICAgICAgICAgIG5hdlRleHQ6IFtcIjxzcGFuPjxpbWcgc3JjPScuLi9pbWFnZXMvaWMtY2hldnJvbi1sZWZ0LnN2Zyc+PC9zcGFuPlwiLCBcIjxzcGFuPjxpbWcgc3JjPScuLi9pbWFnZXMvaWMtY2hldnJvbi1yaWdodC5zdmcnPjwvc3Bhbj5cIl0sXHJcbiAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICAgICAgICBhdXRvcGxheVRpbWVvdXQ6IDYwMDAsXHJcbiAgICAgICAgICBhdXRvcGxheVNwZWVkOiA4MDAsXHJcbiAgICAgICAgICBhdXRvV2lkdGg6dHJ1ZSxcclxuICAgICAgICAgIG1hcmdpbjogJG1hcmdpbixcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkc2xpZGVyLnRyaWdnZXIoJ2Rlc3Ryb3kub3dsLmNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ293bC1jYXJvdXNlbCBvd2wtbG9hZGVkJyk7XHJcbiAgICAgICAgJHNsaWRlci5maW5kKCcub3dsLXN0YWdlLW91dGVyJykuY2hpbGRyZW4oKS51bndyYXAoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmhlYWQtc2VhcmNoJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgICBidG4gPSB0LmZpbmQoJ2EnKSxcclxuICAgICAgICAgIGJzID0gdC5maW5kKCcuYm94X3NlYXJjaCcpO1xyXG4gICAgICB0LmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgaWYgKHQuaGFzQ2xhc3MoJ2hzLXNob3cnKSl7XHJcbiAgICAgICAgICB0LnJlbW92ZUNsYXNzKCdocy1zaG93Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHQuYWRkQ2xhc3MoJ2hzLXNob3cnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudC5ib2R5KS5jbGljayggZnVuY3Rpb24oZSkge1xyXG4gICAgICBpZiAoJCgnLmhlYWQtc2VhcmNoJykuaGFzQ2xhc3MoJ2hzLXNob3cnKSl7XHJcbiAgICAgICAgJCgnLmhlYWQtc2VhcmNoJykucmVtb3ZlQ2xhc3MoJ2hzLXNob3cnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLnNpZGViYXIgLnVzZXItYWNjb3VudCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgZGQgPSB0LmZpbmQoJy51c2VyLWFjbnRfbWVudScpO1xyXG4gICAgICAgIHQuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHQudG9nZ2xlQ2xhc3MoJ2RkLXNob3cnKTtcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLm1hc3RoZWFkLS1ob21lJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciAkdCA9ICQodGhpcyksXHJcbiAgICAgICAgJHNsaWRlciA9ICR0LmZpbmQoJy5zbGlkZXInKSxcclxuICAgICAgICAkY29udGVudCA9ICR0LmZpbmQoJy5tYXN0aGVhZF9fY29udGVudCcpO1xyXG5cclxuICAgICAgJHNsaWRlci5vbignY2hhbmdlZC5vd2wuY2Fyb3VzZWwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAkY29udGVudC50b2dnbGVDbGFzcygnYWN0aXZlJylcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuYmxvY2stam91cm5leScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICRzbGlkZXIgPSAkdC5maW5kKCcuc2xpZGVyJyksXHJcbiAgICAgICAgJG5hdiA9ICR0LmZpbmQoJy5ibG9jay1qb3VybmV5X19zbGlkZXItbmF2JyksXHJcbiAgICAgICAgJG5hdkl0ZW0gPSAkbmF2LmZpbmQoJ2xpJyk7XHJcblxyXG4gICAgICAkbmF2SXRlbS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgJGVsID0gJCh0aGlzKSxcclxuICAgICAgICAgICRkYXRhID0gJCh0aGlzKS5kYXRhKCdpdGVtJyk7XHJcbiAgICAgICAgJGVsLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgJG5hdkl0ZW0ubm90KHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJGVsLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJHNsaWRlci50cmlnZ2VyKCd0by5vd2wuY2Fyb3VzZWwnLCBbJGRhdGEsIDIwMF0pO1xyXG4gICAgICAgICAgICAkc2xpZGVyLmZpbmQoJy5vd2wtaXRlbScpLmFkZENsYXNzKCd0cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICRzbGlkZXIuZmluZCgnLm93bC1pdGVtJykucmVtb3ZlQ2xhc3MoJ3RyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkc2xpZGVyLm9uKCdjaGFuZ2VkLm93bC5jYXJvdXNlbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyICRhY3RpdmVJbmRleCA9IGUuaXRlbS5pbmRleDtcclxuICAgICAgICAkbmF2SXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJG5hdkl0ZW0uZXEoJGFjdGl2ZUluZGV4KS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJGFjdGl2ZUluZGV4KTtcclxuICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5ibG9jay1hY2NvcmQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyICR0ID0gJCh0aGlzKSxcclxuICAgICAgICAkYWNjb3JkaW9uID0gJHQuZmluZCgnLmFjY29yZGlvbicpLFxyXG4gICAgICAgICRzbGlkZXIgPSAkdC5maW5kKCcuc2xpZGVyJyk7XHJcblxyXG4gICAgICAkYWNjb3JkaW9uLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciAkZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgJGNhcmQgPSAkZWwuZmluZCgnLmNhcmQnKTtcclxuXHJcbiAgICAgICAgJGNhcmQuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB2YXIgJGRhdGEgPSAkKHRoaXMpLmRhdGEoJ2l0ZW0nKTtcclxuICAgICAgICAgICQodGhpcykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2xpZGVyLnRyaWdnZXIoJ3RvLm93bC5jYXJvdXNlbCcsIFskZGF0YSwgMjAwXSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkc2xpZGVyLm9uKCdjaGFuZ2VkLm93bC5jYXJvdXNlbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyICRhY3RpdmVJbmRleCA9IGUuaXRlbS5pbmRleDtcclxuICAgICAgICAkYWNjb3JkaW9uLmZpbmQoJy5jYXJkJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAkYWNjb3JkaW9uLmZpbmQoJy5jYXJkJykuZXEoJGFjdGl2ZUluZGV4KS5hZGRDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICRhY2NvcmRpb24uZmluZCgnLmNhcmQnKS5lcSgkYWN0aXZlSW5kZXgpLmZpbmQoJy5jb2xsYXBzZScpLmNvbGxhcHNlKCd0b2dnbGUnKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9Ly8gZW5kIG9mIHJ1blNsaWRlcigpXHJcblxyXG4gIGZ1bmN0aW9uIGZ1bmMoKSB7XHJcblxyXG4gICAgLy8gU1RJQ0tZIEhFQURFUlxyXG4gICAgaWYgKCQoJy5oZWFkZXInKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHZhciBoZWFkZXIgPSAkKCcuaGVhZGVyJyksXHJcbiAgICAgICAgcG9zID0gMTA7XHJcbiAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgaWYgKHNjcm9sbCA+PSBwb3MpIHtcclxuICAgICAgICAgIGhlYWRlci5hZGRDbGFzcygnc3RpY2t5Jyk7XHJcbiAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2hlYWRlci1zdGljaycpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBoZWFkZXIucmVtb3ZlQ2xhc3MoJ3N0aWNreScpO1xyXG4gICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdoZWFkZXItc3RpY2snKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICQoJy51c2VyLWFjbnQgYScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygndXNyYWNudC1vcGVuJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcudXNlci1oZWFkZXIgLm5vdGlmIGEnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ25vdGlmLW9wZW4nKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5uYXYtbW9iaWxlJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAkKHRoaXMpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnI3dyYXAnKS50b2dnbGVDbGFzcygnbWVudS1zaG93Jyk7XHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuYWNjb3JkaW9uJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciAkdCA9ICQodGhpcyksXHJcbiAgICAgICAgJGNhcmQgPSAkdC5maW5kKCcuY2FyZCcpO1xyXG5cclxuICAgICAgJGNhcmQuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyICRlbCA9ICQodGhpcyksXHJcbiAgICAgICAgICAkaGVhZCA9ICRlbC5maW5kKCcuY2FyZC1oZWFkZXInKSxcclxuICAgICAgICAgICRib2R5ID0gJGVsLmZpbmQoJy5jYXJkLWJvZHknKTtcclxuXHJcbiAgICAgICAgJGhlYWQuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgJGNhcmQubm90KCRlbCkucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICRlbC50b2dnbGVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEJvb3RzcmFwIFNlbGVjdFxyXG4gICAgLy8gJCgnLnNlbGVjdCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIC8vICAgJCh0aGlzKS5zZWxlY3RwaWNrZXIoKTtcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIC8vIEZvcm0gVmFsaWRhdGlvblxyXG4gICAgJCgnZm9ybS52YWx0aGlzJykudmFsaWRhdGUoe1xyXG4gICAgICBmb2N1c0ludmFsaWQ6IGZhbHNlLFxyXG4gICAgICBpZ25vcmU6IFwiOmRpc2FibGVkLCA6aGlkZGVuXCIsXHJcbiAgICAgIGVycm9yUGxhY2VtZW50OiBmdW5jdGlvbihlcnJvciwgZWxlbWVudCkge1xyXG4gICAgICAgIHZhciBmZyA9ICQoZWxlbWVudCkuY2xvc2VzdCgnLmZvcm0tZ3JvdXAnKS5maW5kKCcuZXJyLW1zZycpO1xyXG4gICAgICAgIGVycm9yLmFwcGVuZFRvKGZnKTtcclxuICAgICAgICAkKCdzZWxlY3Quc2VsZWN0Jykuc2VsZWN0cGlja2VyKCdyZWZyZXNoJyk7XHJcbiAgICAgIH0sXHJcbiAgICAgICBpbnZhbGlkSGFuZGxlcjogZnVuY3Rpb24oZm9ybSwgdmFsaWRhdG9yKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXZhbGlkYXRvci5udW1iZXJPZkludmFsaWRzKCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQodmFsaWRhdG9yLmVycm9yTGlzdFswXS5lbGVtZW50KS5vZmZzZXQoKS50b3AgLSAxMjBcclxuICAgICAgICAgICAgfSwgODAwKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnZm9ybS52YWx0aGlzJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgc2VsZWN0ID0gJCh0aGlzKS5maW5kKCdzZWxlY3Quc2VsZWN0Jyk7XHJcbiAgICAgIHNlbGVjdC5vbignY2hhbmdlZC5icy5zZWxlY3QnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgJCh0aGlzKS52YWxpZCgpO1xyXG4gICAgICAgICQodGhpcykuY2xvc2VzdCgnLmJvb3RzdHJhcC1zZWxlY3QnKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBqUXVlcnkuZXh0ZW5kKGpRdWVyeS52YWxpZGF0b3IubWVzc2FnZXMsIHtcclxuICAgICAgcmVxdWlyZWQ6IFwiS29sb20gaW5pIHdhamliIGRpaXNpXCIsXHJcbiAgICAgIHJlbW90ZTogXCJQbGVhc2UgZml4IHRoaXMgZmllbGQuXCIsXHJcbiAgICAgIGVtYWlsOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MuXCIsXHJcbiAgICAgIHVybDogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBVUkwuXCIsXHJcbiAgICAgIGRhdGU6IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZGF0ZS5cIixcclxuICAgICAgZGF0ZUlTTzogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBkYXRlIChJU08pLlwiLFxyXG4gICAgICBudW1iZXI6IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgbnVtYmVyLlwiLFxyXG4gICAgICBkaWdpdHM6IFwiUGxlYXNlIGVudGVyIG9ubHkgZGlnaXRzLlwiLFxyXG4gICAgICBjcmVkaXRjYXJkOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGNyZWRpdCBjYXJkIG51bWJlci5cIixcclxuICAgICAgZXF1YWxUbzogXCJQbGVhc2UgZW50ZXIgdGhlIHNhbWUgdmFsdWUgYWdhaW4uXCIsXHJcbiAgICAgIGFjY2VwdDogXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSB3aXRoIGEgdmFsaWQgZXh0ZW5zaW9uLlwiLFxyXG4gICAgICBtYXhsZW5ndGg6IGpRdWVyeS52YWxpZGF0b3IuZm9ybWF0KFwiUGxlYXNlIGVudGVyIG5vIG1vcmUgdGhhbiB7MH0gY2hhcmFjdGVycy5cIiksXHJcbiAgICAgIG1pbmxlbmd0aDogalF1ZXJ5LnZhbGlkYXRvci5mb3JtYXQoXCJQbGVhc2UgZW50ZXIgYXQgbGVhc3QgezB9IGNoYXJhY3RlcnMuXCIpLFxyXG4gICAgICByYW5nZWxlbmd0aDogalF1ZXJ5LnZhbGlkYXRvci5mb3JtYXQoXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBiZXR3ZWVuIHswfSBhbmQgezF9IGNoYXJhY3RlcnMgbG9uZy5cIiksXHJcbiAgICAgIHJhbmdlOiBqUXVlcnkudmFsaWRhdG9yLmZvcm1hdChcIlBsZWFzZSBlbnRlciBhIHZhbHVlIGJldHdlZW4gezB9IGFuZCB7MX0uXCIpLFxyXG4gICAgICBtYXg6IGpRdWVyeS52YWxpZGF0b3IuZm9ybWF0KFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHswfS5cIiksXHJcbiAgICAgIG1pbjogalF1ZXJ5LnZhbGlkYXRvci5mb3JtYXQoXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gezB9LlwiKVxyXG4gICAgfSk7XHJcblxyXG4gICQoJy5zZWxlY3RBbHQnKS5zZWxlY3QyKFxyXG4gICAge1xyXG4gICAgICBwbGFjZWhvbGRlcjogJ1BpbGloIFRpcGUgUHJveWVrJ1xyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gICQoJ3RhYmxlJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgIHRyID0gdC5maW5kKCd0cicpLFxyXG4gICAgICAgIGxuID0gdC5maW5kKCdhJyksXHJcbiAgICAgICAgbG5rID0gbG4uYXR0cihcImhyZWZcIik7XHJcbiAgICBjb25zb2xlLmxvZyhsbmspO1xyXG4gICAgdHIuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAkKHRoaXMpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gbG5rO1xyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcbiAgfSlcclxuXHJcbiAgLy8gQ291bnQgQ2hhclxyXG5cclxuICAkKCd0ZXh0YXJlYS5mb3JtLWNvbnRyb2wnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgYyA9ICQodGhpcykuc2libGluZ3MoJy5jb3VudGVyJyksXHJcbiAgICAgICAgY250ciA9IGMuZmluZCgnLmNudHInKSxcclxuICAgICAgICBtYXggPSBjLmZpbmQoJy5tYXgnKSxcclxuICAgICAgICBtYXhsID0gdC5hdHRyKCdtYXhsZW5ndGgnKTtcclxuICAgIGlmKG1heGwgPiAwICYmIG1heGwgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgYy5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgY250ci5odG1sKCcwJyk7XHJcbiAgICAgIG1heC5odG1sKG1heGwpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2cobWF4bCk7XHJcbiAgICB0LmtleXVwKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciBsZW4gPSB0LnZhbCgpLmxlbmd0aDtcclxuICAgICAgY250ci5odG1sKGxlbik7XHJcbiAgICB9KTtcclxuICB9KVxyXG5cclxuICAkKCcubW9kYWwtc2V0dGluZ3MnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgbmwgPSB0LmZpbmQoJy5uYXYtbGluaycpLFxyXG4gICAgICAgIHR0ID0gJCgnI3RhYl90aXRsZScpO1xyXG5cclxuICAgIG5sLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIG5sdCA9ICQodGhpcykudGV4dCgpO1xyXG4gICAgICAkKHRoaXMpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdHQuaHRtbChubHQpO1xyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICAvLyAkKCcua2VhaGxpYW4nKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgLy8gICB2YXIgdCA9ICQodGhpcyksXHJcbiAgLy8gICAgICAgc2sgPSAkKCdib2R5JykuZmluZCgnLnNlbGVjdC1rZWFobGlhbicpLFxyXG4gIC8vICAgICAgIHNzayA9ICQoJ2JvZHknKS5maW5kKCcuc2VsZWN0LXN1YmtlYWhsaWFuJyk7XHJcbiAgLy8gICBzay5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgLy8gICAgIHZhciBwID0gJCh0aGlzKSxcclxuICAvLyAgICAgICBzZWxlY3QgPSAkKHRoaXMpLmZpbmQoJy5zZWxlY3QnKTtcclxuICAvLyAgICAgc2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG4gIC8vICAgICAgIHAuc2libGluZ3MoJy5zZWxlY3Qtc3Via2VhaGxpYW4nKS5zaG93KCk7XHJcbiAgLy8gICAgICAgJCgnLnNlbGVjdC1zdWJrZWFobGlhbi5sYWJlbCcpLnNob3coKTtcclxuICAvLyAgICAgfSlcclxuICAvLyAgIH0pXHJcbiAgLy8gfSlcclxuXHJcbiAgLy8gRGF0ZXBpY2tlclxyXG4gICQoJy5kYXRlJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIHZhciBpbnB1dCA9ICQodGhpcykuZmluZCgnaW5wdXQnKTtcclxuICAgIGlucHV0LmRhdGVwaWNrZXIoe1xyXG4gICAgICBhdXRvY2xvc2U6IHRydWUsXHJcbiAgICAgIGZvcm1hdCA6IFwiZGQvbW0veXl5eVwiXHJcbiAgICB9KTtcclxuICAgIGlucHV0LmNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgICAgJCh0aGlzKS52YWxpZCgpO1xyXG4gICAgfSlcclxuICB9KTtcclxuXHJcbiAgJCgnLmljb24tZGF0ZScpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgaWMgPSAkKHRoaXMpO1xyXG4gICAgaWMuZGF0ZXBpY2tlcih7XHJcbiAgICAgIGF1dG9jbG9zZTogdHJ1ZSxcclxuICAgICAgZm9ybWF0IDogXCJkZC9tbS95eXl5XCJcclxuICAgIH0pO1xyXG4gICAgaWMuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAkKHRoaXMpLnZhbGlkKCk7XHJcbiAgICB9KVxyXG4gIH0pO1xyXG5cclxuICAkKCcudGltZWxpbmUnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgbSA9IHQuZmluZCgnLm1vcmUnKTtcclxuICAgIG0uY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgdC50b2dnbGVDbGFzcygnc2hvd2FsbCcpO1xyXG4gICAgfSlcclxuICB9KTtcclxuXHJcbiAgJCgnLmJveC1maWxlX19pdGVtJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgIGIgPSB0LmZpbmQoJy5kd25sZC1maWxlJyk7XHJcbiAgICBiLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHQuYWRkQ2xhc3MoJ2Rvd25sb2FkaW5nJyk7XHJcbiAgICB9KVxyXG4gIH0pXHJcblxyXG4gICQoJy5tb2RhbC11bGFzLXByb3llaycpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICBidG5zID0gdC5maW5kKCcuYWN0aW9uLWJ0bicpLFxyXG4gICAgICAgIGt3ID0gdC5maW5kKCcua29tZW50YXItd3JhcCcpLFxyXG4gICAgICAgIHJldiA9IHQuZmluZCgnLnJldmlzZS10bmdnYXBhbicpLFxyXG4gICAgICAgIGJ4aSA9IHQuZmluZCgnLmJveC1pbnB0JyksXHJcbiAgICAgICAgYncgPSB0LmZpbmQoJy5idG4td3JhcCcpLFxyXG4gICAgICAgIGNscyA9IHQuZmluZCgnLmNscy10bmdnYXBhbicpO1xyXG4gICAgcmV2LmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICQodGhpcykucGFyZW50KGJ0bnMpLmhpZGUoKTtcclxuICAgICAga3cuYWRkQ2xhc3MoJ3Nob3cnKTtcclxuICAgIH0pO1xyXG4gICAgY2xzLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICQodGhpcykuaGlkZSgpO1xyXG4gICAgICBieGkuaGlkZSgpO1xyXG4gICAgICBidy5oaWRlKCk7XHJcbiAgICAgICQodGhpcykuc2libGluZ3MoKS5zaG93KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgfSk7XHJcblxyXG4gICQoJyNDb25maXJtTm90aWYnKS5vbignc2hvd24uYnMubW9kYWwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcubW9kYWwnKS5ub3QoJCh0aGlzKSkuY3NzKCd6LWluZGV4JywgJzAnKTtcclxuICB9KVxyXG5cclxuICAkKCcjQ29uZmlybU5vdGlmJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICQoJy5tb2RhbCcpLm5vdCgkKHRoaXMpKS5jc3MoJ3otaW5kZXgnLCAnJyk7XHJcbiAgfSlcclxuXHJcbiAgJCgnLnByb3llay1saXN0X3RhYmxlX21vYmlsZScpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICBwaSA9IHQuZmluZCgnLnByb3llay1pdGVtJyk7XHJcbiAgICBwaS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICQodGhpcykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdleHBhbmRlZCcpO1xyXG4gICAgICB9KTtcclxuICAgIH0pXHJcbiAgfSk7XHJcblxyXG5cclxuICB9Ly8gRU5EIG9mIGZ1bmMoKVxyXG5cclxufSkoKTtcclxuXHJcblxyXG5cclxuJCgnLm11bHRpcGxpZXInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHQgICAgICAgPSAkKHRoaXMpLFxyXG4gICAgICBtYXggICAgID0gdC5kYXRhKCdtYXgnKSxcclxuICAgICAgaXRlbSAgICA9IHQuZmluZCgnLml0ZW0nKS5lcSgwKSxcclxuICAgICAgYWRkICAgICA9IHQuZmluZCgnLmJ0bi1hZGQnKSxcclxuICAgICAgZm9ybWF0O1xyXG5cclxuICBpdGVtLmZpbmQoJy5zZWxlY3QnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAkKHRoaXMpLnNlbGVjdHBpY2tlcignZGVzdHJveScpO1xyXG4gIH0pO1xyXG5cclxuICBmb3JtYXQgPSBpdGVtLmNsb25lKCkuaGlkZSgpO1xyXG4gIGJpbmQoaXRlbSk7XHJcblxyXG4gIGZ1bmN0aW9uIGJpbmQgKG9iaikge1xyXG4gICAgJCgnLmRhdGUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpLmZpbmQoJ2lucHV0Jyk7XHJcbiAgICAgIGlucHV0LmRhdGVwaWNrZXIoe1xyXG4gICAgICAgIGF1dG9jbG9zZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgICAgaW5wdXQuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudmFsaWQoKTtcclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gICAgJCgnLnNlbGVjdCcpLnNlbGVjdHBpY2tlcigpO1xyXG4gICAgLy8gJCgnc2VsZWN0LnNlbGVjdCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIC8vICAgJCh0aGlzKS5zZWxlY3RwaWNrZXIoe1xyXG4gICAgLy8gICAgIHN0eWxlOiAnc2VsZWN0LWNvbnRyb2wnLFxyXG4gICAgLy8gICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAvLyAgICAgc2l6ZTogNVxyXG4gICAgLy8gICB9KTtcclxuICAgIC8vIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVPcmRlcihvYmope1xyXG4gICAgdmFyIGl0bSA9IG9iai5maW5kKCcuaXRlbScpO1xyXG4gICAgaXRtLmVhY2goZnVuY3Rpb24oaSl7XHJcbiAgICAgIHZhciB0bXAgPSBpICsgMTtcclxuICAgICAgLy9yZSBvcmRlciBuYW1lXHJcbiAgICAgICQodGhpcykuZmluZCgnc2VsZWN0JykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKCQodGhpcykuYXR0cignbmFtZScpKXtcclxuICAgICAgICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKCduYW1lJykucmVwbGFjZSggL1xcW1xcZC9nLCdbJysoaSkpO1xyXG4gICAgICAgICAgJCh0aGlzKS5hdHRyKCduYW1lJyxuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoJCh0aGlzKS5hdHRyKCdpZCcpKXtcclxuICAgICAgICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKCdpZCcpLnJlcGxhY2UoIC9cXFtcXGQvZywnWycrKGkpKTtcclxuICAgICAgICAgICQodGhpcykuYXR0cignaWQnLG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIC8vdG9nZ2xlIGRlbGV0ZSBidXR0b25cclxuICAgIGlmKGl0bS5sZW5ndGggPiAxKXtcclxuICAgICAgaXRtLmNsb3Nlc3QoJy5tdWx0aXBsaWVyJykuYWRkQ2xhc3MoJ211bHRpcGxpZWQnKTtcclxuICAgIH1lbHNle1xyXG4gICAgICBpdG0uY2xvc2VzdCgnLm11bHRpcGxpZXInKS5yZW1vdmVDbGFzcygnbXVsdGlwbGllZCcpO1xyXG4gICAgfVxyXG4gICAgLy9jZWsgbGltaXRcclxuICAgIGlmKGl0bS5sZW5ndGggPj0gbWF4KXtcclxuICAgICAgaXRtLmNsb3Nlc3QoJy5tdWx0aXBsaWVyJykuYWRkQ2xhc3MoJ21heCcpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIGl0bS5jbG9zZXN0KCcubXVsdGlwbGllcicpLnJlbW92ZUNsYXNzKCdtYXgnKTtcclxuICAgIH07XHJcbiAgICBnZXRCdWRnZXQoKTtcclxuICB9O1xyXG5cclxuICBhZGQuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgaHRtbCA9IGZvcm1hdC5jbG9uZSgpO1xyXG4gICAgdC5hcHBlbmQoaHRtbCk7XHJcbiAgICBiaW5kKGh0bWwpO1xyXG4gICAgaHRtbC5zbGlkZURvd24oMzAwKTtcclxuICAgIHJlT3JkZXIodCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIERFTEVURVxyXG4gICQoJ2JvZHknKS5vbignY2xpY2snLCcuYnRuLWRlbCcsZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuaXRlbScpLFxyXG4gICAgICAgIHRhcmdldCA9IHBhcmVudC5jbG9zZXN0KCcubXVsdGlwbGllcicpO1xyXG5cclxuICAgIHBhcmVudC5zbGlkZVVwKDMwMCwgZnVuY3Rpb24oKXtcclxuICAgICAgcGFyZW50LnJlbW92ZSgpO1xyXG4gICAgICByZU9yZGVyKHRhcmdldCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJmaWxlIjoibWFpbi5qcyJ9

//# sourceMappingURL=main.js.map
