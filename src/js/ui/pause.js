require("./../rur.js");
require("./../playback/play.js");
var record_id = require("./../../lang/msg.js").record_id;

record_id("pause");

RUR.pause = function (ms) {
    // ms can be a mouse event, if called from clicking on the pause button,
    // undefined, if called from a program without an argument,
    // or a number, if wanting to only temporarily pause from within a program.
    RUR.state.playback = false;
    clearTimeout(RUR._TIMER);
    $("#pause").attr("disabled", "true");
    if (ms !== undefined && typeof ms == "number"){ // pause called via a program instruction
        RUR._TIMER = setTimeout(RUR.play, ms);  // will reset RUR.state.playback to true
    } else {
        $("#run").removeAttr("disabled");
        $("#step").removeAttr("disabled");
        $("#reverse-step").removeAttr("disabled");
        $("#frame-selector").removeAttr("disabled").addClass("enabled").removeClass("disabled");
    }
};
