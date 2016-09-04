require("./rur.js");
RUR.EAST = 0;
RUR.NORTH = 1;
RUR.WEST = 2;
RUR.SOUTH = 3;

// all images are of this size.
RUR.TILE_SIZE = 40;

// current default canvas size.
RUR.DEFAULT_HEIGHT = 550;
RUR.DEFAULT_WIDTH = 625;

// TODO: set up all canvas in separate isolated function so that
// unit testing can be done more easily - with contants defined but without
// having to mock document.

RUR.CANVASES = [];

RUR.BACKGROUND_CANVAS = document.getElementById("background-canvas");
RUR.BACKGROUND_CTX = RUR.BACKGROUND_CANVAS.getContext("2d");
RUR.HEIGHT = RUR.BACKGROUND_CANVAS.height; // getting defaults
RUR.WIDTH = RUR.BACKGROUND_CANVAS.width;   // from html file
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

RUR.WALL_LENGTH = 40;   // These can be adjusted
RUR.WALL_THICKNESS = 4;  // elsewhere if RUR.CURRENT_WORLD.small_tiles become true.

RUR.ROWS = Math.floor(RUR.HEIGHT / RUR.WALL_LENGTH) - 1;
RUR.COLS = Math.floor(RUR.WIDTH / RUR.WALL_LENGTH) - 1;
// the current default values of RUR.COLS and RUR.ROWS on the fixed-size
// canvas work out to be 14 and 12 respectively: these seem to be appropriate
// values for the lower entry screen resolution.  The following are meant
// to be essentially synonymous - but are also meant to be used only if/when
// specific values are not used in the "new" dialog that allows them to be specified
// worlds created.  Everywhere else, RUR.COLS and RUR.ROWS should be used.
RUR.MAX_X = 14;
RUR.MAX_Y = 12;
RUR.USE_SMALL_TILES = false;

RUR.WALL_COLOR = "brown";   // changed (toggled) in world_editor.js
RUR.SHADOW_WALL_COLOR= "#f0f0f0";    // changed (toggled) in world_editor.js
RUR.GOAL_WALL_COLOR = "black";
RUR.COORDINATES_COLOR = "black";
RUR.AXIS_LABEL_COLOR = "brown";

RUR.MAX_STEPS = 1000;
RUR.MIN_TIME_SOUND = 250;

RUR.DEFAULT_TRACE_COLOR = "seagreen";

RUR.KNOWN_OBJECTS = [];
RUR.KNOWN_TILES = [];
RUR.KNOWN_OBSTACLES = [];
RUR.ANIMATION_TIME = 120;

RUR._CALLBACK_FN = function () {
    alert("FATAL internal error: RUR._CALLBACK_FN was not initialized.");
};
