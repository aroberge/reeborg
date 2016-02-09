require("./../state.js");
require("./../listeners/reload.js");
require("./../keyboard.js");
var record_id = require("./../../lang/msg.js").record_id;

record_id("programming-mode");

$("#programming-mode").change(function() {
    "use strict";
    var choice = $(this).val();
    RUR.state.input_method = choice;
    localStorage.setItem("programming-mode", choice);
    hide_everything();

    switch(choice) {
        case "python":
            RUR.state.programming_language = "python";
            show_editor("python");
            editor.setOption("readOnly", false);
            break;
        case "javascript":
            RUR.state.programming_language = "javascript";
            show_editor("javascript");
            editor.setOption("readOnly", false);
            break;
        case "blockly-py":
            RUR.state.programming_language = "python";
            show_blockly();
            editor.setOption("readOnly", true);
            break;
        case "blockly-js":
            RUR.state.programming_language = "javascript";
            show_blockly();
            editor.setOption("readOnly", true);
            break;
        case "py-repl":
            RUR.state.programming_language = "python";
            show_console();
            break;
        default:
            RUR.state.programming_language = "python";
            show_editor("python");
            editor.setOption("readOnly", false);
            console.log("Problem? Default value used in programming-mode select.");
    }

    RUR.kbd.set_programming_language(RUR.state.programming_language);
});


record_id("editor-visible-blockly");
$('#editor-visible-blockly').change(function() {
    if ($('#editor-visible-blockly')[0].checked) {
        show_editor(RUR.state.programming_language);
    } else {
        hide_editors();
    }
});


function hide_everything () {
    /* By default, we start with a situation where everything is hidden
       and only show later the relevant choices for a given option */
    hide_blockly();
    hide_editors();
    hide_console();
    if ($("#special-keyboard-button").hasClass("reverse-blue-gradient")) {
        $("#special-keyboard-button").click();
    }
    $("#special-keyboard-button").hide();
    // Python specific
    $("#python-additional-menu p button").attr("disabled", "true");
    $("#library-tab").parent().hide();
    $("#highlight").hide();
    $("#watch-variables-btn").hide();
    $("#Reeborg-watches").dialog("close");
}

function show_blockly () {
    $("#blockly-wrapper").show();
    $("#visible-blockly").show();
    $("#editor-visible-blockly").show();
    if ($('#editor-visible-blockly')[0].checked) {
        show_editor(RUR.state.programming_language);
    }
    window.dispatchEvent(new Event('resize')); // important to ensure that blockly is visible
}

function hide_blockly () {
    $("#blockly-wrapper").hide();
    window.dispatchEvent(new Event('resize'));
    $("#visible-blockly").hide();
    $("#editor-visible-blockly").hide();
    $("#special-keyboard-button").show();
}

function show_editor(lang) {
    if (lang == "python") {
        show_python_editor();
    } else {
        show_javascript_editor();
    }
    $("#editor-panel").addClass("active");
    $("#editor-tab").click();
    RUR.reload();
    editor.refresh();
    if (RUR.state.editing_world) {
        $("#pre-code-link").parent().show();
        $("#post-code-link").parent().show();
        $("#description-link").parent().show();
        $("#onload-editor-link").parent().show();
    }
}

function show_javascript_editor () {
    $("#editor-tab").html(RUR.translate("Javascript Code"));
    editor.setOption("mode", "javascript");
    pre_code_editor.setOption("mode", "javascript");
    post_code_editor.setOption("mode", "javascript");
}

function show_python_editor () {
    $("#editor-tab").html(RUR.translate("Python Code"));
    editor.setOption("mode", {name: "python", version: 3});
    pre_code_editor.setOption("mode", {name: "python", version: 3});
    post_code_editor.setOption("mode", {name: "python", version: 3});

    RUR.state.highlight = RUR.state.highlight || RUR.state._saved_highlight_value;
    $("#library-tab").parent().show();
    $("#highlight").show();
    $("#watch-variables-btn").show();
    $("#python-additional-menu p button").removeAttr("disabled");
}


function hide_editors() {
    if (RUR.state.programming_language == "python") {
        RUR.state._saved_highlight_value = RUR.state.highlight;
        RUR.state.highlight = false;
    }
    $("#editor-panel").removeClass("active");
    // extra editors
    $("#pre-code-link").parent().hide();
    $("#post-code-link").parent().hide();
    $("#description-link").parent().hide();
    $("#onload-editor-link").parent().hide();
}

function show_console() {
    $("#py-console").show();
    $("#stop").hide();
    $("#pause").hide();
    $("#run").hide();
    $("#step").hide();
    $("#reverse-step").hide();
    $("#reload").hide();
    $("#reload2").show();
    $("#reload2").removeAttr("disabled");
    _start_repl();
}

function _start_repl() {
    try {
        restart_repl();
    } catch (e) {
        console.log("_start_repl: failure", e);
        window.setTimeout(_start_repl, 500);
    }
}

function hide_console() {
    $("#py-console").hide();
    $("#stop").show();
    $("#pause").show();
    $("#run").show();
    $("#step").show();
    $("#reverse-step").show();
    $("#reload").show();
    $("#reload2").hide();
}

/* initialization */

show_editor("python");
if(localStorage.getItem("programming-mode")){
    document.getElementById('programming-mode').value = localStorage.getItem("programming-mode");
}
// see end of index.js for initialization.
