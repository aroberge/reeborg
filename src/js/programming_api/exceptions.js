
require("./../rur.js");

// During evaluation of "onload", which is done before a program is
// running and only involves Javascript code, some errors may be thrown.
// In this situation we make sure that these errors are not passed to Brython.

RUR.ReeborgError = function (message) {
    if (RUR.state.input_method == "py-repl" ||
        (RUR.state.programming_language == "python" && !RUR.state.evaluating_onload)){
        try { // see comment above
            return ReeborgError(message);
        } catch (e) {}
    }

    this.name = "ReeborgError";
    this.message = message;
    this.reeborg_shouts = message;
};


RUR.ReeborgOK = function (message) {
    if (RUR.state.programming_language == "python"){
        try {
            return ReeborgOK(message);
        } catch (e) {}
    }
    this.name = "ReeborgOK";
    this.reeborg_concludes = message;
    this.message = message;
};


RUR.WallCollisionError = function (message) {
    if (RUR.state.programming_language == "python"){
        return WallCollisionError(message);
    }
    this.name = "WallCollisionError";
    this.message = message;
    this.reeborg_shouts = message;
};


RUR.MissingObjectError = function (message) {
    if (RUR.state.programming_language == "python"){
        return MissingObjectError(message);
    }
    this.name = "MissingObjectError";
    this.message = message;
    this.reeborg_shouts = message;
};
