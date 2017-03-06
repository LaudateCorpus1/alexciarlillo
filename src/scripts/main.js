/* JS will live here... someday */
import 'jquery';
import 'tether';
import 'bootstrap';
import Headroom from 'headroom.js';
import ScrollMagic from 'scrollmagic';
import 'debug.addIndicators';

let durations = new Map();
durations.set('about', 0);
durations.set('projects', 0);
durations.set('resume', 0);

function updateDurations() {
  /* eslint-disable no-unused-vars */
  for(var [scene,duration] of durations) {
    durations.set(scene, $(`#${scene}`).height());
  }
}

window.updateDurations = updateDurations;

function debugDurations() {
  for(var [scene,duration] of durations) {
    /* eslint-disable no-console */
    console.log(`${scene} -> ${duration}`);
  }
}

window.debugDurations = debugDurations;

function getDuration(scene) {
  return durations.get(scene);
}

jQuery(document).ready(() => {
  // set copyright date
  var d = new Date();
  jQuery('.year').html(d.getFullYear());

  // init headroom for header scroll hiding (mobile)
  var headroom = new Headroom(document.querySelector("header"));
  headroom.init();

  // collapse the nav when we select a link
  // data-toggle prevents default so we have to
  // do this with JS
  jQuery('.nav-link').click(() => {
    $('#collapseNav').collapse('hide');
  });

  /* eslint-disable no-console */
  updateDurations();
  $(window).on('resize', () => {
    console.log('window resize, recalculating durations');
    updateDurations();
  });
  let controller = new ScrollMagic.Controller();

  new ScrollMagic.Scene({triggerElement: "#about", duration: getDuration('about')})
    .setClassToggle("#nav-about", "active") // add class toggle
    .addIndicators()
    .addTo(controller);
  new ScrollMagic.Scene({triggerElement: "#projects", duration: getDuration('projects')})
    .setClassToggle("#nav-projects", "active") // add class toggle
    .addIndicators()
    .addTo(controller);
  new ScrollMagic.Scene({triggerElement: "#resume", duration: getDuration('resume')})
    .setClassToggle("#nav-resume", "active") // add class toggle
    .addIndicators()
    .addTo(controller);
});
