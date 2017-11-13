
require("./../rur.js");
require("./../storage/storage.js");
require("./../editors/update.js");
require("./../translator.js");
require("./../listeners/programming_mode.js");
require("./../utils/parseuri.js");
require("./../editors/create.js");
// depends on filesaver.js loaded in main html page

var record_id = require("./../../lang/msg.js").record_id;


RUR.permalink = {};

RUR.permalink.set_mode = function (url_query) {
    "use strict";
    var mode;
    if (url_query.queryKey.mode !== undefined) {
        mode = url_query.queryKey.mode;
    }
    else if (localStorage.getItem("programming-mode")) {
        mode = localStorage.getItem("programming-mode");
    } else {
        mode = 'python';
    }

    document.getElementById('programming-mode').value = mode;
    $("#programming-mode").change();
    return mode;
};

RUR.permalink.set_language = function (url_query) {
    "use strict";
    var lang;
    if (url_query.queryKey.lang !== undefined) {
        lang = url_query.queryKey.lang;
    } else if (localStorage.getItem("human_language")) {
        lang = localStorage.getItem("human_language");
    } else {
        lang = 'en';
    }
    document.getElementById('human-language').value = lang;
    $("#human-language").change();
};

RUR.permalink.from_url = function(url_query) {
    var from_url=false, url=false, name=false;
    if (url_query.queryKey.url !== undefined) {
        url = decodeURIComponent(url_query.queryKey.url);
    }
    if (url_query.queryKey.name !== undefined) {
        name = decodeURIComponent(url_query.queryKey.name);
    }
    if (!(url || name)) {
        return false;
    } else {
        try { // see comment above
            if (url && name) {
                RUR._load_world_from_program(url, name);
            } else if (url) {
                RUR._load_world_from_program(url);
            } else {
                RUR._load_world_from_program(name);
            }
        } catch (e) {
            if (e.reeborg_concludes) {
                RUR.show_feedback("#Reeborg-concludes", e.reeborg_concludes);
                return true;
            } else if (e.reeborg_shouts) {
                RUR.show_feedback("#Reeborg-shouts", e.reeborg_shouts);
            } else {
                console.log("unidentified error", e);
            }
            return false;
        }
        return true;
    }
};

// for embedding in iframe
// update() missing so this raises an error.
// addEventListener("message", receiveMessage, false);
// function receiveMessage(event){
//     RUR.permalink.update(event.data);
// }
