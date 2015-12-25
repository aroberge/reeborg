
// aa_utils.js : name starting with aa so that it is loaded first :-/

var RUR = RUR || {};  // jshint ignore:line

RUR._active_console = false;
RUR.ReeborgError = function (message) {
    if (RUR.programming_language == "python"){
        return ReeborgError(message);
    }
    this.name = "ReeborgError";
    this.message = message;
    this.reeborg_shouts = message;
};

RUR.WallCollisionError = function (message) {
    if (RUR.programming_language == "python"){
        return WallCollisionError(message);
    }
    this.name = "WallCollisionError";
    this.message = message;
    this.reeborg_shouts = message;
};

RUR.translate = function (s) {
    if (RUR.translation[s] !== undefined) {
        return RUR.translation[s];
    } else {
        console.log("Translation needed for");
        console.log("%c" + s, "color:blue;font-weight:bold;");
        console.log("called from ", arguments.callee.caller);
        return s;
    }
};

RUR.translate_to_english = function (s) {
    if (RUR.translation_to_english[s] !== undefined) {
        return RUR.translation_to_english[s];
    } else {
        console.log("Translation to English needed for");
        console.log("%c" + s, "color:green;font-weight:bold;");
        console.log("called from ", arguments.callee.caller);
        return s;
    }
};


RUR.reset_code_in_editors = function () {
    var library_default, library_content, editor_content, editor_default,
        default_instruction = RUR.translate("move"),
        library_default_en = "# 'from library import *' in Python Code is required to use\n# the code in this library. \n\n";

    if (RUR.programming_language == "javascript") {
        editor_default = default_instruction + "();";
    } else if (RUR.programming_language == "python") {
        library_default = RUR.translate(library_default_en);
        library_content = localStorage.getItem(RUR.settings.library);
        if (!library_content || library_content == library_default_en){
            library_content = library_default;
        }
        library.setValue(library_content);
        editor_default = default_instruction + "()";
    }
    editor_content = localStorage.getItem(RUR.settings.editor);
    if (!editor_content){
        editor_content = editor_default;
    }
    editor.setValue(editor_content);
};


RUR.reset_programming_language = function(choice){
    var human_language = document.documentElement.lang;
    RUR.removeHints();
    RUR.settings.current_language = choice;
    try {
        localStorage.setItem("last_programming_language_" + human_language, RUR.settings.current_language);
    } catch (e) {}
    $("#python-additional-menu p button").attr("disabled", "true");
    $("#javascript-additional-menu p button").attr("disabled", "true");
    $("#library-tab").parent().hide();
    $("#highlight").hide();
    $("#py_console").hide();

    $("#pre-code-link").parent().hide();
    $("#post-code-link").parent().hide();
    $("#description-link").parent().hide();
    $("#python_choices").hide();
    $("#javascript_choices").hide();
    $("#special-keyboard-button").show();

    switch(RUR.settings.current_language){
        case 'python-' + human_language :
            $("#python_choices").show();
            $("#python_choices").change();
            RUR.settings.editor = "editor_py_" + human_language;
            RUR.settings.library = "library_py_" + human_language;
            RUR.programming_language = "python";
            $("#editor-tab").html(RUR.translate("Python Code"));
            editor.setOption("mode", {name: "python", version: 3});
            pre_code_editor.setOption("mode", {name: "python", version: 3});
            post_code_editor.setOption("mode", {name: "python", version: 3});
            library.setOption("mode", {name: "python", version: 3});
            // show language specific
            $("#library-tab").parent().show();
            $("#python-additional-menu p button").removeAttr("disabled");
            if (RUR._active_console) {
                $("#py_console").show();
            }
            RUR.kbd.set_programming_language("python");
            break;
        case 'javascript-' + human_language :
            $("#javascript_choices").show();
            $("#javascript_choices").change();
            $("#editor-panel").addClass("active");
            RUR.settings.editor = "editor_js_" + human_language;
            RUR.programming_language = "javascript";
            $("#editor-tab").html(RUR.translate("Javascript Code"));
            editor.setOption("mode", "javascript");
            pre_code_editor.setOption("mode", "javascript");
            post_code_editor.setOption("mode", "javascript");
            // show language specific
            $("#javascript-additional-menu p button").removeAttr("disabled");
            RUR.kbd.set_programming_language("javascript");
            break;
    }
    $("#editor-tab").click();
    try {
        RUR.reset_code_in_editors();
    } catch (e) {}

    if (RUR.we.editing_world) {
        $("#pre-code-link").parent().show();
        $("#post-code-link").parent().show();
        $("#description-link").parent().show();
    }
};


// from http://stackoverflow.com/questions/15005500/loading-cross-domain-html-page-with-jquery-ajax
$.ajaxPrefilter( function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
  }
});


RUR.inspect = function (obj){
    var props, result = "";
    for (props in obj) {
        if (typeof obj[props] === "function") {
            result += props + "()\n";
        } else{
            result += props + "\n";
        }
    }
    RUR.output._write(result);
};

// Returns a random integer between min and max (both included)
RUR.randint = function (min, max, previous) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

RUR.filterInt = function (value) {
  if(/^\s*([0-9]+)\s*$/.test(value))
    return parseInt(value, 10);
  return undefined;
};

RUR.set_lineno_highlight = function(lineno, frame) {
    RUR.current_lineno = lineno;
    if (frame) {
        RUR.rec.record_frame();
        return true;
    }
};
