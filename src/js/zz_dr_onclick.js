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


    $("#world-panel-button").on("click", function (evt) {
        RUR.ui.toggle_panel($("#world-panel-button"), $("#world-panel"));
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

    function hide_editor_show_console() {
        $("#py_console").show();
        $("#kbd_python_btn").hide();
        $("#kbd_py_console_btn").show();
        RUR.ui.show_only_reload2(true);
        window.restart_repl();
        RUR._saved_highlight_value = RUR._highlight;
        RUR._highlight = false;
        RUR._immediate_playback = true;
        RUR._active_console = true;
    }

    function show_editor_hide_console() {
        $("#py_console").hide();
        $("#kbd_python_btn").show();
        $("#kbd_py_console_btn").hide();
        RUR.ui.show_only_reload2(false);
        RUR._highlight = RUR._saved_highlight_value;
        RUR._immediate_playback = false;
        RUR.ui.reload();
        RUR._active_console = false;
    }

    $("#editor-panel-button").on("click", function (evt) {
        if ($("#editor-panel-button").hasClass("reverse-blue-gradient")) {
            hide_editor_show_console();
        } else {
            show_editor_hide_console();
        }
        RUR.ui.toggle_panel($("#editor-panel-button"), $("#editor-panel"));
        RUR.kbd.select();
    });
};
