/* Sets up what happens when the user clicks on various html elements.
*/

require("./translator.js");
require("./world.js");
require("./state.js");

var export_world = require("./world/export_world.js").export_world;


RUR.zz_dr_onclick = function () {

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

    $("#editor-tab").on("click", function (evt) {
        if (RUR.state.programming_language == "python" && !RUR.state.editing_world) {
            $("#highlight").show();
            $("#watch-variables-btn").show();
        } else {
            $("#highlight").hide();
            $("#watch-variables-btn").hide();
        }
    });

    $("#library-tab").on("click", function (evt) {
        $("#highlight").hide();
        $("#watch-variables-btn").hide();
    });

    $("#save-editor").on("click", function (evt) {
        var blob = new Blob([editor.getValue()], {
            type: "text/javascript;charset=utf-8"
        });
        saveAs(blob, "filename"); // saveAs defined in src/libraries/filesaver.js
    });

    $("#save-library").on("click", function (evt) {
        var blob = new Blob([library.getValue()], {
            type: "text/javascript;charset=utf-8"
        });
        saveAs(blob, "filename"); // saveAs defined in src/libraries/filesaver.js
    });


    $("#save-world").on("click", function (evt) {
        RUR.CURRENT_WORLD = RUR.world.update_from_editors(RUR.CURRENT_WORLD);
        var blob = new Blob([export_world()], {
            type: "text/javascript;charset=utf-8"
        });
        saveAs(blob, "filename.json", true); // saveAs defined in src/libraries/filesaver.js
    });

    $("#load-editor").on("click", function (evt) {
        load_file(editor);
    });

    $("#load-library").on("click", function (evt) {
        load_file(library);
    });


    $("#add-editor-to-world").on("click", function(evt) {
        if ($(this).prop("checked")) {
            RUR.CURRENT_WORLD.editor = editor.getValue();
        } else {
            RUR.CURRENT_WORLD.editor = null;
        }
    });

    $("#add-library-to-world").on("click", function(evt) {
        if ($(this).prop("checked")) {
            RUR.CURRENT_WORLD.library = library.getValue();
        } else {
            RUR.CURRENT_WORLD.library = null;
        }
    });


};
