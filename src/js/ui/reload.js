require("./../rur.js");
require("./../recorder/reset.js");
var record_id = require("./../../lang/msg.js").record_id;

record_id("reload");
record_id("reload2");


function set_ui_ready_to_run () {
    RUR.state.prevent_playback = false;
    $("#stop").attr("disabled", "true");
    $("#pause").attr("disabled", "true");
    $("#run").removeAttr("disabled");
    $("#step").removeAttr("disabled");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").attr("disabled", "true");

    $("#highlight").removeAttr("disabled");
    $("#watch-variables-btn").removeAttr("disabled");

    $("#open-solution-btn").removeAttr("disabled");
    $("#save-solution-btn").removeAttr("disabled");

    $("#frame-selector").hide();
    $("#frame-id").hide();
}


$(document).ready(function () {
    set_ui_ready_to_run();
});


RUR.reload = function() {
    set_ui_ready_to_run();
    RUR.reload2();
    $("#highlight-impossible").hide();
};

RUR.reload2 = function() {
    $("#stdout").html("");
    $(".view_source").remove();
    $("#print-html").html("");
    $("#turtle-canvas").remove();
    RUR.hide_end_dialogs();
    $("#watch-variables").html("");
    RUR.reset_world();
    if (RUR.state.input_method == "py-repl") {
        try {
            restart_repl();
        } catch (e) {
            console.log("RUR.reload2: can not re/start repl", e);
        }
    }
};
