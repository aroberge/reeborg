
exports.record_id = function (id, element, text) {
    if (RUR._RECORDED_IDS.indexOf(id) !== -1) {
        alert("Fatal error: " + id + " already exists.");
    } else {
        RUR._RECORDED_IDS.push(id);
    }

    if (element !== undefined) {
        RUR._TEXT_ELEMENTS.push([element, text]);
    }
};
