require("./../rur.js");
require("./reload.js");
require("./../gui_tools/special_keyboard.js");
require("./../editors/create.js");
require("./../permalink/permalink.js");

var record_id = require("./../../lang/msg.js").record_id;

record_id("programming-mode");

/** @function onload_set_programming_language
 * @memberof RUR
 * @instance
 * @summary This function must ONLY be called from the Onload editor. It is
 * used to set which of two programming languages are allowed. If the
 * programming mode is compatible with that language, then it is not changed;
 * otherwise, it is change to the default mode (with Code editor) for
 * that language.
 *
 * **This should only be required if the world contains some content to
 * be run** (either in the editor, or in the pre- or post- code editors.)
 * Otherwise, do not use so that the world can be used using either programming
 * language.
 *
 * @param {string} language  Either `"python"` or `"javascript"`. If the language
 * is not recognized, it is set to `"python"`.
 *
 * @see RUR#onload_set_programming_mode
 * @see {@tutorial custom_goals} for more details about the example mentioned below.
 *
 * @example {@lang python}
 * # Execute the following and, after the world has loaded,
 * # click on **World Info** to see how this code is used.
 * World("worlds/examples/simple_path_explained.json")
 */

RUR.onload_set_programming_language = function(language) {
    if (!RUR.state.evaluating_onload) {
        alert("RUR.onload_set_programming_language should only be called from the 'Onload' editor.");
        return;
    }
    language = language.toLowerCase();  // make it more user-friendly
    if (language == "python") {
        if (!(RUR.state.input_method == "py-repl" ||
            RUR.state.input_method == "python" ||
            RUR.state.input_method == "blockly-py")) {
            RUR.onload_set_programming_mode("python");
        }
    } else if (language == "javascript") {
        if (!(RUR.state.input_method == "javascript" ||
            RUR.state.input_method == "blockly-js")) {
            RUR.onload_set_programming_mode("javascript");
        }
    }  else if (language == "coffeescript") {
        RUR.onload_set_programming_mode("coffeescript");
    } else {
        RUR.onload_set_programming_mode("python");
    }
};


/** @function onload_set_programming_mode
 * @memberof RUR
 * @instance
 * @summary This function must ONLY be called from the Onload editor. It is used
 * to specify which of five modes must be used for a given world.
 *
 * **This should only be required if the world contains some content to
 * be run** (either as blocks, in the editor, or in the pre- or post- code editors)
 * which does require a specific mode.
 * Otherwise, do not use so that the world can be used using all possible
 * programming modes.
 *
 * @param {string} mode  One of `["python", "javascript", "py-repl", "blockly-js", "blockly-py"]`.
 *   If the mode is not a recognized value, it will be set to `"python"`.
 *
 * @example
 * // shows how to switch mode to Blockly, where some blocks are already placed.
 * World("/worlds/examples/square_blockly.json", "Square")
 */

RUR.onload_set_programming_mode = function(mode) {
    if (!RUR.state.evaluating_onload) {
        alert("RUR.onload_set_programming_mode should only be called from the 'Onload' editor.");
        return;
    }
    mode = mode.toLowerCase(); // make it more user-friendly
    if (RUR.state.input_method == mode) {
        return;
    }

    /* When a world is imported from a program using World() or Monde(),
       and the onload editor contains a call to RUR.set_programming_mode,
       it might be useful to delay its execution so that any error thrown
       (e.g. info about changed world) be handled properly by the language
       used to run the original program.
     */
    setTimeout( function() {
        $("#programming-mode").val(mode);
        // the following will ensure that "python" is used as default if
        // the mode is not recognized as a valid one.
        $("#programming-mode").change();
    }, 100);
};

RUR.listeners['programming-mode'] = function () {
    "use strict";
    var choice = $('#programming-mode').val();
    RUR.state.input_method = choice;
    localStorage.setItem("input_method", choice);
    hide_everything();

    switch(choice) {
        case "cpp":
            RUR.state.programming_language = "cpp";
            $("#editor-tab").html(RUR.translate("C++ Code"));
            show_editor("cpp");
            editor.setOption("readOnly", false);
            editor.setOption("theme", "reeborg-dark");
            try {
                $("#kbd-undo").show();
                $("#kbd-redo").show();
            } catch(e) {}

        // re-use element
        $("#mixed-language-info").html(
            "<pre>#include &lt;reeborg&gt;\n" +
            "int main(){...\nreturn 0;}</pre>");
        $("#mixed-language-info").show();

            break;
        case "python":
            RUR.state.programming_language = "python";
            $("#editor-tab").html(RUR.translate("Python Code"));
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
            $("#editor-tab").html(RUR.translate("Javascript Code"));
            show_editor("javascript");
            editor.setOption("readOnly", false);
            editor.setOption("theme", "reeborg-dark");
            try {
                $("#kbd-undo").show();
                $("#kbd-redo").show();
            } catch(e) {}
            break;
        case "coffeescript":
            RUR.state.programming_language = "coffeescript";
            $("#editor-tab").html(RUR.translate("Coffeescript Code"));
            show_editor("coffeescript");
            editor.setOption("readOnly", false);
            editor.setOption("theme", "reeborg-dark");
            try {
                $("#kbd-undo").show();
                $("#kbd-redo").show();
            } catch(e) {}
            break;
        case "blockly-py":
            RUR.state.programming_language = "python";
            $("#editor-tab").html(RUR.translate("Python Code"));
            show_blockly();
            editor.setOption("readOnly", true);
            editor.setOption("theme", "reeborg-readonly");
            break;
        case "blockly-js":
            RUR.state.programming_language = "javascript";
            $("#editor-tab").html(RUR.translate("Javascript Code"));
            show_blockly();
            editor.setOption("readOnly", true);
            editor.setOption("theme", "reeborg-readonly");
            break;
        case "py-repl":
            RUR.state.programming_language = "python";
            editor.setOption("readOnly", true);
            editor.setOption("theme", "reeborg-readonly");
            show_console();
            break;
        default:
            RUR.state.programming_language = "python";
            RUR.state.input_method = "python";
            $("#editor-tab").html(RUR.translate("Python Code"));
            show_editor("python");
            editor.setOption("readOnly", false);
            editor.setOption("theme", "reeborg-dark");
            console.warn(" Default value used in programming-mode select.");
    }
    RUR.kbd.set_programming_language(RUR.state.programming_language);
    RUR.permalink.update_URI();
    RUR.update_marks_in_world_selector();
};


record_id("editor-visible-input");
RUR.listeners['editor-visible-input'] = function () {
    if ($('#editor-visible-input')[0].checked) {
        show_editor(RUR.state.programming_language);
        $("#special-keyboard-button").hide();
    } else {
        hide_editors();
    }
};


function hide_everything () {
    /* By default, we start with a situation where everything is hidden
       and only show later the relevant choices for a given option */
    hide_blockly();
    hide_editors();
    hide_console();
    $("#frame-selector").hide();
    $("#frame-id").hide();
    $("#editor-visible-label").hide();
    $("#editor-visible-input").hide();
    if ($("#special-keyboard-button").hasClass("active-element")) {
        $("#special-keyboard-button").click();
    }
    $("#special-keyboard-button").hide();
    $("#python-additional-menu p button").attr("disabled", "true");
    $("#library-tab").parent().hide();
    $("#extra-tab").parent().hide();
    $("#highlight").hide();
    $("#watch-variables-btn").hide();
    $("#Reeborg-watches").dialog("close");
    try{
        $("#kbd-undo").hide();
        $("#kbd-redo").hide();
    } catch(e) {}
    $("#mixed-language-info").hide();

}

function show_blockly () {
    var style_enable = {"pointer-events": "auto", "opacity": 1};
    $("#save-blockly-btn").removeAttr("disabled");
    $(".blocklyToolboxDiv").css(style_enable);
    $("#blockly-wrapper").css(style_enable);
    // $("#blockly-wrapper").show();
    $("#editor-visible-label").show();
    $("#editor-visible-input").show();
    if ($('#editor-visible-input')[0].checked) {
        show_editor(RUR.state.programming_language);
        $("#special-keyboard-button").hide();
    }
    window.dispatchEvent(new Event('resize')); // important to ensure that blockly is visible
}

function hide_blockly () {
    var style_disable = {"pointer-events": "none", "opacity": 0.01};
    $("#save-blockly-btn").attr("disabled", "true");
    $(".blocklyToolboxDiv").css(style_disable);
    $("#blockly-wrapper").css(style_disable);
    // $("#blockly-wrapper").hide();
    window.dispatchEvent(new Event('resize'));
    $("#special-keyboard-button").show();
}

function show_editor(lang) {
    if (lang == "python") {
        show_python_editor();
    } else if (lang == "coffeescript") {
        show_coffee_editor();
    } else if (lang == "cpp") {
        show_cpp_editor();
    } else {
        show_javascript_editor();
    }
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
        $("#extra-tab").parent().hide();
    }
}

function show_javascript_editor () {
    editor.setOption("mode", "javascript");
    onload_editor.setOption("mode", "javascript"); // could be changed in import_world
    pre_code_editor.setOption("mode", "javascript");
    post_code_editor.setOption("mode", "javascript");
}

function show_cpp_editor() {
    editor.setOption("mode", "text/x-c++src");
    onload_editor.setOption("mode", "text/x-c++src"); // could be changed in import_world
    pre_code_editor.setOption("mode", "text/x-c++src");
    post_code_editor.setOption("mode", "text/x-c++src");
    
    RUR.state.highlight = RUR.state.highlight || RUR.state._saved_highlight_value;
    $("#highlight").show();
}

function show_coffee_editor () {
    editor.setOption("mode", "coffeescript");
    onload_editor.setOption("mode", "coffeescript"); // could be changed in import_world
    pre_code_editor.setOption("mode", "coffeescript");
    post_code_editor.setOption("mode", "coffeescript");
}

function show_python_editor () {
    editor.setOption("mode", {name: "python", version: 3});
    onload_editor.setOption("mode", {name: "python", version: 3}); // could be changed in import_world
    pre_code_editor.setOption("mode", {name: "python", version: 3});
    post_code_editor.setOption("mode", {name: "python", version: 3});

    RUR.state.highlight = RUR.state.highlight || RUR.state._saved_highlight_value;
    $("#library-tab").parent().show();
    if (RUR.state.extra_code_visible) {
        $("#extra-tab").parent().show();
    }
    $("#highlight").show();
    $("#watch-variables-btn").show();
    $("#python-additional-menu p button").removeAttr("disabled");
}


function hide_editors() {
    $("#save-editor-btn").attr("disabled", "true");
    $("#save-library-btn").attr("disabled", "true");
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
    $("#editor-visible-label").show();
    $("#editor-visible-input").show();
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
    $("#open-solution-btn").hide();
    $("#save-solution-btn").hide();
    _start_repl();
}

function _start_repl() {
    try {
        restart_repl();
    } catch (e) {
        console.log("_start_repl: failure; Will try again in 200ms.");
        window.setTimeout(_start_repl, 200);
    }
}

function hide_console() {
    $("#py-console").hide();
    $("#open-solution-btn").show();
    $("#save-solution-btn").show();
    $("#stop").show();
    $("#pause").show();
    $("#run").show();
    $("#step").show();
    $("#reverse-step").show();
    $("#reload").show();
    $("#reload2").hide();
}
