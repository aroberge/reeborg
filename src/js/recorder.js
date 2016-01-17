
/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR , editor*/

require("./state.js");
require("./visible_world.js");
require("./custom_dialogs.js");
require("./control.js");
require("./constants.js");
require("./translator.js");
require("./ui.js");
require("./exceptions.js");

RUR.rec = {};

RUR.set_lineno_highlight = function(lineno, frame) {
    RUR.current_lineno = lineno;
    if (frame) {
        RUR.rec.record_frame();
        return true;
    }
};

RUR.rec.reset = function() {
    RUR.rec.nb_frames = 0;
    RUR.rec.current_frame = 0;
    RUR.rec.extra_highlighting_frames = 0;
    RUR.current_lineno = undefined;
    RUR.rec.frames = [];
    RUR.rec._line_numbers = [];
    RUR.rec.playback = false;
    RUR.rec.delay = 300;
    RUR.rec.do_not_record = false;
    RUR.watched_expressions = [];
    clearTimeout(RUR.rec.timer);
    if (RUR.state.programming_language === "python" &&
        RUR.state.highlight &&
        RUR.rec._max_lineno_highlighted !== undefined) {
        for (var i=0; i <= RUR.rec._max_lineno_highlighted; i++){
            try {
                editor.removeLineClass(i, 'background', 'editor-highlight');
            }catch (e) {console.log("diagnostic: error was raised while trying to removeLineClass", e);}
        }
    }
    RUR.rec._previous_lines = [];
    RUR.rec._max_lineno_highlighted = 0;
};


RUR.rec.record_frame = function (name, obj) {
    // clone current world and store the clone
    var frame = {};

    /* if the REPL is active, we do not record anything, and show immediately
       the updated world */
    if (RUR.state.programming_language === "python" && RUR.state.input_method==="repl") {
        RUR.vis_world.refresh();
        if (name !== undefined && name == "print_html") {
            if (obj.append){
                $(obj.element).append(obj.message);
            } else {
                $(obj.element).html(obj.message);
            }
            $("#Reeborg-proclaims").dialog("open");
        }
        return;
    }


    if (RUR.rec.do_not_record) {
        return;
    }
    if (RUR.state.prevent_playback){
        return;
    }

    // // Used mainly to add watch variables to previous frame
    // if (name !== undefined && name == "output" &&
    //     obj.element == "#print_html" && obj.append == undefined &&
    //     RUR.rec.nb_frames > 1) {
    //     RUR.rec.frames[RUR.rec.nb_frames-1]["output"] = obj;
    //     return;
    // }


    frame.world = RUR.world.clone_world();
    if (name !== undefined) {
        frame[name] = obj;
    }

    frame.delay = RUR.rec.delay;
    if (RUR.control.sound_id && RUR.state.sound_on && frame.delay >= RUR.MIN_TIME_SOUND) {
        frame.sound_id = RUR.control.sound_id;
    }

   if (RUR.state.programming_language === "python" && RUR.state.highlight) {
       if (RUR.current_lineno !== undefined) {
           RUR.rec._line_numbers [RUR.rec.nb_frames] = RUR.current_lineno;
       } else{
           RUR.rec._line_numbers [RUR.rec.nb_frames] = [0];
       }
   }

    RUR.previous_lineno = RUR.current_lineno;

    RUR.rec.frames[RUR.rec.nb_frames] = frame;
    RUR.rec.nb_frames++;

    RUR.control.sound_id = undefined;
    if (name === "error"){
        return;
    }

    // catch any robot that teleported itself to a forbidden tile
    // to try to do a sneaky action
    RUR.rec.check_robots_on_tiles(frame);

    if (RUR.rec.nb_frames > RUR.MAX_STEPS + RUR.rec.extra_highlighting_frames) {
        throw new RUR.ReeborgError(RUR.translate("Too many steps:").supplant({max_steps: RUR.MAX_STEPS}));
    }
};

RUR.rec.play = function () {
    "use strict";
    if (RUR.rec.playback){            // RUR.visible_world.running
        RUR.rec.playback = false;
        return;
    }
    RUR.rec.playback = true;
    RUR.rec.loop();
};

RUR.rec.loop = function () {
    "use strict";
    var frame_info;

    if (!RUR.rec.playback){
        return;
    }
    frame_info = RUR.rec.display_frame();

    if (frame_info === "pause") {
        return;
    } else if (frame_info === "stopped") {
        RUR.ui.stop();
        return;
    }
    RUR.rec.timer = setTimeout(RUR.rec.loop, RUR.rec.delay);
};

RUR.rec.display_frame = function () {
    // set current world to frame being played.
    "use strict";
    var frame, goal_status, i, next_frame_line_numbers;

    if (RUR.rec.current_frame >= RUR.rec.nb_frames) {
        return RUR.rec.conclude();
    }

    //track line number and highlight line to be executed
    if (RUR.state.programming_language === "python" && RUR.state.highlight) {
        try {
            for (i = 0; i < RUR.rec._previous_lines.length; i++){
                editor.removeLineClass(RUR.rec._previous_lines[i], 'background', 'editor-highlight');
            }
        }catch (e) {console.log("diagnostic: error was raised while trying to removeLineClass", e);}
        if (RUR.rec._line_numbers [RUR.rec.current_frame+1] !== undefined){
            next_frame_line_numbers = RUR.rec._line_numbers [RUR.rec.current_frame+1];
            for(i = 0; i < next_frame_line_numbers.length; i++){
                editor.addLineClass(next_frame_line_numbers[i], 'background', 'editor-highlight');
            }
            i = next_frame_line_numbers.length - 1;
            if (RUR.rec._max_lineno_highlighted < next_frame_line_numbers[i]) {
                RUR.rec._max_lineno_highlighted = next_frame_line_numbers[i];
            }
            RUR.rec._previous_lines = RUR.rec._line_numbers [RUR.rec.current_frame+1];
        } else {
            try {  // try adding back to capture last line of program
                for (i=0; i < RUR.rec._previous_lines.length; i++){
                    editor.addLineClass(RUR.rec._previous_lines[i], 'background', 'editor-highlight');
                }
            }catch (e) {console.log("diagnostic: error was raised while trying to addLineClass", e);}
        }
    }

    frame = RUR.rec.frames[RUR.rec.current_frame];
    RUR.rec.current_frame++;

    if (frame === undefined){
        //RUR.current_world = RUR.world.saved_world;  // useful when ...
        RUR.vis_world.refresh();                    // ... reversing step
        return;
    }

    if (RUR.__debug && frame.debug) {
        console.log("debug: ", frame.debug);
    }

    // many of these are exlusive of others ... but to give more flexibility
    // in adding options (and prevent bugs!!), we do not use an
    // if/else if/... structure, but rather a series of if clauses.


    if (frame.delay !== undefined){
        RUR.rec.delay = frame.delay;
    }

    if (frame.pause) {
        RUR.ui.pause(frame.pause.pause_time);
        return "pause";
    }

    if (frame.error !== undefined) {
        return RUR.rec.handle_error(frame);
    }

    if (frame.stdout !== undefined) {
        if (frame.stdout.clear) { // for clearprint
            $(frame.stdout.element).html('');
        } else {
            $(frame.stdout.element).append(frame.stdout.message);
        }
        $("#Reeborg-writes").dialog("open");
    }

    if (frame.print_html !== undefined) {
        if (frame.print_html.append){
            $(frame.print_html.element).append(frame.print_html.message);
        } else {
            $(frame.print_html.element).html(frame.print_html.message);
        }
        $("#Reeborg-proclaims").dialog("open");
    }

    if (frame.watch_variables !== undefined) {
        $(frame.watch_variables.element).html(frame.watch_variables.message);
        $("#Reeborg-watches").dialog("open");
    }

    RUR.current_world = frame.world;
    if (frame.sound_id !== undefined){
        RUR.control.play_sound(frame.sound_id);
    }
    RUR.vis_world.refresh();
};

RUR.rec.conclude = function () {
    var frame, goal_status;

    if (RUR.rec.nb_frames > 0) {
        frame = RUR.rec.frames[RUR.rec.nb_frames-1];
    }
    if (frame === undefined) {
        frame = {};
        frame.world = RUR.world.clone_world();
    }
    if (frame.world.goal !== undefined){
        goal_status = RUR.rec.check_goal(frame);
        if (goal_status.success) {
            if (RUR.state.sound_on) {
                RUR.control.play_sound("#success-sound");
            }
            RUR.cd.show_feedback("#Reeborg-concludes", goal_status.message);
        } else {
            if (RUR.state.sound_on) {
                RUR.control.play_sound("#error-sound");
            }
            RUR.cd.show_feedback("#Reeborg-shouts", goal_status.message);
        }
    } else {
        if (RUR.state.sound_on) {
            RUR.control.play_sound("#success-sound");
        }
        RUR.cd.show_feedback("#Reeborg-concludes",
                             "<p class='center'>" +
                             RUR.translate("Last instruction completed!") +
                             "</p>");
    }
    return "stopped";
};

RUR.rec.handle_error = function (frame) {
    var goal_status;
    if (frame.error.reeborg_shouts === RUR.translate("Done!")){
        if (frame.world.goal !== undefined){
            return RUR.rec.conclude();
        } else {
            if (RUR.state.sound_on) {
                RUR.control.play_sound("#success-sound");
            }
            RUR.cd.show_feedback("#Reeborg-concludes",
                RUR.translate("<p class='center'>Instruction <code>done()</code> executed.</p>"));
        }
    } else {
        if (RUR.state.sound_on) {
            RUR.control.play_sound("#error-sound");
        }
        RUR.cd.show_feedback("#Reeborg-shouts", frame.error.message);
    }
    RUR.ui.stop();
    return "stopped";
};

RUR.rec.check_current_world_status = function() {
    // this function is to check goals from the Python console.
    frame = {};
    frame.world = RUR.current_world;
    if (frame.world.goal === undefined){
        RUR.cd.show_feedback("#Reeborg-concludes",
                             "<p class='center'>" +
                             RUR.translate("Last instruction completed!") +
                             "</p>");
    } else {
        goal_status = RUR.rec.check_goal(frame);
        if (goal_status.success) {
            RUR.cd.show_feedback("#Reeborg-concludes", goal_status.message);
        } else {
            RUR.cd.show_feedback("#Reeborg-shouts", goal_status.message);
        }
    }
};

RUR.rec.check_goal = function (frame) {
    var g, world, goal_status = {}, result;
    g = frame.world.goal;
    world = frame.world;
    goal_status.message = "<ul>";
    goal_status.success = true;
    if (g.position !== undefined){
        if (g.position.x === world.robots[0].x){
            goal_status.message += RUR.translate("<li class='success'>Reeborg is at the correct x position.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>Reeborg is at the wrong x position.</li>");
            goal_status.success = false;
        }
        if (g.position.y === world.robots[0].y){
            goal_status.message += RUR.translate("<li class='success'>Reeborg is at the correct y position.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>Reeborg is at the wrong y position.</li>");
            goal_status.success = false;
        }
    }
    if (g.objects !== undefined) {
        result = Object.identical(g.objects, world.objects, true);
        if (result){
            goal_status.message += RUR.translate("<li class='success'>All objects are at the correct location.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>One or more objects are not at the correct location.</li>");
            goal_status.success = false;
        }
    }
    if (g.walls !== undefined) {
        result = true;
        loop:
        for(var w in g.walls){
            for(var i=0; i < g.walls[w].length; i++){
                if ( !(world.walls !== undefined &&
                       world.walls[w] !== undefined &&
                       world.walls[w].indexOf(g.walls[w][i]) !== -1)){
                    result = false;
                    break loop;
                }
            }
        }
        if (result){
            goal_status.message += RUR.translate("<li class='success'>All walls have been built correctly.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>One or more walls missing or built at wrong location.</li>");
            goal_status.success = false;
        }
    }
    goal_status.message += "</u>";
    return goal_status;
};

// A sneaky programmer could teleport a robot on a forbidden tile
// to perform an action; we catch any such potential problem here
RUR.rec.check_robots_on_tiles = function(frame){
    var tile, robots, robot, coords;
    if (frame.world.robots === undefined){
        return;
    }
    for (robot=0; robot < frame.world.robots.length; robot++){
        tile = RUR.control.get_tile_at_position(frame.world.robots[robot]);
        if (tile) {
            if (tile.fatal){
                throw new RUR.ReeborgError(tile.message);
            }
        }
    }
};
