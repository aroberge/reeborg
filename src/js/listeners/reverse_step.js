require("./../rur.js");
require("./../recorder.js");

var record_id = require("./../../lang/msg.js").record_id;
record_id("reverse-step");
record_id("reverse-step-text", "REVERSE STEP EXPLAIN");
$("#reverse-step").on("click", function (evt) {
    reverse_step();
});

reverse_step = function () {
    RUR.current_frame_no -= 2;  // see below call to RUR.rec.display_frame
    if (RUR.current_frame_no < 0){
        $("#reverse-step").attr("disabled", "true");
    }
    $("#frame-selector").removeAttr("disabled").addClass("enabled").removeClass("disabled");
    RUR.rec.display_frame(); // increments the current_frame_no by 1
    RUR.state.stop_called = false;
    $("#stop").removeAttr("disabled");
    clearTimeout(RUR._TIMER);
};
