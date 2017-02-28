/* JS will live here... someday */
import 'jquery';
import 'tether';
import 'bootstrap';

jQuery(document).ready(() => {
  var d = new Date();
  jQuery('.year').html(d.getFullYear());
});
