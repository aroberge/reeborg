
require("./state.js");
require("./storage.js");
require("./world.js");
require("./translator.js");
require("./listeners/programming_mode.js");
require("./utils/parseuri.js");
require("./create_editors.js");

var export_world = require("./world/export_world.js").export_world;
var record_id = require("./../lang/msg.js").record_id;

record_id("save-permalink", "Save");
record_id("save-permalink-text", "Save permalink explanation");
$("#save-permalink").on("click", function (evt) {
    var blob = new Blob([RUR.permalink.__create()], {
        type: "text/javascript;charset=utf-8"
    });
    saveAs(blob, "filename"); // saveAs defined in src/libraries/filesaver.js
});

/* IMPORTANT: we attempt to maintain compatibility with the old permalinks
   format below.
 */

RUR.permalink = {};

RUR.permalink.__create = function () {
    "use strict";
    var proglang, world, _editor, _library, url_query, permalink;
    url_query = parseUri(window.location.href);

    permalink = url_query.protocol + "://" + url_query.host;
    if (url_query.port){
        permalink += ":" + url_query.port;
    }
    permalink += url_query.path;
    proglang = RUR.state.programming_language + "-" + RUR.state.human_language;
    world = encodeURIComponent(export_world());
    _editor = encodeURIComponent(editor.getValue());
    if (RUR.state.programming_language == "python") {
        _library = encodeURIComponent(library.getValue());
        permalink += "?proglang=" + proglang + "&world=" + world + "&editor=" + _editor + "&library=" + _library;
    } else {
        permalink += "?proglang=" + proglang + "&world=" + world + "&editor=" + _editor;
    }
    return permalink;
};


record_id("permalink", "PERMALINK");
$("#permalink").on("click", function (evt) {
    RUR.permalink.create();
});
RUR.permalink.create = function () {
    var permalink = RUR.permalink.__create();

    $("#url-input-textarea").val(permalink);
    $("#url-input").toggle();
    return false;
};

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
                RUR.file_io.load_world_from_program(url, name);
            } else if (url) {
                RUR.file_io.load_world_from_program(url);
            } else {
                RUR.file_io.load_world_from_program(name);
            }
        } catch (e) {
            if (e.reeborg_concludes) {
                RUR.show_feedback("#Reeborg-concludes", e.reeborg_concludes);
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

/* IMPORTANT : keep version of copy to clipboard. */
// copy to clipboard
record_id("copy-permalink", "COPY");
record_id("copy-permalink-text", "COPY PERMALINK EXPLAIN");
$("#copy-permalink").on("click", function (evt) {
    document.querySelector('#url-input-textarea').select();
    document.execCommand('copy');
});

// for embedding in iframe
addEventListener("message", receiveMessage, false);
function receiveMessage(event){
    RUR.permalink.update(event.data);
}
