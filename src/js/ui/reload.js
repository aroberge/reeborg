require("jquery");
require("./../utils/key_exist.js");
require("./../state.js");
var set_ready_to_run = require("./set_ready_to_run.js").set_ready_to_run;
var rec_reset = require("./../recorder/reset.js").reset;
var reset_world = require("./../world_set/reset.js").reset_world;

RUR._ensure_key_exists(RUR, "ui");

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
    $("#print_html").html("");
    $("#Reeborg-concludes").dialog("close");
    $("#Reeborg-shouts").dialog("close");
    $("#watch_variables").html("");
    // reset the options in case the user has dragged the dialogs as it would
    // then open at the top left of the window
    $("#Reeborg-concludes").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "concludes", position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-shouts").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert", position:{my: "center", at: "center", of: $("#robot_canvas")}});
    reset_world();
    rec_reset();
    try {
        restart_repl();
    } catch (e) {
        console.log("can not restart repl", e);
    }
};
