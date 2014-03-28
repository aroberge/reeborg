/* Author: André Roberge
   License: MIT
   
   Defining base name space and various constants.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */

var RUR = {};
var DEBUG = {};
DEBUG.ON = false;

RUR.EAST = 0;
RUR.NORTH = 1;
RUR.WEST = 2;
RUR.SOUTH = 3;

RUR.__background_canvas = document.getElementById("background_canvas");
RUR.__background_ctx = RUR.__background_canvas.getContext("2d");
RUR.__background_ctx.font = "bold 12px sans-serif";
RUR.__height = RUR.__background_canvas.height;
RUR.__width = RUR.__background_canvas.width;
RUR.__wall_ctx = document.getElementById("wall_canvas").getContext("2d");
RUR.__trace_ctx = document.getElementById("trace_canvas").getContext("2d");
RUR.__robot_ctx = document.getElementById("robot_canvas").getContext("2d");

RUR.__wall_length = 40;
RUR.__wall_thickness = 5;

RUR.__rows = Math.floor(RUR.__height / RUR.__wall_length) - 1;
RUR.__cols = Math.floor(RUR.__width / RUR.__wall_length) - 2;

RUR.__wall_color = "brown";
RUR.__goal_wall_color = "black";
RUR.__coordinates_color = "black";
RUR.__axis_label_color = "brown";
RUR.__shadow_wall_color= "#f0f0f0";

RUR.__star_color = "red";
RUR.__triangle_color = "green";
RUR.__square_color = "blue";
RUR.__shape_outline_color = "black";
RUR.__target_tile_color = "#99ffcc";
RUR.__orientation_tile_color = "black";

RUR.__token_color = "gold";
RUR.__text_color = "black";
RUR.__token_goal_color = "#666";

RUR.__debug_info_color = "blue";
