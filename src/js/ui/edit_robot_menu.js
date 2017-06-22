
require("./../rur.js");

exports.toggle = function () {
    var world = RUR.get_current_world();
    if ("robots" in world && world.robots.length > 0) {
        $(".robot-absent").hide();
        $(".robot-present").show();
    } else {
        $(".robot-absent").show();
        $(".robot-present").hide();
    }
};
