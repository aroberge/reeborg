/* Sets up what happens when the user clicks on various html elements.

called by zzz_doc_ready.js
*/
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
                    alert(RUR.translate("Invalid world file."));
                }
                fileInput.value = '';
            };
            reader.readAsText(file);
        });
    });

    $("#editor-tab").on("click", function (evt) {
        if (RUR.programming_language == "python" && !RUR.we.editing_world) {
            $("#highlight").show();
            $("#watch_variables_btn").show();
        } else {
            $("#highlight").hide();
            $("#watch_variables_btn").hide();
        }
    });

    $("#library-tab").on("click", function (evt) {
        $("#highlight").hide();
        $("#watch_variables_btn").hide();
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
        saveAs(blob, "filename");
    });

    $("#save-permalink").on("click", function (evt) {
        var blob = new Blob([RUR.permalink.__create()], {
            type: "text/javascript;charset=utf-8"
        });
        saveAs(blob, "filename");
    });

    $("#save-world").on("click", function (evt) {
        var blob = new Blob([RUR.world.export_world()], {
            type: "text/javascript;charset=utf-8"
        });
        saveAs(blob, "filename");
    });

    $("#load-editor").on("click", function (evt) {
        load_file(editor);
    });

    $("#load-library").on("click", function (evt) {
        load_file(library);
    });

    $("#memorize-world").on("click", function (evt) {
        RUR.storage.memorize_world();
    });

    $("#classic-image").on("click", function (evt) {
        RUR.vis_robot.select_default_model(0);
    });

    $("#rover-type").on("click", function (evt) {
        RUR.vis_robot.select_default_model(1);
    });

    $("#3d-red-type").on("click", function (evt) {
        RUR.vis_robot.select_default_model(2);
    });

    $("#solar-panel-type").on("click", function (evt) {
        RUR.vis_robot.select_default_model(3);
    });

    $("#robot_canvas").on("click", function (evt) {
        RUR.we.mouse_x = evt.pageX;
        RUR.we.mouse_y = evt.pageY;
        if (RUR.we.editing_world) {
            RUR.we.edit_world();
        }
        RUR.we.show_world_info();
    });

    $("#add_editor_to_world").on("click", function(evt) {
        if ($(this).prop("checked")) {
            RUR.current_world.editor = editor.getValue();
        } else {
            RUR.current_world.editor = null;
        }
    });

    $("#add_library_to_world").on("click", function(evt) {
        if ($(this).prop("checked")) {
            RUR.current_world.library = library.getValue();
        } else {
            RUR.current_world.library = null;
        }
    });

    $("#update-editor-content-btn").on("click", function(evt) {
        editor.setValue(RUR.current_world.editor);
        $("#update-editor-content").hide();
        if (! $("#update-library-content").is(":visible")) {
            RUR.cd.dialog_update_editors_from_world.dialog("close");
        }
    });
    $("#update-library-content-btn").on("click", function(evt) {
        library.setValue(RUR.current_world.library);
        $("#update-library-content").hide();
        if (! $("#update-editor-content").is(":visible")) {
            RUR.cd.dialog_update_editors_from_world.dialog("close");
        }
    });
};
