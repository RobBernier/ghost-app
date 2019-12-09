$(document).ready(() => {
  $('.about-slider').slick({
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dots: false,
    centerMode: true,
    fade: true
  }); // Fix for iOS vh issues

  function resizeViewport() {
    $('html, body, .app, .app__inner, .splashscreen').css({
      minHeight: $(window).height()
    });
  }

  resizeViewport();
  $(window).on('resize', resizeViewport);
});