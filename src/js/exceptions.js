
require("./rur.js");
require("./state.js");

RUR.ReeborgSuccess = function (message) {
    if (RUR.state.programming_language == "python"){
        return ReeborgSuccess(message);
    }
    this.reeborg_concludes = message;
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
