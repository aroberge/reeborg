require("./../lang/en.js");
require("./../lang/fr.js");
require("./../lang/ko.js");

RUR.translation = RUR.en;
RUR.translation_to_english = RUR.en_to_en;

var _recorded_ids = [];
var _text_elements = [];
var _elements_names = [];
var _elements_titles = [];

record_id = function (id, text) {
    if (_recorded_ids.indexOf(id) !== -1) {
        alert("Fatal error: " + id + " already exists.");
    } else {
        _recorded_ids.push(id);
    }
    if (text !== undefined) {
        add_msg(id, text);
    }
};

add_msg = function (id, msg){
    _text_elements.push([id, msg]);
};

add_name = function (id, msg){
    _elements_names.push([id, msg]);
};

add_title = function (id, msg){
    _elements_titles.push([id, msg]);
};


update_ui = function (lang) {
    "use strict";
    var i, id, msg;
    window.document.documentElement.lang = lang;

    for(i=0; i<_text_elements.length; i++) {
        id = "#" + _text_elements[i][0];
        msg = _text_elements[i][1];
        $(id).text(RUR.translate(msg));
    }
    for(i=0; i<_elements_names.length; i++) {
        id = "#" + _elements_names[i][0];
        msg = _elements_names[i][1];
        $(id).attr("name", RUR.translate(msg));
    }
    update_titles();
};

update_titles = function () {
    "use strict";
    var i, id, msg;
    for(i=0; i<_elements_titles.length; i++) {
        id = "#" + _elements_titles[i][0];
        msg = _elements_titles[i][1];
        $(id).text(RUR.translate(msg));
    }
};

exports.update_ui = update_ui;
exports.record_id = record_id;
exports.update_titles = update_titles;

add_msg("site-name", "SITE NAME");
add_msg("world-info-button", "WORLD INFO");
add_msg("visible-blockly", "EDITOR VISIBLE BLOCKLY");
add_msg("special-keyboard-button", "KEYBOARD BUTTON");
add_msg("more-menus-button", "ADDITIONAL OPTIONS");
add_title("ui-dialog-title-more-menus", "ADDITIONAL OPTIONS");


record_id("blockly-wrapper");
record_id("move-handle");
record_id("blocklyDiv");
add_name("blockly-basic-commands", "BASIC COMMANDS");
add_name("blockly-defining", "DEFINING");
add_name("blockly-loops", "LOOPS");
add_name("blockly-decisions", "DECISIONS");
add_name("blockly-conditions", "CONDITIONS");
add_name("blockly-using-variables", "USING VARIABLES");
add_name("blockly-commands-var", "COMMANDS");
add_name("blockly-conditions-var", "CONDITIONS");
add_name("blockly-other", "OTHER");

add_msg("highlight-impossible", "HIGHLIGHT IMPOSSIBLE");
add_msg("command-result", "COMMAND RESULT");
