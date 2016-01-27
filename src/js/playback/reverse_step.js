;
require("./../state.js");
require("./../recorder.js");


RUR.reverse_step = function () {
    RUR.current_frame_no -= 2;
    if (RUR.current_frame_no < 0){
        $("#reverse-step").attr("disabled", "true");
    }
    RUR.rec.display_frame();
    RUR.state.stop_called = false;
    $("#stop").removeAttr("disabled");
    clearTimeout(RUR._TIMER);
};
