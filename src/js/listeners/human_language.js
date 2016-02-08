require("./../state.js");
require("./../../lang/reeborg_en.js");
require("./../../lang/reeborg_fr.js");
var msg = require("./../../lang/msg.js");


msg.record_id("human-language");

function update_translations(lang) {
    var msg, dict;
    dict = RUR[lang];
    for (msg in dict) {
        if (dict.hasOwnProperty(msg)) {
            RUR.translation[msg] = dict[msg];
        }
    }
}

function update_commands (lang) {
    switch(lang) {
        case "fr":
            RUR.reset_definitions = RUR.reset_definitions_fr;
            RUR.library_name = "biblio";
            RUR.from_import = "from reeborg_fr import *";
            break;
        case "en":
            RUR.reset_definitions = RUR.reset_definitions_en;
            RUR.library_name = "library";
            RUR.from_import = "from reeborg_en import *";
            break;
        default:
            RUR.library_name = "library";
            RUR.from_import = "from reeborg_en import *";
            RUR.reset_definitions = RUR.reset_definitions_en;
    }
    RUR.reset_definitions();
}


$("#human-language").change(function() {
    var lang = $(this).val();
    RUR.state.human_language = lang;
    update_translations(lang);
    msg.update_ui(lang);
    update_commands(lang);
    //TODO update blockly display
    console.log("changed to", lang);
});

$("#human-language").change();
