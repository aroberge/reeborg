/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.ui = {};

RUR.ui.stop_called = false;

RUR.ui.set_ready_to_run = function () {
    $("#stop").attr("disabled", "true");
    $("#pause").attr("disabled", "true");
    $("#run").removeAttr("disabled");
    $("#step").removeAttr("disabled");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").attr("disabled", "true");

    $("#stop2").attr("disabled", "true");
    $("#pause2").attr("disabled", "true");
    $("#run2").removeAttr("disabled");
    $("#step2").removeAttr("disabled");
    $("#reload2").attr("disabled", "true");
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

    $("#stop2").removeAttr("disabled");
    $("#pause2").removeAttr("disabled");
    $("#run2").attr("disabled", "true");
    $("#step").attr("disabled", "true");
    $("#reload2").attr("disabled", "true");
    clearTimeout(RUR.rec.timer);
    RUR.runner.run(RUR.rec.play);
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
        $("#reverse-step").removeAttr("disabled");
        $("#run2").removeAttr("disabled");
        $("#step2").removeAttr("disabled");
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

    $("#stop2").attr("disabled", "true");
    $("#pause2").attr("disabled", "true");
    $("#run2").removeAttr("disabled");
    $("#step2").attr("disabled", "true");
    $("#reload2").removeAttr("disabled");
    RUR.ui.stop_called = true;
};

RUR.ui.reload = function() {
    RUR.ui.set_ready_to_run();
    $("#output-pre").html("");
    $("#output-panel pre").remove(".jscode");
    $("#Reeborg-concludes").dialog("close");
    $("#Reeborg-shouts").dialog("close");
    $("#Reeborg-says").dialog("close");
    // reset the options in case the user has dragged the window.
    $("#Reeborg-concludes").dialog("option", {minimize: false, maximize: false,
                                              autoOpen:false, width:500,
                                              position:{my: "top", at: "top", of: $("#editor-panel")}});
    $("#Reeborg-shouts").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert", position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-says").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "say", position:{my: "top", at: "top", of: $("#robot_canvas")}});
    RUR.world.reset();
    RUR.runner.interpreted = false;
    RUR.control.sound_flag = false;
    RUR.rec.reset();
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
            throw new RUR.ReeborgError(RUR.translate("World selected").supplant({world: s}));
        }
    }
    if (silent) {
        return;
    }
    throw new RUR.ReeborgError(RUR.translate("Could not find world").supplant({world: s}));
};

RUR.ui.load_file = function (filename, name, replace, elt, i) {
    $.ajax({url: "src/json/" + filename + ".json",
        async: false,
        error: function(e){
            RUR.ui.load_file_error = true;
        },
        success: function(data){
            RUR.world.import_world(data);
            if (replace) {
                elt.options[i].value = "src/json/" + filename + ".json";
                elt.value = elt.options[i].value;
            } else {
                $('#select_world').append( $('<option style="background-color:#ff9" selected="true"></option>'
                                      ).val("src/json/" + filename + ".json").html(name));
                $('#select_world').val("src/json/" + filename + ".json");
            }
            $("#select_world").change();
        }
    }, "text");
};

RUR.ui.select_challenge = function (filename) {
    // this is for worlds that are defined in a file not available from the
    // drop-down menu.
    var name = "Challenge", elt = document.getElementById("select_world");
    RUR.ui.load_file_error = false;
    for (var i=0; i < elt.options.length; i++){
        if (elt.options[i].text === name) {
            if (elt.options[i].selected) {
                if (elt.options[i].value === "src/json/" + filename + ".json") {
                    return;   // already selected, can run program
                } else {
                    RUR.ui.load_file(filename, name, true, elt, i);
                    if (RUR.ui.load_file_error) {
                        throw new RUR.ReeborgError(RUR.translate("Could not find world").supplant({world: filename}));
                    }
                    throw new RUR.ReeborgError(RUR.translate("World selected").supplant({world: filename}));
                }
            }
        }
    }
    RUR.ui.load_file(filename, name, false);
    if (RUR.ui.load_file_error) {
        throw new RUR.ReeborgError(RUR.translate("Could not find world").supplant({world: filename}));
    }
    throw new RUR.ReeborgError(RUR.translate("World selected").supplant({world: filename}));
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

RUR.ui.buttons = {execute_button: '<img src="src/images/play.png" class="blue-gradient" alt="run"/>',
    reload_button: '<img src="src/images/reload.png" class="blue-gradient" alt="reload"/>',
    step_button: '<img src="src/images/step.png" class="blue-gradient" alt="step"/>',
    pause_button: '<img src="src/images/pause.png" class="blue-gradient" alt="pause"/>',
    stop_button: '<img src="src/images/stop.png" class="blue-gradient" alt="stop"/>'};

RUR.ui.add_help = function(usage, _id, lang, warning){

    if (RUR.ui._added_lang === undefined) {
        RUR.ui._added_lang = [lang];
    } else if (RUR.ui._added_lang.indexOf(lang)== -1) {
        RUR.ui._added_lang.push(lang);
    } else {
        return;
    }
    if (document.documentElement.lang != _id){
        $("#help").prepend('<span style="color:darkred">' + warning + RUR.translate("Object names") + "</span><br>");
    }
    $("#toc").after(usage);
    $("#toc").prepend('<li><a href="#basic-commands-' + _id + '">' + lang + "</a></li>");
};