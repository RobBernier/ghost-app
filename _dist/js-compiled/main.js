"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(document).ready(function () {
  var _$$slick;

  $('.about-slider').slick((_$$slick = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false
  }, _defineProperty(_$$slick, "dots", false), _defineProperty(_$$slick, "centerMode", true), _defineProperty(_$$slick, "fade", true), _$$slick)); // Fix for iOS vh issues

  function resizeViewport() {
    $('html, body, .app, .app__inner, .splashscreen').css({
      minHeight: $(window).height()
    });
  }

  resizeViewport();
  $(window).on('resize', resizeViewport);
});