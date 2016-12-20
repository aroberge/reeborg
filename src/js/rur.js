/** @namespace RUR 
 * @desc The namespace reserved for all the core Reeborg World methods.
 *
 */
window.RUR = RUR || {}; // RUR should be already defined in the html file;
                        // however, it might not when running tests.

/** @namespace FUNC_TESTS 
 * @desc Namespace used to hold global reference to functions
 * that are useful to perform some functional tests only.
 *
 */ 
window.FUNC_TESTS = {};


/** @namespace state
 * @memberof RUR
 * @desc Reeborg's World can be in different states (running a program,
 * editing a world, etc.) and the behaviour of some features can be affected
 * (e.g. enabled or disabled) depending on that state.
 * RUR.state is the name space used to group all constants describing
 * these various states
 */
RUR.state = {};

RUR.state.code_evaluated = false;
RUR.state.do_not_record = false;
RUR.state.editing_world = false;
RUR.state.highlight = true;
RUR.state.human_language = "en";
RUR.state.input_method = "python";
RUR.state.evaluating_onload = false;
RUR.state.programming_language = "python";
RUR.state.playback = false;
RUR.state.prevent_playback = false;
RUR.state.session_initialized = false;
RUR.state.sound_id = undefined;
RUR.state.sound_on = false;
RUR.state.specific_object = undefined;
RUR.state.stop_called = false;
RUR.state.watch_vars = false;
RUR.state.x = undefined;
RUR.state.y = undefined;
RUR.state.changed_cells = [];


// TODO: see if worthwhile to create RUR.state.do_highlight()
// this would be to combine all the flags required to have highlighting on

// TODO: after simplifying the permalink, see if RUR.state.prevent_playback
// is still needed.


/*============================================
    CONSTANTS

 Yes, I know, global variables are a terrible thing.
======================================================*/

RUR.EAST = 0;
RUR.NORTH = 1;
RUR.WEST = 2;
RUR.SOUTH = 3;

// all images are assumed to be of this size.
RUR.TILE_SIZE = 40;

// current default canvas size.
RUR.DEFAULT_HEIGHT = 550;
RUR.DEFAULT_WIDTH = 625;

// We use multiple canvases to facilitate the drawing of objects
// without having to worry much about the order in which we draw
// the various types of objects.
// 
// However, when doing unit tests (not functional tests), we do not
// have canvases defined; so we enclose these definitions in a function
// that does ignores canvases when appropriate.
function set_canvases () {
    if (window.document === undefined) { // when doing unit tests - not functional tests
        return;
    }
    RUR.CANVASES = [];

    RUR.BACKGROUND_CANVAS = document.getElementById("background-canvas");
    RUR.BACKGROUND_CTX = RUR.BACKGROUND_CANVAS.getContext("2d");
    // Get default width and height from html files; these are shared
    // by all canvases, and can be changed when a new world is
    // loaded or created
    RUR.HEIGHT = RUR.BACKGROUND_CANVAS.height;
    RUR.WIDTH = RUR.BACKGROUND_CANVAS.width;
    RUR.CANVASES.push(RUR.BACKGROUND_CANVAS);

    RUR.TILES_CANVAS = document.getElementById("tiles-canvas");
    RUR.TILES_CTX = RUR.TILES_CANVAS.getContext("2d");
    RUR.CANVASES.push(RUR.TILES_CANVAS);

    RUR.TILES_CANVAS_ANIM = document.getElementById("tiles-canvas-anim");
    RUR.TILES_ANIM_CTX = RUR.TILES_CANVAS_ANIM.getContext("2d");
    RUR.CANVASES.push(RUR.TILES_CANVAS_ANIM);

    RUR.OBSTACLES_CANVAS = document.getElementById("obstacles-canvas");
    RUR.OBSTACLES_CTX = RUR.OBSTACLES_CANVAS.getContext("2d");
    RUR.CANVASES.push(RUR.OBSTACLES_CANVAS);

    RUR.OBSTACLES_CANVAS_ANIM = document.getElementById("obstacles-canvas-anim");
    RUR.OBSTACLES_ANIM_CTX = RUR.OBSTACLES_CANVAS_ANIM.getContext("2d");
    RUR.CANVASES.push(RUR.OBSTACLES_CANVAS_ANIM);

    RUR.GOAL_CANVAS = document.getElementById("goal-canvas");
    RUR.GOAL_CTX = RUR.GOAL_CANVAS.getContext("2d");
    RUR.CANVASES.push(RUR.GOAL_CANVAS);

    RUR.GOAL_CANVAS_ANIM = document.getElementById("goal-canvas-anim");
    RUR.GOAL_ANIM_CTX = RUR.GOAL_CANVAS_ANIM.getContext("2d");
    RUR.CANVASES.push(RUR.GOAL_CANVAS_ANIM);

    RUR.OBJECTS_CANVAS = document.getElementById("objects-canvas");
    RUR.OBJECTS_CTX = RUR.OBJECTS_CANVAS.getContext("2d");
    RUR.CANVASES.push(RUR.OBJECTS_CANVAS);

    RUR.OBJECTS_CANVAS_ANIM = document.getElementById("objects-canvas-anim");
    RUR.OBJECTS_ANIM_CTX = RUR.OBJECTS_CANVAS_ANIM.getContext("2d");
    RUR.CANVASES.push(RUR.OBJECTS_CANVAS_ANIM);

    RUR.TRACE_CANVAS = document.getElementById("trace-canvas");
    RUR.TRACE_CTX = RUR.TRACE_CANVAS.getContext("2d");
    RUR.CANVASES.push(RUR.TRACE_CANVAS);

    RUR.ROBOT_CANVAS = document.getElementById("robot-canvas");
    RUR.ROBOT_CTX = RUR.ROBOT_CANVAS.getContext("2d");
    RUR.CANVASES.push(RUR.ROBOT_CANVAS);
    RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";
}
set_canvases();

RUR.WALL_LENGTH = 40;   // These can be adjusted
RUR.WALL_THICKNESS = 4;  // elsewhere if RUR.CURRENT_WORLD.small_tiles become true.

RUR.MAX_Y = Math.floor(RUR.HEIGHT / RUR.WALL_LENGTH) - 1;
RUR.MAX_X = Math.floor(RUR.WIDTH / RUR.WALL_LENGTH) - 1;
// the current default values of RUR.MAX_X and RUR.MAX_Y on the fixed-size
// canvas work out to be 14 and 12 respectively: these seem to be appropriate
// values for the lower entry screen resolution.  The following are meant
// to be essentially synonymous - but are also meant to be used only if/when
// specific values are not used in the "new" dialog that allows them to be specified
// worlds created.  Everywhere else, RUR.MAX_X and RUR.MAX_Y should be used.
RUR.MAX_X_DEFAULT = 14;
RUR.MAX_Y_DEFAULT = 12;
RUR.USE_SMALL_TILES = false;

RUR.WALL_COLOR = "brown";   // changed (toggled) in world_editor.js
RUR.SHADOW_WALL_COLOR= "#f0f0f0";    // changed (toggled) in world_editor.js
RUR.GOAL_WALL_COLOR = "black";
RUR.COORDINATES_COLOR = "black";
RUR.AXIS_LABEL_COLOR = "brown";

RUR.MAX_STEPS = 1000;
RUR.MIN_TIME_SOUND = 250;

RUR.DEFAULT_TRACE_COLOR = "seagreen";

RUR.KNOWN_TILES = [];
RUR.ANIMATION_TIME = 120;

RUR.BACKGROUND_IMAGE = new Image();
RUR.BACKGROUND_IMAGE.src = '';

var pathname;
try {
    pathname = window.location.pathname;  // not defined for tape tests
    if (pathname.indexOf("qunit") !== -1 ){  // running qunit test
        RUR._BASE_URL = '../..';
    } else {
        RUR._BASE_URL = window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/'));
    }
} catch (e) {
    RUR._BASE_URL = '';
}