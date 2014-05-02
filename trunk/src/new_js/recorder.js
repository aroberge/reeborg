/* Author: André Roberge
   License: MIT
   
   Defining base name space and various constants.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR , editor, __BRYTHON__*/

RUR.rec = {};

RUR.rec.reset = function() {
    RUR.rec.nb_frames = 0;
    RUR.rec.current_frame = 0;
    RUR.rec.frames = [];
    RUR.rec._line_numbers = [];
    RUR.rec.playback = false;
    RUR.rec.delay = 300;  
    clearTimeout(RUR.rec.timer);
    RUR._previous_line = undefined;
};
RUR.rec.reset();

RUR.rec.record_frame = function (name, obj) {
    // clone current world and store the clone
    var frame = {};
    frame.world = RUR.world.clone_world();
    if (name !== undefined) {
        frame[name] = obj;
    }
    if (RUR.control.sound_id && RUR.control.sound_flag && RUR.rec.delay > RUR.MIN_TIME_SOUND) {
        frame.sound_id = RUR.control.sound_id;
    }
//    if (RUR.programming_langage === "javascript") { 
//        RUR.rec._line_numbers [RUR.rec.nb_frames] = RUR._current_line; 
//    } else if (RUR.programming_language === "python") {
//        if (__BRYTHON__.line_info !== undefined) { 
//            RUR.rec._line_numbers [RUR.rec.nb_frames] = __BRYTHON__.line_info[0]-1;
//        } else{
//            RUR.rec._line_numbers [RUR.rec.nb_frames] = 0;
//        }
//    }
    
    RUR.rec.nb_frames++;   // will start at 1 -- see display_frame for reason
    RUR.rec.frames[RUR.rec.nb_frames] = frame;
    // TODO add check for too many steps.
    RUR.control.sound_id = undefined;
    if (RUR.rec.nb_frames == RUR.MAX_STEPS) {
        throw new RUR.ReeborgError(RUR.translation["Too many steps:"].supplant({max_steps: RUR.MAX_STEPS}));
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

    if (frame_info === "immediate") {
        clearTimeout(RUR.rec.timer);
        RUR.rec.loop();
        return;
    } else if (frame_info === "pause") {
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
    var frame, goal_status;

    
    // track line number and highlight line to be executed
//    try {
//        
//        editor.removeLineClass(RUR._previous_line, 'background', 'editor-highlight');
//    }catch (e) {}
//    try { 
//        editor.addLineClass(RUR.rec._line_numbers [RUR.rec.current_frame], 'background', 'editor-highlight');
//        RUR._previous_line = RUR.rec._line_numbers [RUR.rec.current_frame];
//    } catch (e) {}
    
    
    if (RUR.rec.current_frame > RUR.rec.nb_frames) {
        return RUR.rec.conclude();
    }
    frame = RUR.rec.frames[RUR.rec.current_frame];
    RUR.rec.current_frame++;
    if(frame === undefined) {
        return;
    }
    
    if (frame.delay !== undefined) {
        RUR.visible_world.delay = frame.delay;   // FIXME
        return "immediate";
    } else if (frame.pause) {
        RUR.ui.pause(frame.pause.pause_time);
        return "pause";
    } else if (frame.error !== undefined) { 
        return RUR.rec.handle_error(frame);
    } else if (frame.output !== undefined) {
        $(frame.output.element).append(frame.output.message + "\n");
    }
    RUR.current_world = frame.world;
    if (frame.sound_id !== undefined){
        RUR.control.play_sound(frame.sound_id);
    }
    RUR.vis_world.refresh();
};

RUR.rec.conclude = function () {
//    try{ 
//        editor.removeLineClass(RUR._previous_line, 'background', 'editor-highlight');
//    } catch(e) {}
    var frame, goal_status;
    if (RUR.rec.nb_frames === 0) return "stopped";
    
    frame = RUR.rec.frames[RUR.rec.nb_frames]; // nb_frames could be zero ... but we might still want to check if goal reached.
    if (frame.world.goal !== undefined){
        goal_status = RUR.rec.check_goal(frame);
        if (goal_status.success) {
            if (RUR.control.sound_flag) {
                RUR.control.play_sound("#success-sound");
            }
            $("#Reeborg-says").html(goal_status.message).dialog("open");
        } else {
            if (RUR.control.sound_flag) {
                RUR.control.play_sound("#error-sound");
            }
            $("#Reeborg-shouts").html(goal_status.message).dialog("open");
        }
    } else {
        if (RUR.control.sound_flag) {
            RUR.control.play_sound("#success-sound");
        }
        $("#Reeborg-says").html("<p class='center'>" + RUR.translation["Last instruction completed!"] + "</p>").dialog("open");
    }
    return "stopped";
};

RUR.rec.handle_error = function (frame) {
    var goal_status;
    //Brython adds information to error messages; we want to remove it from the following comparison
    if (frame.error.message.split("\n")[0] === RUR.translation["Done!"].split("\n")[0]){
        if (frame.world.goal !== undefined){
            return RUR.rec.conclude();
        } else {
            if (RUR.control.sound_flag) {
                RUR.control.play_sound("#success-sound");
            }
            $("#Reeborg-says").html(RUR.translation["<p class='center'>Instruction <code>done()</code> executed.</p>"]).dialog("open");
        }
    } else {
        if (RUR.control.sound_flag) {
            RUR.control.play_sound("#error-sound");
        }
        $("#Reeborg-shouts").html(frame.error.message).dialog("open");
    }
    RUR.ui.stop();
    return "stopped";
};

RUR.rec.check_goal= function (frame) {
    var g, world, goal_status = {}, result;
    g = frame.world.goal;
    world = frame.world;
    goal_status.message = "<ul>";
    goal_status.success = true;
    if (g.position !== undefined){
        goal_status.position = {};
        if (g.position.x === world.robots[0].x){
            goal_status.message += RUR.translation["<li class='success'>Reeborg is at the correct x position.</li>"];
        } else {
            goal_status.message += RUR.translation["<li class='failure'>Reeborg is at the wrong x position.</li>"];
            goal_status.success = false;
        }
        if (g.position.y === world.robots[0].y){
            goal_status.message += RUR.translation["<li class='success'>Reeborg is at the correct y position.</li>"];
        } else {
            goal_status.message += RUR.translation["<li class='failure'>Reeborg is at the wrong y position.</li>"];
            goal_status.success = false;
        }
    }
    if (g.orientation !== undefined){
        if (g.orientation === world.robots[0].orientation){
            goal_status.message += RUR.translation["<li class='success'>Reeborg has the correct orientation.</li>"];
        } else {
            goal_status.message += RUR.translation["<li class='failure'>Reeborg has the wrong orientation.</li>"];
            goal_status.success = false;
        }
    }
    if (g.shapes !== undefined) {
        result = Object.identical(g.shapes, world.shapes, true);
        if (result){
            goal_status.message += RUR.translation["<li class='success'>All shapes are at the correct location.</li>"];
        } else {
            goal_status.message += RUR.translation["<li class='failure'>One or more shapes are not at the correct location.</li>"];
            goal_status.success = false;
        }
    }
    if (g.tokens !== undefined) {
        result = Object.identical(g.tokens, world.tokens, true);
        if (result){
            goal_status.message += RUR.translation["<li class='success'>All tokens are at the correct location.</li>"];
        } else {
            goal_status.message += RUR.translation["<li class='failure'>One or more tokens are not at the correct location.</li>"];
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
            goal_status.message += RUR.translation["<li class='success'>All walls have been built correctly.</li>"];
        } else {
            goal_status.message += RUR.translation["<li class='failure'>One or more walls missing or built at wrong location.</li>"];
            goal_status.success = false;
        }
    }
    goal_status.message += "</u>";
    return goal_status;
};



