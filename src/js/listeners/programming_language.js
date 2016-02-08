require("./../state.js");
require("./../keyboard.js");
var record_id = require("./../../lang/msg.js").record_id;
record_id("select-programming-language");

$("#select-programming-language").change(function() {
    RUR.reset_programming_language($(this).val());
});

RUR.reset_programming_language = function(choice){
    RUR.settings.current_language = choice;
    try {
        localStorage.setItem("last_programming_language_" + RUR.state.human_language, RUR.settings.current_language);
    } catch (e) {}
    $("#python-additional-menu p button").attr("disabled", "true");
    $("#library-tab").parent().hide();
    $("#highlight").hide();
    $("#py-console").hide();

    $("#pre-code-link").parent().hide();
    $("#post-code-link").parent().hide();
    $("#description-link").parent().hide();
    $("#onload-editor-link").parent().hide();
    $("#python-choices").hide();
    $("#javascript-choices").hide();
    $("#special-keyboard-button").show();

    switch(RUR.settings.current_language){
        case 'python-' + RUR.state.human_language :
            $("#python-choices").show();
            $("#python-choices").change();
            // TODO review RUR.settings ...
            RUR.settings.editor = "editor_py_" + RUR.state.human_language;
            RUR.settings.library = "library_py_" + RUR.state.human_language;
            RUR.state.programming_language = "python";
            $("#editor-tab").html(RUR.translate("Python Code"));
            editor.setOption("mode", {name: "python", version: 3});
            pre_code_editor.setOption("mode", {name: "python", version: 3});
            post_code_editor.setOption("mode", {name: "python", version: 3});
            // show language specific
            $("#library-tab").parent().show();
            $("#python-additional-menu p button").removeAttr("disabled");
            if (RUR.state.input_method==="repl") {
                $("#py-console").show();
            }
            RUR.kbd.set_programming_language("python");
            break;
        case 'javascript-' + RUR.state.human_language :
            $("#javascript-choices").show();
            $("#javascript-choices").change();
            $("#editor-panel").addClass("active");
            RUR.settings.editor = "editor_js_" + RUR.state.human_language;
            RUR.state.programming_language = "javascript";
            $("#editor-tab").html(RUR.translate("Javascript Code"));
            editor.setOption("mode", "javascript");
            pre_code_editor.setOption("mode", "javascript");
            post_code_editor.setOption("mode", "javascript");
            // show language specific
            RUR.kbd.set_programming_language("javascript");
            break;
    }
    $("#editor-tab").click();
    try {
        RUR.reset_code_in_editors();
    } catch (e) {}

    if (RUR.state.editing_world) {
        $("#pre-code-link").parent().show();
        $("#post-code-link").parent().show();
        $("#description-link").parent().show();
        $("#onload-editor-link").parent().show();
    }
};
