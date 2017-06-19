
require("./../programming_api/output.js");
require("./../recorder/recorder.js");
require("./../editors/update.js");
require("./../world_utils/import_world.js");
require("./../ui/world_select.js");
require("./../permalink/permalink.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../listeners/stop.js");
require("./../utils/supplant.js");

RUR.file_io = {};

RUR.file_io.load_world_from_program = function (url, shortname) {
    /*  Loads a world or permalink from a user's program using World()

    Possible choices:
        World(shortname)  where shortname is an existing name in html select
            example:  World ("Home 1")

            Another case is where a world in saved in local storage;
            in this case, the url must be modified by the user as in
            World("user_world:My World")

        World(url)  where url is a world or permalink located elsewhere
            example: World("http://personnel.usainteanne.ca/aroberge/reeborg/token.json")
            In this case, the url will be used as a shortname to appear in the menu

        World(url, shortname) where url is a world or permalink located elsewhere
            and shortname is the name to appear in the html select.

        If "url" already exists and is the selected world BUT shortname is
        different than the existing name, a call
        World(url, shortname)
        will result in the shortname being updated.
    */
    "use strict";
    var selected, possible_url, new_world=false, new_selection=false;
    RUR.file_io.status = undefined;

    //TODO: see if we can replace this by an exception, and get rid of
    //the RUR.output dependency.
    if (url === undefined) {
        RUR.output.write(RUR.translate("World() needs an argument."));
        return;
    }

    if (shortname === undefined) {
        shortname = url;
        possible_url = RUR.world_select.url_from_shortname(shortname);
        if (possible_url !== undefined){
            url = possible_url;
        }
    }

    selected = RUR.world_select.get_selected();

    if (selected.shortname.toLowerCase() === shortname.toLowerCase()) {
        // We never pay attention to the return value in the main program.
        // However, it is useful for testing purpose.
        return "no world change";
    } else if (selected.url === url && shortname != selected.shortname) {
        RUR.world_select.replace_shortname(url, shortname);
        return;
    } else if (RUR.world_select.url_from_shortname(shortname)!==undefined){
        url = RUR.world_select.url_from_shortname(shortname);
        new_selection = shortname;
    }  else {
        new_world = shortname;
    }

    RUR.file_io.load_world_file(url, shortname);
    if (RUR.file_io.status === "no link") {
        RUR.show_feedback("#Reeborg-shouts", RUR.translate("Could not find link: ") + url);
        throw new RUR.ReeborgError(RUR.translate("Could not find link: ") + url);
    } else if (RUR.file_io.status === "success") {
        RUR.state.prevent_playback = true;
        if (new_world) {
            RUR.world_select.append_world({url:url, shortname:new_world});
        }
        RUR.world_select.set_url(url);
        RUR.stop();
        throw new RUR.ReeborgOK(RUR.translate("World selected").supplant({world: shortname}));
    }
};

RUR.file_io.last_url_loaded = undefined;
RUR.file_io.last_shortname_loaded = undefined;

RUR.file_io.load_world_file = function (url, shortname) {
    /** Loads a bare world file (json) or more complex permalink */
    "use strict";
    var data;
    if (RUR.file_io.last_url_loaded == url &&
        RUR.file_io.last_shortname_loaded == shortname) {
            return;
    } else {
        RUR.file_io.last_url_loaded = url;
        RUR.file_io.last_shortname_loaded = shortname;
    }
    if (url.substring(0,11) === "user_world:"){
        data = localStorage.getItem(url);
        if (data === null) {
            RUR.file_io.status = "no link";
            return;
        }
        RUR.world_utils.import_world(data);
        RUR.file_io.status = "success";
        RUR.frames = [];
    } else {
        $.ajax({url: url,
            async: false,
            error: function(e){
                RUR.file_io.status = "no link";
            },
            success: function(data){
                if (typeof data == "string" && data.substring(0,4) == "http"){
                    RUR.permalink.update(data, shortname);
                    RUR.reload();
                } else {
                    RUR.world_utils.import_world(data);
                }
                RUR.file_io.status = "success";
            }
        });
    }
};

/**
 * `load_js_module` makes it possible to modify Reeborg's World
 * by loading any javascript code and having it executed. To load
 * from other sites, CORS is used.
 *
 * Note that the CORS server may cache the result beyond our local
 * control. A script writer might be surprised to see that
 * things are not working as expected.
 */
RUR.load_js_module = function(url) {
    loadFile(url, eval_js);
};

function eval_js () {
    try {
        eval(this.responseText); //jshint ignore:line
    } catch (e) {
        console.error("error in attempting to evaluated loaded module");
        console.log(this.responseText);
        console.error(e);
    }
}
/* adapted from https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests */

function xhrSuccess () { this.callback.apply(this, this.arguments); }

function xhrError () { console.error(this.statusText); }

function loadFile (sURL, fCallback) {
  var oReq = new XMLHttpRequest();
  oReq.callback = fCallback;
  oReq.onload = xhrSuccess;
  oReq.onerror = xhrError;

  if (sURL.startsWith("http")){  // TODO: test this...
    sURL = 'http://cors-anywhere.herokuapp.com/' + sURL;
  }
  oReq.open("get", sURL, true);
  oReq.send(null);
}

// TODO: move to load_modules  (see above code too)
//       and ensure that it still works.
// TODO: add (q)unit tests

/* The purpose of install_extra is to enable extensions to Reeborg's World
   to be added.

   See also RUR.load_js_module()
*/
RUR.install_extra = function(url) {
    loadFile(url, RUR.extra_python_content);
};
/**
 * @function extra_python_content
 * @memberof RUR
 * @instance
 *
 * @desc "Installs" a python module defined as a string parameter to
 * this function. Whereas it can be used from both a Javascript or Python code,
 * multi-line code samples are **much** easier to write using Python.
 *
 * To be used as alternative to the Python function `install_extra` which
 * install a python module named `extra` from a url.
 *
 * @param {string} python_code The Python code which is the content of the
 * desired module
 *
 * @todo add example
 * @todo add tutorial
 */
RUR.extra_python_content = function (python_code) {
    if (python_code) {
        $("#extra").html(python_code);
    } else {
        $("#extra").html(this.responseText);
    }
}
window.get_extra_content = function () {
    var extra_content = $("#extra").html();
    console.log("extra content = ", extra_content);
    return extra_content;
};

