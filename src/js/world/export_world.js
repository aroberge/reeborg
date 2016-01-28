
exports.export_world = function () {
    return JSON.stringify(RUR.CURRENT_WORLD, null, 2);
};
