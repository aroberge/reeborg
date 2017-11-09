
require("./../rur.js");

exports.set_ui_ready_to_run = set_ui_ready_to_run = function () {
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

};

set_ui_ready_to_run();
