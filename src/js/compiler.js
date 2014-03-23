/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, editor, library, editorUpdateHints, libraryUpdateHints, translate_python */


var RUR = RUR || {};

RUR.compile_javascript = function (src) {
    // Note: by having "use strict;" here, it has the interesting effect of requiring user
    // programs to conform to "strict" usage, meaning that all variables have to be declared,
    // etc.
    "use strict";  // will propagate to user's code, enforcing good programming habits.
    // lint, then eval
    editorUpdateHints();
    if(editor.widgets.length === 0) {
        libraryUpdateHints();
        if(library.widgets.length !== 0) {
            $('#library-problem').show().fadeOut(4000);
        }
    }
    RUR.reset_definitions();
    eval(src); // jshint ignore:line
};

RUR.compile_no_strict_js = function (src) {
    // bypass linting and does not "use strict"
    // Usually requires "no strict"; as first statement in editor
    RUR.reset_definitions();
    eval(src); // jshint ignore:line
};

RUR.compile_python = function (src) {
    // do not  "use strict" as we do not control the output produced by Brython
    // translate_python needs to be included in the html page in a Python script
    RUR.reset_definitions();
    translate_python(src); // jshint ignore:line
};
