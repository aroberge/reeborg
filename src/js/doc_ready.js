/* Author: André Roberge
   License: MIT
 */

/*jshint -W002, browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library, toggle_contents_button, update_controls, saveAs, toggle_editing_mode,
          save_world, delete_world, parseUri*/

$(document).ready(function() {
    "use strict";

    try {
        RUR.world_select.set_url(localStorage.getItem(RUR.settings.world));
        //RUR.ui.select_world(localStorage.getItem(RUR.settings.world), true);
    } catch (e) {
        RUR.world_select.set_default();
    }
    RUR.settings.initial_world = localStorage.getItem(RUR.settings.world);

    function create_and_activate_dialog(button, element, add_options, special_fn) {
        var options = {
        minimize: true,
        maximize: false,
        autoOpen: false,
        width: 800,
        height: 600,
        position: {my: "center", at: "center", of: window},
        beforeClose: function( event, ui ) {
                button.addClass("blue-gradient").removeClass("reverse-blue-gradient");
                if (special_fn !== undefined){
                    special_fn();
                }
            }
        };
        for (var attrname in add_options) {
            options[attrname] = add_options[attrname];
        }

        button.on("click", function(evt) {
            element.dialog(options);
            button.toggleClass("blue-gradient");
            button.toggleClass("reverse-blue-gradient");
            if (button.hasClass("reverse-blue-gradient")) {
                element.dialog("open");
            } else {
                element.dialog("close");
            }
            if (special_fn !== undefined && element.dialog("isOpen")){
                special_fn();
            }
        });
    }

    create_and_activate_dialog($("#edit-world"), $("#edit-world-panel"), {}, toggle_editing_mode);
    create_and_activate_dialog($("#about-button"), $("#about-div"), {});
    create_and_activate_dialog($("#more-menus-button"), $("#more-menus"), {height:700});
    create_and_activate_dialog($("#world-info-button"), $("#World-info"), {height:300, width:600}, RUR.we.show_world_info);
    create_and_activate_dialog($("#special-keyboard-button"), $("#special-keyboard"),
            {autoOpen:false, width:600,  height:350, maximize: false, position:"left"});

    $("#world-panel-button").on("click", function (evt) {
        RUR.ui.toggle_panel($("#world-panel-button"), $("#world-panel"))
    });

    $("#editor-panel-button").on("click", function (evt) {
        if ($("#editor-panel-button").hasClass("reverse-blue-gradient")) {
            $("#py_console").show();
            $("#kbd_python_btn").hide();
            $("#kbd_py_console_btn").show();
            RUR.ui.show_only_reload2(true);
            window.restart_repl();
            RUR._saved_highlight_value = RUR._highlight;
            RUR._highlight = false;
            RUR._immediate_playback = true;
            RUR._active_console = true;
        } else {
            $("#py_console").hide();
            $("#kbd_python_btn").show();
            $("#kbd_py_console_btn").hide();
            RUR.ui.show_only_reload2(false);
            RUR._highlight = RUR._saved_highlight_value;
            RUR._immediate_playback = false;
            RUR.ui.reload();
            RUR._active_console = false;
        }
        RUR.ui.toggle_panel($("#editor-panel-button"), $("#editor-panel"));
        RUR.kbd.select();
    });
    RUR.ui.show_only_reload2(false);

    $("#editor-link").on("click", function(evt){
        if (RUR.programming_language == "python" && !RUR.we.editing_world){
            $("#highlight").show();
            $("#watch_variables_btn").show();
        } else {
            $("#highlight").hide();
            $("#watch_variables_btn").hide();
        }
    });

    $("#library-link").on("click", function(evt){
        $("#highlight").hide();
        $("#watch_variables_btn").hide();
    });

    $("#save-editor").on("click", function(evt) {
        var blob = new Blob([editor.getValue()], {type: "text/javascript;charset=utf-8"});
        saveAs(blob, "filename");  // saveAs defined in src/libraries/filesaver.js
    });

    $("#save-library").on("click", function(evt) {
        var blob = new Blob([library.getValue()], {type: "text/javascript;charset=utf-8"});
        saveAs(blob, "filename");
    });

    $("#save-permalink").on("click", function(evt) {
        var blob = new Blob([RUR._create_permalink()], {type: "text/javascript;charset=utf-8"});
        saveAs(blob, "filename");
    });

    $("#save-world").on("click", function(evt) {
        var blob = new Blob([RUR.world.export_world()], {type: "text/javascript;charset=utf-8"});
        saveAs(blob, "filename");
    });


    $("#load-editor").on("click", function(evt) {
        load_file(editor);
    });

    $("#load-library").on("click", function(evt) {
        load_file(library);
    });


    $("#tabs").tabs({
            heightStyle: "auto",
            activate: function(event, ui){
                editor.refresh();
                library.refresh();
                pre_code_editor.refresh();
                post_code_editor.refresh();
                description_editor.refresh();
            }
    });

    $("#editor-panel").resizable({
        resize: function() {
            editor.setSize(null, $(this).height()-40);
            library.setSize(null, $(this).height()-40);
            pre_code_editor.setSize(null, $(this).height()-40);
            post_code_editor.setSize(null, $(this).height()-40);
            description_editor.setSize(null, $(this).height()-40);
        }
    }).draggable({cursor: "move", handle: "ul"});


    var load_file = function(obj) {
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
    };


    $("#load-world").on("click", function(evt) {
        $("#fileInput").click();
        var fileInput = document.getElementById('fileInput');
        fileInput.addEventListener('change', function(e) {
            var file = fileInput.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                try {
                    RUR.world.import_world(reader.result);
                } catch (e) {
                    alert(RUR.translate("Invalid world file."));
                }
                fileInput.value = '';
            };
            reader.readAsText(file);
        });
    });

    $("#memorize-world").on("click", function(evt) {
        RUR.storage.memorize_world();
    });

    $("#classic-image").on("click", function(evt) {
        RUR.vis_robot.select_default_model(0);
    });

    $("#rover-type").on("click", function(evt) {
        RUR.vis_robot.select_default_model(1);
    });

    $("#3d-red-type").on("click", function(evt) {
        RUR.vis_robot.select_default_model(2);
    });

    $("#solar-panel-type").on("click", function(evt) {
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


    $("#Reeborg-concludes").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "concludes",
                                    position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-shouts").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert",
                                    position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-writes").dialog({minimize: false, maximize: false, autoOpen:false, width:600, height:250,
                                    position:{my: "bottom", at: "bottom-20", of: window}});
    $("#Reeborg-explores").dialog({minimize: false, maximize: false, autoOpen:false, width:600,
                                    position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-proclaims").dialog({minimize: false, maximize: false, autoOpen:false, width:600, dialogClass: "proclaims",
                                    position:{my: "bottom", at: "bottom-80", of: window}});
    $("#Reeborg-watches").dialog({minimize: false, maximize: false, autoOpen:false, width:600, height:250, dialogClass: "watches",
                                    position:{my: "bottom", at: "bottom-140", of: window}});

    $("#select_world").change(function() {
        try {
            localStorage.setItem(RUR.settings.world, $(this).find(':selected').text());
        } catch (e) {}
        if ($(this).val() !== null) {
            RUR.file_io.load_world_file($(this).val());
        }
    });


    try {
        RUR.reset_code_in_editors();
    } catch (e){
        console.log(e);
        alert("Your browser does not support localStorage; you will not be able to save your functions in the library.");
    }

    RUR.ui.set_ready_to_run();

});



$(document).ready(function() {
    var prog_lang, url_query, name;
    var human_language = document.documentElement.lang;
    RUR._highlight = true;

    RUR.make_default_menu(human_language);

    $('input[type=radio][name=programming_language]').on('change', function(){
        RUR.reset_programming_language($(this).val());
    });
    url_query = parseUri(window.location.href);
    if (url_query.queryKey.proglang !== undefined &&
       url_query.queryKey.world !== undefined &&
       url_query.queryKey.editor !== undefined &&
       url_query.queryKey.library !== undefined) {
        prog_lang = url_query.queryKey.proglang;
        $('input[type=radio][name=programming_language]').val([prog_lang]);
        RUR.reset_programming_language(prog_lang);
        RUR.world.import_world(decodeURIComponent(url_query.queryKey.world));
        name = RUR.translate("PERMALINK");
        localStorage.setItem("user_world:"+ name, RUR.world.export_world());
        RUR.storage.save_world(name);

        editor.setValue(decodeURIComponent(url_query.queryKey.editor));
        library.setValue(decodeURIComponent(url_query.queryKey.library));
    } else {
        prog_lang = localStorage.getItem("last_programming_language_" + human_language);
        switch (prog_lang) {
            case 'python-' + human_language:
            case 'javascript-' + human_language:
            case 'coffeescript-' + human_language:
                $('input[type=radio][name=programming_language]').val([prog_lang]);
                RUR.reset_programming_language(prog_lang);
                break;
            default:
                RUR.reset_programming_language('python-' + human_language);
        }
        // trigger it to load the initial world.
        $("#select_world").change();
    }
    if(url_query.queryKey.css !== undefined) {
        var new_css = decodeURIComponent(url_query.queryKey.css);
        eval(new_css);  // jshint ignore:line
    }
    // for embedding in iframe
    addEventListener("message", receiveMessage, false);
    function receiveMessage(event){
        RUR.update_permalink(event.data);
    }


    RUR.we.set_extra_code();
});
