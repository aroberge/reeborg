
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
            if (["en", "fr-en", "ko-en", "cn-en", "pt-en"].indexOf(RUR.state.human_language) != -1) {
                return __BRYTHON__.$call(window.ReeborgError_en)(message);
            } else if (["cn", "en-cn"].indexOf(RUR.state.human_language) != -1) {
                return __BRYTHON__.$call(window.ReeborgError_cn)(message);
            } else if (["pt"].indexOf(RUR.state.human_language) != -1) {
                return __BRYTHON__.$call(window.ReeborgError_pt)(message);
            } else {
                return __BRYTHON__.$call(window.ReeborgError_fr)(message);                
            }
        } catch (e) {}
    }
    this.name = "ReeborgError";
    this.message = message;
    this.reeborg_failure = message;
};


RUR.ReeborgOK = function (message) {
    this.name = "ReeborgOK";
    this.reeborg_success = message;
    this.message = message;
    RUR.__reeborg_success = message;
    if (RUR.state.programming_language == "python"){
        try { // see comment above
            if (["en", "fr-en", "ko-en", "cn-en", "pt-en"].indexOf(RUR.state.human_language) != -1) {
                return __BRYTHON__.$call(window.ReeborgOK_en)(message);
            } else if (["cn", "en-cn"].indexOf(RUR.state.human_language) != -1) {
                return __BRYTHON__.$call(window.ReeborgOK_cn)(message);
            } else if (["pt"].indexOf(RUR.state.human_language) != -1) {
                return __BRYTHON__.$call(window.ReeborgOK_pt)(message);
            } else {
                return __BRYTHON__.$call(window.ReeborgOK_fr)(message);
            }
        } catch (e) {}
    }
};
RUR.ReeborgOk = RUR.ReeborgOK; // preventing an annoying typo...


RUR.WallCollisionError = function (message) {
    if (RUR.state.programming_language == "python"){
        if (["en", "fr-en", "ko-en", "cn-en", "pt-en"].indexOf(RUR.state.human_language) != -1) {
            return __BRYTHON__.$call(window.WallCollisionError_en)(message);
        } else if (["cn", "en-cn"].indexOf(RUR.state.human_language) != -1) {
                return __BRYTHON__.$call(window.WallCollisionError_cn)(message);
        } else if (["pt"].indexOf(RUR.state.human_language) != -1) {
                return __BRYTHON__.$call(window.WallCollisionError_pt)(message);
        } else {
            return __BRYTHON__.$call(window.WallCollisionError_fr)(message);            
        }
    }
    this.name = "WallCollisionError";
    this.message = message;
    this.reeborg_failure = message;
};


RUR.MissingObjectError = function (message) {
    if (RUR.state.programming_language == "python"){
        if (["en", "fr-en", "ko-en", "cn-en", "pt-en"].indexOf(RUR.state.human_language) != -1) {
            return __BRYTHON__.$call(window.MissingObjectError_en)(message);
        } else if (["cn", "en-cn"].indexOf(RUR.state.human_language) != -1) {
                return __BRYTHON__.$call(window.MissingObjectError_cn)(message);
        } else if (["pt"].indexOf(RUR.state.human_language) != -1) {
                return __BRYTHON__.$call(window.MissingObjectError_pt)(message);
        } else {
            return __BRYTHON__.$call(window.MissingObjectError_fr)(message);
        }
    }
    this.name = "MissingObjectError";
    this.message = message;
    this.reeborg_failure = message;
};
