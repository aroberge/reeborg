
require("./../state.js");
require("./reset.js");
require("./../exceptions.js");
require("./../world_get.js");
require("./../playback/show_immediate.js");
require("./../utils/supplant.js");
var clone_world = require("./../world/clone_world.js").clone_world;

RUR.record_frame = function (name, obj) {
    "use strict";
    var frame = {}, robot;

    if (RUR.state.do_not_record || RUR.state.prevent_playback) {
        // prevent sneaky attempt to safely move on otherwise fatal tile
        frame.world = clone_world();
        check_robots_on_tiles(frame);
        return;
    }

    /* if the REPL is active, we do not record anything, and show immediately
       the updated world */
    if (RUR.state.input_method==="py-repl") {
        // do not perform check_robots_on_tiles in this mode; allow for
        // casual exploration of the world.
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

    check_robots_on_tiles(frame);
    if (RUR.nb_frames > RUR.MAX_STEPS) {
        throw new RUR.ReeborgError(RUR.translate("Too many steps:").supplant({max_steps: RUR.MAX_STEPS}));
    }
};


// TODO: create test for this.
// This function checks to see if any robot is found on a fatal tile
// We do not add it to the RUR namespace so that it cannot be redefined
// by a sneaky programmer.
check_robots_on_tiles = function(frame){
    var tile, robots, robot, coords;
    if (frame.world.robots === undefined){
        return;
    }
    for (robot=0; robot < frame.world.robots.length; robot++){
        tile = RUR.world_get.tile_at_position(frame.world.robots[robot]);
        if (tile) {
            if (tile.fatal){
                throw new RUR.ReeborgError(RUR.translate(tile.message));
            }
        }
    }
};

