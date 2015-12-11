/* Author: André Roberge
   License: MIT  */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR, $, CodeMirror, ReeborgError, editor, library, removeHints, parseUri */

// aa_utils.js : name starting with aa so that it is loaded first :-/

var RUR = RUR || {};  // jshint ignore:line

RUR._active_console = false;
RUR.ReeborgError = function (message) {
    if (RUR.programming_language == "python"){
        return ReeborgError(message);
    }
    this.name = "ReeborgError";
    this.message = message;
};

RUR.WallCollisionError = function (message) {
    if (RUR.programming_language == "python"){
        return WallCollisionError(message);
    }
    this.name = "WallCollisionError";
    this.message = message;
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
    }  else if (RUR.programming_language == "coffee") {
        editor_default = default_instruction + "()";
    }
    editor_content = localStorage.getItem(RUR.settings.editor);
    if (!editor_content){
        editor_content = editor_default;
    }
    editor.setValue(editor_content);
};

RUR._create_permalink = function () {
    "use strict";
    var proglang, world, _editor, _library, url_query, permalink, parts;
    var human_language = document.documentElement.lang;
    url_query = parseUri(window.location.href);

    permalink = url_query.protocol + "://" + url_query.host;
    if (url_query.port){
        permalink += ":" + url_query.port;
    }
    permalink += url_query.path;
    proglang = RUR.programming_language + "-" + human_language;
    world = encodeURIComponent(RUR.world.export_world());
    _editor = encodeURIComponent(editor.getValue());
    if (RUR.programming_language == "python") {
        _library = encodeURIComponent(library.getValue());
        permalink += "?proglang=" + proglang + "&world=" + world + "&editor=" + _editor + "&library=" + _library;
    } else {
        permalink += "?proglang=" + proglang + "&world=" + world + "&editor=" + _editor;
    }
    return permalink;
};


RUR.create_permalink = function () {
    var permalink;

    permalink = RUR._create_permalink();

    $("#url_input_textarea").val(permalink);
    $("#url_input").toggle();
    $("#ok-permalink").removeAttr("disabled");
    $("#cancel-permalink").removeAttr("disabled");

    return false;
};

RUR.reset_programming_language = function(choice){
    var human_language = document.documentElement.lang;
    RUR.removeHints();
    RUR.settings.current_language = choice;
    try {
        localStorage.setItem("last_programming_language_" + human_language, RUR.settings.current_language);
    } catch (e) {}
    $("#python-additional-menu p button").attr("disabled", "true");
    $("#coffeescript-additional-menu p button").attr("disabled", "true");
    $("#javascript-additional-menu p button").attr("disabled", "true");
    $("#library-link").parent().hide();
    $("#highlight").hide();

    $("#pre-code-link").parent().hide();
    $("#post-code-link").parent().hide();
    $("#description-link").parent().hide();

    switch(RUR.settings.current_language){
        case 'python-' + human_language :
            RUR.settings.editor = "editor_py_" + human_language;
            RUR.settings.library = "library_py_" + human_language;
            RUR.programming_language = "python";
            $("#editor-link").html(RUR.translate("Python Code"));
            editor.setOption("mode", {name: "python", version: 3});
            pre_code_editor.setOption("mode", {name: "python", version: 3});
            post_code_editor.setOption("mode", {name: "python", version: 3});
            library.setOption("mode", {name: "python", version: 3});
            // show language specific
            $("#library-link").parent().show();
            $("#python-additional-menu p button").removeAttr("disabled");
            RUR.kbd.set_programming_language("python");
            break;
        case 'javascript-' + human_language :
            RUR.settings.editor = "editor_js_" + human_language;
            RUR.programming_language = "javascript";
            $("#editor-link").html(RUR.translate("Javascript Code"));
            editor.setOption("mode", "javascript");
            pre_code_editor.setOption("mode", "javascript");
            post_code_editor.setOption("mode", "javascript");
            // show language specific
            $("#javascript-additional-menu p button").removeAttr("disabled");
            RUR.kbd.set_programming_language("javascript");
            break;
        case 'coffeescript-' + human_language :
            RUR.settings.editor = "editor_coffee_" + human_language;
            RUR.programming_language = "coffee";
            $("#editor-link").html(RUR.translate("CoffeeScript Code"));
            editor.setOption("mode", "coffeescript");
            pre_code_editor.setOption("mode", "coffeescript");
            post_code_editor.setOption("mode", "coffeescript");
            // show language specific
            $("#coffeescript-additional-menu p button").removeAttr("disabled");
            RUR.kbd.set_programming_language("coffeescript");
            break;
    }
    $("#editor-link").click();
    try {
        RUR.reset_code_in_editors();
    } catch (e) {}

    if (RUR.we.editing_world) {
        $("#pre-code-link").parent().show();
        $("#post-code-link").parent().show();
        $("#description-link").parent().show();
    }
};

RUR.update_permalink = function (arg, shortname) {
    var url_query, name;
    if (arg !== undefined) {
        url_query = parseUri(arg);
    } else {
        url_query = parseUri($("#url_input_textarea").val());
    }
    if (url_query.queryKey.proglang !== undefined &&
       url_query.queryKey.world !== undefined &&
       url_query.queryKey.editor !== undefined) {
        var prog_lang = url_query.queryKey.proglang;
        $('input[type=radio][name=programming_language]').val([prog_lang]);
        RUR.reset_programming_language(prog_lang);
        RUR.world.import_world(decodeURIComponent(url_query.queryKey.world));
        if (shortname !== undefined) {
            RUR.storage.save_world(shortname);
        } else {
            RUR.storage.save_world(RUR.translate("PERMALINK"));
        }
        editor.setValue(decodeURIComponent(url_query.queryKey.editor));
    }

    if (RUR.programming_language == "python" &&
       url_query.queryKey.library !== undefined) {
        library.setValue(decodeURIComponent(url_query.queryKey.library));
    }

    if(url_query.queryKey.css !== undefined) {
        var new_css = decodeURIComponent(url_query.queryKey.css);
        eval(new_css);    // jshint ignore:line
    }
    $("#url_input").hide();
    $("#permalink").removeClass('reverse-blue-gradient');
    $("#permalink").addClass('blue-gradient');
};

RUR.cancel_permalink = function () {
    $('#url_input').hide();
    $("#permalink").removeClass('reverse-blue-gradient');
    $("#permalink").addClass('blue-gradient');
};

// from http://stackoverflow.com/questions/15005500/loading-cross-domain-html-page-with-jquery-ajax
$.ajaxPrefilter( function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
  }
});

RUR.load_permalink = function (filename, shortname) {
    "use strict";
    var url;
    if (filename.substring(0,4).toLowerCase() == "http") {
        url = filename;
    } else {
        url = "/src/worlds/permalinks/" + filename;
    }
    $.ajax({url: url,
        async: false,
        error: function(e){
            RUR.cd.show_feedback("#Reeborg-shouts", RUR.translate("Could not find permalink"));
            RUR.ui.stop();
        },
        success: function(data){
            RUR.update_permalink(data, shortname);
            RUR.ui.reload();
        }
    }, "text");
};


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
