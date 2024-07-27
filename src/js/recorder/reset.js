require("./../rur.js");
require("./../editors/create.js"); // to ensure editor is defined
require("./../world_utils/import_world.js"); // for process_onload
require("./../drawing/visible_robot.js"); // for RUR.reset_default_robot_images

RUR.reset_world = function() {
    var i;
    RUR.reset_pre_run_defaults();
    $("#thought").hide(); // just in case
    RUR.success_custom_message = undefined;
    RUR.failure_custom_message = undefined;

    if (RUR.state.reset_default_robot_images_needed) {
        RUR.reset_default_robot_images(); // will reset state/flag to false
    }

    try {
        RUR.update_frame_nb_info(); // slider may not be defined initially
    } catch (e) {}

    clearTimeout(RUR._TIMER);

    if (RUR.state.highlight) {
        for (i=0; i < editor.lineCount(); i++){
            editor.removeLineClass(i, 'background', 'editor-highlight');
        }
    }

    if (RUR.state.editing_world){
        return;
    }

    RUR.set_current_world(RUR.clone_world(RUR.WORLD_BEFORE_ONLOAD));
    RUR.world_utils.process_onload();
};
