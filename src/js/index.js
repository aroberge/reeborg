window.RUR = RUR || {};


/* require two modules that will automatically modify two global objects */
require("./utils/cors.js");
require("./utils/supplant.js");



RUR.ensure_key_exists = function(obj, key){
    "use strict";
    if (obj[key] === undefined){
        obj[key] = {};
    }
};

RUR.show_feedback = function (element, content) {
    $(element).html(content).dialog("open");
};


require("./z_commands.js");
require("./zzz_doc_ready.js");
