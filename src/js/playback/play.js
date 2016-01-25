require("./../state.js");
require("./../listeners/stop.js");

RUR.play = function () {
    "use strict";
    if (RUR.state.playback){            // RUR.visible_world.running
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
    RUR._TIMER = setTimeout(loop, RUR.playback_delay);
}
