/* Author: André Roberge
   License: MIT
   
   Defining base name space and various constants.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.rec = {};

RUR.rec.reset = function() {
    RUR.rec.nb_frames = -1;
    RUR.rec.current_frame = 0;
    RUR.rec.frames = [];
    RUR.rec.playback = false;
    clearTimeout(RUR.rec.timer);
    if (RUR.world !== undefined && RUR.current_world !== undefined) {
        RUR.rec.record_frame();   // record initial frame for dealing with
        // the case where the user's program does not trigger recording.
    }
};
RUR.rec.reset();

RUR.rec.record_frame = function (name, obj) {
    // clone current world and store the clone
    var frame = {};
    frame.world = RUR.world.clone_world();
    if (name !== undefined) {
        frame[name] = obj;
    }
    RUR.rec.nb_frames++;   // will start at 1 -- see display_frame for reason
    RUR.rec.frames[RUR.rec.nb_frames] = frame;
    // TODO add check for too many steps.
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

    RUR.rec.timer = setTimeout(RUR.rec.loop, 200); // FIXME delay
};

RUR.rec.display_frame = function () {
    // set current world to frame being played.
    "use strict";
    var frame, goal_status;
    
    /* We only want to have one line where we update the current frame as
       we have multiple return points; so we update at the beginning and
       our first current frame is numbered 1; this affect the way we
       count the frames in record frame as well.
    */
    RUR.rec.current_frame++;
    
    if (RUR.rec.current_frame > RUR.rec.nb_frames) {
        return RUR.rec.conclude();
    }
    frame = RUR.rec.frames[RUR.rec.current_frame];
    
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
    RUR.vis_world.refresh();
};

RUR.rec.conclude = function () {
    var frame, goal_status;
    if (RUR.rec.nb_frames === -1) return;
    
    frame = RUR.rec.frames[RUR.rec.nb_frames]; // nb_frames could be zero ... but we might still want to check if goal reached.
    if (frame.world.goal !== undefined){
        goal_status = RUR.rec.check_goal(frame);
        if (goal_status.success) {
            $("#Reeborg-says").html(goal_status.message).dialog("open");
        } else {
            $("#Reeborg-shouts").html(goal_status.message).dialog("open");
        }
    } else {
        $("#Reeborg-says").html("<p class='center'>" + RUR.translation["Last instruction completed!"] + "</p>").dialog("open");
    }
    return "stopped";
};

RUR.rec.handle_error = function (frame) {
    var goal_status;
    if (frame.error.message === RUR.translation["Done!"]){
        if (frame.world.goal !== undefined){
            return RUR.rec.conclude();
        } else {
            $("#Reeborg-says").html(RUR.translation["<p class='center'>Instruction <code>done()</code> executed.</p>"]).dialog("open");
        }
    } else {
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



