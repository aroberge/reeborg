/* Author: André Roberge
   License: MIT

   Defining base name space and various constants.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
var RUR = RUR || {};

RUR.EAST = 0;
RUR.NORTH = 1;
RUR.WEST = 2;
RUR.SOUTH = 3;

RUR.BACKGROUND_CANVAS = document.getElementById("background_canvas");
RUR.BACKGROUND_CTX = RUR.BACKGROUND_CANVAS.getContext("2d");
RUR.SECOND_LAYER_CTX = document.getElementById("second_layer_canvas").getContext("2d");
RUR.GOAL_CTX = document.getElementById("goal_canvas").getContext("2d");
RUR.OBJECTS_CTX = document.getElementById("objects_canvas").getContext("2d");
RUR.TRACE_CTX = document.getElementById("trace_canvas").getContext("2d");
RUR.ROBOT_CTX = document.getElementById("robot_canvas").getContext("2d");

RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";

RUR.HEIGHT = RUR.BACKGROUND_CANVAS.height;
RUR.WIDTH = RUR.BACKGROUND_CANVAS.width;

RUR.WALL_LENGTH = 40;   // These can be adjusted
RUR.WALL_THICKNESS = 4;  // elsewhere if RUR.LARGE_WORLD become true.
RUR.LARGE_WORLD = false;

RUR.ROWS = Math.floor(RUR.HEIGHT / RUR.WALL_LENGTH) - 1;
RUR.COLS = Math.floor(RUR.WIDTH / RUR.WALL_LENGTH) - 1;

RUR.WALL_COLOR = "brown";   // changed (toggled) in world_editor.js
RUR.SHADOW_WALL_COLOR= "#f0f0f0";    // changed (toggled) in world_editor.js
RUR.GOAL_WALL_COLOR = "black";
RUR.COORDINATES_COLOR = "black";
RUR.AXIS_LABEL_COLOR = "brown";

RUR.STAR_COLOR = "red";
RUR.TRIANGLE_COLOR = "green";
RUR.SQUARE_COLOR = "blue";
RUR.SHAPE_OUTLINE_COLOR = "grey";
RUR.ORIENTATION_TILE_COLOR = "black";

RUR.MUD_COLOR = "#794c13";

RUR.TEXT_COLOR = "black";

RUR.MAX_STEPS = 1000;
RUR.MIN_TIME_SOUND = 250;

RUR.total_images = 0;