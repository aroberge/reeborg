/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, editor, library, RUR, JSHINT, globals_ */

function editorUpdateHints() {
    updateHints(editor);
}

function libraryUpdateHints() {
    updateHints(library);
}

var jshint_options = {
    eqeqeq: true,
    boss: true,
    undef: true,
    curly: true,
    nonew: true,
    browser: true,
    devel: true,
    white: false,
    plusplus: false,
    jquery: true
};


function updateHints(obj) {
    if (RUR.programming_language != "javascript") {
        return;
    }
    var values, nb_lines;
    var import_lib_regex = /^\s*import_lib\s*\(\s*\);/m;
    obj.operation(function () {
        for(var i = 0; i < obj.widgets.length; ++i){
            obj.removeLineWidget(obj.widgets[i]);
        }
        obj.widgets.length = 0;

        if (obj === editor) {
            values = globals_ + editor.getValue().replace(import_lib_regex, library.getValue());
            nb_lines = library.lineCount() + 1;
            JSHINT(values, jshint_options);
        } else {
            JSHINT(globals_ + obj.getValue(), jshint_options);
            nb_lines = 2;
        }
        for(i = 0; i < JSHINT.errors.length; ++i) {
            var err = JSHINT.errors[i];
            if(!err) continue;
            var msg = document.createElement("div");
            var icon = msg.appendChild(document.createElement("span"));
            icon.innerHTML = "!?!";
            icon.className = "lint-error-icon";
            msg.appendChild(document.createTextNode(err.reason));
            msg.className = "lint-error";
            obj.widgets.push(obj.addLineWidget(err.line - nb_lines, msg, {
                coverGutter: false,
                noHScroll: true
            }));
        }
    });

    var info = obj.getScrollInfo();
    var after = obj.charCoords({line: obj.getCursor().line + 1, ch: 0}, "local").top;
    if(info.top + info.clientHeight < after) {
        obj.scrollTo(null, after - info.clientHeight + 3);
    }
}
