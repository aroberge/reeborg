
require("./../state.js");
require("./reset.js");
require("./../exceptions.js");
require("./../playback/show_immediate.js");
require("./../utils/supplant.js");
var clone_world = require("./../world/clone_world.js").clone_world;

RUR.record_frame = function (name, obj) {
    "use strict";
    var frame = {}, robot;
    if (RUR.state.do_not_record) {
        return;
    }
    if (RUR.state.prevent_playback){  // TODO see if this can be replaced by do_not_record
        return;
    }

    /* if the REPL is active, we do not record anything, and show immediately
       the updated world */
    if (RUR.state.input_method==="py-repl") {
        return RUR._show_immediate(name, obj);
    }

    // Wathched variables are appended to previous frame so as to avoid
    // generating too many extra frames.
    if (name == "watch_variables" && RUR.nb_frames >= 1) {
        RUR.frames[RUR.nb_frames-1]["watch_variables"] = obj;
        return;
    }

    for (robot of RUR.CURRENT_WORLD.robots) { // jshint ignore:line
        RUR.vis_robot.update_trace_history(robot);
    }
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
           if (RUR.nb_frames >= 1){
               if (name=="highlight" &&
                   RUR.current_line_no == RUR.rec_line_numbers [RUR.nb_frames-1]) {
                    // no change: do not include any extra frame
                   return;
               }
           }
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
    if (RUR.nb_frames > RUR.MAX_STEPS) {
        throw new RUR.ReeborgError(RUR.translate("Too many steps:").supplant({max_steps: RUR.MAX_STEPS}));
    }
};
