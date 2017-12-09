/* Attempt at creating a way for users to follow their progress */

require("../rur.js");


RUR.strip_checkmark = function (name) {
    return name.replace(RUR.CHECK_MARK, '');
};

RUR.update_progress = function(name){
    throw new RUR.ReeborgError("update_progress not implemented");
};

RUR.retrieve_progress = function() {
    throw new RUR.ReeborgError("retrieve_progress not implemented");
};
