import 'jquery';
import 'tether';
import 'bootstrap';
import Headroom from 'headroom.js';

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
});
