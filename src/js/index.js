
/** @namespace RUR */         // for jsdoc
window.RUR = RUR || {};

RUR._NB_IMAGES_TO_LOAD = 0;
RUR._NB_IMAGES_LOADED = 0;
RUR._BASE_URL = '';

RUR.objects = {};
RUR.tiles = {};
RUR.solid_objects = {};
RUR.home_images = {};
RUR.background_image = new Image();
RUR.background_image.src = '';


/** @namespace private
* @memberof RUR */   // for jsdoc

require("./utils/key_exist.js");

require("jquery");

RUR.show_feedback = function (element, content) {
    $(element).html(content).dialog("open");
};


/* require two modules that will automatically modify two global objects */
require("./utils/cors.js");
require("./utils/supplant.js");

require("./ui/run.js"); /* only invoked from the html file - for now */
require("./ui/toggle_highlight.js"); /* only invoked from the html file - for now */
require("./ui/toggle_watch_variables.js"); /* only invoked from the html file - for now */
require("./ui/select_world_change.js"); 
require("./playback/reverse_step.js"); /* only invoked from the html file - for now */

require("./z_commands.js");
alert("Not ready to run");
// require("./zzz_doc_ready.js");
