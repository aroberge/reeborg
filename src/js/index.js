
/** @namespace RUR */         // for jsdoc
window.RUR = RUR || {};

RUR.OBJECTS = {};
RUR.TILES = {};
RUR.SOLID_OBJECTS = {};
RUR.HOME_IMAGES = {};
RUR.BACKGROUND_IMAGE = new Image();
RUR.BACKGROUND_IMAGE.src = '';

RUR._NB_IMAGES_TO_LOAD = 0;
RUR._NB_IMAGES_LOADED = 0;
RUR._BASE_URL = '';
RUR.INCREMENT_LOADED_FN = function () {
    RUR._NB_IMAGES_LOADED += 1;
};
require("./../lang/msg.js");
require("./../lang/en.js");
require("./../lang/fr.js");
require("./../lang/ko.js");
require("./utils/key_exist.js");

RUR.show_feedback = function (element, content) {
    $(element).html(content).dialog("open");
};


/* require two modules that will automatically modify two global objects */
require("./utils/cors.js");
require("./utils/supplant.js");

require("./listeners/add_listeners.js");

require("./playback/reverse_step.js"); /* only invoked from the html file - for now */

require("./z_commands.js");
require("./zzz_doc_ready.js");
