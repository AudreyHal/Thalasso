let currentScrollY = 0;
let targetScrollY = 0;
let updateScrollFrame = null;


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

window.addEventListener('scroll', updateScrollY)


document.addEventListener('DOMContentLoaded', () => {
  setTimeout(()=>{
    $('.loading').addClass("fade-loader");
    $('body').removeClass("hide-overflow");
  }, 800);
  
  setTimeout(()=>{    
    $('.intro').css({
      "opacity":"1",
      // "transform": "translateY(-15px)"
    })
          
      $('.intro').ripples({
        resolution: 96,
        dropRadius: 80, 
        perturbance: 0.06,
      });
     
    // Automatic drops
		var $el = $('.intro');
		var x = Math.random() * $el.innerWidth();
		var y = Math.random() * $el.innerHeight();
		var dropRadius = 80;
		var strength =  .02 + .1 * Math.random()  ;

		$el.ripples('drop', x, y, dropRadius, strength);
    setTimeout(()=>{ $el.ripples('destroy')  },5000)
    gsap.to(".section_one-title-image", 1, {opacity:1});
    gsap.to(".section_one-title-box", 1.5, {x: 0});
    gsap.fromTo(".section_one-title-box", {width: "0%"}, {duration:1, width:"100%"});
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
  let timeline= new TimelineMax();
  timeline
  .from('.background-effect-content', 1,{
    y:-1,
    x:0,
    ease: Power3.easeInOut
  })

  let t1=gsap.timeline();
  t1.fromTo(".about-text-container",{opacity:0},{duration: 1.5, opacity:1});
  t1.fromTo(".introduction",{opacity:0},{duration: 1.5, opacity:1},"-=1.5");

  let tween=  gsap.fromTo(".section_two",{opacity:0},{duration: 1, opacity:1});  

  let scene=new ScrollMagic.Scene({
    triggerElement:'.section_one',
    // duration:$('.section_one').height()-$('.section_one').height()/2,  
    triggerHook: 0,  
    offset:$('.section_one').height()/2
  })

  .setTween(tween) 
  .addIndicators()
  .addTo(controller)
})