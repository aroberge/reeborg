/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library, editorUpdateHints,
  translate_python, CoffeeScript */

RUR.runner = {};

RUR.runner.interpreted = false;

RUR.runner.run = function (playback) {
    var src, fatal_error_found = false;
    if (!RUR.runner.interpreted) {
        RUR.vis_world.select_initial_values();
        src = editor.getValue();
        fatal_error_found = RUR.runner.eval(src); // jshint ignore:line
        RUR.current_world = RUR.world.clone_world(RUR.world.saved_world);
    }
    if (!fatal_error_found) {
        try {
            localStorage.setItem(RUR.settings.editor, editor.getValue());
            localStorage.setItem(RUR.settings.library, library.getValue());
        } catch (e) {}
        // "playback" is a function called to play back the code in a sequence of frames
        // or a "null function", f(){} can be passed if the code is not
        // dependent on the robot world.
        if (playback() === "stopped") {
            RUR.ui.stop();
        }
    }
};

RUR.runner.eval = function(src) {  // jshint ignore:line
    var error_name, message;
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
        console.dir(e);     // see comment at the end of
                            // this file showing some sample errors.
        if (RUR.programming_language === "python") {
            error_name = e.__name__;
            message = RUR.runner.simplify_python_traceback(e);
        } else {
            error_name = e.name;
            message = e.message;
        }

        if (error_name === "ReeborgError"){
            RUR.rec.record_frame("error", e);
        } else {
            $("#Reeborg-shouts").html("<h3>" + error_name + "</h3><h4>" +
                                      message + "</h4>").dialog("open");
            RUR.ui.stop();
            return true;
        }
    }
    RUR.runner.interpreted = true;
    return false;
};


RUR.runner.simplify_python_traceback = function(e) {
    var message, line_number;
    if (e.reeborg_shouts === undefined) {  // src/brython/Lib/site-packages/reeborg_common.py
        message = e.message;
        try {
            line_number = RUR.runner.extract_line(e.info);
        } catch (e) {
            line_number = false;
        }
        if (line_number) {
            message += "<br>Error found at or near line " + line_number.toString();
        }
    } else {
        message = e.reeborg_shouts;
    }
    return message;
};


RUR.runner.extract_line = function (message) {
    var lines, penultimate, last, pre_code;

    lines = message.split("\n");
    penultimate = lines[lines.length -2];
    last = lines[lines.length-1];
    if (last.indexOf("exec(src, globals_)") != -1) { // error occurred on first line
               // and brython incorrectly recorded the line in Reeborg's
               // backend code as the source of the error
        return 1
    }
    try {
        line_number = parseInt(penultimate.split(" line ")[1], 10);
        if (isNaN(line_number)) {
            return false;
        }
    } catch (e) {
        return false;
    }

    if (RUR.current_world.pre_code){
        pre_code = RUR.current_world.pre_code.split("\n");
        line_number -= pre_code.length;
    }

    if (RUR._highlight) {
        line_number = Math.round(line_number/2);
    }
    return line_number;
}


RUR.runner.eval_javascript = function (src) {
    // do not "use strict"
    RUR.reset_definitions();
    eval(src); // jshint ignore:line
};


RUR.runner.eval_python = function (src) {
    // do not  "use strict"
    var pre_code = '', post_code = ''
    RUR.reset_definitions();
    if (RUR.current_world.pre_code){
        pre_code = RUR.current_world.pre_code;
    }
    if (RUR.current_world.post_code){
        post_code = RUR.current_world.post_code;
    }
    translate_python(src, RUR._highlight, pre_code, post_code);
};


RUR.runner.eval_coffee = function (src) {
    // do not  "use strict"
    RUR.reset_definitions();
    eval(CoffeeScript.compile(src)); // jshint ignore:line
};

RUR.runner.compile_coffee = function() {
    if (RUR.programming_language !== "coffee") {
        return;
    }
    var js_code = CoffeeScript.compile(editor.getValue());
    $("#stdout").html(js_code);
    $("#Reeborg-writes").dialog("open");
};


/** This following are a list of error objects as recorded on the
    Javascript console.
    All the examples are from running Python programs.

The character ↵, copied from the Javascript console, indicates a line return.

=====================
When running the following program with highlighting turned OFF in the
default world "Alone":

move()
move()
mov()
move()

The following is observed (June 19, 2015, "development" version):

class__: Object
__name__: "NameError"
args: "mov"
info: "Traceback (most recent call last):↵  module __main__ line 7↵    common_def.generic_translate_python(src, my_lib, "from reeborg_en import *",↵  module exec-3rwj1zol line 3↵    mov()"
message: "mov"
py_error: true
...   [unimportant ...]
traceback: Object
type: "NameError"
value: "mov"

Note that both "info" and "message" contain the information about the
error having occurred on line 3, just before their "last line"
(prior to the character ↵).

======================
When running the following program with highlighting turned ON in the
default world "Alone":

move()
move()
mov()
move()

The following is observed (June 19, 2015, "development" version):

_class__: Object
__name__: "NameError"
args: "mov"
info: "Traceback (most recent call last):↵  module __main__ line 7↵    common_def.generic_translate_python(src, my_lib, "from reeborg_en import *",↵  module exec-h3t34gsi line 6↵    mov()"
message: "mov"
py_error: true
...
traceback: Object
type: "NameError"
value: "mov"

Note that the line where the error occurred is indicated as line 6, instead
of line 3; this is due to the highlighting.

*/