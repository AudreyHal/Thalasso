let currentScrollY = 0;
let targetScrollY = 0;
let updateScrollFrame = null;

// Background bubble motion based on scroll position
const updateScrollYInterval = () => {
  currentScrollY += .05 * (targetScrollY - currentScrollY);
  $('.clear-droplets-box').css({
    "transform": "translateY(" + (-currentScrollY * 0.1) + "px)"
  });
  $('.blurred-droplets-box').css({
    "transform": "translateY(" + (-currentScrollY * 0.3) + "px)"
  })
  updateScrollFrame = requestAnimationFrame(updateScrollYInterval);  
}

const updateScrollY = () => {
  targetScrollY = window.pageYOffset
};

// Image ripple effect
const animateRippleEffect = (element) => {
  element.ripples({
    resolution: 96,
    dropRadius: 80,
    perturbance: 0.06,
  });

  // Automate random drops
  let x = Math.random() * element.innerWidth();
  let y = Math.random() * element.innerHeight();
  let dropRadius = 80;
  let strength = .02 + .1 * Math.random();

  element.ripples('drop', x, y, dropRadius, strength);
  setTimeout(() => {
    element.ripples('destroy')
  }, 5000)
}

  // Set the height of parent element as that of absolutely positioned child
  const setContentHeight = () => {
    let parentDiv = document.querySelector('.background-effect');
    let childDiv = document.querySelector('.background-effect-box');
    heightValue = (childDiv.offsetHeight + 1000) + 'px';
    parentDiv.style.height = heightValue;
  }


window.addEventListener('scroll', updateScrollY);

document.addEventListener('DOMContentLoaded', () => {

  // Hide preloader logo  image once time elapses
  setTimeout(() => {
    $('.loading').addClass("fade-loader");
    $('body').removeClass("hide-overflow");
  }, 800);

  // Reveal the banner image at the top of the site and apply animations after time elapses
  setTimeout(() => {
    $('.intro').css({
      "opacity": "1",
      "transform": "translateY(-15px)"
    })

    let bannerImage = $('.intro');
    animateRippleEffect(bannerImage)

    gsap.to(".section-one-title-image", 1, {
      opacity: 1
    });
    gsap.to(".section-one-title-box", 1.5, {
      x: 0
    });
    gsap.fromTo(".section-one-title-box", {
      width: "0%"
    }, {
      duration: 1,
      width: "100%"
    });
  }, 1200);



  setContentHeight();
  $(window).on("resize", setContentHeight);
  requestAnimationFrame(updateScrollYInterval);


  // Initialize scrollMagic controller
  const controller = new ScrollMagic.Controller();

  // Scene 1
  new ScrollMagic.Scene({
      triggerElement: '.section-one',
      triggerHook: 0,
      offset: $('.section-one').height() / 2
    })
    .setClassToggle(".about-section-grid-container .delayed-show", "appear")
    .addIndicators()
    .addTo(controller)


  // Scene 2
  new ScrollMagic.Scene({
      triggerElement: '.about-section-grid-container',
      triggerHook: 0,
      offset: 100
    })
    .on('start', () => {
      let bannerImage = $('.about-picture');
      bannerImage.addClass("appear");
      animateRippleEffect(bannerImage)
    })
    .addIndicators()
    .addTo(controller)


  // Scene 3
  new ScrollMagic.Scene({
      triggerElement: '.about-picture-container',
      triggerHook: 0,
      offset: $('.about-picture-container').height() / 2
    })
    .setClassToggle(".concept-section-grid-container .delayed-show", "appear")
    .addIndicators()
    .addTo(controller)


  // Scene 4
  new ScrollMagic.Scene({
      triggerElement: '.about-picture-container',
      triggerHook: 0,
      offset: $('.about-picture-container').height() + 20
    })
    .on('start', () => {
      let bannerImage = $('.concept-picture');
      bannerImage.addClass("appear");
      animateRippleEffect(bannerImage)
    })
    .addIndicators()
    .addTo(controller)


  // Scene 5 
  new ScrollMagic.Scene({
      triggerElement: '.concept-picture-container',
      triggerHook: 0,
      offset: $('.concept-picture-container').height() / 1.5,
    })
    .on('start', () => {
      let delay = 200;
      for (i = 0; i < 4; i++) {
        let column = $('.column').eq(i);
        setTimeout(() => {
          column.addClass("appear")
        }, delay * i)
      }
    })
    .addIndicators()
    .addTo(controller)

  // Scene 6 
  new ScrollMagic.Scene({
      triggerElement: '.concept-picture-container',
      triggerHook: 0,
      offset: $('.concept-picture-container').height(),
    })
    .on('start', () => {
      let delay = 200;
      for (i = 4; i < 7; i++) {
        let column = $('.column').eq(i);
        setTimeout(() => {
          column.addClass("appear")
        }, delay * i)
      }
    })
    .addIndicators()
    .addTo(controller)

})