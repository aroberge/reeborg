/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.ui = {};

RUR.ui.stop_called = false;
RUR.ui.prevent_playback = false;

RUR.ui.show_only_reload2 = function (bool) {
    if (bool) {
        $("#stop").hide();
        $("#pause").hide();
        $("#run").hide();
        $("#step").hide();
        $("#reverse-step").hide();
        $("#reload").hide();
        $("#reload2").show();
        $("#reload2").removeAttr("disabled");
    } else {
        $("#stop").show();
        $("#pause").show();
        $("#run").show();
        $("#step").show();
        $("#reverse-step").show();
        $("#reload").show();
        $("#reload2").hide();
    }
};


RUR.ui.set_ready_to_run = function () {
    RUR.ui.prevent_playback = false;
    $("#stop").attr("disabled", "true");
    $("#pause").attr("disabled", "true");
    $("#run").removeAttr("disabled");
    $("#step").removeAttr("disabled");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").attr("disabled", "true");
};

RUR.ui.run = function () {
    if (RUR.ui.stop_called){
        RUR.ui.stop_called = false;
        RUR.ui.reload();
    }
    $("#stop").removeAttr("disabled");
    $("#pause").removeAttr("disabled");
    $("#run").attr("disabled", "true");
    $("#step").attr("disabled", "true");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").attr("disabled", "true");

    clearTimeout(RUR.rec.timer);
    RUR.runner.run(RUR.rec.play);
};

RUR.ui.pause = function (ms) {
    RUR.rec.playback = false;
    clearTimeout(RUR.rec.timer);
    $("#pause").attr("disabled", "true");
    if (ms !== undefined){      // pause called via a program instruction
        RUR.rec.timer = setTimeout(RUR.ui.run, ms);  // will reset RUR.rec.playback to true
    } else {
        $("#run").removeAttr("disabled");
        $("#step").removeAttr("disabled");
        $("#reverse-step").removeAttr("disabled");
    }
};

RUR.ui.step = function () {
    RUR.runner.run(RUR.rec.display_frame);
    RUR.ui.stop_called = false;
    $("#stop").removeAttr("disabled");
    $("#reverse-step").removeAttr("disabled");
    clearTimeout(RUR.rec.timer);
};


RUR.ui.reverse_step = function () {
    RUR.rec.current_frame -= 2;
    if (RUR.rec.current_frame < 0){
        $("#reverse-step").attr("disabled", "true");
    }
    RUR.runner.run(RUR.rec.display_frame);
    RUR.ui.stop_called = false;
    $("#stop").removeAttr("disabled");
    clearTimeout(RUR.rec.timer);
};


RUR.ui.stop = function () {
    clearTimeout(RUR.rec.timer);
    $("#stop").attr("disabled", "true");
    $("#pause").attr("disabled", "true");
    $("#run").removeAttr("disabled");
    $("#step").attr("disabled", "true");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").removeAttr("disabled");
    RUR.ui.stop_called = true;
};

RUR.ui.reload = function() {
    RUR.ui.set_ready_to_run();
    RUR.ui.reload2();
    $("#highlight-impossible").hide();
    RUR.runner.interpreted = false;
    RUR.control.sound_flag = false;
};

RUR.ui.reload2 = function() {
    $("#stdout").html("");
    $(".view_source").remove();
    $("#print_html").html("");
    $("#Reeborg-concludes").dialog("close");
    $("#Reeborg-shouts").dialog("close");
    // reset the options in case the user has dragged the dialogs as it would
    // then open at the top left of the window
    $("#Reeborg-concludes").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "concludes", position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-shouts").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert", position:{my: "center", at: "center", of: $("#robot_canvas")}});
    RUR.world.reset();
    RUR.rec.reset();
    restart_repl();
};

RUR.ui.select_world = function (s, silent) {
    var elt = document.getElementById("select_world");
    for (var i=0; i < elt.options.length; i++){
        if (elt.options[i].text === s) {
            if (elt.options[i].selected) {
                return;
            }
            elt.value = elt.options[i].value;
            $("#select_world").change();
            if (silent) {
                return;
            }
            throw new RUR.ReeborgError(RUR.translate("World selected").supplant({world: s}));
        }
    }
    if (silent) {
        return;
    }
    throw new RUR.ReeborgError(RUR.translate("Could not find world").supplant({world: s}));
};


RUR.ui.load_user_worlds = function (initial) {
    var key, name, i;
    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            name = key.slice(11);
            RUR.storage.append_world_name(name, initial);
            $('#delete-world').show();
        }
    }
};

RUR.ui.highlight = function () {
    if (RUR._highlight) {
        RUR._highlight = false;
        $("#not-ok-image").show();
        $("#ok-image").hide();
    } else {
        RUR._highlight = true;
        $("#not-ok-image").hide();
        $("#ok-image").show();
    }
};

RUR.ui.watch = function () {
    if (RUR._watch) {
        RUR._watch = false;
        $("#watch_no").show();
        $("#watch_yes").hide();
        $("#watch_var_input").hide();
    } else {
        RUR._watch = true;
        $("#watch_no").hide();
        $("#watch_yes").show();
        $("#watch_var_input").show();
    }
};


RUR.ui.user_no_highlight = function () {
    // meant to be used in a Python program (under a different name)
    // to ensure highlighting is turned off.
    if (RUR._highlight) {
        RUR._highlight = false;
        $("#not-ok-image").show();
        $("#ok-image").hide();
    }
};


RUR.ui.buttons = {execute_button: '<img src="src/images/play.png" class="blue-gradient" alt="run"/>',
    reload_button: '<img src="src/images/reload.png" class="blue-gradient" alt="reload"/>',
    step_button: '<img src="src/images/step.png" class="blue-gradient" alt="step"/>',
    pause_button: '<img src="src/images/pause.png" class="blue-gradient" alt="pause"/>',
    stop_button: '<img src="src/images/stop.png" class="blue-gradient" alt="stop"/>'};


RUR.ui.toggle_panel = function (button, element) {
    button.toggleClass("blue-gradient");
    button.toggleClass("reverse-blue-gradient");
    element.toggleClass("active");
};
