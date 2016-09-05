
exports.clone_world = clone_world = function (world) {
    if (world === undefined) {
        return JSON.parse(JSON.stringify(RUR.CURRENT_WORLD));
    } else {
        return JSON.parse(JSON.stringify(world));
    }
};
RUR.clone_world = clone_world; // for automated testing
