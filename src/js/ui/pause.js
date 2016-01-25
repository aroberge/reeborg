require("./../state.js");
require("jquery");
require("./../playback/play.js");

RUR.pause = function (ms) {
    RUR.state.playback = false;
    clearTimeout(RUR._TIMER);
    $("#pause").attr("disabled", "true");
    if (ms !== undefined){      // pause called via a program instruction
        RUR._TIMER = setTimeout(RUR.play, ms);  // will reset RUR.state.playback to true
    } else {
        $("#run").removeAttr("disabled");
        $("#step").removeAttr("disabled");
        $("#reverse-step").removeAttr("disabled");
    }
};
