require("./../rur.js");
require("./../editors/create.js");
require("./../world_api/animated_images.js");
require("./../world_utils/import_world.js");
require("./../drawing/visible_robot.js");

exports.reset = reset = function() {
    RUR.nb_frames = 0;
    RUR.current_frame_no = 0;
    try {
        RUR.update_frame_nb_info(); // slider may not be defined initially
    } catch (e) {}
    RUR.current_line_no = undefined;
    RUR.frames = [];
    RUR.rec_line_numbers = [];
    RUR.state.playback = false;
    RUR.PLAYBACK_TIME_PER_FRAME = 300;
    RUR.state.do_not_record = false;
    RUR.watched_expressions = [];
    clearTimeout(RUR._TIMER);
    if (RUR.state.programming_language === "python" &&
        RUR.state.highlight &&
        RUR._max_lineno_highlighted !== undefined) {
            console.log("removing highlights,", RUR._max_lineno_highlighted);
        for (var i=0; i <= RUR._max_lineno_highlighted; i++){
            try {
                editor.removeLineClass(i, 'background', 'editor-highlight');
            }catch (e) {console.log("diagnostic: error was raised while trying to removeLineClass", e);}
        }
    }
    RUR.rec_previous_lines = [];
    RUR._max_lineno_highlighted = 0;
    RUR.animated_images_init(); // will reset RUR.ANIMATION_TIME
    RUR.state.frame_insertion_called = false;
    RUR.frame_insertion = undefined;
    RUR.state.error_recorded = false;

    if (RUR.state.editing_world){
        return;
    }
    if (RUR.state.reset_default_robot_images_needed) {
        RUR.reset_default_robot_images();
    }
    RUR.MAX_STEPS = 1000;
    RUR.vis_robot.animated_robots = [];
    RUR.state.animated_robots = false;

    RUR.set_current_world(RUR.clone_world(RUR.WORLD_BEFORE_ONLOAD));
    RUR.state.visible_grid = false;
    RUR.state.do_not_draw_info = false;


    if (RUR.state.run_button_clicked) { // do not process_onload
        return;
    }
    RUR.world_utils.process_onload();
    RUR.state.code_evaluated = false;
    RUR.state.sound_on = false;

};

RUR.reset_world = reset;
