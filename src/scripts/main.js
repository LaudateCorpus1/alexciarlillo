/* JS will live here... someday */
import 'jquery';
import 'tether';
import 'bootstrap';
import Headroom from 'headroom.js';


jQuery(document).ready(() => {
  var d = new Date();
  jQuery('.year').html(d.getFullYear());

  var headroom = new Headroom(document.querySelector("header"));
  headroom.init();

  jQuery('.nav-link').click(() => {
    $('#collapseNav').collapse('hide');
  })
});
