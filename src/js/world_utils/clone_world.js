require("./world_utils_namespace.js");

exports.clone_world = clone_world = function (world) {
    if (world === undefined) {
        return JSON.parse(JSON.stringify(RUR.CURRENT_WORLD));
    } else {
        return JSON.parse(JSON.stringify(world));
    }
};
RUR.world_utils.clone_world = clone_world; // for automated testing
