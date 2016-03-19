/* Sets up what happens when the user clicks on various html elements.
*/

require("./../translator.js");
require("./../world.js");
require("./../state.js");
require("./../create_editors.js");
require("./../blockly.js");

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
                RUR.storage.save_world(file.name);
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

record_id("save-blockly-btn", "SAVE BLOCKLY");
record_id("save-blockly-text", "SAVE BLOCKLY EXPLAIN");
$("#save-blockly-btn").on("click", function (evt) {
    var xml, blob = new Blob([RUR.blockly.getValue()], {
        type: "text/javascript;charset=utf-8"
    });
    saveAs(blob, "filename.xml"); // saveAs defined in src/libraries/filesaver.js
});

record_id("save-editor-btn", "SAVE EDITOR");
record_id("save-editor-text", "SAVE EDITOR EXPLAIN");
$("#save-editor-btn").on("click", function (evt) {
    var blob = new Blob([editor.getValue()], {
        type: "text/javascript;charset=utf-8"
    });
    saveAs(blob, "filename"); // saveAs defined in src/libraries/filesaver.js
});

record_id("save-library-btn", "SAVE LIBRARY");
record_id("save-library-text", "SAVE LIBRARY EXPLAIN");
$("#save-library-btn").on("click", function (evt) {
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

record_id("load-blockly-btn", "LOAD BLOCKLY");
record_id("load-blockly-text", "LOAD BLOCKLY EXPLAIN");
$("#load-blockly-btn").on("click", function (evt) {
    load_file(RUR.blockly);
});

record_id("load-editor-btn", "LOAD EDITOR");
record_id("load-editor-text", "LOAD EDITOR EXPLAIN");
$("#load-editor-btn").on("click", function (evt) {
    load_file(editor);
});

record_id("load-library-btn", "LOAD LIBRARY");
record_id("load-library-text", "LOAD LIBRARY EXPLAIN");
$("#load-library-btn").on("click", function (evt) {
    load_file(library);
});


function toggle_content (name, obj) {
    record_id("add-" + name + "-to-world-btn");
    record_id("add-" + name + "-ok");
    record_id("add-" + name + "-not-ok");
    $("#add-" + name + "-to-world-btn").on("click", function(evt) {
        if ($(this).hasClass("blue-gradient")) {
            $("#add-" + name + "-ok").show();
            $("#add-" + name + "-not-ok").hide();
            RUR.CURRENT_WORLD[name] = obj.getValue();
        } else {
            $("#add-" + name + "-ok").hide();
            $("#add-" + name + "-not-ok").show();
            delete RUR.CURRENT_WORLD[name];
        }
        $(this).toggleClass("blue-gradient");
        $(this).toggleClass("active-element");
    });
}

record_id("add-content-to-world", "ADD CONTENT TO WORLD");
record_id("add-blockly-text", "ADD BLOCKLY TEXT");
toggle_content("blockly", RUR.blockly);

record_id("add-editor-text", "ADD EDITOR TEXT");
toggle_content("editor", editor);

record_id("add-library-text", "ADD LIBRARY TEXT");
toggle_content("library", library);

record_id("add-pre-text", "ADD PRE TEXT");
toggle_content("pre", pre_code_editor);

record_id("add-post-text", "ADD POST TEXT");
toggle_content("post", post_code_editor);

record_id("add-description-text", "ADD DESCRIPTION TEXT");
toggle_content("description", description_editor);

record_id("add-onload-text", "ADD ONLOAD TEXT");
toggle_content("onload", onload_editor);
