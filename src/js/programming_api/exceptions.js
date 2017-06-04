
require("./../rur.js");

/* When loading a world from a url, Python names may not have been
   defined in the running environment. If that is the case,
   we make sure to stop that error and let a the basic javascript
   one propagate so that the correct dialog can be shown.
 */

RUR.ReeborgOK = function (message) {
    if (RUR.state.programming_language == "python"){
        try { // see comment above
            return ReeborgOK(message);
        } catch (e) {}
    }
    this.name = "ReeborgOK";
    this.reeborg_concludes = message;
    this.message = message;
};

RUR.ReeborgError = function (message) {
    if (RUR.state.programming_language == "python"){
        try { // see comment above
            return ReeborgError(message);
        } catch (e) {}
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


RUR.MissingObjectError = function (message) {
    if (RUR.state.programming_language == "python"){
        return MissingObjectError(message);
    }
    this.name = "MissingObjectError";
    this.message = message;
    this.reeborg_shouts = message;
};
