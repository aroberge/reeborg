/*  Handler of special on-screen keyboard
*/

RUR.kbd = {};

RUR.kbd.set_programming_language = function (lang) {
    switch (lang) {
        case "python":
            if (RUR.state.input_method==="repl"){
                $("#kbd_python_btn").hide();
                $("#kbd_py_console_btn").show();
            } else {
                $("#kbd_python_btn").show();
                $("#kbd_py_console_btn").hide();
            }
            $("#kbd_javascript_btn").hide();
            break;
        case "javascript":
            $("#kbd_python_btn").hide();
            $("#kbd_py_console_btn").hide();
            $("#kbd_javascript_btn").show();
            break;
    }
    RUR.kbd.select();
};

RUR.kbd.insert2 = function (txt){
    if (RUR.state.programming_language == "javascript") {
        RUR.kbd.insert(txt + ";");
    } else {
        RUR.kbd.insert(txt);
    }
};

RUR.kbd.insert_in_console = function (txt) {
    var console = $("#py_console");
    console.val(console.val() + txt);
    console.focus();
};

RUR.kbd.insert = function (txt){
    "use strict";
    var doc, cursor, line, pos;
    if (RUR.state.input_method==="repl") {
        RUR.kbd.insert_in_console(txt);
        return;
    }
    if (txt === undefined) {
        txt = "'";
    }

    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    cursor = doc.getCursor();
    line = doc.getLine(cursor.line);
    pos = { // create a new object to avoid mutation of the original selection
       line: cursor.line,
       ch: cursor.ch // set the character position to the end of the line
   };
    doc.replaceRange(txt, pos); // adds a new line
    doc.focus();
};

RUR.kbd.undo = function () {
    "use strict";
    var doc;
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.undo();
    doc.focus();
};

RUR.kbd.redo = function () {
    "use strict";
    var doc;
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.redo();
    doc.focus();
};

RUR.kbd.enter = function () {
    "use strict";
    var doc, ev;
    if (RUR.state.input_method==="repl") {
        ev = {};
        ev.keyCode = 13;
        ev.preventDefault = function () {};
        myKeyPress(ev);
        return;
    }
    if ($("#tabs").tabs('option', 'active') === 0) {
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
    if (RUR.state.input_method==="repl") {
        RUR.kbd.insert_in_console('    ');
        return;
    }

    if ($("#tabs").tabs('option', 'active') === 0) {
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
    if ($("#tabs").tabs('option', 'active') === 0) {
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
    $(".kbd_objects").hide();
    $(".kbd_python").hide();
    $(".kbd_py_console").hide();
    $(".kbd_javascript").hide();
    $(".kbd_special").hide();
    $(".no_console").hide();
    if ($("#kbd_command_btn").hasClass("reverse-blue-gradient")) {
        $("#kbd_command_btn").removeClass("reverse-blue-gradient");
        $("#kbd_command_btn").addClass("blue-gradient");
    } else if ($("#kbd_condition_btn").hasClass("reverse-blue-gradient")) {
        $("#kbd_condition_btn").removeClass("reverse-blue-gradient");
        $("#kbd_condition_btn").addClass("blue-gradient");
    } else if ($("#kbd_python_btn").hasClass("reverse-blue-gradient")) {
        $("#kbd_python_btn").removeClass("reverse-blue-gradient");
        $("#kbd_python_btn").addClass("blue-gradient");
    } else if ($("#kbd_py_console_btn").hasClass("reverse-blue-gradient")) {
        $("#kbd_py_console_btn").removeClass("reverse-blue-gradient");
        $("#kbd_py_console_btn").addClass("blue-gradient");
    } else if ($("#kbd_javascript_btn").hasClass("reverse-blue-gradient")) {
        $("#kbd_javascript_btn").removeClass("reverse-blue-gradient");
        $("#kbd_javascript_btn").addClass("blue-gradient");
    } else if ($("#kbd_objects_btn").hasClass("reverse-blue-gradient")) {
        $("#kbd_objects_btn").removeClass("reverse-blue-gradient");
        $("#kbd_objects_btn").addClass("blue-gradient");
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
        case "kbd_objects":
            $(".kbd_objects").show();
            $("#kbd_objects_btn").removeClass("blue-gradient");
            $("#kbd_objects_btn").addClass("reverse-blue-gradient");
            break;
        case "kbd_python":
            $(".kbd_python").show();
            $("#kbd_python_btn").removeClass("blue-gradient");
            $("#kbd_python_btn").addClass("reverse-blue-gradient");
            break;
        case "kbd_py_console":
            $(".kbd_py_console").show();
            $("#kbd_py_console_btn").removeClass("blue-gradient");
            $("#kbd_py_console_btn").addClass("reverse-blue-gradient");
            break;
        case "kbd_javascript":
            $(".kbd_javascript").show();
            $("#kbd_javascript_btn").removeClass("blue-gradient");
            $("#kbd_javascript_btn").addClass("reverse-blue-gradient");
            break;
        case "kbd_special":
            $(".kbd_special").show();
            $("#kbd_special_btn").removeClass("blue-gradient");
            $("#kbd_special_btn").addClass("reverse-blue-gradient");
            break;
        case "kbd_command":  // jshint ignore:line
        default:
            $(".kbd_command").show();
            $("#kbd_command_btn").removeClass("blue-gradient");
            $("#kbd_command_btn").addClass("reverse-blue-gradient");
    }

    if (RUR.state.programming_language == "python") {
        $(".only_py").show();
        if (RUR.state.input_method==="repl") {
            $(".no_console").hide();
        }
        $(".only_js").hide();
    } else {
        $(".only_js").show();
        $(".only_py").hide();
    }
};
