
require("./../world.js");
require("./../exceptions.js");
var clone_world = require("./../world/clone_world.js").clone_world;

_record_frame = function (name, obj) {
    "use strict";
    var frame = {};

    if (RUR.state.programming_language === "python" && RUR.state.input_method==="repl") {
        throw new RUR.ReeborgError("Fatal Error: " +
            "Calling _record_frame while using the Python REPL.");
    }
    if (RUR.state.do_not_record) {
        return;
    }
    if (RUR.state.prevent_playback){  // TODO see if this can be replaced by do_not_record
        return;
    }

    // // Used mainly to add watch variables to previous frame
    // if (name !== undefined && name == "output" &&
    //     obj.element == "#print-html" && obj.append == undefined &&
    //     RUR.nb_frames > 1) {
    //     RUR.frames[RUR.nb_frames-1]["output"] = obj;
    //     return;
    // }


    frame.world = clone_world();
    if (name !== undefined) {
        frame[name] = obj;
    }

    frame.delay = RUR.playback_delay;
    if (RUR.state.sound_id && RUR.state.sound_on && frame.delay >= RUR.MIN_TIME_SOUND) {
        frame.sound_id = RUR.state.sound_id;
    }

   if (RUR.state.programming_language === "python" && RUR.state.highlight) {
       if (RUR.current_line_no !== undefined) {
           RUR.rec_line_numbers [RUR.nb_frames] = RUR.current_line_no;
       } else{
           RUR.rec_line_numbers [RUR.nb_frames] = [0];
       }
   }

    RUR.previous_lineno = RUR.current_line_no;

    RUR.frames[RUR.nb_frames] = frame;
    RUR.nb_frames++;

    RUR.state.sound_id = undefined;
    if (name === "error"){
        return;
    }

    // catch any robot that teleported itself to a forbidden tile
    // to try to do a sneaky action
    RUR.rec.check_robots_on_tiles(frame);

    if (RUR.nb_frames > RUR.MAX_STEPS + RUR.nb_extra_highlighting_frames) {
        throw new RUR.ReeborgError(RUR.translate("Too many steps:").supplant({max_steps: RUR.MAX_STEPS}));
    }
};

RUR.record_frame = _record_frame;  // initial default
