
require("./../rur.js");
require("./../runner/runner.js");
require("./../recorder/recorder.js");
var record_id = require("./../../lang/msg.js").record_id;

record_id("step");
record_id("reverse-step");


RUR.listeners.step = function () {
    if (RUR.state.code_evaluated) {
        step();
    } else {
        $("#thought").show();
        setTimeout(step, 15); //  enough time for thought bubble to appear
    }
};

function step() {
    RUR.runner.run(RUR.rec.display_frame);
    $("#thought").hide();

    $("#stop").removeAttr("disabled");
    $("#reverse-step").removeAttr("disabled");
    $("#frame-selector").removeAttr("disabled").addClass("enabled").removeClass("disabled");
    $("#frame-selector").show();
    $("#frame-id").show();
    clearTimeout(RUR._TIMER);

    $("#highlight").attr("disabled", "true");
    $("#watch-variables-btn").attr("disabled", "true");

    $("#open-solution-btn").attr("disabled", "true");
    $("#save-solution-btn").attr("disabled", "true");
}

RUR.listeners.reverse_step = function () {
    RUR.current_frame_no -= 2;  // see below call to RUR.rec.display_frame
    if (RUR.current_frame_no < 0){
        $("#reverse-step").attr("disabled", "true");
    }
    $("#frame-selector").removeAttr("disabled").addClass("enabled").removeClass("disabled");
    RUR.rec.display_frame(); // increments the current_frame_no by 1
    $("#stop").removeAttr("disabled");
    clearTimeout(RUR._TIMER);
};

