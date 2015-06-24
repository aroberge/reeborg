/* Author: André Roberge
   License: MIT
 */

/*jshint -W002, browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library, toggle_contents_button, update_controls, saveAs, toggle_editing_mode,
          save_world, delete_world, parseUri*/

$(document).ready(function() {

    RUR.ui.load_user_worlds();
    try {
        RUR.ui.select_world(localStorage.getItem(RUR.settings.world), true);
    } catch (e) {
        RUR.ui.select_world("Alone");
    }
    // init
    var child, button_closed = false;

    $("#header-child button").on("click", function(){
        var index, label, children;
        $(this).toggleClass("active");
        $(this).toggleClass("blue-gradient");
        $(this).toggleClass("reverse-blue-gradient");
        label = $(this).attr("label");

        children = $("#panels").children();
        for (index = 0; index < children.length; index++){
            child = $(children[index]);
            if (child.attr("id") === label) {
                child.toggleClass("active");
            }
        }

        if (label === "world-panel"){
            $("#world-panel").toggleClass("active");
        }  else if (label === "editor-panel"){
            $("#editor-panel").toggleClass("active");
        }

    });

    $(function() {
        $("#tabs").tabs({
            heightStyle: "auto",
            activate: function(event, ui){
                editor.refresh();
                library.refresh();
            }
        });
    });

    $("#editor-panel").resizable({
        resize: function() {
            editor.setSize(null, $(this).height()-40);
            library.setSize(null, $(this).height()-40);
        }
    }).draggable({cursor: "move", handle: "ul"});

    $("#editor-link").on("click", function(){
        if (RUR.programming_language == "python"){
            $("#highlight").show();
        }
    });
    $("#library-link").on("click", function(){
        $("#highlight").hide();
    });

    var FILENAME = "filename";

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

    $("#load-editor").on("click", function(evt) {
        load_file(editor);
    });

    $("#load-library").on("click", function(evt) {
        load_file(library);
    });

    $("#save-editor").on("click", function(evt) {
        var blob = new Blob([editor.getValue()], {type: "text/javascript;charset=utf-8"});
        saveAs(blob, FILENAME);
    });

    $("#save-library").on("click", function(evt) {
        var blob = new Blob([library.getValue()], {type: "text/javascript;charset=utf-8"});
        saveAs(blob, FILENAME);
    });


    $("#save-world").on("click", function(evt) {
        var blob = new Blob([RUR.world.export_world()], {type: "text/javascript;charset=utf-8"});
        saveAs(blob, FILENAME);
    });


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
        var existing_names, i, key, response;
        existing_names = ' [';

        for (i = 0; i <= localStorage.length - 1; i++) {
            key = localStorage.key(i);
            if (key.slice(0, 11) === "user_world:") {
                existing_names += key.substring(11) + ", ";
            }
        }
        existing_names += "]";
        response = prompt(RUR.translate("Enter world name to save") + existing_names);
        if (response !== null) {
            RUR.storage._save_world(response.trim());
            $('#delete-world').show();
        }
    });

    $("#delete-world").on("click", function(evt) {
        var existing_names, i, key, response;
        existing_names = ' [';

        for (i = 0; i <= localStorage.length - 1; i++) {
            key = localStorage.key(i);
            if (key.slice(0, 11) === "user_world:") {
                existing_names += key.substring(11) + ", ";
            }
        }
        existing_names += "]";
        response = prompt(RUR.translate("Enter world name to delete") + existing_names);
        if (response !== null) {
            RUR.storage.delete_world(response.trim());
        }
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

    $("#help").dialog({autoOpen:false, width:800,  height:600, maximize: false, position:"top",
        beforeClose: function( event, ui ) {$("#help-button").addClass("blue-gradient").removeClass("reverse-blue-gradient");}});

    $("#help-button").on("click", function() {
        if ($("#help-button").hasClass("reverse-blue-gradient")) {
            $("#help").dialog("open");
        } else {
            $("#help").dialog("close");
        }
        return;
    });

    $("#edit-world").on("click", function(evt) {
        if ($("#edit-world").hasClass("blue-gradient")) {
            $("#edit-world-panel").dialog("open");
            $("#edit-world").addClass("reverse-blue-gradient").removeClass("blue-gradient");
            toggle_editing_mode();
        } else {
            $("#edit-world-panel").dialog("close");
            $("#edit-world-panel").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:800,  height:700, position:"top"});
        }
    });
    $("#edit-world-panel").dialog({minimize: false, maximize: false, autoOpen:false, width:800,  height:700, position:"top",
        beforeClose: function( event, ui ) {$("#edit-world").addClass("blue-gradient").removeClass("reverse-blue-gradient");
                                              toggle_editing_mode();}});

    $("#about-div").dialog({autoOpen:false, width:800,  height:600, maximize: false, position:"top",
        beforeClose: function( event, ui ) {$("#about-button").addClass("blue-gradient").removeClass("reverse-blue-gradient");}});


    $("#world-edit-buttons").dialog({autoOpen:false, width:550,  height:180, maximize: false, position:"center",
        beforeClose: function( event, ui ) {$("#world-select").addClass("blue-gradient").removeClass("reverse-blue-gradient");}});

    $("#world-select").on("click", function() {
        if ($("#world-select").hasClass("reverse-blue-gradient")) {
            $("#world-edit-buttons").dialog("open");
        } else {
            $("#world-edit-buttons").dialog("close");
        }
        return;
    });



    $("#about-button").on("click", function() {
        if ($("#about-button").hasClass("reverse-blue-gradient")) {
            $("#about-div").dialog("open");
        } else {
            $("#about-div").dialog("close");
        }
        return;
    });

    $("#more-menus").dialog({autoOpen:false, width:800,  height:600, maximize: false, position:"top",
        beforeClose: function( event, ui ) {$("#more-menus-button").addClass("blue-gradient").removeClass("reverse-blue-gradient");}});

    $("#more-menus-button").on("click", function() {
        if ($("#more-menus-button").hasClass("reverse-blue-gradient")) {
            $("#more-menus").dialog("open");
        } else {
            $("#more-menus").dialog("close");
        }
        return;
    });


    $("#Reeborg-concludes").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "concludes", position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-shouts").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert", position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-writes").dialog({minimize: false, maximize: false, autoOpen:false, width:600, height:250,
                                 position:{my: "bottom", at: "bottom-20", of: window}});

    $("#World-info").dialog({autoOpen:false, width:600,  height:300, maximize: false, position:"top",
        beforeClose: function( event, ui ) {$("#world-info-button").addClass("blue-gradient").removeClass("reverse-blue-gradient");}});

    $("#world-info-button").on("click", function() {
        if ($("#world-info-button").hasClass("reverse-blue-gradient")) {
            $("#World-info").dialog("open");
        } else {
            $("#World-info").dialog("close");
        }
        return;
    });


    editor.widgets = [];
    library.widgets = [];

    $("#select_world").change(function() {
        var data, val = $(this).val();
        RUR.settings.world_name = $(this).find(':selected').text();
        try {
            localStorage.setItem(RUR.settings.world, $(this).find(':selected').text());
        } catch (e) {}

        if (val.substring(0,11) === "user_world:"){
            data = localStorage.getItem(val);
            RUR.world.import_world(data);
            RUR.we.show_pre_post_code();
        } else {
            $.get(val, function(data) {
                RUR.world.import_world(data);
                RUR.we.show_pre_post_code();
                // jquery is sometimes too intelligent; it can guess
                // if the imported object is a string ... or a json object
                // I need a string here;  so make sure to prevent it from identifying.
            }, "text");
        }
    });


    try {
        RUR.reset_code_in_editors();
    } catch (e){ console.log(e);alert("Your browser does not support localStorage; you will not be able to save your functions in the library.");
                }

    RUR.ui.set_ready_to_run();

});



$(document).ready(function() {
    var prog_lang, url_query, name;
    var human_language = document.documentElement.lang;
    RUR._highlight = true;
    $('input[type=radio][name=programming_language]').on('change', function(){
        RUR.reset_programming_language($(this).val());
        if ($(this).val() == "python-"+human_language){
            $("#highlight").show();
        } else {
            $("#highlight").hide();
        }
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
        name = "PERMALINK";
        localStorage.setItem("user_world:"+ name, RUR.world.export_world());
        $('#select_world').append( $('<option style="background-color:#ff9" selected="true"></option>'
                                  ).val("user_world:" + name).html(name));
        $('#select_world').val("user_world:" + name);  // reload as updating select choices blanks the world.
        $("#select_world").change();
        $('#delete-world').show(); // so that user can remove PERMALINK from select if desired

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
    // for embedding
    addEventListener("message", receiveMessage, false);
    function receiveMessage(event){
        RUR.update_permalink(event.data);
    }
});

