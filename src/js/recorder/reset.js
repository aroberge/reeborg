require("./../rur.js");
require("./../editors/create.js"); // to ensure editor is defined
require("./../world_utils/import_world.js"); // for process_onload
require("./../drawing/visible_robot.js"); // for RUR.reset_default_robot_images

RUR.reset_world = function() {
    var world;
    RUR.reset_pre_run_defaults();
    RUR.success_custom_message = undefined;
    RUR.failure_custom_message = undefined;

    if (RUR.state.reset_default_robot_images_needed) {
        RUR.reset_default_robot_images(); // will reset state/flag to false
    }

    try {
        RUR.update_frame_nb_info(); // slider may not be defined initially
    } catch (e) {}

    clearTimeout(RUR._TIMER);

    if (RUR.state.programming_language === "python" &&
        RUR.state.highlight) {
        for (i=0; i < editor.lineCount(); i++){
            editor.removeLineClass(i, 'background', 'editor-highlight');
        }
    }

    if (RUR.state.editing_world){
        return;
    }

    RUR.set_current_world(RUR.clone_world(RUR.WORLD_BEFORE_ONLOAD));
    world = RUR.get_current_world();
    RUR.set_world_size(world.cols, world.rows); // in case the size was changed
                                        // dynamically in pre or main editor

    if (RUR.state.run_button_clicked) { // do not process_onload
        return;
    }

    RUR._CORRECT_PATH = [];

    RUR.world_utils.process_onload();
    // Does the following need to be kept out of reset_pre_run_defaults?
    //RUR.state.code_evaluated = false;
};
