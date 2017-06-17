require("./../rur.js");
require("./../world_utils/import_world.js");
require("./../drawing/visible_robot.js");
require("./../drawing/visible_world.js");
var clone_world = require("./../world_utils/clone_world.js").clone_world;

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

    RUR.CURRENT_WORLD = clone_world(RUR.WORLD_BEFORE_ONLOAD);
    RUR.world_utils.process_onload();
};

reset_world();