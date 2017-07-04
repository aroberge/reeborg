/** @namespace RUR
 * @desc The namespace reserved for all the core Reeborg World methods.
 *
 */

/*====================================================
 Yes, I know, global variables are a terrible thing.
======================================================*/

window.RUR = RUR || {}; // RUR should be already defined in the html file;
                        // however, it might not when running tests.
RUR.utils = {};
RUR.world_utils = {};
RUR.FuncTest = {};
RUR.UnitTest = {};

RUR.THINGS = {}; // javascript objects which can be drawn, like "token"
RUR.KNOWN_THINGS = []; // keeping track of their names only

/* In order to make it easier to have a version of Reeborg's World
   installed on different servers, or from different location with
   respect to the base directory, we introduce a global variables that
   is used to obtain the relative path to use when loading various
   files elsewhere */
var pathname;
try {
    pathname = window.location.pathname;  // not defined for unit tests
    if (pathname.indexOf("qunit") !== -1 ){  // running functional/qunit test
        RUR.BASE_URL = '../..';
    } else {
        RUR.BASE_URL = window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/'));
    }
} catch (e) {
    RUR.BASE_URL = '';
}

/* Reeborg's World can be in different states (running a program,
 * editing a world, etc.) and the behaviour of some features can be affected
 * (e.g. enabled or disabled) depending on that state.
 * RUR.state is the name space used to group all constants describing
 * these various states
 */
RUR.state = {};

RUR.state.code_evaluated = false;
RUR.state.do_not_record = false;
RUR.state.do_not_draw_info = false;
RUR.state.editing_world = false;
RUR.state.highlight = true;
RUR.state.human_language = "en";
RUR.state.input_method = "python";
RUR.state.error_recorded = false;
RUR.state.evaluating_onload = false;
RUR.state.frame_insertion_called = false;
RUR.state.onload_programming_mode = "javascript";
RUR.state.programming_language = "python";
RUR.state.playback = false;
RUR.state.prevent_playback = false;
RUR.state.reset_default_robot_images_needed = false;
RUR.state.refresh_needed = false;
RUR.state.run_button_clicked = false;
RUR.state.running_program = false;
RUR.state.session_initialized = false;
RUR.state.sound_id = undefined;
RUR.state.sound_on = false;
RUR.state.specific_object = undefined;
RUR.state.stop_called = false;
RUR.state.watch_vars = false;
RUR.state.x = undefined;
RUR.state.y = undefined;
RUR.state.changed_cells = [];
RUR.state.visible_grid = false;


/* Every time we load an image elsewhere, we should have defined the
   onload method to be RUR.onload_new_image.
*/
RUR.last_drawing_time = Date.now();
RUR.onload_new_image = function  () {
    // we do not require the file in which it is defined
    // to avoid a circular import.
    if (RUR.vis_world === undefined) { // not ready yet
        return;
    }
    redraw_all();
};

function redraw_all() {
    // redraws everything with intervals at least greater than 200 ms
    // to avoid consuming a lot of time redrawing the world initially
    // every time an image is loaded.
    var now, elapsed;
    now = Date.now();
    elapsed = now - RUR.last_drawing_time;
    if (elapsed > 200) {
        clearTimeout(RUR._initial_drawing_timer);
        RUR.vis_world.draw_all();
        RUR.last_drawing_time = now;
    } else { // the last image loaded may never be drawn if we do not do this:
        RUR._initial_drawing_timer = setTimeout(redraw_all, 200);
    }
}



// TODO: see if worthwhile to create RUR.state.do_highlight()
// this would be to combine all the flags required to have highlighting on

// TODO: after simplifying the permalink, see if RUR.state.prevent_playback
// is still needed.

RUR.EAST = 0;
RUR.NORTH = 1;
RUR.WEST = 2;
RUR.SOUTH = 3;

RUR.TILE_SIZE = 40;

// current default canvas size; can be changed based on world definition.
RUR.DEFAULT_HEIGHT = 550;
RUR.DEFAULT_WIDTH = 625;

// The following non-default values can be cut in half
// when using worlds with "small tiles".
RUR.WALL_LENGTH = RUR.DEFAULT_WALL_LENGTH = 40;
RUR.WALL_THICKNESS = RUR.DEFAULT_WALL_THICKNESS = 4;

//----------------------------------------------------------------
// We use multiple canvases to facilitate the drawing of objects
// without having to worry much about the order in which we draw
// the various types of objects.
//
// The order in which the canvases are overlayed one on top of another
// is set in the CSS file and should not be inferred from the
// Javascript code below.
//
// Note that, when doing unit tests (not functional tests), we do not
// have canvases defined; so we enclose these definitions in a function
// that does ignores canvases when appropriate.
function set_canvases () {
    if (window.document === undefined) {
        return;
    }
    RUR.CANVASES = [];
    RUR.ALL_CTX = [];

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

// We immediately create the canvases.
set_canvases();

RUR.MAX_Y = Math.floor(RUR.HEIGHT / RUR.WALL_LENGTH) - 1;
RUR.MAX_X = Math.floor(RUR.WIDTH / RUR.WALL_LENGTH) - 1;

// The current default values of RUR.MAX_X and RUR.MAX_Y on the fixed-size
// canvas work out to be 14 and 12 respectively: these seem to be appropriate
// values for the lower entry screen resolution.  The following are meant
// to be essentially synonymous - but are also meant to be used only if/when
// specific values are not used in the "new" dialog that allows them to be specified
// worlds created.  Everywhere else, RUR.MAX_X and RUR.MAX_Y should be used.
RUR.MAX_X_DEFAULT = 14;
RUR.MAX_Y_DEFAULT = 12;
RUR.USE_SMALL_TILES = false;

RUR.COORDINATES_COLOR = "black";
RUR.AXIS_LABEL_COLOR = "brown";

RUR.MAX_STEPS = 1000;
RUR.MIN_TIME_SOUND = 250;
RUR.PLAYBACK_TIME_PER_FRAME = 300;

RUR.DEFAULT_TRACE_COLOR = "seagreen";

RUR.ANIMATION_TIME = 120;
RUR.END_CYCLE = "end cycle"; // for animated images

RUR.BACKGROUND_IMAGE = new Image();
RUR.BACKGROUND_IMAGE.src = '';

// RUR.CURRENT_WORLD should not be used in other javascript functions;
// some of the functions defined below should be used instead.
RUR.CURRENT_WORLD = null; // needs to be created explicitly

/** @function get_current_world
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
 * **When using Python, see instead `SatelliteInfo()`.**
 */
RUR.get_current_world = function () {
    return RUR.CURRENT_WORLD;
};

// No need to document this with JSDoc as it should not be called by external users.
RUR.set_current_world = function (world) {
    RUR.CURRENT_WORLD = world;
}

RUR.export_world = function (world) {
    if (world === undefined) {
        return JSON.stringify(RUR.get_current_world(), null, 2);
    } else {
        return JSON.stringify(world, null, 2);
    }
};

RUR.clone_world = function (world) {
    if (world === undefined) {
        return JSON.parse(JSON.stringify(RUR.get_current_world()));
    } else {
        return JSON.parse(JSON.stringify(world));
    }
};



RUR.frame_insertion = undefined; // special function available to world creators

// for colour blind people
RUR.GREEN = "green";
RUR.RED = "red";
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