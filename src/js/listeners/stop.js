
require("./../state.js");
var record_id = require("./../../lang/msg.js").record_id;

var stop_button = document.getElementById("stop");
record_id("stop");

RUR.stop = function () {
    clearTimeout(RUR._TIMER);
    $("#stop").attr("disabled", "true");
    $("#pause").attr("disabled", "true");
    $("#run").removeAttr("disabled");
    $("#step").attr("disabled", "true");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").removeAttr("disabled");
    RUR.state.stop_called = true;
};
stop_button.addEventListener("click", RUR.stop, false);
