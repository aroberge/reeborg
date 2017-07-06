require("./../rur.js");
require("./../world_utils/import_world.js");
require("./../drawing/visible_robot.js");

//TODO: See if all defaults could be incorporated here, e.g. robot images, etc.

exports.reset_world = reset_world = function () {
    if (RUR.state.editing_world){
        return;
    }
    if (RUR.state.reset_default_robot_images_needed) {
        RUR.reset_default_robot_images();
    }
    RUR.MAX_STEPS = 1000;
    RUR.ANIMATION_TIME = 120;
    RUR.vis_robot.animated_robots = [];
    RUR.state.animated_robots = false;

    RUR.set_current_world(RUR.clone_world(RUR.WORLD_BEFORE_ONLOAD));
    if (RUR.state.run_button_clicked) { // do not process_onload
        return;
    }
    RUR.world_utils.process_onload();
};

reset_world();