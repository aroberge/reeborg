
require("./../rur.js");
require("./../drawing/visible_world.js");
require("./../world_get/world_get.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../listeners/pause.js");
require("./../listeners/stop.js");
require("./../playback/play_sound.js");
require("./../editors/create.js");
require("./../recorder/record_frame.js");

var identical = require("./../utils/identical.js").identical;

RUR.rec = {};

RUR.set_lineno_highlight = function(lineno) {
    RUR.current_line_no = lineno;
    if (RUR.current_line_no != RUR.prev_line_no) {
        RUR.record_frame("highlight", lineno);
    }
    RUR.prev_line_no = RUR.current_line_no;
};

function update_editor_highlight(frame_no) {
    "use strict";
    var i, frame;

    frame = RUR.frames[frame_no];
    if (frame !== undefined && frame.highlight !== undefined) {
        for (i=0; i < editor.lineCount(); i++){
            editor.removeLineClass(i, 'background', 'editor-highlight');
        }
        for(i=0; i < frame.highlight.length; i++){
            editor.addLineClass(frame.highlight[i], 'background', 'editor-highlight');
        }
    }
}

RUR.rec.display_frame = function () {
    // set current world to frame being played.
    "use strict";
    var frame, goal_status;

    if (RUR.current_frame_no >= RUR.nb_frames) {
        RUR.update_frame_nb_info();
        if (RUR.state.error_recorded) {
            return;
        }
        return RUR.rec.conclude();
    }

    frame = RUR.frames[RUR.current_frame_no];
    RUR.update_frame_nb_info();
    if ((RUR.state.programming_language === "python" && RUR.state.highlight)) {
        update_editor_highlight(RUR.current_frame_no);
    }
    RUR.current_frame_no++;

    if (frame === undefined){
        RUR.vis_world.refresh();
        return;
    }

    // many of the following if statements are exlusive of others ...
    // but to give more flexibility
    // in adding options (and prevent bugs!!), we do not use an
    // if/else if/... structure, but rather a series of if clauses
    // unless it is clear that they are completely independent

    if (frame.delay !== undefined){
        RUR.PLAYBACK_TIME_PER_FRAME = frame.delay;
    }

    if (frame.pause) {
        RUR.pause(frame.pause.pause_time);
        return "pause";
    } else if (frame.error !== undefined) {
        RUR.set_current_world(frame.world);
        RUR.vis_world.refresh();
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

    RUR.set_current_world(frame.world);
    if (frame.sound_id !== undefined){
        RUR._play_sound(frame.sound_id);
    }
    RUR.vis_world.refresh();
};

RUR.rec.conclude = function () {
    var frame, goal_status;

    if (RUR.nb_frames > 0) {
        frame = RUR.frames[RUR.nb_frames-1];
    }
    if (frame === undefined) {
        frame = {};
        frame.world = RUR.clone_world();
    }
    if (frame.world.goal !== undefined){
        goal_status = RUR.rec.check_goal(frame);
        if (goal_status.success) {
            if (RUR.state.sound_on) {
                RUR._play_sound("#success-sound");
            }
            RUR.show_feedback("#Reeborg-concludes", goal_status.message);
        } else {
            if (RUR.state.sound_on) {
                RUR._play_sound("#error-sound");
            }
            RUR.show_feedback("#Reeborg-shouts", goal_status.message);
        }
    } else {
        if (RUR.state.sound_on) {
            RUR._play_sound("#success-sound");
        }
        RUR.show_feedback("#Reeborg-concludes",
                             "<p class='center'>" +
                             RUR.translate("Last instruction completed!") +
                             "</p>");
    }
    RUR.stop();
    return "stopped";
};

RUR.rec.handle_error = function (frame) {
    var goal_status;
    if (frame.error.reeborg_shouts === RUR.translate("Done!")){
        if (frame.world.goal !== undefined){
            return RUR.rec.conclude();
        } else {
            if (RUR.state.sound_on) {
                RUR._play_sound("#success-sound");
            }
            RUR.show_feedback("#Reeborg-concludes",
                RUR.translate("<p class='center'>Instruction <code>done()</code> executed.</p>"));
        }
    } else if (frame.error.name == "ReeborgOK") {
        RUR.show_feedback("#Reeborg-concludes",
                             "<p class='center'>" +
                             frame.error.message +
                             "</p>");
    } else {
        if (RUR.state.sound_on) {
            RUR._play_sound("#error-sound");
        }
        RUR.show_feedback("#Reeborg-shouts", frame.error.message);
    }
    RUR.stop();
    return "stopped";
};

RUR.rec.check_current_world_status = function() {
    // this function is to check goals from the Python console.
    frame = {};
    frame.world = RUR.get_current_world();
    if (frame.world.goal === undefined){
        RUR.show_feedback("#Reeborg-concludes",
                             "<p class='center'>" +
                             RUR.translate("Last instruction completed!") +
                             "</p>");
    } else {
        goal_status = RUR.rec.check_goal(frame);
        if (goal_status.success) {
            RUR.show_feedback("#Reeborg-concludes", goal_status.message);
        } else {
            RUR.show_feedback("#Reeborg-shouts", goal_status.message);
        }
    }
};

RUR.rec.check_goal = function (frame) {
    var g, world, goal_status = {"success": true}, result;
    g = frame.world.goal;
    if (g === undefined) { // This is only needed for some
        return goal_status;        // functional which call check_goal directly
    } else if (Object.keys(g).length === 0) { // no real goal to check
        goal_status.message = "<p class='center'>" +
                     RUR.translate("Last instruction completed!") +
                     "</p>";
        return goal_status;
    }

    world = frame.world;
    goal_status.message = "<ul>";
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
    if (g.pushables !== undefined) {
        result = identical(g.pushables, world.pushables, true);
        if (result){
            goal_status.message += RUR.translate("<li class='success'>All objects are at the correct location.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>One or more objects are not at the correct location.</li>");
            goal_status.success = false;
        }
    }

    if (g.objects !== undefined) {
        result = identical(g.objects, world.objects, true);
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
    goal_status.message += "</ul>";
    if (goal_status.message == "<ul></ul>") { // there was no goal to check
        goal_status.message = "<p class='center'>" +
                             RUR.translate("Last instruction completed!") +
                             "</p>";
    }
    return goal_status;
};
