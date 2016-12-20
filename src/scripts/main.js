/* JS will live here... someday */
global.jQuery = require('jquery');
global.Tether = require('tether');
require('bootstrap');

jQuery(document).ready(function() {
  var d = new Date();
  jQuery('.year').html(d.getFullYear());
});
