
/*  Purpose of this file: abstract handling of menus so that all jQuery
    dependencies (and possibly obscure syntax in some cases) can be pulled
    away from other files.

    The world menu is currently an html select element with
    id = select_world.  Doing a global search for "#select_world" should
    only find items in this file.
*/

require("jquery");

RUR.world_select = {};

RUR.world_select.empty_menu = function () {
    $("#select_world").html('');
};

RUR.world_select.set_default = function () {
    $("#select_world").selectedIndex = 0;
    $("#select_world").change();
};

RUR.world_select.set_url = function (url) {
    $('#select_world').val(url);
    $("#select_world").change();
};

RUR.world_select.get_selected = function () {
    "use strict";
    var select, index, url, shortname;
    select = document.getElementById("select_world");
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

RUR.world_select.url_from_shortname = function (shortname) {
    // if exists, returns the corresponding url
    "use strict";
    var i, select;
    select = document.getElementById("select_world");
    shortname = shortname.toLowerCase();

    for (i=0; i < select.options.length; i++){
        if (select.options[i].text.toLowerCase() === shortname) {
            return select.options[i].value;
        }
    }
    return undefined;
};

RUR.world_select.replace_shortname = function (url, shortname) {
    "use strict";
    var i, select;
    select = document.getElementById("select_world");
    url = url.toLowerCase();

    for (i=0; i < select.options.length; i++){
        if (select.options[i].value.toLowerCase() === url) {
            select.options[i].text = shortname;
            return true;
        }
    }
    return false;
};

RUR.world_select.append_world = function (arg) {
    "use strict";
    var option_elt, url, shortname;
    url = arg.url;

    if (arg.shortname !== undefined) {
        shortname = arg.shortname;
    } else {
        shortname = url;
    }

    // allow for special styling of any url containing the string "menu".
    if (url.indexOf('menu') != -1) {
        option_elt = '<option class="select-menu"></option>';
    } else if (arg.local_storage !== undefined){
        option_elt = '<option class="select-local-storage"></option>';
    } else {
        option_elt = '<option></option>';
    }
    // Append only if new world.
    if (!RUR.world_select.replace_shortname(url, shortname)) {
        $('#select_world').append( $(option_elt).val(url).html(shortname));
    }
};
