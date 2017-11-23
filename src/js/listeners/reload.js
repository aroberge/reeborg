
require("./../rur.js");
var set_ui_ready_to_run = require("./../ui/set_ready_to_run.js").set_ui_ready_to_run;
require("./../recorder/reset.js");
var record_id = require("./../../lang/msg.js").record_id;

var reload_button = document.getElementById("reload");
record_id("reload");
var reload2_button = document.getElementById("reload2");
record_id("reload2");

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

reload_button.addEventListener("click", RUR.reload, false);
reload2_button.addEventListener("click", RUR.reload2, false);
