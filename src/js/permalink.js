
RUR.permalink = {};

// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
}

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};


RUR.permalink.__create = function () {
    "use strict";
    var proglang, world, _editor, _library, url_query, permalink, parts;
    url_query = parseUri(window.location.href);

    permalink = url_query.protocol + "://" + url_query.host;
    if (url_query.port){
        permalink += ":" + url_query.port;
    }
    permalink += url_query.path;
    proglang = RUR.state.programming_language + "-" + RUR.state.human_language;
    world = encodeURIComponent(RUR.world.export_world());
    _editor = encodeURIComponent(editor.getValue());
    if (RUR.state.programming_language == "python") {
        _library = encodeURIComponent(library.getValue());
        permalink += "?proglang=" + proglang + "&world=" + world + "&editor=" + _editor + "&library=" + _library;
    } else {
        permalink += "?proglang=" + proglang + "&world=" + world + "&editor=" + _editor;
    }
    return permalink;
};


RUR.permalink.create = function () {
    var permalink;

    permalink = RUR.permalink.__create();

    $("#url_input_textarea").val(permalink);
    $("#url_input").toggle();
    $("#ok-permalink").removeAttr("disabled");
    $("#cancel-permalink").removeAttr("disabled");

    return false;
};


RUR.permalink.update = function (arg, shortname) {
    "use strict";
    var url_query, name;

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
        url_query = parseUri($("#url_input_textarea").val());
    }
    if (url_query.queryKey.proglang !== undefined &&
       url_query.queryKey.world !== undefined &&
       url_query.queryKey.editor !== undefined) {
        var prog_lang = url_query.queryKey.proglang;
        $('input[type=radio][name=programming_language]').val([prog_lang]);
        RUR.reset_programming_language(prog_lang);
        RUR.world.import_world(decodeURIComponent(url_query.queryKey.world));
        if (shortname !== undefined) {
            RUR.storage.save_world(shortname);
        } else {
            RUR.storage.save_world(RUR.translate("PERMALINK"));
        }
        editor.setValue(decodeURIComponent(url_query.queryKey.editor));
    }

    if (RUR.state.programming_language == "python" &&
       url_query.queryKey.library !== undefined) {
        library.setValue(decodeURIComponent(url_query.queryKey.library));
    }

    $("#url_input").hide();
    $("#permalink").removeClass('reverse-blue-gradient');
    $("#permalink").addClass('blue-gradient');
};

RUR.permalink.cancel = function () {
    $('#url_input').hide();
    $("#permalink").removeClass('reverse-blue-gradient');
    $("#permalink").addClass('blue-gradient');
};
