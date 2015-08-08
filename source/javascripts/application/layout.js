var TASK = TASK || {};

TASK.Layout = (function ($) {
  'use strict';

  var opts = {
    selector: '.js-layout-bottom'
  };

  var $items;
  var $window = $(window);

  var init = function () {
    $items = $(opts.selector);

    $items.each(function () {
      var $item = $(this);
      $item.css({
        'margin-bottom': $window.height() - $item.outerHeight()
      });
    });
  };

  return {
    init : init
  }
})(jQuery);

TASK.Layout.init();
