require("./../state.js");
var record_id = require("./../utils/record_id.js").record_id;
var update_ui = require("./../../lang/msg.js").update_ui;

record_id("human-language");

$("#human-language").change(function() {
    var lang = $(this).val();
    RUR.state.human_language = lang;
    update_dictionary(lang);
    update_ui();
    //update_commands();
    //TODO update blockly display
});

function update_dictionary(lang) {
    var msg, dict;
    dict = RUR[lang];
    for (msg in dict) {
        if (dict.hasOwnProperty(msg)) {
            RUR.translation[msg] = dict[msg];
        }
    }
}
