
require("./rur.js");
require("./state.js");

RUR.ReeborgOK = function (message) {
    if (RUR.state.programming_language == "python"){
        return ReeborgOK(message);
    }
    this.reeborg_concludes = message;
    this.message = message;
};

RUR.ReeborgError = function (message) {
    if (RUR.state.programming_language == "python"){
        return ReeborgError(message);
    }
    this.name = "ReeborgError";
    this.message = message;
    this.reeborg_shouts = message;
};

RUR.WallCollisionError = function (message) {
    if (RUR.state.programming_language == "python"){
        return WallCollisionError(message);
    }
    this.name = "WallCollisionError";
    this.message = message;
    this.reeborg_shouts = message;
};
