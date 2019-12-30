// $(document).ready(()=>{
// $('.first-load-container').ripples({
//   resolution: 512,
//   dropRadius: 20,
//   perturbance: 0.04,

// });

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

  // const controller = new ScrollMagic.Controller();
  // let timeline= new TimelineMax();
  // timeline
  // .from('.background-effect-content', 1,{
  //   y:-1,
  //   x:0,
  //   ease: Power3.easeInOut
  // })


  // let tween=  gsap.to(".clear-droplets-box",  {duration: 1, y:-382, ease: "slow(0.1, 0.1, false)"});  gsap.to(".blurred-droplets-box",  {duration: 1, y:-782, ease: "slow(0.1, 0.1, false)"});

  // let scene=new ScrollMagic.Scene({
  //   triggerElement:'.background-effect',
  //   duration:heightValue,
  //   triggerHook:0,
  //   offset:'20'
  // })

  // .setTween(tween)
  // .setPin('.background-effect')
  // .addIndicators()
  // .addTo(controller)
})