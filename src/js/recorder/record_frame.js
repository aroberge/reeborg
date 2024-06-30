
require("./../rur.js");
require("./../programming_api/exceptions.js");
require("./../playback/show_immediate.js");
require("./../utils/supplant.js");
var identical = require("./../utils/identical.js").identical;

function update_trace_history() {
    var robot, world = RUR.get_current_world();
    if (world.robots !== undefined){
        for (robot of world.robots) { // jshint ignore:line
            update_robot_trace_history(robot);
        }
    }
}

update_robot_trace_history = function (robot) {
    var offset, prev_offset, trace_segment={}, prev_trace_segment;
    // if we keep track of the trace during world editing tests,
    // it can end up saving a world with a trace history
    // defined.
    if (RUR.state.editing_world) {
        robot._trace_history = [];
        return;
    }
    if (robot._prev_x == robot.x &&
        robot._prev_y == robot.y &&
        robot._prev_orientation == robot._orientation) {
            return;
        }

    if (robot._trace_style == "invisible" || !robot._is_leaky) {
        trace_segment["color"] = "rgba(0,0,0,0)";
    } else {
        trace_segment["color"] = robot._trace_color;
    }

    offset = [[30, 30], [30, 20], [20, 20], [20, 30]];

    if(RUR.get_current_world().small_tiles) {
        offset = [[12, 12], [12, 12], [12, 12], [12, 12]];
        trace_segment["thickness"] = 2;  
    } else if (robot._trace_style === "thick") {
        offset = [[25, 25], [25, 25], [25, 25], [25, 25]];
        trace_segment["thickness"] = 4;
    }  else if (robot._trace_style === "default") {
        trace_segment["thickness"] = 2;
    } // else, invisible and we do not care.

    prev_offset = offset[robot._prev_orientation%4];
    offset = offset[robot._orientation%4];

    trace_segment["prev_x"] = robot._prev_x * RUR.WALL_LENGTH + prev_offset[0];
    trace_segment["x"] = robot.x * RUR.WALL_LENGTH + offset[0];
    trace_segment["prev_y"] = RUR.HEIGHT - (robot._prev_y+1) * RUR.WALL_LENGTH + prev_offset[1];
    trace_segment["y"] = RUR.HEIGHT - (robot.y+1) * RUR.WALL_LENGTH + offset[1];
    // the following are not required for drawing but may be used by a world
    // creator to confirm that the correct path is being followed.
    // See RUR.print_path and other functions in path_utils.js
    trace_segment["grid_x"] = robot.x;
    trace_segment["grid_y"] = robot.y;

    if (robot._trace_history.length > 0) {
        prev_trace_segment = robot._trace_history[robot._trace_history.length-1];
        if (identical(prev_trace_segment, trace_segment)) {
            return;
        }
    }

    robot._trace_history.push(trace_segment);
};


RUR.record_frame = function (name, obj) {
    "use strict";
    var py_err, frame = {}, prev_frame;

    if (RUR.nb_frames > 0) {
        prev_frame = RUR.frames[RUR.nb_frames-1];
    }

    /* TODO: Document RUR.frame_insertion and put a link here.    */

    if (name !== "highlight" && RUR.frame_insertion !== undefined && !RUR.state.frame_insertion_called){
        // avoid recursive calls as this would make it too difficult
        // to use frame_insertion
        if (name === undefined) {
            name = "RUR.record_frame: missing first argument";
        }
        if (obj === undefined) {
            obj = "RUR.record_frame: missing second argument";
        }
        RUR.state.frame_insertion_called = true;
        if (RUR.state.programming_language === "python") {
            py_err = RUR.frame_insertion(name, obj);
            RUR.state.frame_insertion_called = false;
            if (py_err && py_err.__name__) {
                if (RUR[py_err.__name__] !== undefined) {
                    throw new RUR[py_err.__name__](py_err.reeborg_failure);
                } else {
                    throw new RUR.ReeborgError(py_err.__name__);
                }
            }
        } else {
            try {
                RUR.frame_insertion(name, obj); // may throw an error
            } finally {
                RUR.state.frame_insertion_called = false;
            }
        }
    }

// TODO: document a test that would fail if we were to remove the condition
// name!="error" below -- this addition was done by
// 1. turning off recording
// 2. doing stuff ... including something that should have raised an error
// 3. resuming recording.
// The program stopped, but no error was shown.

    if (RUR.state.input_method==="py-repl") {
        /* if the REPL is active, we do not record anything, and show
           immediately the updated world. */
        update_trace_history();
        return RUR._show_immediate(name, obj);
    } else if ((RUR.state.do_not_record || RUR.state.prevent_playback) && name != "error") {
        return;
    } else if (name == "watch_variables" && prev_frame !== undefined && prev_frame.highlight === undefined) {
        /* Watched variables are appended to previous frame so as to avoid
          generating too many extra frames. */
        prev_frame["watch_variables"] = obj;
        return;
    }

    update_trace_history();
    frame.world_map = RUR.world_map();

    if (name && obj) {
        frame[name] = obj;
    } else if (name) {
        frame[name] = true;
    } else {
        frame["no name"] = true;
    }

    frame.delay = RUR.PLAYBACK_TIME_PER_FRAME;
    if (RUR.state.sound_id && RUR.state.sound_on && frame.delay >= RUR.MIN_TIME_SOUND) {
        frame.sound_id = RUR.state.sound_id;
    }

/* In an earlier version, we only recorded values to RUR.rec_line_numbers if
Python was selected and RUR.state.highlight was set to true. However,
in order to avoid recording frames when nothing changed (no world state change,
no change in the line being highlighted), the logic became rather convoluted.

This new version always record a value for RUR.current_line_no; a valid value
is an array of consecutive line numbers, like [2, 3, 4]. If highlighting is
is not performed, we just set this to a string value "ignore" as a "code comment";
with highlihting turned off, during playback, the content of RUR.rec_line_numbers
will be ignored no matter what its content is.
*/

    if (RUR.state.programming_language === "python" && RUR.state.highlight) {
        if (RUR.current_line_no === undefined) {
            RUR.current_line_no = [0];
        }
        if (RUR.nb_frames > 0){
            // avoid logging frames if nothing changed
            if (identical(prev_frame, frame) &&
                RUR.rec_line_numbers [RUR.nb_frames-1] == RUR.current_line_no) {
                    return;
            } else if (frame.highlight !== undefined && prev_frame.highlight === undefined){
                //RUR.rec_line_numbers [RUR.nb_frames-1] = RUR.current_line_no;
                prev_frame.highlight = frame.highlight;
                return;
            }
        } else {
            RUR.rec_line_numbers[0] = RUR.current_line_no;
        }
    }

    RUR.frames[RUR.nb_frames] = frame;
    RUR.nb_frames++;
    RUR.state.sound_id = undefined;
    if (name === "error"){
        RUR.state.error_recorded = true;
        return;
    }

    if (RUR.nb_frames > RUR.MAX_STEPS) {
        throw new RUR.ReeborgError(RUR.translate("Too many steps:").supplant({max_steps: RUR.MAX_STEPS}));
    }
};

