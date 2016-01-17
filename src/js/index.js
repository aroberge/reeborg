window.RUR = RUR || {};
Translate = function (s) {
    if (RUR.translation !== undefined && RUR.translation[s] !== undefined) {
        return RUR.translation[s];
    } else {
        //console.log("Translation needed for");
        return s;
    }
};
require("./aa_utils.js");
require("./constants.js");
require("./z_commands.js");
require("./zzz_doc_ready.js");
