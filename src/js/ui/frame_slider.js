require("./../rur.js");
require("./../runner/runner.js");

var frame_selector = document.getElementById("frame-selector"),
    frame_id_info = document.getElementById("frame-id");

RUR.update_frame_nb_info = function() {
    var frame_no=0, max_frame_nb;
    if (RUR.state.error_recorded) {
        max_frame_nb = RUR.nb_frames-1;
    } else {
        max_frame_nb = RUR.nb_frames;
    }
    try {  // termporarily keeping the "old" version compatible
        if (RUR.nb_frames === 0) {
            frame_id_info.innerHTML = "0/0";
            frame_selector.value = 0;
            frame_selector.min = 0;
            frame_selector.max = 0;
        } else {
            frame_selector.max = max_frame_nb;
            frame_selector.value = RUR.current_frame_no;
            // do not display zero-based index as this would confuse
            // beginners ... especially without no additional explanation.
            frame_no = Math.min(RUR.current_frame_no+1, max_frame_nb+1);
            frame_id_info.innerHTML = frame_no + "/" + (max_frame_nb+1);
        }
    } catch (e) {}
};

RUR.listeners['frame-selector'] = function () {
    if (RUR.state.playback) {
        return;
    }
    RUR.current_frame_no = parseInt(frame_selector.value, 10);
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
    // TODO: see if dependency needs to be set properly
    RUR.rec.display_frame();
};
