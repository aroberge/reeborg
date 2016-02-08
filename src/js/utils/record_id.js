add_msg = require("./../../lang/msg.js").add_msg;

_recorded_ids = [];

exports.record_id = function (id, text) {
    if (_recorded_ids.indexOf(id) !== -1) {
        alert("Fatal error: " + id + " already exists.");
    } else {
        _recorded_ids.push(id);
    }
    if (text !== undefined) {
        add_msg(id, text);
    }
};
