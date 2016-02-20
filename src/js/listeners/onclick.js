/* Sets up what happens when the user clicks on various html elements.
*/

require("./../translator.js");
require("./../world.js");
require("./../state.js");
require("./../create_editors.js");

var export_world = require("./../world/export_world.js").export_world;
var record_id = require("./../../lang/msg.js").record_id;

function load_file (obj) {
    $("#fileInput").click();
    var fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            obj.setValue(reader.result);
            fileInput.value = '';
        };
        reader.readAsText(file);
    });
}


record_id("load-world", "LOAD WORLD");
record_id("load-world-text", "LOAD WORLD EXPLAIN");

$("#load-world").on("click", function(evt) {
    $("#fileInput").click();
    var fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            try {
                RUR.world.import_world(reader.result);
            } catch (e) {  // jshint ignore:line
                console.log("invalid world", e);
                RUR.show_feedback("#Reeborg-shouts",
                                     RUR.translate("Invalid world file."));
            }
            fileInput.value = '';
        };
        reader.readAsText(file);
    });
});

record_id("save-editor", "SAVE EDITOR");
record_id("save-editor-text", "SAVE EDITOR EXPLAIN");
$("#save-editor").on("click", function (evt) {
    var blob = new Blob([editor.getValue()], {
        type: "text/javascript;charset=utf-8"
    });
    saveAs(blob, "filename"); // saveAs defined in src/libraries/filesaver.js
});

record_id("save-library", "SAVE LIBRARY");
record_id("save-library-text", "SAVE LIBRARY EXPLAIN");
$("#save-library").on("click", function (evt) {
    var blob = new Blob([library.getValue()], {
        type: "text/javascript;charset=utf-8"
    });
    saveAs(blob, "filename"); // saveAs defined in src/libraries/filesaver.js
});

record_id("save-world", "SAVE WORLD");
record_id("save-world-text", "SAVE WORLD EXPLAIN");
$("#save-world").on("click", function (evt) {
    RUR.CURRENT_WORLD = RUR.world.update_from_editors(RUR.CURRENT_WORLD);
    var blob = new Blob([export_world()], {
        type: "text/javascript;charset=utf-8"
    });
    saveAs(blob, "filename.json", true); // saveAs defined in src/libraries/filesaver.js
});

record_id("load-editor", "LOAD EDITOR");
record_id("load-editor-text", "LOAD EDITOR EXPLAIN");
$("#load-editor").on("click", function (evt) {
    load_file(editor);
});

record_id("load-library", "LOAD LIBRARY");
record_id("load-library-text", "LOAD LIBRARY EXPLAIN");
$("#load-library").on("click", function (evt) {
    load_file(library);
});

record_id("add-editor-text", "ADD EDITOR TEXT");
$("#add-editor-to-world").on("click", function(evt) {
    if ($(this).prop("checked")) {
        RUR.CURRENT_WORLD.editor = editor.getValue();
    } else {
        RUR.CURRENT_WORLD.editor = null;
    }
});

record_id("add-library-text", "ADD LIBRARY TEXT");
$("#add-library-to-world").on("click", function(evt) {
    if ($(this).prop("checked")) {
        RUR.CURRENT_WORLD.library = library.getValue();
    } else {
        RUR.CURRENT_WORLD.library = null;
    }
});
