
var _recorded_ids = [];
var _text_elements = [];

record_id = function (id, text) {
    if (_recorded_ids.indexOf(id) !== -1) {
        alert("Fatal error: " + id + " already exists.");
    } else {
        _recorded_ids.push(id);
    }
    if (text !== undefined) {
        add_msg(id, text);
    }
};

add_msg = function (id, msg){
    _text_elements.push([id, msg]);
};

update_ui = function (lang) {
    "use strict";
    var i, id, msg;
    window.document.documentElement.lang = lang;

    for(i=0; i<_text_elements.length; i++) {
        id = "#" + _text_elements[i][0];
        msg = _text_elements[i][1];
        $(id).text(RUR.translate(msg));
    }
};

exports.update_ui = update_ui;
exports.record_id = record_id;

add_msg("site-name", "SITE NAME");
