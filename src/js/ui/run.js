
require("./../rur.js");
require("./reload.js");
require("./../runner/runner.js");
require("./../playback/play.js");
var record_id = require("./../../lang/msg.js").record_id;

record_id("run");

RUR.listeners.run = function () {
    RUR.state.run_button_clicked = true;
    if (RUR.state.stop_called){
        RUR.state.stop_called = false;
        RUR.reload();
    }
    $("#stop").removeAttr("disabled");
    $("#pause").removeAttr("disabled");
    $("#run").attr("disabled", "true");
    $("#step").attr("disabled", "true");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").attr("disabled", "true");
    
    $("#frame-selector").attr("disabled", "true").addClass("disabled").removeClass("enabled");
    $("#frame-selector").show();
    $("#frame-id").show();

    $("#highlight").attr("disabled", "true");
    $("#watch-variables-btn").attr("disabled", "true");

    $("#open-solution-btn").attr("disabled", "true");
    $("#save-solution-btn").attr("disabled", "true");

    clearTimeout(RUR._TIMER);
    RUR.runner.run(RUR.play);
    RUR.state.run_button_clicked = false;
};
