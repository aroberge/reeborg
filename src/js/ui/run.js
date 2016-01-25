require("./../state.js");
require("./reload.js");
require("./../runner.js");
require("./../playback/play.js");

RUR.run = function () {
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

    clearTimeout(RUR._TIMER);
    RUR.runner.run(RUR.play);
};

RUR.step = function () {
    RUR.runner.run(RUR.rec.display_frame);
    RUR.state.stop_called = false;
    $("#stop").removeAttr("disabled");
    $("#reverse-step").removeAttr("disabled");
    clearTimeout(RUR._TIMER);
};
