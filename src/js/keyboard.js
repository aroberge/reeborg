/*  Handler of special on-screen keyboard
*/

require("./state.js");

RUR.kbd = {};

RUR.kbd.set_programming_language = function (lang) {
    $("#kbd-python-btn").hide();
    $("#kbd-py-console-btn").hide();
    $("#kbd-javascript-btn").hide();
    switch (lang) {
        case "python":
            if (RUR.state.input_method==="py-repl"){
                $("#kbd-py-console-btn").show();
            } else {
                $("#kbd-python-btn").show();
            }
            break;
        case "javascript":
            $("#kbd-javascript-btn").show();
            break;
    }
    RUR.kbd.select();
};

RUR.kbd.insert_statement = function (txt){
    if (RUR.state.programming_language == "javascript") {
        RUR.kbd.insert(txt + ";");
    } else {
        RUR.kbd.insert(txt);
    }
    RUR.kbd.enter();
};

RUR.kbd.insert_in_console = function (txt) {
    var console = $("#py-console");
    console.val(console.val() + txt);
    console.focus();
};

RUR.kbd.insert = function (txt){
    "use strict";
    var doc, cursor, line, pos;
    if (RUR.state.input_method==="py-repl") {
        RUR.kbd.insert_in_console(txt);
        return;
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
    if (RUR.state.input_method==="py-repl") {
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
    if (RUR.state.input_method==="py-repl") {
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
    $(".kbd-command").hide();
    $(".kbd-condition").hide();
    $(".kbd-objects").hide();
    $(".kbd-python").hide();
    $(".kbd-py-console").hide();
    $(".kbd-javascript").hide();
    $(".kbd-special").hide();
    $(".no-console").hide();
    if ($("#kbd-command-btn").hasClass("reverse-blue-gradient")) {
        $("#kbd-command-btn").removeClass("reverse-blue-gradient");
        $("#kbd-command-btn").addClass("blue-gradient");
    } else if ($("#kbd-condition-btn").hasClass("reverse-blue-gradient")) {
        $("#kbd-condition-btn").removeClass("reverse-blue-gradient");
        $("#kbd-condition-btn").addClass("blue-gradient");
    } else if ($("#kbd-python-btn").hasClass("reverse-blue-gradient")) {
        $("#kbd-python-btn").removeClass("reverse-blue-gradient");
        $("#kbd-python-btn").addClass("blue-gradient");
    } else if ($("#kbd-py-console-btn").hasClass("reverse-blue-gradient")) {
        $("#kbd-py-console-btn").removeClass("reverse-blue-gradient");
        $("#kbd-py-console-btn").addClass("blue-gradient");
    } else if ($("#kbd-javascript-btn").hasClass("reverse-blue-gradient")) {
        $("#kbd-javascript-btn").removeClass("reverse-blue-gradient");
        $("#kbd-javascript-btn").addClass("blue-gradient");
    } else if ($("#kbd-objects-btn").hasClass("reverse-blue-gradient")) {
        $("#kbd-objects-btn").removeClass("reverse-blue-gradient");
        $("#kbd-objects-btn").addClass("blue-gradient");
    } else if ($("#kbd-special-btn").hasClass("reverse-blue-gradient")) {
        $("#kbd-special-btn").removeClass("reverse-blue-gradient");
        $("#kbd-special-btn").addClass("blue-gradient");
    }
    switch (choice) {
        case "kbd-condition":
            $(".kbd-condition").show();
            $("#kbd-condition-btn").removeClass("blue-gradient");
            $("#kbd-condition-btn").addClass("reverse-blue-gradient");
            break;
        case "kbd-objects":
            $(".kbd-objects").show();
            $("#kbd-objects-btn").removeClass("blue-gradient");
            $("#kbd-objects-btn").addClass("reverse-blue-gradient");
            break;
        case "kbd-python":
            $(".kbd-python").show();
            $("#kbd-python-btn").removeClass("blue-gradient");
            $("#kbd-python-btn").addClass("reverse-blue-gradient");
            break;
        case "kbd-py-console":
            $(".kbd-py-console").show();
            $("#kbd-py-console-btn").removeClass("blue-gradient");
            $("#kbd-py-console-btn").addClass("reverse-blue-gradient");
            break;
        case "kbd-javascript":
            $(".kbd-javascript").show();
            $("#kbd-javascript-btn").removeClass("blue-gradient");
            $("#kbd-javascript-btn").addClass("reverse-blue-gradient");
            break;
        case "kbd-special":
            $(".kbd-special").show();
            $("#kbd-special-btn").removeClass("blue-gradient");
            $("#kbd-special-btn").addClass("reverse-blue-gradient");
            break;
        case "kbd-command":  // jshint ignore:line
        default:
            $(".kbd-command").show();
            $("#kbd-command-btn").removeClass("blue-gradient");
            $("#kbd-command-btn").addClass("reverse-blue-gradient");
    }

    if (RUR.state.programming_language == "python") {
        $(".only_py").show();
        if (RUR.state.input_method==="py-repl") {
            $(".no-console").hide();
        }
        $(".only_js").hide();
    } else {
        $(".only_js").show();
        $(".only_py").hide();
    }
};

function add_onclick_select(arg) {
    var id = arg + "-btn";
    $("#"+id).on("click", function (evt) {
        RUR.kbd.select(arg);
    });
    record_id(id, id);
}

record_title("ui-dialog-title-special-keyboard", "Reeborg's basic keyboard");
add_onclick_select("kbd-command");
add_onclick_select("kbd-condition");
add_onclick_select("kbd-python");
add_onclick_select("kbd-py-console");
add_onclick_select("kbd-javascript");
add_onclick_select("kbd-objects");
add_onclick_select("kbd-special");

function add_onclick_insert_statement(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert_statement(RUR.translate(arg));
    });
    record_id(id, arg);
}
add_onclick_insert_statement("kbd-move", "move()");
add_onclick_insert_statement("kbd-turn-left", "turn_left()");
add_onclick_insert_statement("kbd-take", "take()");
add_onclick_insert_statement("kbd-put", "put()");
add_onclick_insert_statement("kbd-build-wall", "build_wall()");
add_onclick_insert_statement("kbd-pause", "pause()");
add_onclick_insert_statement("kbd-done", "done()");
add_onclick_insert_statement("kbd-think", "think(100)");
add_onclick_insert_statement("kbd-sound", "sound(True)");
add_onclick_insert_statement("kbd-sound-js", "sound(true)");
add_onclick_insert_statement("kbd-world", 'World()');
add_onclick_insert_statement("kbd-UsedRobot", "UsedRobot()");
add_onclick_insert_statement("kbd-newUsedRobot", "new UsedRobot()");
add_onclick_insert_statement("kbd-no-highlight", "no_highlight()");

function add_onclick_insert(id, arg, enter) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert(RUR.translate(arg));
    });
    if (enter) {
        RUR.kbd.enter();
    }
    record_id(id, arg);
}

add_onclick_insert("kbd-at-goal", "at_goal()");
add_onclick_insert("kbd-front-is-clear", "front_is_clear()");
add_onclick_insert("kbd-right-is-clear", "right_is_clear()");
add_onclick_insert("kbd-wall-in-front", "wall_in_front()");
add_onclick_insert("kbd-wall-on-right", "wall_on_right()");
add_onclick_insert("kbd-object-here", "object_here()");
add_onclick_insert("kbd-carries-object", "carries_object()");
add_onclick_insert("kbd-is-facing-north", "is_facing_north()");

function add_onclick_insert_object(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert('"'+RUR.translate(arg)+'"');
    });
    record_id(id);
}
add_onclick_insert_object("kbd-token", "token");
add_onclick_insert_object("kbd-apple", "apple");
add_onclick_insert_object("kbd-banana", "banana");
add_onclick_insert_object("kbd-carrot", "carrot");
add_onclick_insert_object("kbd-daisy", "daisy");
add_onclick_insert_object("kbd-dandelion", "dandelion");
add_onclick_insert_object("kbd-leaf", "leaf");
add_onclick_insert_object("kbd-orange", "orange");
add_onclick_insert_object("kbd-square", "square");
add_onclick_insert_object("kbd-star", "star");
add_onclick_insert_object("kbd-strawberry", "strawberry");
add_onclick_insert_object("kbd-triangle", "triangle");
add_onclick_insert_object("kbd-tulip", "tulip");

function add_onclick_insert_special(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert(arg);
    });
    record_id(id);
}
add_onclick_insert_special("kbd-colon", ":");
add_onclick_insert_special("kbd-semi-colon", ";");
add_onclick_insert_special("kbd-sharp", "#");
add_onclick_insert_special("kbd-double-quote", "\"");
add_onclick_insert_special("kbd-single-quote", "'");
add_onclick_insert_special("kbd-equal", "=");
add_onclick_insert_special("kbd-less-than", "<");
add_onclick_insert_special("kbd-greater-than", ">");
add_onclick_insert_special("kbd-ampersand", "&");
add_onclick_insert_special("kbd-vertical-bar", "|");
add_onclick_insert_special("kbd-parens", "( )");
add_onclick_insert_special("kbd-curly-brackets", "{ }");
add_onclick_insert_special("kbd-square-brackets", "[ ]");

$("#kbd-tab").on("click", function (evt) {
    RUR.kbd.tab();
});
record_id("kbd-tab", "tab");
$("#kbd-shift-tab").on("click", function (evt) {
    RUR.kbd.shift_tab();
});
record_id("kbd-shift-tab", "shift-tab");
$("#kbd-enter").on("click", function (evt) {
    RUR.kbd.enter();
});
record_id("kbd-enter", "enter");


function add_onclick(id, fn, arg, record, enter) {
    $("#"+id).on("click", function (evt) {
        fn(arg);
    });
    if (enter) {
        RUR.kbd.enter();
    }
    if (record) {
        record_id(id, id);
    }
}
