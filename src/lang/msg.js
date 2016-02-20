require("./../lang/en.js");
require("./../lang/fr.js");
require("./../lang/ko.js");

RUR.translation = RUR.en;
RUR.translation_to_english = RUR.en_to_en;

var _recorded_ids = [];
var _text_elements = [];
var _elements_names = [];
var _elements_titles = [];

__record_id = function(id){
    if (_recorded_ids.indexOf(id) !== -1) {
        alert("Fatal error: " + id + " already exists.");
    } else {
        _recorded_ids.push(id);
    }
};

record_id = function (id, text) {
    __record_id(id);
    if (text !== undefined) {
        _text_elements.push([id, text]);
    }
};

record_name = function (id, text) {
    __record_id(id);
    _elements_names.push([id, text]);
};
record_title = function (id, text) {
    __record_id(id);
    _elements_titles.push([id, text]);
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

record_id("site-name", "SITE NAME");
record_id("world-info-button", "WORLD INFO");
record_id("visible-blockly", "EDITOR VISIBLE BLOCKLY");
record_id("special-keyboard-button", "KEYBOARD BUTTON");
record_id("more-menus-button", "ADDITIONAL OPTIONS");
record_title("ui-dialog-title-more-menus", "ADDITIONAL OPTIONS");


record_id("blockly-wrapper");
record_id("move-handle");
record_id("blocklyDiv");
record_name("blockly-basic-commands", "BASIC COMMANDS");
record_name("blockly-defining", "DEFINING");
record_name("blockly-loops", "LOOPS");
record_name("blockly-decisions", "DECISIONS");
record_name("blockly-conditions", "CONDITIONS");
record_name("blockly-using-variables", "USING VARIABLES");
record_name("blockly-commands-var", "COMMANDS");
record_name("blockly-conditions-var", "CONDITIONS");
record_name("blockly-other", "OTHER");

record_id("highlight-impossible", "HIGHLIGHT IMPOSSIBLE");
record_id("command-result", "COMMAND RESULT");
record_id("delete-world-text", "DELETE WORLD TEXT");
record_id("python-only", "PYTHON ONLY");
record_id("togetherjs", "COLLABORATION");
record_id("togetherjs-text", "TOGETHERJS EXPLAIN");
record_id("world-title", "WORLD CREATION TITLE");
record_id("program-in-editor", "PROGRAM IN EDITOR");
record_id("special-execution", "SPECIAL EXECUTION");
record_id("reverse-step-text", "REVERSE STEP EXPLAIN");
