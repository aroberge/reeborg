/*  Handler of special on-screen keyboard
*/

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library */

RUR.kbd = {};

RUR.kbd.insert = function (txt){
    "use strict";
    var doc, cursor, line, pos;

    if ($("#tabs").tabs('option', 'active') == 0) {
        doc = editor;
    } else {
        doc = library;
    }
    cursor = doc.getCursor();
    line = doc.getLine(cursor.line);
    pos = { // create a new object to avoid mutation of the original selection
       line: cursor.line,
       ch: cursor.ch // set the character position to the end of the line
    }
    doc.replaceRange(txt, pos); // adds a new line
    doc.focus();
};

RUR.kbd.enter = function () {
    "use strict";
    var doc;
    if ($("#tabs").tabs('option', 'active') == 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.execCommand("newlineAndIndent");
    doc.focus();
};

RUR.kbd.tab = function () {
    "use strict";
    var doc;
    if ($("#tabs").tabs('option', 'active') == 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.execCommand("indentMore");
    doc.focus();
};

RUR.kbd.shift_tab = function () {
    "use strict";
    var doc;
    if ($("#tabs").tabs('option', 'active') == 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.execCommand("indentLess");
    doc.focus();
};

RUR.kbd.select = function (choice) {
    "use strict";
    $(".kbd_command").hide();
    $(".kbd_condition").hide();
    $(".kbd_python").hide();
    $(".kbd_special").hide();
    if ($("#kbd_command_btn").hasClass("reverse-blue-gradient")) {
        $("#kbd_command_btn").removeClass("reverse-blue-gradient");
        $("#kbd_command_btn").addClass("blue-gradient");
    } else if ($("#kbd_condition_btn").hasClass("reverse-blue-gradient")) {
        $("#kbd_condition_btn").removeClass("reverse-blue-gradient");
        $("#kbd_condition_btn").addClass("blue-gradient");
    } else if ($("#kbd_python_btn").hasClass("reverse-blue-gradient")) {
        $("#kbd_python_btn").removeClass("reverse-blue-gradient");
        $("#kbd_python_btn").addClass("blue-gradient");
    } else if ($("#kbd_special_btn").hasClass("reverse-blue-gradient")) {
        $("#kbd_special_btn").removeClass("reverse-blue-gradient");
        $("#kbd_special_btn").addClass("blue-gradient");
    }
    switch (choice) {
        case "kbd_condition":
            $(".kbd_condition").show();
            $("#kbd_condition_btn").removeClass("blue-gradient");
            $("#kbd_condition_btn").addClass("reverse-blue-gradient");
            break;
        case "kbd_python":
            $(".kbd_python").show();
            $("#kbd_python_btn").removeClass("blue-gradient");
            $("#kbd_python_btn").addClass("reverse-blue-gradient");
            break;
        case "kbd_special":
            $(".kbd_special").show();
            $("#kbd_special_btn").removeClass("blue-gradient");
            $("#kbd_special_btn").addClass("reverse-blue-gradient");
            break;
        case "kbd_command":
        default:
            $(".kbd_command").show();
            $("#kbd_command_btn").removeClass("blue-gradient");
            $("#kbd_command_btn").addClass("reverse-blue-gradient");
    }
};

$(document).ready(function() {
    "use strict";
    RUR.kbd.select();
});