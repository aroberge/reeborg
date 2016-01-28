
exports.toggle = function () {
    if ("robots" in RUR.CURRENT_WORLD &&
        RUR.CURRENT_WORLD.robots.length > 0) {
        $(".robot-absent").hide();
        $(".robot-present").show();
    } else {
        $(".robot-absent").show();
        $(".robot-present").hide();
    }
};
