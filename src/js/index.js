
/** @namespace RUR */         // for jsdoc
window.RUR = RUR || {};

/** @namespace private
* @memberof RUR */   // for jsdoc


RUR.show_feedback = function (element, content) {
    $(element).html(content).dialog("open");
};


/* require two modules that will automatically modify two global objects */
require("./utils/cors.js");
require("./utils/supplant.js");

require("./z_commands.js");
require("./zzz_doc_ready.js");
