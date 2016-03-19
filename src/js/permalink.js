
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
    } else if (url_query.queryKey.proglang !== undefined) {  // old permalinks
        if (url_query.queryKey.proglang.startsWith("python")) {
            mode = "python";
        } else {
            mode = "javascript";
        }
    } else if (localStorage.getItem("programming-mode")) {
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
    } else if (url_query.queryKey.proglang !== undefined) {  // old permalinks
        if (url_query.queryKey.proglang.endsWith("fr")) {
            lang = "fr";
        } else {
            lang = 'en';
        }
    } else if (localStorage.getItem("human_language")) {
        lang = localStorage.getItem("human_language");
    } else {
        lang = 'en';
    }
    document.getElementById('human-language').value = lang;
    $("#human-language").change();
};


RUR.permalink.update = function (arg, shortname) {
    "use strict";
    var url_query, mode, name, tmp;

	if (RUR.permalink_update_previous_arg === undefined) {
		RUR.permalink_update_previous_arg = arg;
	} else if (RUR.permalink_update_previous_arg === arg) {
		return;
	} else {
		RUR.permalink_update_previous_arg = arg;
	}

    if (arg !== undefined) {
        url_query = parseUri(arg);
    } else {
        url_query = parseUri($("#url-input-textarea").val());
    }

    RUR.permalink.set_language(url_query);
    RUR.permalink.set_mode(url_query);

    if ( url_query.queryKey.editor !== undefined) { // old permalink
        editor.setValue(decodeURIComponent(url_query.queryKey.editor));
    }
    if (RUR.state.programming_language == "python" &&
       url_query.queryKey.library !== undefined) {  // old permalink
        library.setValue(decodeURIComponent(url_query.queryKey.library));
    }
    /* The world can contain some content for the editor and the library which
       would potentially replace what's defined in the permalink.
     */
    if (url_query.queryKey.world !== undefined) {
        RUR.world.import_world(decodeURIComponent(url_query.queryKey.world));
        if (shortname !== undefined) {
            RUR.storage.save_world(shortname);
        } else {
            RUR.storage.save_world(RUR.translate("PERMALINK"));
        }
    }

    $("#url-input").hide();
    $("#permalink").removeClass('active-element');
    $("#permalink").addClass('blue-gradient');
};

record_id("replace-permalink", "REPLACE PERMALINK");
record_id("replace-permalink-text", "REPLACE PERMALINK EXPLAIN");
$("#replace-permalink").on("click", function (evt) {
    RUR.permalink.update();
});

record_id("cancel-permalink", "CANCEL");
$("#cancel-permalink").on("click", function (evt) {
    $('#url-input').hide();
    $("#permalink").removeClass('active-element');
    $("#permalink").addClass('blue-gradient');
});

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
