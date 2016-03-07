
require("./../state.js");
var set_ready_to_run = require("./../ui/set_ready_to_run.js").set_ready_to_run;
var rec_reset = require("./../recorder/reset.js").reset;
var reset_world = require("./../world_set/reset_world.js").reset_world;
var record_id = require("./../../lang/msg.js").record_id;

var reload_button = document.getElementById("reload");
record_id("reload");
var reload2_button = document.getElementById("reload2");
record_id("reload2");

RUR.reload = function() {
    set_ready_to_run();
    RUR.reload2();
    $("#highlight-impossible").hide();
    RUR.state.code_evaluated = false;
    RUR.state.sound_on = false;
};

RUR.reload2 = function() {
    $("#stdout").html("");
    $(".view_source").remove();
    $("#print-html").html("");
    $("#Reeborg-concludes").dialog("close");
    $("#Reeborg-shouts").dialog("close");
    $("#watch-variables").html("");
    // reset the options in case the user has dragged the dialogs as it would
    // then open at the top left of the window
    $("#Reeborg-concludes").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "concludes", position:{my: "center", at: "center", of: $("#robot-canvas")}});
    $("#Reeborg-shouts").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert", position:{my: "center", at: "center", of: $("#robot-canvas")}});
    reset_world();
    rec_reset();
    if (RUR.state.input_method == "py-repl") {
        try {
            restart_repl();
        } catch (e) {
            console.log("RUR.reload2: can not re/start repl", e);
        }
    }
};

reload_button.addEventListener("click", RUR.reload, false);
reload2_button.addEventListener("click", RUR.reload2, false);
