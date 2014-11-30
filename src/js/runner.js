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
        RUR.vis_world.select_initial_values();
        src = RUR._import_library();                // defined in rur_utils.js
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
            RUR.runner.eval_javascript(src);
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
            if (e.reeborg_says === undefined) {
                e.message = e.message.replace("\n", "<br>");
                if (e.info){
                    e.message += "<br>&#8594;" + RUR.simplify_python_traceback(e.info);
                }
                e.message = e.message.replace(/module '*__main__'* line \d+\s/,"" ); // TODO: might not be needed
            } else {
                e.message = e.reeborg_says;
                console.log("Any error appearing above can be ignored: it should also appear in a dialog.");
            }
        } else {
            error_name = e.name;
        }
        if (error_name === "ReeborgError"){
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

RUR.simplify_python_traceback = function(info) {
    info = info.replace("undefined", "undefined:");
    info = info.replace("\n", "<br>");
    info = info.replace("Traceback (most recent call last):<br>", '');
    info = info.replace(/module '*__main__'* line \d+\s/,"" );
    info = info.replace(/\s*RUR.set_lineno_highlight\(\d+\)/, "");
    info = info.replace(/\s*\^$/, "");
    return info;
};

// RUR.runner.eval_javascript = function (src) {
//     // Note: by having "use strict;" here, it has the interesting effect of requiring user
//     // programs to conform to "strict" usage, meaning that all variables have to be declared,
//     // etc.
//     "use strict";  // will propagate to user's code, enforcing good programming habits.
//     // lint, then eval
//     var i, line, lines, text = '';
//     editorUpdateHints();
//     if(editor.widgets.length === 0) {
//         libraryUpdateHints();
//         if(library.widgets.length !== 0) {
//             $('#library-problem').show().fadeOut(4000);
//         }
//     }
//     RUR.reset_definitions();


//     eval(src); // jshint ignore:line
// };

RUR.runner.eval_javascript = function (src) {
    // do not "use strict"
    RUR.reset_definitions();
    eval(src); // jshint ignore:line
};

RUR.runner.eval_python = function (src) {
    // do not  "use strict"
    RUR.reset_definitions();
    translate_python(src);
};


RUR.runner.eval_coffee = function (src) {
    // do not  "use strict"
    RUR.reset_definitions();
    eval(CoffeeScript.compile(src)); // jshint ignore:line
};