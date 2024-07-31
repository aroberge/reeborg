var _recorded_ids = [];
var _text_elements = [];
var _elements_names = [];
var _elements_titles = [];
var _function_names = [];
var _value_names = [];

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

record_value = function (id, text) {
    __record_id(id);
    _value_names.push([id, text]);
};
record_fn = function (id, text) {
    __record_id(id);
    _function_names.push([id, text]);
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

    for(i=0; i<_function_names.length; i++) {
        id = "#" + _function_names[i][0];
        msg = _function_names[i][1];
        $(id).html(RUR.translate(msg) + "()");
    }
    for(i=0; i<_text_elements.length; i++) {
        id = "#" + _text_elements[i][0];
        msg = _text_elements[i][1];
        $(id).html(RUR.translate(msg));
    }
    for(i=0; i<_elements_names.length; i++) {
        id = "#" + _elements_names[i][0];
        msg = _elements_names[i][1];
        $(id).attr("name", RUR.translate(msg));
    }
    for(i=0; i<_value_names.length; i++) {
        id = "#" + _value_names[i][0];
        msg = _value_names[i][1];
        $(id).attr("value", RUR.translate(msg));
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
exports.record_title = record_title;
exports.record_fn = record_fn;
exports.record_value = record_value;

record_id("site-name", "SITE NAME");
record_id("world-info-button", "WORLD INFO");
record_id("editor-visible-label", "EDITOR VISIBLE");
record_id("special-keyboard-button", "KEYBOARD BUTTON");
record_id("more-menus-button", "ADDITIONAL OPTIONS");
record_title("ui-dialog-title-more-menus", "ADDITIONAL OPTIONS");

record_id("thinking", "THINKING")

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
record_name("blockly-objects", "OBJECTS");

record_id("highlight-impossible", "HIGHLIGHT IMPOSSIBLE");
record_id("command-result", "COMMAND RESULT");
record_id("delete-world-text", "DELETE WORLD TEXT");
record_id("python-only", "PYTHON ONLY");
record_id("togetherjs", "COLLABORATION");
record_id("togetherjs-text", "TOGETHERJS EXPLAIN");
record_id("world-title", "WORLD CREATION TITLE");
record_id("program-in-editor", "PROGRAM IN EDITOR");
record_id("progress-section", "PROGRESS SECTION TITLE");
record_id("progress-explain", "PROGRESS EXPLAIN");
record_id("retrieve-solution-explain", "RETRIEVE SOLUTION EXPLAIN");
record_id("program-in-blockly-workspace", "PROGRAM IN BLOCKLY WORKSPACE");
record_id("contact", "CONTACT");
record_id("issues", "ISSUES");
record_id("help", "HELP");
record_id("forum", "FORUM");
record_id("documentation", "DOCUMENTATION");
record_id("python-help", "PYTHON HELP");
record_id("keyboard-help", "KEYBOARD HELP");

record_title("ui-dialog-title-edit-world-panel", "WORLD EDITOR");
record_id("east", "m-east");
record_id("north", "m-north");
record_id("west", "m-west");
record_id("south", "m-south");
record_id("random", "m-random");
record_id("m-dimensions", "m-dimensions");
record_id("m-add-robot", "m-add-robot");
record_id("m-robot", "m-robot");
record_id("m-position", "m-position");
record_id("m-turn", "m-turn");
record_id("m-objects", "m-objects");
record_id("m-add", "m-add");
record_id("m-walls", "m-walls");
record_id("m-objects2", "m-objects2");
record_id("m-tiles", "m-tiles");
record_id("m-fill", "m-fill");
record_id("m-solid", "m-solid");
record_id("m-decorative", "m-decorative");
record_id("m-background", "m-background");
record_id("m-goal", "m-goal");
record_id("mg-robot", "mg-robot");
record_id("mg-walls", "mg-walls");
record_id("mg-objects", "mg-objects");

record_title("ui-dialog-title-Reeborg-success", "Reeborg says: I'm done!");
record_title("ui-dialog-title-Reeborg-writes", "Reeborg writes:");
record_title("ui-dialog-title-Reeborg-failure", "Reeborg shouts: Something is wrong!");
record_title("ui-dialog-title-Reeborg-proclaims", "Reeborg states:");
record_title("ui-dialog-title-Reeborg-watches", "Reeborg watches some variables!");
record_title("ui-dialog-title-World-info", "Click on the world to get some additional information.");

record_id("kbd-repeat-not-keyword", "<code>repeat</code> is not a true Python keyword.");
