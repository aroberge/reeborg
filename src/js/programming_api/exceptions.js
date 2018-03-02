
require("./../rur.js");

// During evaluation of "onload", which is done before a program is
// running and only involves Javascript code, some errors may be thrown.
// In this situation we make sure that these errors are not passed to Brython.

RUR.ReeborgError = function (message) {
    if (RUR.state.input_method == "py-repl" ||
            (!RUR.state.evaluating_onload && RUR.state.programming_language == "python") ||
            (RUR.state.evaluating_onload && RUR.state.onload_programming_language == "python")
        ){
        try { // see comment above
            if (["en", "fr-en", "ko-en"].indexOf(RUR.state.human_language) != -1) {
                return ReeborgError_en(message);
            } else {
                return ReeborgError_fr(message);
            }
        } catch (e) {
            console.log("error raised in attempting to pass control to Python");
            console.dir(e)
        }
    }
    this.name = "ReeborgError";
    this.message = message;
    this.reeborg_shouts = message;
};


RUR.ReeborgOK = function (message) {
    if (RUR.state.programming_language == "python"){
        try { // see comment above
            if (["en", "fr-en", "ko-en"].indexOf(RUR.state.human_language) != -1) {
                return ReeborgOK_en(message);
            } else {
                return ReeborgOK_fr(message);
            }
        } catch (e) {}
    }
    this.name = "ReeborgOK";
    this.reeborg_concludes = message;
    this.message = message;
};
RUR.ReeborgOk = RUR.ReeborgOK; // preventing an annoying typo...


RUR.WallCollisionError = function (message) {
    if (RUR.state.programming_language == "python"){
        if (["en", "fr-en", "ko-en"].indexOf(RUR.state.human_language) != -1) {
            return WallCollisionError_en(message);
        } else {
            return WallCollisionError_fr(message);
        }
    }
    this.name = "WallCollisionError";
    this.message = message;
    this.reeborg_shouts = message;
};


RUR.MissingObjectError = function (message) {
    if (RUR.state.programming_language == "python"){
        if (["en", "fr-en", "ko-en"].indexOf(RUR.state.human_language) != -1) {
            return MissingObjectError_en(message);
        } else {
            return MissingObjectError_fr(message);
        }
    }
    this.name = "MissingObjectError";
    this.message = message;
    this.reeborg_shouts = message;
};
