;
// from http://stackoverflow.com/questions/15005500/loading-cross-domain-html-page-with-jquery-ajax

// will modify a global object - no need to export anything.
$.ajaxPrefilter( function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
  }
});
