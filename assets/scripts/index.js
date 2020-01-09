let currentScrollY = 0;
let targetScrollY = 0;
let updateScrollFrame = null;

// Background Bubble Motion 
const updateScrollYInterval = () => {
  currentScrollY += .05 * (targetScrollY - currentScrollY);
  $('.clear-droplets-box').css({
    "transform": "translateY(" + (-currentScrollY * 0.1) + "px)"
  });
  $('.blurred-droplets-box').css({
    "transform": "translateY(" + (-currentScrollY * 0.3) + "px)"
  })
  updateScrollFrame = requestAnimationFrame(updateScrollYInterval);
  console.log("Scrolling");
}

const updateScrollY = () => {
  targetScrollY = window.pageYOffset
}

// Ripple Effect
const animateRippleEffect = ($el) => {
  $el.ripples({
    resolution: 96,
    dropRadius: 80,
    perturbance: 0.06,
  });

  // Automate random drops
  let x = Math.random() * $el.innerWidth();
  let y = Math.random() * $el.innerHeight();
  let dropRadius = 80;
  let strength = .02 + .1 * Math.random();

  $el.ripples('drop', x, y, dropRadius, strength);
  setTimeout(() => {
    $el.ripples('destroy')
  }, 5000)
}


window.addEventListener('scroll', updateScrollY);


document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    $('.loading').addClass("fade-loader");
    $('body').removeClass("hide-overflow");
  }, 800);

  setTimeout(() => {
    $('.intro').css({
      "opacity": "1",
      "transform": "translateY(-15px)"
    })

    let $el = $('.intro');
    animateRippleEffect($el)

    gsap.to(".section_one-title-image", 1, {
      opacity: 1
    });
    gsap.to(".section_one-title-box", 1.5, {
      x: 0
    });
    gsap.fromTo(".section_one-title-box", {
      width: "0%"
    }, {
      duration: 1,
      width: "100%"
    });
  }, 1200);


  // Set the height of parent as absolutely positioned child
  setContentHeight = () => {
    let parentDiv = document.querySelector('.background-effect');
    let childDiv = document.querySelector('.background-effect-box');
    heightValue = (childDiv.offsetHeight + 1000) + 'px';
    parentDiv.style.height = heightValue;
  }
  setContentHeight();
  $(window).on("resize", setContentHeight);
  requestAnimationFrame(updateScrollYInterval);


  const controller = new ScrollMagic.Controller();

  let scene1 = new ScrollMagic.Scene({
      triggerElement: '.section_one',
      triggerHook: 0,
      offset: $('.section_one').height() / 2
    })
    .setClassToggle(".about-section-grid-container .delayed-show", "appear")
    .addIndicators()
    .addTo(controller)


  let scene2 = new ScrollMagic.Scene({
      triggerElement: '.about-section-grid-container',
      triggerHook: 0,
      offset: 100
    })
    .on('start', () => {
      let $el = $('.about_picture');
      $el.addClass("appear");
      animateRippleEffect($el)
    })
    .addIndicators()
    .addTo(controller)


  let scene3 = new ScrollMagic.Scene({
      triggerElement: '.about_picture_container',
      triggerHook: 0,
      offset: $('.about_picture_container').height() / 2
    })
    .setClassToggle(".concept-section-grid-container .delayed-show", "appear")
    .addIndicators()
    .addTo(controller)


  let scene4 = new ScrollMagic.Scene({
      triggerElement: '.about_picture_container',
      triggerHook: 0,
      offset: $('.about_picture_container').height() + 20
    })
    .on('start', () => {
      let $el = $('.concept_picture');
      $el.addClass("appear");
      animateRippleEffect($el)
    })
    .addIndicators()
    .addTo(controller)


  let scene5 = new ScrollMagic.Scene({
      triggerElement: '.concept_picture_container',
      triggerHook: 0,
      offset: $('.concept_picture_container').height() / 1.5,
    })
    .on('start', () => {
      let delay = 200;
      for (i = 0; i < 4; i++) {
        let $el = $('.column').eq(i);
        console.log(delay);
        setTimeout(() => {
          $el.addClass("appear")
        }, delay * i)
      }
    })
    .addIndicators()
    .addTo(controller)

  let scene6 = new ScrollMagic.Scene({
      triggerElement: '.concept_picture_container',
      triggerHook: 0,
      offset: $('.concept_picture_container').height(),
    })
    .on('start', () => {
      let delay = 200;
      for (i = 4; i < 7; i++) {
        let $el = $('.column').eq(i);
        console.log(delay);
        setTimeout(() => {
          $el.addClass("appear")
        }, delay * i)
      }
    })
    .addIndicators()
    .addTo(controller)

})