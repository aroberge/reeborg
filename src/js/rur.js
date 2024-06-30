/** @namespace RUR
 * @desc The namespace reserved for all the Reeborg World methods.
 * All the method documented here **must** be prefixed by `RUR`.
 *
 * When a `name` must be specified, and your language is set
 * to something else than English (currently only French is fully supported; and Korean
 * is mostly supported for object names), you should specify the French (or Korean) name.
 * Internally, the names are converted into English and missing translations are
 * ignored so you might get away with using English names.
 *
 * To see what name to use, execute `RUR.show_all_things()` and see if a translated
 * name exists for the language Reeborg's World is currently using.
 *
 * _Si vous utilisez l'interface française, il est recommandé de spécifier le nom
 * des "choses" en français._
 */

window.RUR = RUR || {}; // RUR should be already defined in the html file;
                        // however, it might not when running tests.

/* In order to make it easier to have a version of Reeborg's World
   installed on different servers, or from different location with
   respect to the base directory, we use RUR.BASE_URL as global variables that
   is used to obtain the relative path to use when loading various
   files elsewhere */
var pathname;
try {
    pathname = window.location.pathname;  // not defined for unit tests
    if (pathname.indexOf("qunit") !== -1 ){  // running integration/qunit test
        RUR.BASE_URL = '../..';
    } else {
        RUR.BASE_URL = window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/'));
    }
} catch (e) {
    RUR.BASE_URL = '';
}


/*========================================================
  Namespaces
==========================================================*/

RUR.initial_defaults = {};
RUR.listeners = {};
RUR.utils = {};
RUR.world_utils = {};
RUR.UnitTest = {}; // used to provide links to function mused for unit tests
RUR.state = {};    /* Reeborg's World can be in different states
                      (running a program, editing a world, etc.) and the
                      behaviour of some features can be affected (
                      e.g. enabled or disabled) depending on that state.*/
RUR.public = {}; // To be used by world creators.


/*========================================================
  Global containers

  These are never reset; they only grow
==========================================================*/

RUR.THINGS = {}; // something which can be drawn, like "token"
RUR.KNOWN_THINGS = []; // keeping track of their names only
RUR.KNOWN_ROBOT_MODELS = [];
RUR.CANVASES = []; // html canvases ...
RUR.ALL_CTX = [];  // and their corresponding 2d context

/*========================================================
  Constants
==========================================================*/

RUR.EAST = 0;
RUR.NORTH = 1;
RUR.WEST = 2;
RUR.SOUTH = 3;
RUR.RANDOM_ORIENTATION = -1;
RUR.TILE_SIZE = RUR.DEFAULT_WALL_LENGTH = 40;
RUR.DEFAULT_WALL_THICKNESS = 4;
RUR.COORDINATES_COLOR = "black";
RUR.AXIS_LABEL_COLOR = "brown";
RUR.DEFAULT_TRACE_COLOR = "seagreen";
RUR.MAX_X_DEFAULT = 14; // These two values are used in the dialog used to resize
RUR.MAX_Y_DEFAULT = 12; // a world, hard-coded in the html dialog #dialog-set-dimensions.
RUR.END_CYCLE = "end cycle"; // for animated images

RUR.CHECKMARK = " ✓🤖"; // do not add multiple spaces; they are irrelevant for
// the display and prevent strip_checkmark from working correctly in all cases.

// The following are editors (content) that can be part of a world.
RUR.WORLD_EDITORS = ["description", "editor", "library", "pre", "post", "onload"];

/*========================================================
  World constants

  These can take different values based on world definition,
  but are otherwise constant within a given world.
==========================================================*/

RUR.USE_SMALL_TILES = false;
// The non-default values below can be cut in half when using worlds with small tiles.
RUR.SCALE = 1;
RUR.WALL_LENGTH = RUR.DEFAULT_WALL_LENGTH;
RUR.WALL_THICKNESS = RUR.DEFAULT_WALL_THICKNESS;

RUR.CURRENT_WORLD = null; // needs to be created explicitly
    // Note that, if at all possible, RUR.CURRENT_WORLD should not be used
    // directly in other javascript functions; some of the functions
    // defined near the end of this file should be used instead.

RUR.BACKGROUND_IMAGE = new Image();  // Background image whose src attribute
   // is set when importing a world.

RUR.HEIGHT = 550;
RUR.WIDTH = 625;
set_canvases(); // defined below and hoisted by javascript. It can
                // redefine RUR.HEIGHT and RUR.WIDTH
RUR.MAX_Y = Math.floor(RUR.HEIGHT / RUR.WALL_LENGTH) - 1;
RUR.MAX_X = Math.floor(RUR.WIDTH / RUR.WALL_LENGTH) - 1;

/*========================================================
  User session configuration

  If changed, saved in the browser's local storage for use
  in later sessions.
==========================================================*/

RUR.GREEN = "green"; // for colour blind people; see
RUR.RED = "red";     // RUR.configure_red_green() below

/*=========================================================
  The following is potentially useful for world creators; if
  set to true, it will include the contents of the various
  editors when the world's description is shown.
==========================================================*/

RUR.SHOW_EDITORS_CONTENTS = false;

/*=========================================================
  Grid visibility when background tiles or background image
  would other wise hide it.

  This would be a value assigned to RUR.state.visible_grid
==========================================================*/

RUR.ALL_GRID_VISIBLE = 1;
RUR.PATH_ONLY = "grid_visible_on_path_only";

/*========================================================
  Some initial defaults
==========================================================*/
RUR.initial_defaults.human_language = 'en';
RUR.initial_defaults.input_method = 'python';

/*========================================================
   State changed through UI interaction or from initial URI
==========================================================*/

RUR.state.session_initialized = false; // when first loading the site

RUR.state.human_language = undefined;
RUR.state.input_method = undefined;
RUR.state.programming_language = undefined;

RUR.state.world_name = undefined;
RUR.state.world_url = undefined;
RUR.state.current_menu = undefined;

RUR.state.onload_programming_language = undefined; // determined by content of onload editor

RUR.state.x = undefined; // recorded mouse clicks
RUR.state.y = undefined;

RUR.state.run_button_clicked = false;
RUR.state.playback = false;  // from pause/play/stop
RUR.state.highlight = true;
RUR.state.watch_vars = false;
RUR.state.editing_world = false;

RUR.state.extra_code_visible = false;

RUR.state.user_progress = {}; // names of worlds solved
RUR.state.user_solutions = {}; // programs for worlds solved


// This will keep track of the current font size if changed by the user.
RUR.state.editors_font_size = undefined;

RUR.state.ui_ready = false;

/*========================================================

   Animated images

==========================================================*/

// when user add new robot images or, more importantly, replace existing ones
RUR.state.reset_default_robot_images_needed = false;


RUR.reset_animated_images = function () {
    // Per-program containers ensuring that proper animation sequence is respected
    RUR._ORDERED = {};
    RUR._SYNC = {};
    RUR._SYNC_VALUE = {};
    RUR._CYCLE_STAY = {};
    RUR._CYCLE_REMOVE = {};
    RUR.ANIMATION_TIME = 120; // time delay between each new image in animation
    //
    RUR.ROBOT_ANIMATION_TIME = 150;
    RUR.state.animated_robots = false; // set to true when we add animated robots
};

RUR.reeborg_default_model = "classic"; // global default; never reset

RUR.reset_pre_run_defaults = function () {
    // by contrast with RUR.reeborg_default_model above, the user selection can
    // be temporarily overriden by a program; it is thus reset each time.
    try { // localStorage not defined during unit tests
        RUR.user_selected_model = localStorage.getItem("robot_default_model");
    } catch (e) {}

    /* recording and playback values */
    RUR.frames = [];
    RUR.nb_frames = 0;
    RUR.current_frame_no = 0;
    RUR.current_line_no = undefined;
    RUR.rec_line_numbers = [];
    RUR.state.playback = false;
    RUR.state.error_recorded = false;
    RUR.state.do_not_record = false;
    RUR.watched_expressions = [];
    //RUR._max_lineno_highlighted = 0; need to erase highlights first in RUR.reset_world
    clearTimeout(RUR._TIMER);
    RUR.state.code_evaluated = false;
        // sound has to be turned on explicitly, each time a program is run.
    RUR.state.sound_id = undefined;
    RUR.state.sound_on = false;
        // When loading a file using a World() instruction in a program,
        // we do not want the rest of the program to execute; this is then
        // set to true.
    RUR.state.prevent_playback = false;

    RUR.state.visible_grid = false; /* if true, will be shown above tiles */
    RUR.public = {}; // reset

    RUR.state.do_not_draw_info = false; // see document titled
                    // "How to show just the path followed by Reeborg"

    /* Avoiding infinite loops */
    RUR.MAX_STEPS = 1000; // maximum nb of instructions in a user program;
                          // user-adjustable via max_nb_instructions() in French
                          // or set_max_nb_steps() in English

    /* time frames */
    RUR.PLAYBACK_TIME_PER_FRAME = 300; // ajustable by a program via think()
    RUR.MIN_TIME_SOUND = 250; // if RUR.PLAYBACK_TIME_PER_FRAME is below
                              // this value, no sound will be heard
    RUR.reset_animated_images(); // see above; will reset RUR.ANIMATION_TIME and
                                 // RUR.ROBOT_ANIMATION_TIME

    /* extra frame insertion */
    RUR.state.frame_insertion_called = false;
    RUR.frame_insertion = undefined; // special function available to world creators

    /* others */
    RUR.state.evaluating_onload = false; // true/false toggle in RUR.process_onload
    RUR.state.specific_object = undefined; // used only in menu-driven world editor

    RUR.__python_error = false; // used to catch Python error in custom format

    RUR.current_maze = undefined; // special namespace when mazes are created

    RUR.state.done_executed = 0; // = false in both Python and Javascript
                                // Used to monitor if done is used 
                                // preventing the evaluation of Post code.

    RUR.print_cache = '';  // capturing the standard output from a user's program.

    // The following may be specified by a world creator to replace the
    // standard/default message when a goal is checked at the end of a run
    RUR.success_custom_message = undefined;
    RUR.failure_custom_message = undefined;

};
RUR.reset_pre_run_defaults();


/* Every time we load an image elsewhere, we should have defined the
   onload method to be RUR.onload_new_image.
*/
RUR.onload_new_image = function  () {
    // we do not require the file in which it is defined
    // to avoid a circular import.
    if (RUR.vis_world === undefined) { // not ready yet
        return;
    }
    redraw_all();
};

var initial_drawing_timer, last_drawing_time = Date.now();
function redraw_all() {
    // redraws everything with intervals at least greater than 200 ms
    // to avoid consuming a lot of time redrawing the world initially
    // every time an image is loaded.
    var now, elapsed;
    now = Date.now();
    elapsed = now - last_drawing_time;
    clearTimeout(initial_drawing_timer);
    if (elapsed > 200) {
        try{
            RUR.vis_world.draw_all();
            last_drawing_time = now;
        } catch (e) {}
    } else { // the last image loaded may never be drawn if we do not do this:
        initial_drawing_timer = setTimeout(redraw_all, 200);
    }
}

/*----------------------------------------------------------------
 We use multiple canvases to facilitate the drawing of objects
 without having to worry much about the order in which we draw
 the various types of objects.

 The order in which the canvases are overlayed one on top of another
 is set in the CSS file and should not be inferred from the
 Javascript code below (even though we try to keep them in the same order)

 When doing integration tests, the canvases are defined; when doing unit tests,
 they are not. So we enclose these definitions in a function
 that does ignores canvases when appropriate.
*/
function set_canvases () {
    if (window.document === undefined) { // doing unit tests
        return;
    }

    function create_ctx(canvas, ctx) {
        RUR[ctx] = canvas.getContext("2d");
        RUR.CANVASES.push(canvas);
        RUR.ALL_CTX.push(RUR[ctx]);
    }

    RUR.BACKGROUND_CANVAS = document.getElementById("background-canvas"); //1
    create_ctx(RUR.BACKGROUND_CANVAS, "BACKGROUND_CTX");
    RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";
    // Get default width and height from html files; these are shared
    // by all canvases, and can be changed when a new world is
    // loaded or created
    RUR.HEIGHT = RUR.BACKGROUND_CANVAS.height;
    RUR.WIDTH = RUR.BACKGROUND_CANVAS.width;

    RUR.THINGS_CANVAS = document.getElementById("tiles-canvas");  //2
    create_ctx(RUR.THINGS_CANVAS, "TILES_CTX");

    RUR.THINGS_CANVAS_ANIM = document.getElementById("tiles-canvas-anim"); // 3
    create_ctx(RUR.THINGS_CANVAS_ANIM, "TILES_ANIM_CTX");

    RUR.BRIDGE_CANVAS = document.getElementById("bridge-canvas");  //4
    create_ctx(RUR.BRIDGE_CANVAS, "BRIDGE_CTX");

    RUR.BRIDGE_CANVAS_ANIM = document.getElementById("bridge-canvas-anim");  //5
    create_ctx(RUR.BRIDGE_CANVAS_ANIM, "BRIDGE_ANIM_CTX");

    RUR.DECORATIVE_OBJECTS_CANVAS = document.getElementById("decorative-objects-canvas"); // 6
    create_ctx(RUR.DECORATIVE_OBJECTS_CANVAS, "DECORATIVE_OBJECTS_CTX");

    RUR.DECORATIVE_OBJECTS_CANVAS_ANIM = document.getElementById("decorative-objects-canvas-anim"); // 7
    create_ctx(RUR.DECORATIVE_OBJECTS_CANVAS_ANIM, "DECORATIVE_OBJECTS_ANIM_CTX");

    RUR.OBSTACLES_CANVAS = document.getElementById("obstacles-canvas"); // 8
    create_ctx(RUR.OBSTACLES_CANVAS, "OBSTACLES_CTX");

    RUR.OBSTACLES_CANVAS_ANIM = document.getElementById("obstacles-canvas-anim"); // 9
    create_ctx(RUR.OBSTACLES_CANVAS_ANIM, "OBSTACLES_ANIM_CTX");

    RUR.GOAL_CANVAS = document.getElementById("goal-canvas"); // 10
    create_ctx(RUR.GOAL_CANVAS, "GOAL_CTX");

    // 11 removed

    RUR.GOAL_CANVAS_ANIM = document.getElementById("goal-canvas-anim"); //12
    create_ctx(RUR.GOAL_CANVAS_ANIM, "GOAL_ANIM_CTX");

    RUR.OBJECTS_CANVAS = document.getElementById("objects-canvas");  //13
    create_ctx(RUR.OBJECTS_CANVAS, "OBJECTS_CTX");

    RUR.OBJECTS_CANVAS_ANIM = document.getElementById("objects-canvas-anim"); //14
    create_ctx(RUR.OBJECTS_CANVAS_ANIM, "OBJECTS_ANIM_CTX");

    RUR.TRACE_CANVAS = document.getElementById("trace-canvas"); //15
    create_ctx(RUR.TRACE_CANVAS, "TRACE_CTX");

    // line drawing on canvas is drawn on overlapping pixels; 
    // see https://stackoverflow.com/a/7531540/558799 and
    // https://stackoverflow.com/a/13884434/558799 for an explanation.
    // Rather than adding 0.5 pixel each time we with to draw a line,
    // we shift the entire trace canvas by 0.5, and can work with integer
    // values.
    RUR.TRACE_CTX.translate(0.5, 0.5);


    RUR.PUSHABLES_CANVAS = document.getElementById("pushables-canvas"); //16
    create_ctx(RUR.PUSHABLES_CANVAS, "PUSHABLES_CTX");

    RUR.PUSHABLES_CANVAS_ANIM = document.getElementById("pushables-canvas-anim"); //17
    create_ctx(RUR.PUSHABLES_CANVAS_ANIM, "PUSHABLES_ANIM_CTX");

    RUR.WALL_CANVAS = document.getElementById("wall-canvas"); //18
    create_ctx(RUR.WALL_CANVAS, "WALL_CTX");

    RUR.ROBOT_CANVAS = document.getElementById("robot-canvas"); //19
    create_ctx(RUR.ROBOT_CANVAS, "ROBOT_CTX");

    RUR.ROBOT_ANIM_CANVAS = document.getElementById("robot-anim-canvas"); //20
    create_ctx(RUR.ROBOT_ANIM_CANVAS, "ROBOT_ANIM_CTX");
}

/*-------------------------------------------
 World-related functions;
 Most of these are left without JSdoc-type comments as they are intended
 only for internal usage.
---------------------------------------------*/
RUR.get_current_world = function () {
    return RUR.CURRENT_WORLD;
};

/** @function world_map
 * @memberof RUR
 * @instance
 *
 * @desc  This function returns a World as a json object. Since the
 *  internal structure of worlds is subject to change, it is
 *  not advised to make use of this function inside a world definition.
 *
 *  However, **when using Javascript**, it can be useful as a means to explore
 *  the world structure, or assign advanced students to write their own
 *  functions based on the world structure (for example: find
 *  the shortest path in a maze using various search algorithms.)
 *
 * **When using Python, see `SatelliteInfo()` instead.**
 *
 */

RUR.world_map = function () {
    "use strict";
    var world, i;
    // clone the world so as not to modify the original
    world = JSON.parse(JSON.stringify(RUR.get_current_world()));
    // we don't need the editor content
    for (i=0; i < RUR.WORLD_EDITORS.length; i++) {
        if (world[RUR.WORLD_EDITORS[i]] !== undefined) {
            delete world[RUR.WORLD_EDITORS[i]];
        }
    }
    return world;
};


RUR.set_current_world = function (world, merge_editors) {
    "use strict";
    var editor_name, i;
    // merge_editor is used when a copy of the world was obtained
    // using world_map, which removed the editor content.
    if (merge_editors) {
        for (i=0; i < RUR.WORLD_EDITORS.length; i++) {
            editor_name = RUR.WORLD_EDITORS[i];
            if (RUR.CURRENT_WORLD[editor_name] !== undefined) {
                world[editor_name] = RUR.CURRENT_WORLD[editor_name];
            }
        }
    }
    RUR.CURRENT_WORLD = world;
};


RUR.export_world = function (world) {
    var content, editor_name, i, world_copy;

    world_copy = RUR.clone_world(world);
    for (i=0; i < RUR.WORLD_EDITORS.length; i++) {
        editor_name = RUR.WORLD_EDITORS[i];
        content = world_copy[editor_name];
        /* editors content can be saved either as a string (old format)
           with embedded new lines characters or as an array of lines (new format)
           */
        if (content !== undefined && typeof content == "string") {
            world_copy[editor_name] = content.split("\n");
        }
    }    
    return JSON.stringify(world_copy, null, 2);
};


RUR.clone_world = function (world) {
    if (world === undefined) {
        return JSON.parse(JSON.stringify(RUR.get_current_world()));
    } else {
        return JSON.parse(JSON.stringify(world));
    }
};


/** @function print_world_map
 * @memberof RUR
 * @instance
 *
 * @desc Prints a formatted version of the world map.
 * For Python, use `SatelliteInfo.print_world_map()` instead.
 *
 */

RUR.print_world_map = function () {
    RUR.output.write(JSON.stringify(RUR.world_map(), null, 2), "\n");
};


// Used by SatelliteInfo class in Python
RUR._world_map = function () {
    return JSON.stringify(RUR.world_map(), null, 2);
};

/** @function print_maze
 * @memberof RUR
 * @instance
 *
 * @desc Prints a formatted version of the current maze info if a maze exists.
 *
 */
RUR.print_maze = function () {
    var maze = RUR.world_map().maze;
    if (maze === undefined) {
        RUR.output.write("undefined\n");
    } else {
        RUR.output.write(JSON.stringify(maze, null, 2), "\n");
    }
};

/** @function configure_red_green
 * @memberof RUR
 * @instance
 *
 * @desc  Colour blind users may use this function to choose two colours,
 * instead of red and green, to indicate if the number of objects required
 * as a goal at a given location has been achieved or not.  The choices made
 * are saved in the browser's local storage and should only need to be
 * entered once.
 *
 * @param {string} red A colour indicated either as a named colour, like
 * `"red"`, `"indigo"`, etc., an rgb value like `"rgb(125, 34, 22)"`,
 * or an rgba value, or a hexadecimal colour like `"#FA2336"`.
 *
 * @param {string} green Another colour, seen as contrasting with `red` by
 * the user.
 */
RUR.configure_red_green = function (red, green) {
    RUR.GREEN = green;
    RUR.RED = red;
    localStorage.setItem("userchoice_red", red);
    localStorage.setItem("userchoice_green", green);
};

//--------------------------------------------------------
// We communicate information to the user using various
// styled dialog windows; this generic function specifies
// which dialog (html "element") to use and the content to
// display to the user.
//
RUR.show_feedback = function (element, content) {
    $(element).html(content).dialog("open");
};


/** @function randint
 * @memberof RUR
 * @instance
 * @desc Like the Python function random.randit, it returns a
 * random integer in range [min, max], including both end points.
 * @param [integer] min
 * @param [integer] max
 */
RUR.randint = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


RUR.hide_end_dialogs = function () {
    $("#Reeborg-success").html("");
    $("#Reeborg-failure").html("");
    $("#Reeborg-success").dialog("close");
    $("#Reeborg-failure").dialog("close");
    // reset the options in case the user has dragged the dialogs as it would
    // then open at the top left of the window
    $("#Reeborg-success").dialog("option", {minimize: false, maximize: false,
        autoOpen:false, width:500, dialogClass: "concludes",
        position:{my: "left", at: "left", of: $("#editor-panel")}});
    $("#Reeborg-failure").dialog("option", {minimize: false, maximize: false,
        autoOpen:false, width:500, dialogClass: "alert",
        position:{my: "left", at: "left", of: $("#editor-panel")}});
};