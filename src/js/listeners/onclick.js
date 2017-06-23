/* Sets up what happens when the user clicks on various html elements.
*/

require("./../translator.js");
require("./../editors/update.js");
require("./../rur.js");
require("./../editors/create.js");
require("./../programming_api/blockly.js");
// depends on filesaver.js loaded in main html page

var record_id = require("./../../lang/msg.js").record_id;
var record_value = require("./../../lang/msg.js").record_value;

function remove_fileInput_listener () {
    // see http://stackoverflow.com/a/19470348
    var el = document.getElementById('fileInput'),
        elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);
}

function load_file (obj) {
    remove_fileInput_listener();
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
    remove_fileInput_listener();
    $("#fileInput").click();
    var fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            try {
                RUR.world_utils.import_world(reader.result);
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

record_value("save-blockly", "SAVE BLOCKLY");
record_id("save-blockly-text", "SAVE BLOCKLY EXPLAIN");
var save_blockly_form = document.getElementById("save-blockly-form");
save_blockly_form.addEventListener("submit", function(event) {
    event.preventDefault();
    var blockly_filename = document.getElementById("blockly-filename");
    var blob = new Blob([library.getValue()], {
        type: "text/xml;charset=utf-8"
    });
    saveAs(blob, (blockly_filename.value || blockly_filename.placeholder) + ".xml", true);
 }, false);

record_value("save-editor", "SAVE EDITOR");
record_id("save-editor-text", "SAVE EDITOR EXPLAIN");
var save_editor_form = document.getElementById("save-editor-form");
save_editor_form.addEventListener("submit", function(event) {
    var blob;
    event.preventDefault();
    var editor_filename = document.getElementById("editor-filename");
    if (RUR.state.programming_language == "python") {
        blob = new Blob([editor.getValue()], {
            type: "text/python;charset=utf-8"
        });
        saveAs(blob, (editor_filename.value || editor_filename.placeholder) + ".py", true);
    } else {
        blob = new Blob([editor.getValue()], {
            type: "text/javascript;charset=utf-8"
        });
        saveAs(blob, (editor_filename.value || editor_filename.placeholder) + ".js", true);
    }

 }, false);

record_value("save-library", "SAVE LIBRARY");
record_id("save-library-text", "SAVE LIBRARY EXPLAIN");
var save_library_form = document.getElementById("save-library-form");
save_library_form.addEventListener("submit", function(event) {
    event.preventDefault();
    var library_filename = document.getElementById("library-filename");
    var blob = new Blob([library.getValue()], {
        type: "text/python;charset=utf-8"
    });
    saveAs(blob, (library_filename.value || library_filename.placeholder) + ".py", true);
 }, false);

record_value("save-world", "SAVE WORLD");
record_id("save-world-text", "SAVE WORLD EXPLAIN");
var save_world_form = document.getElementById("save-world-form");
save_world_form.addEventListener("submit", function(event) {
    event.preventDefault();
    var world_filename = document.getElementById("world-filename");
    RUR.set_current_world(RUR.update_world_from_editors(RUR.get_current_world()));
    var blob = new Blob([RUR.export_world()], {
        type: "text/javascript;charset=utf-8"
    });
    saveAs(blob, (world_filename.value || world_filename.placeholder) + ".json", true);
 }, false);


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
    var world = RUR.get_current_world();
    record_id("add-" + name + "-to-world-btn");
    record_id("add-" + name + "-ok");
    record_id("add-" + name + "-not-ok");
    $("#add-" + name + "-to-world-btn").on("click", function(evt) {
        if ($(this).hasClass("blue-gradient")) {
            $("#add-" + name + "-ok").show();
            $("#add-" + name + "-not-ok").hide();
            world[name] = obj.getValue();
        } else {
            $("#add-" + name + "-ok").hide();
            $("#add-" + name + "-not-ok").show();
            delete world[name];
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
