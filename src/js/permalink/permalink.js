require("./../rur.js");

function parseUri (str) {
    // parseUri 1.2.2
    // (c) Steven Levithan <stevenlevithan.com>
    // MIT License
    var o   = parseUri.options,
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

RUR.permalink = {};
RUR.permalink.parseUri = parseUri;

RUR.permalink.update_URI = function() {
    "use strict";
    var url_query, permalink;

    // Do not mess up with URI during initialization 
    if (!RUR.state.session_initialized) {
        return;
    }
    // Permalinks shared to collaborate using Mozilla's TogetherJS should also
    // be left unchanged
    if (window.location.href.indexOf("#&togetherjs") != -1) {
        return;
    }

    url_query = parseUri(window.location.href);
    permalink = url_query.protocol + "://" + url_query.host;
    if (url_query.port){
        permalink += ":" + url_query.port;
    }
    permalink += url_query.path;

    permalink += "?lang=" + encodeURIComponent(RUR.state.human_language) +
                 "&mode=" + encodeURIComponent(RUR.state.input_method) +
                 "&menu=" + encodeURIComponent(RUR.state.current_menu) +                 
                 "&name=" + encodeURIComponent(RUR.state.world_name) +
                 "&url=" + encodeURIComponent(RUR.state.world_url);
    window.history.pushState("dummy", "dummy", permalink);
};
