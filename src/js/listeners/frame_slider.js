require("./../state.js");
require("./reload.js");
require("./../runner.js");

RUR.update_frame_nb_info = function() {
    RUR.frame_id_info.innerHTML = RUR.current_frame_no + "/" + RUR.nb_frames;
    RUR.frame_selector.value = RUR.current_frame_no;
    RUR.frame_selector.max = RUR.nb_frames;
};
RUR.frame_selector = document.getElementById("frame-selector");
RUR.frame_id_info = document.getElementById("frame-id");

$("#frame-selector").on("input change", function() {
    if (RUR.state.playback) {
        return;
    }
    RUR.current_frame_no = RUR.frame_selector.value;
    if (RUR.current_frame_no <= 0){
        $("#reverse-step").attr("disabled", "true");
    } else if ($("#reverse-step").attr("disabled")) {
        $("#reverse-step").removeAttr("disabled");
    }

    if (RUR.current_frame_no == RUR.nb_frames) {
        $("#step").attr("disabled", "true");
    } else if ($("#step").attr("disabled")) {
        $("#step").removeAttr("disabled");
    }
    RUR.update_frame_nb_info();
    RUR.rec.display_frame();
});
