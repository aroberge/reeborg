/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, editor, library, editorUpdateHints, libraryUpdateHints, JSHINT, think, _import_library */


var RUR = RUR || {};

RUR.Controls = function (programming_language) {
    "use strict";
    RUR.programming_language = programming_language;
    var src;
    this.end_flag = true;
    this.compile_and_run = function (func) {
        var lib_src, src, fatal_error_found = false;
        if (!RUR.visible_world.compiled) {
            src = _import_library();
        }
        if (!RUR.visible_world.compiled) {
            try {
                if (RUR.programming_language === "javascript") {
                    if (src.slice(1, 10) === "no strict") {
                        RUR.compile_no_strict_js(src);
                    } else {
                        RUR.compile_javascript(src);
                    }
                    RUR.visible_world.compiled = true;
                } else if (RUR.programming_language === "python") {
                    RUR.compile_python(src);
                    RUR.visible_world.compiled = true;
                } else {
                    alert("Unrecognized programming language.");
                    fatal_error_found = true;
                }
            } catch (e) {
                if (e.name === RUR.translation.ReeborgError){
                    RUR.world.add_frame("error", e);
                } else {
                    $("#Reeborg-shouts").html("<h3>" + e.name + "</h3><h4>" + e.message + "</h4>").dialog("open");
                    fatal_error_found = true;
                    this.stop();
                }
            }
        }
        if (!fatal_error_found) {
            try {
                localStorage.setItem(RUR.settings.editor, editor.getValue());
                localStorage.setItem(RUR.settings.library, library.getValue());
            } catch (e) {}
            func();
        }
    };

    this.set_ready_to_run = function () {
        $("#stop").attr("disabled", "true");
        $("#pause").attr("disabled", "true");
        $("#run").removeAttr("disabled");
        $("#step").removeAttr("disabled");
        $("#reload").attr("disabled", "true");
  
        $("#stop2").attr("disabled", "true");
        $("#pause2").attr("disabled", "true");
        $("#run2").removeAttr("disabled");
        $("#step2").removeAttr("disabled");
        $("#reload2").attr("disabled", "true");
    };

    this.run = function () {
        $("#stop").removeAttr("disabled");
        $("#pause").removeAttr("disabled");
        $("#run").attr("disabled", "true");
        $("#step").attr("disabled", "true");
        $("#reload").attr("disabled", "true");
      
        $("#stop2").removeAttr("disabled");
        $("#pause2").removeAttr("disabled");
        $("#run2").attr("disabled", "true");
        $("#step").attr("disabled", "true");
        $("#reload2").attr("disabled", "true");
        clearTimeout(RUR.timer);
        if (RUR.world.robot_world_active) {
            RUR.controls.compile_and_run(RUR.visible_world.play_frames);
        } else {
            RUR.controls.end_flag = false;
            RUR.controls.compile_and_run(function () {});
            RUR.controls.stop();
        }
    };

    this.pause = function (ms) {
        RUR.visible_world.running = false;
        clearTimeout(RUR.timer);
        $("#pause").attr("disabled", "true");
        $("#pause2").attr("disabled", "true");
        if (ms !== undefined){
            RUR.timer = setTimeout(RUR.controls.run, ms);
        } else {
            $("#run").removeAttr("disabled");
            $("#step").removeAttr("disabled");
            $("#run2").removeAttr("disabled");
            $("#step2").removeAttr("disabled");
        }
    };

    this.step = function () {
        RUR.controls.compile_and_run(RUR.visible_world.play_single_frame);
    };

    this.stop = function () {
        clearTimeout(RUR.timer);
        $("#stop").attr("disabled", "true");
        $("#pause").attr("disabled", "true");
        $("#run").attr("disabled", "true");
        $("#step").attr("disabled", "true");
        $("#reload").removeAttr("disabled");
      
        $("#stop2").attr("disabled", "true");
        $("#pause2").attr("disabled", "true");
        $("#run2").attr("disabled", "true");
        $("#step2").attr("disabled", "true");
        $("#reload2").removeAttr("disabled");
    };

    this.reload = function() {
        RUR.visible_world.reset();
        if (RUR.editing_world){
            return;
        }
        this.set_ready_to_run();
        $("#output-pre").html("");
        $("#output-panel pre").remove(".jscode");
        RUR.world.reset();
        clearTimeout(RUR.timer);
        RUR.visible_world.compiled = false;
        RUR.visible_world.running = false;
        if (RUR.strict_javascript){
            editorUpdateHints();
            libraryUpdateHints();
        }
        
    };
};


function update_controls() {
    if ($("#world-panel").hasClass("active")){
        RUR.world.robot_world_active = true;
        $("#run2").css("visibility", "hidden");
        $("#reload2").css("visibility", "hidden");
    } else {
        $("#run2").css("visibility", "visible");
        $("#reload2").css("visibility", "visible");
        RUR.world.robot_world_active = false;
        RUR.world.reset();
    }
}

RUR.ajax_requests = {};

RUR.select_world = function (s, silent) {
    var elt = document.getElementById("select_world");

    for (var i=0; i < elt.options.length; i++){
        if (elt.options[i].text === s) {
            if (elt.options[i].selected) {
                return;
            }
            /* A new world can be selected via a user program using the
              select_world() function. When this is done, and if the
              world is changed by this selection, an alert is first
              shown and the program is otherwise not run. Executing the
              program a second time will work as the correct world will
              be displayed.
            */
            elt.value = elt.options[i].value;
            $("#select_world").change();
            if (silent) {
                return;
            }
            alert(RUR.translation["World selected"].supplant({world: s}));
            return;
        }
    }
    if (silent) {
        return;
    }
    alert(RUR.translation["Could not find world"].supplant({world: s}));
};

RUR.load_user_worlds = function () {
    var key, name, i, user_world_present;
    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            name = key.slice(11);
            $('#select_world').append( $('<option style="background-color:#ff9"></option>'
                              ).val("user_world:" + name).html(name));
            user_world_present = true;
        }
    }
    if (user_world_present){
        $('#delete-world').show();
    }
};


RUR.Controls.buttons = {execute_button: '<img src="src/images/play.png" class="blue-gradient" alt="run"/>',
    reload_button: '<img src="src/images/reload.png" class="blue-gradient" alt="reload"/>',
    step_button: '<img src="src/images/step.png" class="blue-gradient" alt="step"/>',
    pause_button: '<img src="src/images/pause.png" class="blue-gradient" alt="pause"/>',
    stop_button: '<img src="src/images/stop.png" class="blue-gradient" alt="stop"/>'};

function toggle_contents_button () {
    if ($("#contents-button").hasClass("reverse-blue-gradient")) {
        RUR.tutorial_window = window.open("index_en.html", '_blank', 'location=no,height=600,width=800,scrollbars=yes,status=yes');
    } else {
        try {
            RUR.tutorial_window.close();
        }
        catch (e) {}
    }
    return false;
}

function toggle_contents_button_from_child () {
    // called when child window is closed by user
    $("#contents-button").toggleClass("blue-gradient");
    $("#contents-button").toggleClass("reverse-blue-gradient");
}

