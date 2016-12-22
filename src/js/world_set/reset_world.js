require("./../visible_robot.js");
require("./../visible_world.js");
var clone_world = require("./../world/clone_world.js").clone_world;

//TODO: code for evaluating onload is essentially repeated in two different
//files; it should be refactored.
//
//TODO: See if all defaults could be incorporated here, e.g. robot images, etc.

exports.reset_world = reset_world = function () {
    if (RUR.state.editing_world){
        return;
    }
    RUR.CURRENT_WORLD = clone_world(RUR._SAVED_WORLD);
    RUR.reset_default_robot_images();
    RUR.MAX_STEPS = 1000;
    RUR.ANIMATION_TIME = 120;
    if (RUR.CURRENT_WORLD.onload) {
        RUR.state.evaluating_onload = true;
        try {
            eval(RUR.CURRENT_WORLD.onload);  // jshint ignore:line
        } catch (e) {
            RUR.show_feedback("#Reeborg-shouts",
                RUR.translate("Problem with onload code.") + "<br><pre>" +
                RUR.CURRENT_WORLD.onload + "</pre>");
            console.log("error in onload:", e);
        }
        RUR.state.evaluating_onload = false;
    }
    RUR.vis_world.draw_all();
};

reset_world();
