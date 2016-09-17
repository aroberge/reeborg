require("./../state.js");
require("./../playback/play.js");
var record_id = require("./../../lang/msg.js").record_id;

var pause_button = document.getElementById("pause");
record_id("pause");

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
        $("#frame-selector").removeAttr("disabled").addClass("enabled").removeClass("disabled");
    }
};

pause = function () {
    RUR.state.playback = false;
    clearTimeout(RUR._TIMER);
    $("#pause").attr("disabled", "true");
    $("#run").removeAttr("disabled");
    $("#step").removeAttr("disabled");
    $("#reverse-step").removeAttr("disabled");
    $("#frame-selector").removeAttr("disabled").addClass("enabled").removeClass("disabled");
};

pause_button.addEventListener("click", pause, false);
