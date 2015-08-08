var TASK = TASK || {};

TASK.Nav = (function ($) {
  'use strict';

  var opts = {
    selected_class: 'nav__item--selected',
    selector: '.nav__item'
  };

  var $items;
  var $htmlbody = $('html, body');

  var init = function () {
    $items = $(opts.selector);

    if ((location.hash !== '') && $(location.hash)) {
      $items.removeClass(opts.selected_class);
      $items.filter('[href=' + location.hash + ']').addClass(opts.selected_class);
    }

    $items.on('click', scrollToContent);
  };

  var scrollToContent = function (e) {
    e.preventDefault();
    var $link = $(this);
    var $section = $($link.attr('href'));

    $items.removeClass(opts.selected_class);
    $link.addClass(opts.selected_class);

    $htmlbody.animate({
      scrollTop: $section.offset().top - 10
    }, 500);

    location.hash = $section.attr('id');
  };

  return {
    init : init
  }
})(jQuery);

TASK.Nav.init();
