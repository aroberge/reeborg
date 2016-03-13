require("./../state.js");
require("./../listeners/reload.js");
require("./../keyboard.js");
require("./../create_editors.js");
var record_id = require("./../../lang/msg.js").record_id;
var update_url = require("./../utils/parseuri.js").update_url;

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
            editor.setOption("theme", "reeborg-dark");
            try {
                $("#kbd-undo").show();
                $("#kbd-redo").show();
            } catch(e) {}
            break;
        case "javascript":
            RUR.state.programming_language = "javascript";
            show_editor("javascript");
            editor.setOption("readOnly", false);
            editor.setOption("theme", "reeborg-dark");
            try {
                $("#kbd-undo").show();
                $("#kbd-redo").show();
            } catch(e) {}
            break;
        case "blockly-py":
            RUR.state.programming_language = "python";
            show_blockly();
            editor.setOption("readOnly", true);
            editor.setOption("theme", "reeborg-readonly");
            break;
        case "blockly-js":
            RUR.state.programming_language = "javascript";
            show_blockly();
            editor.setOption("readOnly", true);
            editor.setOption("theme", "reeborg-readonly");
            break;
        case "py-repl":
            RUR.state.programming_language = "python";
            show_console();
            break;
        default:
            RUR.state.programming_language = "python";
            show_editor("python");
            editor.setOption("readOnly", false);
            editor.setOption("theme", "reeborg-dark");
            console.log("Problem? Default value used in programming-mode select.");
    }
    RUR.kbd.set_programming_language(RUR.state.programming_language);
    update_url();
});


record_id("editor-visible-blockly");
$('#editor-visible-blockly').change(function() {
    if ($('#editor-visible-blockly')[0].checked) {
        show_editor(RUR.state.programming_language);
        $("#special-keyboard-button").hide();
    } else {
        hide_editors();
    }
});

record_id("add-blockly-choice");
record_id("add-editor-choice");
record_id("add-library-choice");

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
    document.getElementById("add-library-to-world").checked = false;
    $("#python-additional-menu p button").attr("disabled", "true");
    $("#library-tab").parent().hide();
    $("#highlight").hide();
    $("#watch-variables-btn").hide();
    $("#Reeborg-watches").dialog("close");
    try{
        $("#kbd-undo").hide();
        $("#kbd-redo").hide();
    } catch(e) {}

}

function show_blockly () {
    $("#add-blockly-choice").show();
    $("#save-blockly-btn").removeAttr("disabled");
    $("#blockly-wrapper").show();
    $("#visible-blockly").show();
    $("#editor-visible-blockly").show();
    if ($('#editor-visible-blockly')[0].checked) {
        show_editor(RUR.state.programming_language);
        $("#special-keyboard-button").hide();
    }
    window.dispatchEvent(new Event('resize')); // important to ensure that blockly is visible
}

function hide_blockly () {
    $("#add-blockly-choice").hide();
    $("#save-blockly-btn").attr("disabled", "true");
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
    $("#add-editor-choice").show();
    $("#save-editor-btn").removeAttr("disabled");
    $("#editor-panel").addClass("active");
    $("#editor-tab").click();
    $("#special-keyboard-button").show();
    RUR.reload();
    editor.refresh();
    if (RUR.state.editing_world) {
        $("#pre-code-tab").parent().show();
        $("#post-code-tab").parent().show();
        $("#description-tab").parent().show();
        $("#onload-editor-tab").parent().show();
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
    $("#add-library-choice").show();
    $("#highlight").show();
    $("#watch-variables-btn").show();
    $("#python-additional-menu p button").removeAttr("disabled");
}


function hide_editors() {
    $("#add-editor-choice").hide();
    $("#save-editor-btn").attr("disabled", "true");
    $("#save-library-btn").attr("disabled", "true");
    $("#add-library-choice").hide();   // Python specific
    if (RUR.state.programming_language == "python") {
        RUR.state._saved_highlight_value = RUR.state.highlight;
        RUR.state.highlight = false;
    }
    $("#editor-panel").removeClass("active");
    // extra editors
    $("#pre-code-tab").parent().hide();
    $("#post-code-tab").parent().hide();
    $("#description-tab").parent().hide();
    $("#onload-editor-tab").parent().hide();
}

function show_console() {
    $("#special-keyboard-button").show();
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
        console.log("Will try again in 500ms.");
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

/* Ensure that CodeMirror editors are set up properly
   even if not to be used initially
*/
show_editor("python");
// see start_session.js for initialization.
