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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgLy8gSU5MSU5FIFNWR1xyXG4gICAgalF1ZXJ5KCdpbWcuc3ZnJykuZWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICB2YXIgJGltZyA9IGpRdWVyeSh0aGlzKTtcclxuICAgICAgdmFyIGltZ0lEID0gJGltZy5hdHRyKCdpZCcpO1xyXG4gICAgICB2YXIgaW1nQ2xhc3MgPSAkaW1nLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICAgIHZhciBpbWdVUkwgPSAkaW1nLmF0dHIoJ3NyYycpO1xyXG5cclxuICAgICAgalF1ZXJ5LmdldChpbWdVUkwsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyICRzdmcgPSBqUXVlcnkoZGF0YSkuZmluZCgnc3ZnJyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbWdJRCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGltZ0NsYXNzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cignY2xhc3MnLCBpbWdDbGFzcyArICcgcmVwbGFjZWQtc3ZnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzdmcgPSAkc3ZnLnJlbW92ZUF0dHIoJ3htbG5zOmEnKTtcclxuICAgICAgICAkaW1nLnJlcGxhY2VXaXRoKCRzdmcpO1xyXG4gICAgICB9LCAneG1sJyk7XHJcbiAgICB9KTsvLyBFTkQgT0YgSU5MSU5FIFNWR1xyXG5cclxuXHJcbiAgICAkKCcucHJveWVrLWxpc3RfZmlsdGVyIC5zZWxlY3QnKS5zZWxlY3RwaWNrZXIoKTtcclxuXHJcbiAgICBtYWluTGF5b3V0KCk7XHJcbiAgICBydW5TbGlkZXIoKTtcclxuICAgIGZ1bmMoKTtcclxuXHJcbiAgfSBpbml0KCk7IC8vIEVORCBPRiBpbml0KClcclxuXHJcbiAgZnVuY3Rpb24gbWFpbkxheW91dCgpIHtcclxuICAgIHZhciAkaGVhZGVySCA9ICQoJ2hlYWRlcicpLm91dGVySGVpZ2h0KCksXHJcbiAgICAgICRmb290ZXJIID0gJCgnZm9vdGVyJykuaGVpZ2h0KCk7XHJcbiAgICAkKCdtYWluJykuY3NzKHsgJ21pbi1oZWlnaHQnOiAnY2FsYygxMDB2aCAtICcgKyAkZm9vdGVySCArICdweCknLCAncGFkZGluZy10b3AnOiArJGhlYWRlckggKyAncHgnIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcnVuU2xpZGVyKCkge1xyXG4gICAgJCgnLnNsaWRlcicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJHNsaWRlciA9ICQodGhpcyksXHJcbiAgICAgICAgJGl0ZW0gPSAkc2xpZGVyLmZpbmQoJy5zbGlkZXJfX2l0ZW0nKSxcclxuICAgICAgICAkYXV0b3BsYXkgPSAoJHNsaWRlci5kYXRhKCdhdXRvcGxheScpID09IHVuZGVmaW5lZCkgPyB0cnVlIDogJHNsaWRlci5kYXRhKCdhdXRvcGxheScpLFxyXG4gICAgICAgICRtYXJnaW4gPSAoJHNsaWRlci5kYXRhKCdtYXJnaW4nKSA9PSB1bmRlZmluZWQpID8gMjQgOiAkc2xpZGVyLmRhdGEoJ21hcmdpbicpO1xyXG5cclxuICAgICAgaWYgKCRpdGVtLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAkc2xpZGVyLm93bENhcm91c2VsKHtcclxuICAgICAgICAgIGl0ZW1zOiAxLFxyXG4gICAgICAgICAgbG9vcDogZmFsc2UsXHJcbiAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgbmF2OiB0cnVlLFxyXG4gICAgICAgICAgbmF2VGV4dDogW1wiPHNwYW4+PGltZyBzcmM9Jy4uL2ltYWdlcy9pYy1jaGV2cm9uLWxlZnQuc3ZnJz48L3NwYW4+XCIsIFwiPHNwYW4+PGltZyBzcmM9Jy4uL2ltYWdlcy9pYy1jaGV2cm9uLXJpZ2h0LnN2Zyc+PC9zcGFuPlwiXSxcclxuICAgICAgICAgIGF1dG9wbGF5OiAkYXV0b3BsYXksXHJcbiAgICAgICAgICBhdXRvcGxheVRpbWVvdXQ6IDYwMDAsXHJcbiAgICAgICAgICBhdXRvcGxheVNwZWVkOiA4MDAsXHJcbiAgICAgICAgICBtYXJnaW46ICRtYXJnaW4sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJHNsaWRlci50cmlnZ2VyKCdkZXN0cm95Lm93bC5jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdvd2wtY2Fyb3VzZWwgb3dsLWxvYWRlZCcpO1xyXG4gICAgICAgICRzbGlkZXIuZmluZCgnLm93bC1zdGFnZS1vdXRlcicpLmNoaWxkcmVuKCkudW53cmFwKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5zbGlkZXItbmF2JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciAkc2xpZGVyID0gJCh0aGlzKSxcclxuICAgICAgICAkaXRlbSA9ICRzbGlkZXIuZmluZCgnLnNsaWRlcl9faXRlbScpLFxyXG4gICAgICAgICRtYXJnaW4gPSAoJHNsaWRlci5kYXRhKCdtYXJnaW4nKSA9PSB1bmRlZmluZWQpID8gMjQgOiAkc2xpZGVyLmRhdGEoJ21hcmdpbicpO1xyXG5cclxuICAgICAgaWYgKCRpdGVtLmxlbmd0aCA+IDMpIHtcclxuICAgICAgICAkc2xpZGVyLm93bENhcm91c2VsKHtcclxuICAgICAgICAgIGl0ZW1zOiAxLFxyXG4gICAgICAgICAgbG9vcDogZmFsc2UsXHJcbiAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgIG5hdjogdHJ1ZSxcclxuICAgICAgICAgIG5hdlRleHQ6IFtcIjxzcGFuPjxpbWcgc3JjPScuLi9pbWFnZXMvaWMtY2hldnJvbi1sZWZ0LnN2Zyc+PC9zcGFuPlwiLCBcIjxzcGFuPjxpbWcgc3JjPScuLi9pbWFnZXMvaWMtY2hldnJvbi1yaWdodC5zdmcnPjwvc3Bhbj5cIl0sXHJcbiAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICAgICAgICBhdXRvcGxheVRpbWVvdXQ6IDYwMDAsXHJcbiAgICAgICAgICBhdXRvcGxheVNwZWVkOiA4MDAsXHJcbiAgICAgICAgICBhdXRvV2lkdGg6dHJ1ZSxcclxuICAgICAgICAgIG1hcmdpbjogJG1hcmdpbixcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkc2xpZGVyLnRyaWdnZXIoJ2Rlc3Ryb3kub3dsLmNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ293bC1jYXJvdXNlbCBvd2wtbG9hZGVkJyk7XHJcbiAgICAgICAgJHNsaWRlci5maW5kKCcub3dsLXN0YWdlLW91dGVyJykuY2hpbGRyZW4oKS51bndyYXAoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmhlYWQtc2VhcmNoJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgICBidG4gPSB0LmZpbmQoJ2EnKSxcclxuICAgICAgICAgIGJzID0gdC5maW5kKCcuYm94X3NlYXJjaCcpO1xyXG4gICAgICB0LmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgaWYgKHQuaGFzQ2xhc3MoJ2hzLXNob3cnKSl7XHJcbiAgICAgICAgICB0LnJlbW92ZUNsYXNzKCdocy1zaG93Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHQuYWRkQ2xhc3MoJ2hzLXNob3cnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudC5ib2R5KS5jbGljayggZnVuY3Rpb24oZSkge1xyXG4gICAgICBpZiAoJCgnLmhlYWQtc2VhcmNoJykuaGFzQ2xhc3MoJ2hzLXNob3cnKSl7XHJcbiAgICAgICAgJCgnLmhlYWQtc2VhcmNoJykucmVtb3ZlQ2xhc3MoJ2hzLXNob3cnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLnNpZGViYXIgLnVzZXItYWNjb3VudCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgZGQgPSB0LmZpbmQoJy51c2VyLWFjbnRfbWVudScpO1xyXG4gICAgICAgIHQuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHQudG9nZ2xlQ2xhc3MoJ2RkLXNob3cnKTtcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLm1hc3RoZWFkLS1ob21lJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciAkdCA9ICQodGhpcyksXHJcbiAgICAgICAgJHNsaWRlciA9ICR0LmZpbmQoJy5zbGlkZXInKSxcclxuICAgICAgICAkY29udGVudCA9ICR0LmZpbmQoJy5tYXN0aGVhZF9fY29udGVudCcpO1xyXG5cclxuICAgICAgJHNsaWRlci5vbignY2hhbmdlZC5vd2wuY2Fyb3VzZWwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAkY29udGVudC50b2dnbGVDbGFzcygnYWN0aXZlJylcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuYmxvY2stam91cm5leScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICRzbGlkZXIgPSAkdC5maW5kKCcuc2xpZGVyJyksXHJcbiAgICAgICAgJG5hdiA9ICR0LmZpbmQoJy5ibG9jay1qb3VybmV5X19zbGlkZXItbmF2JyksXHJcbiAgICAgICAgJG5hdkl0ZW0gPSAkbmF2LmZpbmQoJ2xpJyk7XHJcblxyXG4gICAgICAkbmF2SXRlbS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgJGVsID0gJCh0aGlzKSxcclxuICAgICAgICAgICRkYXRhID0gJCh0aGlzKS5kYXRhKCdpdGVtJyk7XHJcbiAgICAgICAgJGVsLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgJG5hdkl0ZW0ubm90KHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJGVsLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJHNsaWRlci50cmlnZ2VyKCd0by5vd2wuY2Fyb3VzZWwnLCBbJGRhdGEsIDIwMF0pO1xyXG4gICAgICAgICAgICAkc2xpZGVyLmZpbmQoJy5vd2wtaXRlbScpLmFkZENsYXNzKCd0cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICRzbGlkZXIuZmluZCgnLm93bC1pdGVtJykucmVtb3ZlQ2xhc3MoJ3RyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkc2xpZGVyLm9uKCdjaGFuZ2VkLm93bC5jYXJvdXNlbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyICRhY3RpdmVJbmRleCA9IGUuaXRlbS5pbmRleDtcclxuICAgICAgICAkbmF2SXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJG5hdkl0ZW0uZXEoJGFjdGl2ZUluZGV4KS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJGFjdGl2ZUluZGV4KTtcclxuICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5ibG9jay1hY2NvcmQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyICR0ID0gJCh0aGlzKSxcclxuICAgICAgICAkYWNjb3JkaW9uID0gJHQuZmluZCgnLmFjY29yZGlvbicpLFxyXG4gICAgICAgICRzbGlkZXIgPSAkdC5maW5kKCcuc2xpZGVyJyk7XHJcblxyXG4gICAgICAkYWNjb3JkaW9uLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciAkZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgJGNhcmQgPSAkZWwuZmluZCgnLmNhcmQnKTtcclxuXHJcbiAgICAgICAgJGNhcmQuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB2YXIgJGRhdGEgPSAkKHRoaXMpLmRhdGEoJ2l0ZW0nKTtcclxuICAgICAgICAgICQodGhpcykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2xpZGVyLnRyaWdnZXIoJ3RvLm93bC5jYXJvdXNlbCcsIFskZGF0YSwgMjAwXSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkc2xpZGVyLm9uKCdjaGFuZ2VkLm93bC5jYXJvdXNlbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyICRhY3RpdmVJbmRleCA9IGUuaXRlbS5pbmRleDtcclxuICAgICAgICAkYWNjb3JkaW9uLmZpbmQoJy5jYXJkJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAkYWNjb3JkaW9uLmZpbmQoJy5jYXJkJykuZXEoJGFjdGl2ZUluZGV4KS5hZGRDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICRhY2NvcmRpb24uZmluZCgnLmNhcmQnKS5lcSgkYWN0aXZlSW5kZXgpLmZpbmQoJy5jb2xsYXBzZScpLmNvbGxhcHNlKCd0b2dnbGUnKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9Ly8gZW5kIG9mIHJ1blNsaWRlcigpXHJcblxyXG4gIGZ1bmN0aW9uIGZ1bmMoKSB7XHJcblxyXG4gICAgLy8gU1RJQ0tZIEhFQURFUlxyXG4gICAgaWYgKCQoJy5oZWFkZXInKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHZhciBoZWFkZXIgPSAkKCcuaGVhZGVyJyksXHJcbiAgICAgICAgcG9zID0gMTA7XHJcbiAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgaWYgKHNjcm9sbCA+PSBwb3MpIHtcclxuICAgICAgICAgIGhlYWRlci5hZGRDbGFzcygnc3RpY2t5Jyk7XHJcbiAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2hlYWRlci1zdGljaycpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBoZWFkZXIucmVtb3ZlQ2xhc3MoJ3N0aWNreScpO1xyXG4gICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdoZWFkZXItc3RpY2snKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICQoJy51c2VyLWFjbnQgYScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygndXNyYWNudC1vcGVuJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcudXNlci1oZWFkZXIgLm5vdGlmIGEnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ25vdGlmLW9wZW4nKTtcclxuICAgIH0pXHJcblxyXG4gICAgJCgnLmFjY29yZGlvbicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICRjYXJkID0gJHQuZmluZCgnLmNhcmQnKTtcclxuXHJcbiAgICAgICRjYXJkLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciAkZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgJGhlYWQgPSAkZWwuZmluZCgnLmNhcmQtaGVhZGVyJyksXHJcbiAgICAgICAgICAkYm9keSA9ICRlbC5maW5kKCcuY2FyZC1ib2R5Jyk7XHJcblxyXG4gICAgICAgICRoZWFkLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICRjYXJkLm5vdCgkZWwpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAkZWwudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBCb290c3JhcCBTZWxlY3RcclxuICAgIC8vICQoJy5zZWxlY3QnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAgICQodGhpcykuc2VsZWN0cGlja2VyKCk7XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICAvLyBGb3JtIFZhbGlkYXRpb25cclxuICAgICQoJ2Zvcm0udmFsdGhpcycpLnZhbGlkYXRlKHtcclxuICAgICAgZm9jdXNJbnZhbGlkOiBmYWxzZSxcclxuICAgICAgaWdub3JlOiBcIjpkaXNhYmxlZCwgOmhpZGRlblwiLFxyXG4gICAgICBlcnJvclBsYWNlbWVudDogZnVuY3Rpb24oZXJyb3IsIGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgZmcgPSAkKGVsZW1lbnQpLmNsb3Nlc3QoJy5mb3JtLWdyb3VwJykuZmluZCgnLmVyci1tc2cnKTtcclxuICAgICAgICBlcnJvci5hcHBlbmRUbyhmZyk7XHJcbiAgICAgICAgJCgnc2VsZWN0LnNlbGVjdCcpLnNlbGVjdHBpY2tlcigncmVmcmVzaCcpO1xyXG4gICAgICB9LFxyXG4gICAgICAgaW52YWxpZEhhbmRsZXI6IGZ1bmN0aW9uKGZvcm0sIHZhbGlkYXRvcikge1xyXG5cclxuICAgICAgICAgICAgaWYgKCF2YWxpZGF0b3IubnVtYmVyT2ZJbnZhbGlkcygpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKHZhbGlkYXRvci5lcnJvckxpc3RbMF0uZWxlbWVudCkub2Zmc2V0KCkudG9wIC0gMTIwXHJcbiAgICAgICAgICAgIH0sIDgwMCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJ2Zvcm0udmFsdGhpcycpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIHNlbGVjdCA9ICQodGhpcykuZmluZCgnc2VsZWN0LnNlbGVjdCcpO1xyXG4gICAgICBzZWxlY3Qub24oJ2NoYW5nZWQuYnMuc2VsZWN0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICQodGhpcykudmFsaWQoKTtcclxuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5ib290c3RyYXAtc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgalF1ZXJ5LmV4dGVuZChqUXVlcnkudmFsaWRhdG9yLm1lc3NhZ2VzLCB7XHJcbiAgICAgIHJlcXVpcmVkOiBcIktvbG9tIGluaSB3YWppYiBkaWlzaVwiLFxyXG4gICAgICByZW1vdGU6IFwiUGxlYXNlIGZpeCB0aGlzIGZpZWxkLlwiLFxyXG4gICAgICBlbWFpbDogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzLlwiLFxyXG4gICAgICB1cmw6IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgVVJMLlwiLFxyXG4gICAgICBkYXRlOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGRhdGUuXCIsXHJcbiAgICAgIGRhdGVJU086IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZGF0ZSAoSVNPKS5cIixcclxuICAgICAgbnVtYmVyOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIG51bWJlci5cIixcclxuICAgICAgZGlnaXRzOiBcIlBsZWFzZSBlbnRlciBvbmx5IGRpZ2l0cy5cIixcclxuICAgICAgY3JlZGl0Y2FyZDogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBjcmVkaXQgY2FyZCBudW1iZXIuXCIsXHJcbiAgICAgIGVxdWFsVG86IFwiUGxlYXNlIGVudGVyIHRoZSBzYW1lIHZhbHVlIGFnYWluLlwiLFxyXG4gICAgICBhY2NlcHQ6IFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgd2l0aCBhIHZhbGlkIGV4dGVuc2lvbi5cIixcclxuICAgICAgbWF4bGVuZ3RoOiBqUXVlcnkudmFsaWRhdG9yLmZvcm1hdChcIlBsZWFzZSBlbnRlciBubyBtb3JlIHRoYW4gezB9IGNoYXJhY3RlcnMuXCIpLFxyXG4gICAgICBtaW5sZW5ndGg6IGpRdWVyeS52YWxpZGF0b3IuZm9ybWF0KFwiUGxlYXNlIGVudGVyIGF0IGxlYXN0IHswfSBjaGFyYWN0ZXJzLlwiKSxcclxuICAgICAgcmFuZ2VsZW5ndGg6IGpRdWVyeS52YWxpZGF0b3IuZm9ybWF0KFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgYmV0d2VlbiB7MH0gYW5kIHsxfSBjaGFyYWN0ZXJzIGxvbmcuXCIpLFxyXG4gICAgICByYW5nZTogalF1ZXJ5LnZhbGlkYXRvci5mb3JtYXQoXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBiZXR3ZWVuIHswfSBhbmQgezF9LlwiKSxcclxuICAgICAgbWF4OiBqUXVlcnkudmFsaWRhdG9yLmZvcm1hdChcIlBsZWFzZSBlbnRlciBhIHZhbHVlIGxlc3MgdGhhbiBvciBlcXVhbCB0byB7MH0uXCIpLFxyXG4gICAgICBtaW46IGpRdWVyeS52YWxpZGF0b3IuZm9ybWF0KFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHswfS5cIilcclxuICAgIH0pO1xyXG5cclxuICAkKCcuc2VsZWN0QWx0Jykuc2VsZWN0MihcclxuICAgIHtcclxuICAgICAgcGxhY2Vob2xkZXI6ICdQaWxpaCBUaXBlIFByb3llaydcclxuICAgIH1cclxuICApO1xyXG5cclxuICAkKCd0YWJsZScpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICB0ciA9IHQuZmluZCgndHInKSxcclxuICAgICAgICBsbiA9IHQuZmluZCgnYScpLFxyXG4gICAgICAgIGxuayA9IGxuLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgY29uc29sZS5sb2cobG5rKTtcclxuICAgIHRyLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgJCh0aGlzKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGxuaztcclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gIH0pXHJcblxyXG4gIC8vIENvdW50IENoYXJcclxuXHJcbiAgJCgndGV4dGFyZWEuZm9ybS1jb250cm9sJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgIGMgPSAkKHRoaXMpLnNpYmxpbmdzKCcuY291bnRlcicpLFxyXG4gICAgICAgIGNudHIgPSBjLmZpbmQoJy5jbnRyJyksXHJcbiAgICAgICAgbWF4ID0gYy5maW5kKCcubWF4JyksXHJcbiAgICAgICAgbWF4bCA9IHQuYXR0cignbWF4bGVuZ3RoJyk7XHJcbiAgICBpZihtYXhsID4gMCAmJiBtYXhsICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIGMuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgIGNudHIuaHRtbCgnMCcpO1xyXG4gICAgICBtYXguaHRtbChtYXhsKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKG1heGwpO1xyXG4gICAgdC5rZXl1cChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgbGVuID0gdC52YWwoKS5sZW5ndGg7XHJcbiAgICAgIGNudHIuaHRtbChsZW4pO1xyXG4gICAgfSk7XHJcbiAgfSlcclxuXHJcbiAgJCgnLm1vZGFsLXNldHRpbmdzJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgIG5sID0gdC5maW5kKCcubmF2LWxpbmsnKSxcclxuICAgICAgICB0dCA9ICQoJyN0YWJfdGl0bGUnKTtcclxuXHJcbiAgICBubC5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciBubHQgPSAkKHRoaXMpLnRleHQoKTtcclxuICAgICAgJCh0aGlzKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIHR0Lmh0bWwobmx0KTtcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfSlcclxuXHJcbiAgLy8gJCgnLmtlYWhsaWFuJykuZWFjaChmdW5jdGlvbigpe1xyXG4gIC8vICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gIC8vICAgICAgIHNrID0gJCgnYm9keScpLmZpbmQoJy5zZWxlY3Qta2VhaGxpYW4nKSxcclxuICAvLyAgICAgICBzc2sgPSAkKCdib2R5JykuZmluZCgnLnNlbGVjdC1zdWJrZWFobGlhbicpO1xyXG4gIC8vICAgc2suZWFjaChmdW5jdGlvbigpe1xyXG4gIC8vICAgICB2YXIgcCA9ICQodGhpcyksXHJcbiAgLy8gICAgICAgc2VsZWN0ID0gJCh0aGlzKS5maW5kKCcuc2VsZWN0Jyk7XHJcbiAgLy8gICAgIHNlbGVjdC5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuICAvLyAgICAgICBwLnNpYmxpbmdzKCcuc2VsZWN0LXN1YmtlYWhsaWFuJykuc2hvdygpO1xyXG4gIC8vICAgICAgICQoJy5zZWxlY3Qtc3Via2VhaGxpYW4ubGFiZWwnKS5zaG93KCk7XHJcbiAgLy8gICAgIH0pXHJcbiAgLy8gICB9KVxyXG4gIC8vIH0pXHJcblxyXG4gIC8vIERhdGVwaWNrZXJcclxuICAkKCcuZGF0ZScpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgaW5wdXQgPSAkKHRoaXMpLmZpbmQoJ2lucHV0Jyk7XHJcbiAgICBpbnB1dC5kYXRlcGlja2VyKHtcclxuICAgICAgYXV0b2Nsb3NlOiB0cnVlLFxyXG4gICAgICBmb3JtYXQgOiBcImRkL21tL3l5eXlcIlxyXG4gICAgfSk7XHJcbiAgICBpbnB1dC5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICQodGhpcykudmFsaWQoKTtcclxuICAgIH0pXHJcbiAgfSk7XHJcblxyXG4gICQoJy50aW1lbGluZScpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICBtID0gdC5maW5kKCcubW9yZScpO1xyXG4gICAgbS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICB0LnRvZ2dsZUNsYXNzKCdzaG93YWxsJyk7XHJcbiAgICB9KVxyXG4gIH0pO1xyXG5cclxuICAkKCcuYm94LWZpbGVfX2l0ZW0nKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgYiA9IHQuZmluZCgnLmR3bmxkLWZpbGUnKTtcclxuICAgIGIuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgdC5hZGRDbGFzcygnZG93bmxvYWRpbmcnKTtcclxuICAgIH0pXHJcbiAgfSlcclxuXHJcbiAgJCgnLm1vZGFsLXVsYXMtcHJveWVrJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgIGJ0bnMgPSB0LmZpbmQoJy5hY3Rpb24tYnRuJyksXHJcbiAgICAgICAga3cgPSB0LmZpbmQoJy5rb21lbnRhci13cmFwJyksXHJcbiAgICAgICAgcmV2ID0gdC5maW5kKCcucmV2aXNlLXRuZ2dhcGFuJyksXHJcbiAgICAgICAgYnhpID0gdC5maW5kKCcuYm94LWlucHQnKSxcclxuICAgICAgICBidyA9IHQuZmluZCgnLmJ0bi13cmFwJyksXHJcbiAgICAgICAgY2xzID0gdC5maW5kKCcuY2xzLXRuZ2dhcGFuJyk7XHJcbiAgICByZXYuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgJCh0aGlzKS5wYXJlbnQoYnRucykuaGlkZSgpO1xyXG4gICAgICBrdy5hZGRDbGFzcygnc2hvdycpO1xyXG4gICAgfSk7XHJcbiAgICBjbHMuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgIGJ4aS5oaWRlKCk7XHJcbiAgICAgIGJ3LmhpZGUoKTtcclxuICAgICAgJCh0aGlzKS5zaWJsaW5ncygpLnNob3coKTtcclxuICAgIH0pO1xyXG5cclxuICB9KTtcclxuXHJcbiAgJCgnI0NvbmZpcm1Ob3RpZicpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICQoJy5tb2RhbCcpLm5vdCgkKHRoaXMpKS5jc3MoJ3otaW5kZXgnLCAnMCcpO1xyXG4gIH0pXHJcblxyXG4gICQoJyNDb25maXJtTm90aWYnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnLm1vZGFsJykubm90KCQodGhpcykpLmNzcygnei1pbmRleCcsICcnKTtcclxuICB9KVxyXG5cclxuXHJcbiAgfS8vIEVORCBvZiBmdW5jKClcclxuXHJcbn0pKCk7XHJcblxyXG5cclxuXHJcbiQoJy5tdWx0aXBsaWVyJykuZWFjaChmdW5jdGlvbigpe1xyXG4gIHZhciB0ICAgICAgID0gJCh0aGlzKSxcclxuICAgICAgbWF4ICAgICA9IHQuZGF0YSgnbWF4JyksXHJcbiAgICAgIGl0ZW0gICAgPSB0LmZpbmQoJy5pdGVtJykuZXEoMCksXHJcbiAgICAgIGFkZCAgICAgPSB0LmZpbmQoJy5idG4tYWRkJyksXHJcbiAgICAgIGZvcm1hdDtcclxuXHJcbiAgaXRlbS5maW5kKCcuc2VsZWN0JykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgLy8gJCh0aGlzKS5zZWxlY3RwaWNrZXIoJ2Rlc3Ryb3knKTtcclxuICB9KTtcclxuXHJcbiAgZm9ybWF0ID0gaXRlbS5jbG9uZSgpLmhpZGUoKTtcclxuICBiaW5kKGl0ZW0pO1xyXG5cclxuICBmdW5jdGlvbiBiaW5kIChvYmopIHtcclxuICAgICQoJy5kYXRlJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKS5maW5kKCdpbnB1dCcpO1xyXG4gICAgICBpbnB1dC5kYXRlcGlja2VyKHtcclxuICAgICAgICBhdXRvY2xvc2U6IHRydWVcclxuICAgICAgfSk7XHJcbiAgICAgIGlucHV0LmNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLnZhbGlkKCk7XHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuICAgICQoJy5zZWxlY3QnKS5zZWxlY3RwaWNrZXIoKTtcclxuICAgIC8vICQoJ3NlbGVjdC5zZWxlY3QnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAgICQodGhpcykuc2VsZWN0cGlja2VyKHtcclxuICAgIC8vICAgICBzdHlsZTogJ3NlbGVjdC1jb250cm9sJyxcclxuICAgIC8vICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgLy8gICAgIHNpemU6IDVcclxuICAgIC8vICAgfSk7XHJcbiAgICAvLyB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlT3JkZXIob2JqKXtcclxuICAgIHZhciBpdG0gPSBvYmouZmluZCgnLml0ZW0nKTtcclxuICAgIGl0bS5lYWNoKGZ1bmN0aW9uKGkpe1xyXG4gICAgICB2YXIgdG1wID0gaSArIDE7XHJcbiAgICAgIC8vcmUgb3JkZXIgbmFtZVxyXG4gICAgICAkKHRoaXMpLmZpbmQoJ3NlbGVjdCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICBpZigkKHRoaXMpLmF0dHIoJ25hbWUnKSl7XHJcbiAgICAgICAgICB2YXIgbmFtZSA9ICQodGhpcykuYXR0cignbmFtZScpLnJlcGxhY2UoIC9cXFtcXGQvZywnWycrKGkpKTtcclxuICAgICAgICAgICQodGhpcykuYXR0cignbmFtZScsbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCQodGhpcykuYXR0cignaWQnKSl7XHJcbiAgICAgICAgICB2YXIgbmFtZSA9ICQodGhpcykuYXR0cignaWQnKS5yZXBsYWNlKCAvXFxbXFxkL2csJ1snKyhpKSk7XHJcbiAgICAgICAgICAkKHRoaXMpLmF0dHIoJ2lkJyxuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICAvL3RvZ2dsZSBkZWxldGUgYnV0dG9uXHJcbiAgICBpZihpdG0ubGVuZ3RoID4gMSl7XHJcbiAgICAgIGl0bS5jbG9zZXN0KCcubXVsdGlwbGllcicpLmFkZENsYXNzKCdtdWx0aXBsaWVkJyk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgaXRtLmNsb3Nlc3QoJy5tdWx0aXBsaWVyJykucmVtb3ZlQ2xhc3MoJ211bHRpcGxpZWQnKTtcclxuICAgIH1cclxuICAgIC8vY2VrIGxpbWl0XHJcbiAgICBpZihpdG0ubGVuZ3RoID49IG1heCl7XHJcbiAgICAgIGl0bS5jbG9zZXN0KCcubXVsdGlwbGllcicpLmFkZENsYXNzKCdtYXgnKTtcclxuICAgIH1lbHNle1xyXG4gICAgICBpdG0uY2xvc2VzdCgnLm11bHRpcGxpZXInKS5yZW1vdmVDbGFzcygnbWF4Jyk7XHJcbiAgICB9O1xyXG4gICAgZ2V0QnVkZ2V0KCk7XHJcbiAgfTtcclxuXHJcbiAgYWRkLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIGh0bWwgPSBmb3JtYXQuY2xvbmUoKTtcclxuICAgIHQuYXBwZW5kKGh0bWwpO1xyXG4gICAgYmluZChodG1sKTtcclxuICAgIGh0bWwuc2xpZGVEb3duKDMwMCk7XHJcbiAgICByZU9yZGVyKHQpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBERUxFVEVcclxuICAkKCdib2R5Jykub24oJ2NsaWNrJywnLmJ0bi1kZWwnLGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLml0ZW0nKSxcclxuICAgICAgICB0YXJnZXQgPSBwYXJlbnQuY2xvc2VzdCgnLm11bHRpcGxpZXInKTtcclxuXHJcbiAgICBwYXJlbnQuc2xpZGVVcCgzMDAsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIHBhcmVudC5yZW1vdmUoKTtcclxuICAgICAgcmVPcmRlcih0YXJnZXQpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==

//# sourceMappingURL=main.js.map
