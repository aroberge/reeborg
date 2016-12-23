require("./../rur.js");
require("./reload.js");
require("./../runner/runner.js");

RUR.update_frame_nb_info = function() {
    var frame_no=0;
    try {  // termporarily keeping the "old" version compatible
        if (RUR.nb_frames === 0) {
            RUR.frame_id_info.innerHTML = "0/0";
            RUR.frame_selector.value = 0;
            RUR.frame_selector.min = 0;
            RUR.frame_selector.max = 0;
        } else {
            RUR.frame_selector.max = RUR.nb_frames;
            RUR.frame_selector.value = RUR.current_frame_no;
            // do not display zero-based index as this would confuse
            // beginners ... especially without no additional explanation.
            frame_no = Math.min(RUR.current_frame_no+1, RUR.nb_frames+1);
            RUR.frame_id_info.innerHTML = frame_no + "/" + (RUR.nb_frames+1);
        }
    } catch (e) {}
};
RUR.frame_selector = document.getElementById("frame-selector");
RUR.frame_id_info = document.getElementById("frame-id");

$("#frame-selector").on("input change", function() {
    if (RUR.state.playback) {
        return;
    }
    RUR.current_frame_no = parseInt(RUR.frame_selector.value, 10);
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
