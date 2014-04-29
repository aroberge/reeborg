/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library, editorUpdateHints, libraryUpdateHints, 
  translate_python, _import_library, CoffeeScript */

RUR.runner = {};

RUR.runner.interpreted = false;

RUR.runner.run = function (playback) {
    var src, fatal_error_found = false;
    if (!RUR.runner.interpreted) {
        src = RUR._import_library();                // defined in Reeborg_js_en, etc.
        fatal_error_found = RUR.runner.eval(src); // jshint ignore:line
        RUR.current_world = RUR.world.clone_world(RUR.world.saved_world);
    }
    if (!fatal_error_found) {
        try {
            localStorage.setItem(RUR.settings.editor, editor.getValue());
            localStorage.setItem(RUR.settings.library, library.getValue());
        } catch (e) {}
        // "playback" is afunction called to play back the code in a sequence of frames
        // or a "null function", f(){} can be passed if the code is not
        // dependent on the robot world.
        if (playback() === "stopped") {
            RUR.ui.stop();
        } 
    }
};

RUR.runner.eval = function(src) {  // jshint ignore:line
    var error_name;
    try {
        if (RUR.programming_language === "javascript") {
            if (RUR.strict_javascript) {
                RUR.runner.eval_javascript(src);

            } else {
                RUR.runner.eval_no_strict_js(src);
            }

        } else if (RUR.programming_language === "python") {
            RUR.runner.eval_python(src);
        } else if (RUR.programming_language === "coffee") {
            RUR.runner.eval_coffee(src);
        } else {
            alert("Unrecognized programming language.");
            return true;
        }
    } catch (e) {
        if (RUR.programming_language === "python") {
            error_name = e.__name__;
        } else {
            error_name = e.name;
        }
        if (error_name === RUR.translation.ReeborgError){
            RUR.rec.record_frame("error", e);
        } else {
            $("#Reeborg-shouts").html("<h3>" + error_name + "</h3><h4>" + e.message + "</h4>").dialog("open");
            RUR.ui.stop();
            return true;
        }
    }
    RUR.runner.interpreted = true;
    return false;
};

RUR.runner.eval_javascript = function (src) {
    // Note: by having "use strict;" here, it has the interesting effect of requiring user
    // programs to conform to "strict" usage, meaning that all variables have to be declared,
    // etc.
    "use strict";  // will propagate to user's code, enforcing good programming habits.
    // lint, then eval
    var i, line, lines, text = '';
    editorUpdateHints();
    if(editor.widgets.length === 0) {
        libraryUpdateHints();
        if(library.widgets.length !== 0) {
            $('#library-problem').show().fadeOut(4000);
        }
    }
    RUR.reset_definitions();

//    function set_line_no(n){
//        RUR._current_line = n;
//    }
//    
//    lines = src.split("\n");
//    for (i=0; i < lines.length; i++){
//        text += "set_line_no(" + i + ");";
//        text += lines[i];
//    }
//    src = text;
    eval(src); // jshint ignore:line
};

RUR.runner.eval_no_strict_js = function (src) {
    // bypass linting and does not "use strict"
    RUR.reset_definitions();
    eval(src); // jshint ignore:line
};

RUR.runner.eval_python = function (src) {
    // do not  "use strict" as we do not control the output produced by Brython
    RUR.reset_definitions();
    // translate_python is found in html file
    translate_python(src);
};


RUR.runner.eval_coffee = function (src) {
    var out;
    RUR.reset_definitions();
    eval(CoffeeScript.compile(src)); // jshint ignore:line
};