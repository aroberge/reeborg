require("../rur.js");
require("../ui/stop.js");

RUR.play = function () {
    "use strict";
    if (RUR.state.playback){            // RUR.drawing/visible_world.running
        RUR.state.playback = false;
        return;
    }
    RUR.state.playback = true;
    loop();
};

function loop () {
    "use strict";
    var frame_info;

    if (!RUR.state.playback){
        return;
    }
    frame_info = RUR.rec.display_frame();

    if (frame_info === "pause") {
        return;
    } else if (frame_info === "stopped") {
        RUR.stop();
        return;
    }
    RUR._TIMER = setTimeout(loop, RUR.PLAYBACK_TIME_PER_FRAME);
}
