exports.export_world = function (world) {
    if (world === undefined) {
        return JSON.stringify(RUR.CURRENT_WORLD, null, 2);
    } else {
        return JSON.stringify(world, null, 2);
    }
};
