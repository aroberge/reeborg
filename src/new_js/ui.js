/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library, editorUpdateHints, libraryUpdateHints, JSHINT, think, _import_library */

RUR.ui = {};

RUR.ui.set_ready_to_run = function () {
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

RUR.ui.run = function () {
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
    clearTimeout(RUR.rec.timer);
    if (RUR.world.robot_world_active) {
        RUR.runner.run(RUR.rec.play);
    } else {
//        RUR.controls.end_flag = false;
        RUR.runner.run(function () {});
        RUR.ui.stop();
    }
};

RUR.ui.pause = function (ms) {
    RUR.rec.playback = false;
    clearTimeout(RUR.rec.timer);
    $("#pause").attr("disabled", "true");
    $("#pause2").attr("disabled", "true");
    if (ms !== undefined){      // pause called via a program instruction
        RUR.rec.timer = setTimeout(RUR.ui.run, ms);  // will reset RUR.rec.playback to true
    } else {
        $("#run").removeAttr("disabled");
        $("#step").removeAttr("disabled");
        $("#run2").removeAttr("disabled");
        $("#step2").removeAttr("disabled");
    }
};

RUR.ui.step = function () {
    RUR.runner.run(RUR.rec.display_frame);
};

RUR.ui.stop = function () {
    clearTimeout(RUR.rec.timer);
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

RUR.ui.reload = function() {
    RUR.world.reset();
    RUR.ui.set_ready_to_run();
    $("#output-pre").html("");
    $("#output-panel pre").remove(".jscode");
    $("#Reeborg-says").dialog("close");
    $("#Reeborg-shouts").dialog("close");
    // reset the options in case the user has dragged the window.
    $("#Reeborg-says").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-shouts").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert", position:{my: "center", at: "center", of: $("#robot_canvas")}});
    RUR.world.reset();
    RUR.runner.interpreted = false;
    RUR.control.sound_flag = false;
    RUR.rec.reset();
    if (RUR.strict_javascript) {
        editorUpdateHints();
        libraryUpdateHints();
    }
    
};

RUR.ui.select_world = function (s, silent) {
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
            throw new RUR.ReeborgError(RUR.translation["World selected"].supplant({world: s}));
        }
    }
    if (silent) {
        return;
    }
    throw new RUR.ReeborgError(RUR.translation["Could not find world"].supplant({world: s}));
};

RUR.ui.load_user_worlds = function () {
    var key, name, i, user_world_present;
    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            name = key.slice(11);
            if (name !== "PERMALINK") { 
                $('#select_world').append( $('<option style="background-color:#ff9"></option>'
                              ).val("user_world:" + name).html(name));
                user_world_present = true;
            }
        }
    }
    if (user_world_present){
        $('#delete-world').show();
    }
};


RUR.ui.resize = function () {
    RUR.LARGE_WORLD = !RUR.LARGE_WORLD;
    RUR.current_world.large_world = RUR.LARGE_WORLD;
    RUR.vis_world.draw_all();
};

RUR.ui.buttons = {execute_button: '<img src="src/images/play.png" class="blue-gradient" alt="run"/>',
    reload_button: '<img src="src/images/reload.png" class="blue-gradient" alt="reload"/>',
    step_button: '<img src="src/images/step.png" class="blue-gradient" alt="step"/>',
    pause_button: '<img src="src/images/pause.png" class="blue-gradient" alt="pause"/>',
    stop_button: '<img src="src/images/stop.png" class="blue-gradient" alt="stop"/>'};
