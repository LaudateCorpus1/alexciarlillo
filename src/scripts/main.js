/* JS will live here... someday */
global.jQuery = require('jquery');

jQuery(document).ready(function() {
  var d = new Date();
  jQuery('.year').html(d.getFullYear());
});
