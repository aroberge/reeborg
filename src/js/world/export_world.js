
exports.export_world = function () {
    return JSON.stringify(RUR.current_world, null, 2);
};
