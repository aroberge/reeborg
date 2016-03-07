require("./../state.js");
require("./../recorder.js");

var record_id = require("./../../lang/msg.js").record_id;
record_id("reverse-step");
record_id("reverse-step-text", "REVERSE STEP EXPLAIN");
$("#reverse-step").on("click", function (evt) {
    reverse_step();
});

reverse_step = function () {
    RUR.current_frame_no -= 2;
    if (RUR.current_frame_no < 0){
        $("#reverse-step").attr("disabled", "true");
    }
    RUR.rec.display_frame();
    RUR.state.stop_called = false;
    $("#stop").removeAttr("disabled");
    clearTimeout(RUR._TIMER);
};
