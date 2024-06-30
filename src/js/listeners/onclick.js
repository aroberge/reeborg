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
exports.remove_fileInput_listener = remove_fileInput_listener;

function load_file (obj) {
    var fileInput;
    remove_fileInput_listener();
    $("#fileInput").click();    
    fileInput = document.getElementById('fileInput');    
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
exports.load_file = load_file;


record_id("load-world", "LOAD WORLD");
record_id("load-world-text", "LOAD WORLD EXPLAIN");

$(document).ready(function () {
    $("#load-world").on("click", function(evt) {
        var fileInput;
        remove_fileInput_listener();
        $("#fileInput").click();
        fileInput = document.getElementById('fileInput');
        fileInput.addEventListener('change', function(e) {
            var file = fileInput.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                try {
                    RUR.world_utils.import_world(reader.result);
                    RUR.storage.save_world(file.name);
                } catch (e) {  // jshint ignore:line
                    console.log("invalid world", e);
                    RUR.show_feedback("#Reeborg-failure",
                                         RUR.translate("Invalid world file."));
                }
                fileInput.value = '';
            };
            reader.readAsText(file);
        });
    });
});



record_value("save-blockly", "SAVE BLOCKLY");
record_id("save-blockly-text", "SAVE BLOCKLY EXPLAIN");

record_value("save-editor", "SAVE EDITOR");
record_id("save-editor-text", "SAVE EDITOR EXPLAIN");

$(document).ready(function () {
    var save_blockly_form = document.getElementById("save-blockly-form");
    save_blockly_form.addEventListener("submit", function(event) {
        event.preventDefault();
        var blockly_filename = document.getElementById("blockly-filename");
        var blob = new Blob([RUR.blockly.getValue()], {
            type: "text/xml;charset=utf-8"
        });
        saveAs(blob, (blockly_filename.value || blockly_filename.placeholder) + ".xml", true);
     }, false);


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
});



record_value("save-library", "SAVE LIBRARY");
record_id("save-library-text", "SAVE LIBRARY EXPLAIN");
record_value("save-world", "SAVE WORLD");
record_id("save-world-text", "SAVE WORLD EXPLAIN");

$(document).ready(function () {
    var save_library_form = document.getElementById("save-library-form");
    save_library_form.addEventListener("submit", function(event) {
        event.preventDefault();
        var library_filename = document.getElementById("library-filename");
        var blob = new Blob([library.getValue()], {
            type: "text/python;charset=utf-8"
        });
        saveAs(blob, (library_filename.value || library_filename.placeholder) + ".py", true);
     }, false);


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
});
    

record_id("load-blockly-btn", "LOAD BLOCKLY");
record_id("load-blockly-text", "LOAD BLOCKLY EXPLAIN");
record_id("load-editor-btn", "LOAD EDITOR");
record_id("load-editor-text", "LOAD EDITOR EXPLAIN");
record_id("load-library-btn", "LOAD LIBRARY");
record_id("load-library-text", "LOAD LIBRARY EXPLAIN");

$(document).ready(function() {
    $("#load-blockly-btn").on("click", function (evt) {
        load_file(RUR.blockly);
    });

    $("#load-editor-btn").on("click", function (evt) {
        load_file(editor);
    });

    $("#load-library-btn").on("click", function (evt) {
        load_file(library);
    });
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
record_id("add-editor-text", "ADD EDITOR TEXT");
record_id("add-library-text", "ADD LIBRARY TEXT");
record_id("add-pre-text", "ADD PRE TEXT");
record_id("add-post-text", "ADD POST TEXT");
record_id("add-description-text", "ADD DESCRIPTION TEXT");
record_id("add-onload-text", "ADD ONLOAD TEXT");

$(document).ready(function() {
    toggle_content("blockly", RUR.blockly);
    toggle_content("editor", editor);
    toggle_content("library", library);
    toggle_content("pre", pre_code_editor);
    toggle_content("post", post_code_editor);
    toggle_content("description", description_editor);
    toggle_content("onload", onload_editor);
});

    


record_id("increase-font-size");
record_id("decrease-font-size");

function change_editors_font_size() {
    editor.getWrapperElement().style["font-size"] = RUR.state.editors_font_size + "px";
    library.getWrapperElement().style["font-size"] = RUR.state.editors_font_size + "px";
    pre_code_editor.getWrapperElement().style["font-size"] = RUR.state.editors_font_size + "px";
    post_code_editor.getWrapperElement().style["font-size"] = RUR.state.editors_font_size + "px";
    onload_editor.getWrapperElement().style["font-size"] = RUR.state.editors_font_size + "px";
    description_editor.getWrapperElement().style["font-size"] = RUR.state.editors_font_size + "px";
}

$(document).ready(function() {
    $("#increase-font-size").on("click", function(evt) {
        var index, sizes;

        sizes = [8, 10, 12, 14, 16, 18, 20, 23, 26, 30, 34, 38, 42, 46, 50];
        if (RUR.state.editors_font_size === undefined) {
            RUR.state.editors_font_size = 20;
        } else {
            index = sizes.indexOf(RUR.state.editors_font_size);
            if (index == -1) {
                RUR.state.editors_font_size += 5;
            } else if (index < sizes.length-1) {
                RUR.state.editors_font_size = sizes[index+1];
            } else {
                RUR.state.editors_font_size += 5;
            }
        }
        change_editors_font_size();
    });

    $("#decrease-font-size").on("click", function(evt) {
        var index, sizes;

        sizes = [8, 10, 12, 14, 16, 18, 20, 23, 26, 30, 34, 38, 42, 46, 50];
        if (RUR.state.editors_font_size === undefined) {
            RUR.state.editors_font_size = 12;
        } else {
            index = sizes.indexOf(RUR.state.editors_font_size);
            if (index == -1) {
                RUR.state.editors_font_size -= 5;
            } else if (index > 0) {
                RUR.state.editors_font_size = sizes[index-1];
            }
        }
        change_editors_font_size();
    });    
});

