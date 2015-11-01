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