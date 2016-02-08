
var _text_elements = [];
add_msg = function (id, msg){
    _text_elements.push([id, msg]);
};
update_ui = function () {
    "use strict";
    var i, id, msg;
    for(i=0; i<_text_elements.length; i++) {
        id = "#" + _text_elements[i][0];
        msg = _text_elements[i][1];
        $(id).text(RUR.translate(msg));
    }
};
exports.add_msg = add_msg;
exports.update_ui = update_ui;

add_msg("site-name", "SITE NAME");
