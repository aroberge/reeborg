/*  Handler of special on-screen keyboard
*/

require("./../rur.js");
require("./../dialogs/create.js");
require("./../ui/editors_tabs.js");
require("./../translator.js");
var msg = require("./../../lang/msg.js");

RUR.kbd = {};

RUR.kbd.set_programming_language = function (lang) {
    $("#kbd-python-btn").hide();
    $("#kbd-py-console-btn").hide();
    $("#kbd-javascript-btn").hide();
    $("#kbd-cpp-btn").hide();
    $("#kbd-coffee-btn").hide();
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
        case "cpp":
            $("#kbd-cpp-btn").show();
            break;
        case "coffeescript":
            $("#kbd-coffee-btn").show();
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
    var doc, cursor, pos;
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
    $(".kbd-coffee").hide();
    $(".kbd-py-console").hide();
    $(".kbd-javascript").hide();
    $(".kbd-cpp").hide();
    $(".kbd-special").hide();
    $(".no-console").hide();
    if ($("#kbd-command-btn").hasClass("active-element")) {
        $("#kbd-command-btn").removeClass("active-element");
        $("#kbd-command-btn").addClass("blue-gradient");
    } else if ($("#kbd-condition-btn").hasClass("active-element")) {
        $("#kbd-condition-btn").removeClass("active-element");
        $("#kbd-condition-btn").addClass("blue-gradient");
    } else if ($("#kbd-python-btn").hasClass("active-element")) {
        $("#kbd-python-btn").removeClass("active-element");
        $("#kbd-python-btn").addClass("blue-gradient");
    } else if ($("#kbd-py-console-btn").hasClass("active-element")) {
        $("#kbd-py-console-btn").removeClass("active-element");
        $("#kbd-py-console-btn").addClass("blue-gradient");
    } else if ($("#kbd-javascript-btn").hasClass("active-element")) {
        $("#kbd-javascript-btn").removeClass("active-element");
        $("#kbd-javascript-btn").addClass("blue-gradient");
    } else if ($("#kbd-cpp-btn").hasClass("active-element")) {
        $("#kbd-cpp-btn").removeClass("active-element");
        $("#kbd-cpp-btn").addClass("blue-gradient");
    } else if ($("#kbd-coffee-btn").hasClass("active-element")) {
        $("#kbd-coffee-btn").removeClass("active-element");
        $("#kbd-coffee-btn").addClass("blue-gradient");
    } else if ($("#kbd-objects-btn").hasClass("active-element")) {
        $("#kbd-objects-btn").removeClass("active-element");
        $("#kbd-objects-btn").addClass("blue-gradient");
    } else if ($("#kbd-special-btn").hasClass("active-element")) {
        $("#kbd-special-btn").removeClass("active-element");
        $("#kbd-special-btn").addClass("blue-gradient");
    }
    switch (choice) {
        case "kbd-condition":
            $(".kbd-condition").show();
            $("#kbd-condition-btn").removeClass("blue-gradient");
            $("#kbd-condition-btn").addClass("active-element");
            break;
        case "kbd-objects":
            $(".kbd-objects").show();
            $("#kbd-objects-btn").removeClass("blue-gradient");
            $("#kbd-objects-btn").addClass("active-element");
            break;
        case "kbd-python":
            $(".kbd-python").show();
            $("#kbd-python-btn").removeClass("blue-gradient");
            $("#kbd-python-btn").addClass("active-element");
            break;
        case "kbd-py-console":
            $(".kbd-py-console").show();
            $("#kbd-py-console-btn").removeClass("blue-gradient");
            $("#kbd-py-console-btn").addClass("active-element");
            break;
        case "kbd-javascript":
            $(".kbd-javascript").show();
            $("#kbd-javascript-btn").removeClass("blue-gradient");
            $("#kbd-javascript-btn").addClass("active-element");
            break;
        case "kbd-cpp":
            $(".kbd-cpp").show();
            $("#kbd-cpp-btn").removeClass("blue-gradient");
            $("#kbd-cpp-btn").addClass("active-element");
            break;
        case "kbd-coffee":
            $(".kbd-coffee").show();
            $("#kbd-coffee-btn").removeClass("blue-gradient");
            $("#kbd-coffee-btn").addClass("active-element");
            break;
        case "kbd-special":
            $(".kbd-special").show();
            $("#kbd-special-btn").removeClass("blue-gradient");
            $("#kbd-special-btn").addClass("active-element");
            break;
        case "kbd-command":  // jshint ignore:line
        default:
            $(".kbd-command").show();
            $("#kbd-command-btn").removeClass("blue-gradient");
            $("#kbd-command-btn").addClass("active-element");
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
    msg.record_id(id, id);
}
function add_onclick_insert_statement(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert_statement(RUR.translate(arg));
    });
    msg.record_id(id, arg);
}
function add_onclick_insert_function_statement(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert_statement(RUR.translate(arg) + "()");
    });
    msg.record_fn(id, arg);
}
function add_onclick_insert_untranslated_statement(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert_statement(arg);
    });
    msg.record_id(id, arg);
    RUR.untranslated[arg] = true;
}
function add_onclick_insert(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert(RUR.translate(arg));
    });
    msg.record_id(id, arg);
}
function add_onclick_insert_function(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert(RUR.translate(arg) + "()");
    });
    msg.record_fn(id, arg);
}

function decodeLtGtEntities(text) {
    return text.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

function add_onclick_insert_untranslated(id, arg) {
    var decodedArg = decodeLtGtEntities(arg);
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert(decodedArg);
    });
    msg.record_id(id, arg);
    RUR.untranslated[decodedArg] = true;
}
function add_onclick_insert_object(id, arg) {
    $("#"+id).on("click", function (evt) {
        RUR.kbd.insert('"'+RUR.translate(arg)+'"');
    });
    msg.record_id(id);
}

$(document).ready(function () {
    init();
});

function init() {
    msg.record_title("ui-dialog-title-special-keyboard", "Reeborg's basic keyboard");
    add_onclick_select("kbd-command");
    add_onclick_select("kbd-condition");
    add_onclick_select("kbd-python");
    add_onclick_select("kbd-py-console");
    add_onclick_select("kbd-javascript");
    add_onclick_select("kbd-cpp");
    add_onclick_select("kbd-coffee");
    add_onclick_select("kbd-objects");
    add_onclick_select("kbd-special");

    add_onclick_insert_function_statement("kbd-move", "move");
    add_onclick_insert_function_statement("kbd-turn-left", "turn_left");
    add_onclick_insert_function_statement("kbd-take", "take");
    add_onclick_insert_function_statement("kbd-put", "put");
    add_onclick_insert_function_statement("kbd-toss", "toss");
    add_onclick_insert_function_statement("kbd-build-wall", "build_wall");
    add_onclick_insert_function_statement("kbd-pause", "pause");
    add_onclick_insert_function_statement("kbd-done", "done");
    add_onclick_insert_statement("kbd-think", "think(100)");
    add_onclick_insert_statement("kbd-sound", "sound(True)");
    add_onclick_insert_statement("kbd-sound-js", "sound(true)");
    add_onclick_insert_function_statement("kbd-world", 'World');
    add_onclick_insert_function_statement("kbd-UsedRobot", "UsedRobot");
    add_onclick_insert_function_statement("kbd-newUsedRobot", "new UsedRobot");
    add_onclick_insert_function_statement("kbd-no-highlight", "no_highlight");

    add_onclick_insert_function("kbd-at-goal", "at_goal");
    add_onclick_insert_function("kbd-front-is-clear", "front_is_clear");
    add_onclick_insert_function("kbd-right-is-clear", "right_is_clear");
    add_onclick_insert_function("kbd-wall-in-front", "wall_in_front");
    add_onclick_insert_function("kbd-wall-on-right", "wall_on_right");
    add_onclick_insert_function("kbd-object-here", "object_here");
    add_onclick_insert_function("kbd-carries-object", "carries_object");
    add_onclick_insert_function("kbd-is-facing-north", "is_facing_north");

    add_onclick_insert_object("kbd-token", "token");
    add_onclick_insert_object("kbd-apple", "apple");
    add_onclick_insert_object("kbd-banana", "banana");
    add_onclick_insert_object("kbd-carrot", "carrot");
    add_onclick_insert_object("kbd-daisy", "daisy");
    add_onclick_insert_object("kbd-dandelion", "dandelion");
    add_onclick_insert_object("kbd-leaf", "leaf");
    add_onclick_insert_object("kbd-square", "square");
    add_onclick_insert_object("kbd-star", "star");
    add_onclick_insert_object("kbd-strawberry", "strawberry");
    add_onclick_insert_object("kbd-triangle", "triangle");
    add_onclick_insert_object("kbd-tulip", "tulip");
    add_onclick_insert_object("kbd-beeper", "beeper");

    add_onclick_insert_untranslated_statement("kbd-js-var", "var ");
    add_onclick_insert_untranslated("kbd-js-function", "function ? { \n\n}");
    add_onclick_insert_untranslated("kbd-js-if", "if ( ? ) { \n\n}");
    add_onclick_insert_untranslated("kbd-js-elif", "else if ( ? ) { \n\n}");
    add_onclick_insert_untranslated("kbd-js-else", "else { \n\n}");
    add_onclick_insert_untranslated("kbd-js-while", "while ( ? ) { \n\n}");
    add_onclick_insert_untranslated("kbd-js-for", "for (? ; ? ; ?) { \n\n}");
    add_onclick_insert_untranslated("kbd-js-true", "true");
    add_onclick_insert_untranslated("kbd-js-false", "false");
    add_onclick_insert_untranslated("kbd-js-undefined", "undefined");
    add_onclick_insert_untranslated("kbd-js-not", "!");
    add_onclick_insert_untranslated("kbd-js-and", "&&");
    add_onclick_insert_untranslated("kbd-js-or", "||");
    add_onclick_insert_function_statement("kbd-js-write", "write");
    add_onclick_insert_untranslated_statement("kbd-js-return", "return");
    add_onclick_insert_untranslated_statement("kbd-js-continue", "continue");
    add_onclick_insert_untranslated_statement("kbd-js-break", "break");

    add_onclick_insert_untranslated("kbd-cpp-boiler", "#include &lt;reeborg&gt;\n\nint main() {\n\n    return 0;\n}");
    add_onclick_insert_untranslated("kbd-cpp-include", "#include &lt;?&gt;");
    add_onclick_insert_untranslated("kbd-cpp-include-reeborg", "#include &lt;reeborg&gt;");
    add_onclick_insert_untranslated("kbd-cpp-include-iostream", "#include &lt;iostream&gt;");
    add_onclick_insert_untranslated("kbd-cpp-include-string", "#include &lt;string&gt;");
    add_onclick_insert_untranslated("kbd-cpp-int", "int ");
    add_onclick_insert_untranslated("kbd-cpp-double", "double ");
    add_onclick_insert_untranslated("kbd-cpp-string", "string ");
    add_onclick_insert_untranslated("kbd-cpp-bool", "bool ");
    add_onclick_insert_untranslated("kbd-cpp-function", "? function ? { \n\n}");
    add_onclick_insert_untranslated("kbd-cpp-if", "if ( ? ) { \n\n}");
    add_onclick_insert_untranslated("kbd-cpp-elif", "else if ( ? ) { \n\n}");
    add_onclick_insert_untranslated("kbd-cpp-else", "else { \n\n}");
    add_onclick_insert_untranslated("kbd-cpp-while", "while ( ? ) { \n\n}");
    add_onclick_insert_untranslated("kbd-cpp-for", "for (? ; ? ; ?) { \n\n}");
    add_onclick_insert_untranslated("kbd-cpp-true", "true");
    add_onclick_insert_untranslated("kbd-cpp-false", "false");
    add_onclick_insert_untranslated("kbd-cpp-not", "!");
    add_onclick_insert_untranslated("kbd-cpp-and", "&&");
    add_onclick_insert_untranslated("kbd-cpp-or", "||");
    add_onclick_insert_untranslated("kbd-cpp-write", "cout << ?;");
    add_onclick_insert_untranslated("kbd-cpp-return", "return ?;");
    add_onclick_insert_untranslated("kbd-cpp-continue", "continue;");
    add_onclick_insert_untranslated("kbd-cpp-break", "break;");

    add_onclick_insert_untranslated("kbd-coffee-function", "? = ( ) ->");
    add_onclick_insert_untranslated("kbd-coffee-if", "if ?");
    add_onclick_insert_untranslated("kbd-coffee-else", "else");
    add_onclick_insert_untranslated("kbd-coffee-ternary", "? = ? if ?");
    add_onclick_insert_untranslated("kbd-coffee-while", "while ?");
    add_onclick_insert_untranslated("kbd-coffee-for", "? = ? for ? in [?..?] by ?");
    add_onclick_insert_untranslated("kbd-coffee-true", "true");
    add_onclick_insert_untranslated("kbd-coffee-false", "false");
    add_onclick_insert_untranslated("kbd-coffee-undefined", "variable?");
    add_onclick_insert_untranslated("kbd-coffee-not", "not");
    add_onclick_insert_untranslated("kbd-coffee-and", "and");
    add_onclick_insert_untranslated("kbd-coffee-or", "or");
    add_onclick_insert_function_statement("kbd-coffee-write", "write");
    add_onclick_insert_untranslated_statement("kbd-coffee-continue", "continue");
    add_onclick_insert_untranslated_statement("kbd-coffee-break", "break");

    add_onclick_insert_untranslated_statement("kbd-py-def", "def ? ( ):");
    add_onclick_insert_untranslated_statement("kbd-py-if", "if ? :");
    add_onclick_insert_untranslated_statement("kbd-py-elif", "elif ? :");
    add_onclick_insert_untranslated_statement("kbd-py-else", "else:");
    add_onclick_insert_untranslated_statement("kbd-py-while", "while ? :");
    add_onclick_insert_untranslated_statement("kbd-py-repeat", "repeat ? :");
    add_onclick_insert_statement("kbd-py-library", "from library import ?");
    add_onclick_insert_untranslated_statement("kbd-py-for", "for ? in ? :");
    add_onclick_insert_untranslated_statement("kbd-py-print", "print()");
    add_onclick_insert_untranslated_statement("kbd-py-range", "range(?)");
    add_onclick_insert_untranslated_statement("kbd-py-true", "True");
    add_onclick_insert_untranslated_statement("kbd-py-false", "False");
    add_onclick_insert_untranslated_statement("kbd-py-none", "None");
    add_onclick_insert_untranslated_statement("kbd-py-not", "not");
    add_onclick_insert_untranslated_statement("kbd-py-and", "and");
    add_onclick_insert_untranslated_statement("kbd-py-or", "or");
    add_onclick_insert_untranslated_statement("kbd-py-continue", "continue");
    add_onclick_insert_untranslated_statement("kbd-py-break", "break");
    add_onclick_insert_untranslated_statement("kbd-py-return", "return ?");
    add_onclick_insert_untranslated_statement("kbd-py-pass", "pass");

    add_onclick_insert_untranslated("kbd-pyrepl-def", "def ");
    add_onclick_insert_untranslated("kbd-pyrepl-if", "if ");
    add_onclick_insert_untranslated("kbd-pyrepl-elif", "elif ");
    add_onclick_insert_untranslated("kbd-pyrepl-else", "else:");
    add_onclick_insert_untranslated("kbd-pyrepl-while", "while ");
    add_onclick_insert("kbd-pyrepl-library", "from library import ?");
    add_onclick_insert_untranslated("kbd-pyrepl-for", "for ");
    add_onclick_insert_untranslated("kbd-pyrepl-in", "in ");
    add_onclick_insert_untranslated("kbd-pyrepl-print", "print(");
    add_onclick_insert_untranslated("kbd-pyrepl-range", "range(");
    add_onclick_insert_untranslated("kbd-pyrepl-true", "True");
    add_onclick_insert_untranslated("kbd-pyrepl-false", "False");
    add_onclick_insert_untranslated("kbd-pyrepl-none", "None");
    add_onclick_insert_untranslated("kbd-pyrepl-not", "not");
    add_onclick_insert_untranslated("kbd-pyrepl-and", "and");
    add_onclick_insert_untranslated("kbd-pyrepl-or", "or");
    add_onclick_insert_untranslated_statement("kbd-pyrepl-continue", "continue");
    add_onclick_insert_untranslated_statement("kbd-pyrepl-break", "break");
    add_onclick_insert_untranslated_statement("kbd-pyrepl-return", "return");
    add_onclick_insert_untranslated_statement("kbd-pyrepl-pass", "pass");

    add_onclick_insert_untranslated("kbd-colon", ":");
    add_onclick_insert_untranslated("kbd-semi-colon", ";");
    add_onclick_insert_untranslated("kbd-sharp", "#");
    add_onclick_insert_untranslated("kbd-double-quote", "\"");
    add_onclick_insert_untranslated("kbd-single-quote", "'");
    add_onclick_insert_untranslated("kbd-equal", "=");
    add_onclick_insert_untranslated("kbd-less-than", "<");
    add_onclick_insert_untranslated("kbd-greater-than", ">");
    add_onclick_insert_untranslated("kbd-ampersand", "&");
    add_onclick_insert_untranslated("kbd-vertical-bar", "|");
    add_onclick_insert_untranslated("kbd-parens", "( )");
    add_onclick_insert_untranslated("kbd-curly-brackets", "{ }");
    add_onclick_insert_untranslated("kbd-square-brackets", "[ ]");

    $("#kbd-tab").on("click", function (evt) {
        RUR.kbd.tab();
    });
    msg.record_id("kbd-tab", "tab");
    $("#kbd-shift-tab").on("click", function (evt) {
        RUR.kbd.shift_tab();
    });
    msg.record_id("kbd-shift-tab", "shift-tab");
    $("#kbd-enter").on("click", function (evt) {
        RUR.kbd.enter();
    });
    msg.record_id("kbd-enter", "enter");
    $("#kbd-undo").on("click", function (evt) {
        RUR.kbd.undo();
    });
    msg.record_id("kbd-undo", "UNDO");
    $("#kbd-redo").on("click", function (evt) {
        RUR.kbd.redo();
    });
    msg.record_id("kbd-redo", "REDO");
}