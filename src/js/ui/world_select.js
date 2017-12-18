/*  Purpose of this file: abstract handling of menus so that all jQuery
    dependencies (and possibly obscure syntax in some cases) can be pulled
    away from other files.
*/
require("../rur.js");
require("./user_progress.js");
require("../permalink/permalink.js");

var record_id = require("./../../lang/msg.js").record_id;
record_id("select-world");


RUR.listeners['select-world.change'] = function() {
    var url, name;
    if (RUR.state.creating_menu){
        return;
    }

    url = $("#select-world").val();
    name = $("#select-world").find(':selected').text();
    name = RUR.strip_checkmark(name);

    RUR.load_world_file(url, name);

    localStorage.setItem("world_name", name);
    localStorage.setItem("world_url", url);
    RUR.state.world_url = url;
    RUR.state.world_name = name;
    RUR.permalink.update_URI();
};


RUR.world_selector = {};
RUR.world_selector.update = function () {
    $("#select-world").change();
};

RUR.world_selector.empty_menu = function () {
    $("#select-world").html('');
};

RUR.world_selector.set_default = function () {
    document.getElementById("select-world").selectedIndex = 0;
    $("#select-world").change();
};

RUR.world_selector.set_url = function (url) {
    $('#select-world').val(url);
    $("#select-world").change();
};

RUR.world_selector.get_selected = function () {
    "use strict";
    var select, index, url, shortname;
    select = document.getElementById("select-world");
    index = select.selectedIndex;
    try {
        url = select.options[index].value;
        shortname = select.options[index].text;
    } catch (e) {
        url = select.options[0].value;
        shortname = select.options[0].text;
    }
    return {url:url, shortname:shortname};
};

RUR.world_selector.url_from_shortname = function (shortname) {
    // if exists, returns the corresponding url
    "use strict";
    var i, select, name;
    if (!shortname){  // shortname could be null
        return undefined;
    }
    select = document.getElementById("select-world");
    shortname = RUR.strip_checkmark(shortname.toLowerCase());

    for (i=0; i < select.options.length; i++){
        name = select.options[i].text.toLowerCase();
        name = RUR.strip_checkmark(name);
        if (name === shortname) {
            return select.options[i].value;
        }
    }
    return undefined;
};

RUR.world_selector.replace_shortname = function (url, shortname) {
    "use strict";
    var i, select;
    select = document.getElementById("select-world");
    url = url.toLowerCase();

    for (i=0; i < select.options.length; i++){
        if (select.options[i].value.toLowerCase() === url) {
            select.options[i].text = shortname;
            return true;
        }
    }
    return false;
};

RUR.world_selector.append_world = function (arg) {
    "use strict";
    var option_elt, url, shortname;
    url = arg.url;

    if (arg.shortname !== undefined) {
        shortname = RUR.add_checkmark(arg.shortname);
    } else {
        shortname = url;
    }

    if (!url) {
        console.trace();
        console.log("cannot append; url = ", url);
        return;
    }

    // allow for special styling of any url containing the string "menu".
    if (url.toLowerCase().indexOf('menu') != -1) {
        option_elt = '<option class="select-menu"></option>';
    } else if (arg.local_storage !== undefined){
        option_elt = '<option class="select-local-storage"></option>';
    } else {
        option_elt = '<option></option>';
    }
    // Append only if new world.
    if (!RUR.world_selector.replace_shortname(url, shortname)) {
        $('#select-world').append( $(option_elt).val(url).html(shortname));
    }
};
