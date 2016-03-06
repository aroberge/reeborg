require("./../world/create_empty.js");
require("./../visible_robot.js");
require("./../visible_world.js");
var clone_world = require("./../world/clone_world.js").clone_world;

exports.reset_world = reset_world = function () {
    if (RUR.state.editing_world){
        return;
    }
    RUR.CURRENT_WORLD = clone_world(RUR._SAVED_WORLD);
    RUR.vis_robot.set_trace_style("default");
    RUR.MAX_STEPS = 1000;
    RUR.vis_world.draw_all();
};

reset_world();
