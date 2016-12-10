/*  The purpose of this module is to act as an intermediary between end user
modules in various languages (e.g. reeborg_en.py or reeborg_fr.js) and
the other modules.  This way, in theory, (most) refactoring can take place in the
basic javascript code without affecting the end user code.

Convention: all "public" function names follow the pattern RUR._xyz_
            Use four spaces for indentation
            Order function names alphabetically (in English)
 */

require("./translator.js");
require("./constants.js");
require("./control.js");
require("./custom_world_select.js");
require("./file_io.js");
require("./output.js");
require("./visible_robot.js");
require("./state.js");
require("./world.js");
require("./world_set.js");
require("./world_set/set_tile.js");

RUR.inspect = function (obj){
    var props, result = "";
    for (props in obj) {
        if (typeof obj[props] === "function") {
            result += props + "()\n";
        } else{
            result += props + "\n";
        }
    }
    RUR.output._write(result);
};

function user_no_highlight () {
    if (RUR.state.highlight) {
        RUR.state.highlight = false;
        $("#highlight").addClass("blue-gradient");
        $("#highlight").removeClass("active-element");
    }
}


RUR._at_goal_ = function () {
    return RUR.control.at_goal(RUR.CURRENT_WORLD.robots[0]);
};

RUR._build_wall_ = function() {
    RUR.control.build_wall(RUR.CURRENT_WORLD.robots[0]);
};

RUR._carries_object_ = function (arg) {
    return RUR.control.carries_object(RUR.CURRENT_WORLD.robots[0], arg);
};

RUR._clear_print_ = RUR.output.clear_print;

RUR._color_here_ = function () {
    var robot = RUR.CURRENT_WORLD.robots[0];
    return RUR.control.get_colour_at_position(robot.x, robot.y);
};

RUR._default_robot_body_ = function () { // simply returns body
    return RUR.CURRENT_WORLD.robots[0];
};

RUR._dir_js_ = RUR.inspect;

RUR._done_ = RUR.control.done;

RUR._front_is_clear_ = function() {
  return RUR.control.front_is_clear(RUR.CURRENT_WORLD.robots[0]);
};


RUR._is_facing_north_ = function () {
    return RUR.control.is_facing_north(RUR.CURRENT_WORLD.robots[0]);
};

RUR._move_ = function () {
    RUR.control.move(RUR.CURRENT_WORLD.robots[0]);
};

RUR._new_robot_images_ = RUR.vis_robot.new_robot_images;

RUR._no_highlight_ = user_no_highlight;

RUR._object_here_ = function (arg) {
    return RUR.world_get.object_at_robot_position(RUR.CURRENT_WORLD.robots[0], arg);
};

RUR._paint_square_ = function (color) {
    // note that this can do more than simply setting the color: it can also
    // set the tile type.
    var robot = RUR.CURRENT_WORLD.robots[0];
    RUR.set_tile_at_position(color, robot.x, robot.y);
};

RUR._pause_ = RUR.control.pause;

RUR._print_html_ = function (html, append) {
    RUR.output.print_html(html, append);
};

RUR._put_ = function(arg) {
    RUR.control.put(RUR.CURRENT_WORLD.robots[0], arg);
};

RUR._recording_ = function(bool) {
    RUR.state.do_not_record = !bool;
};

RUR._remove_robots_ = function () {
    RUR.CURRENT_WORLD.robots = [];
};

RUR._right_is_clear_ = function() {
    return RUR.control.right_is_clear(RUR.CURRENT_WORLD.robots[0]);
};

RUR._set_max_nb_instructions_ = function(n){
    RUR.MAX_STEPS = n;
};

RUR._set_trace_color_ = function(color){
    RUR.CURRENT_WORLD.robots[0]._trace_color = color;
};

RUR._set_trace_style_ = function(style){
    RUR.CURRENT_WORLD.robots[0]._trace_style = style;
};

RUR._sound_ = RUR.control.sound;

RUR._take_ = function(arg) {
    RUR.control.take(RUR.CURRENT_WORLD.robots[0], arg);
};

RUR._think_ = RUR.control.think;

RUR._turn_left_ = function () {
    RUR.control.turn_left(RUR.CURRENT_WORLD.robots[0]);
};

RUR._view_source_js_ = RUR.output.view_source_js;

RUR._wall_in_front_ = function() {
    return RUR.control.wall_in_front(RUR.CURRENT_WORLD.robots[0]);
};

RUR._write_ = RUR.output.write;

RUR.__write_ = RUR.output._write;

RUR._wall_on_right_ = function() {
    return RUR.control.wall_on_right(RUR.CURRENT_WORLD.robots[0]);
};

RUR._MakeCustomMenu_ = RUR.custom_world_select.make;

RUR._World_ = RUR.file_io.load_world_from_program;

/*  methods below */

RUR._UR = {};

RUR._UR.at_goal_ = function (robot) {
    return RUR.control.at_goal(robot);
};

RUR._UR.build_wall_ = function (robot) {
    return RUR.control.build_wall(robot);
};

RUR._UR.carries_object_ = function (robot, obj) {
    return RUR.control.carries_object(robot, obj);
};

RUR._UR.front_is_clear_ = function (robot) {
    return RUR.control.front_is_clear(robot);
};

RUR._UR.is_facing_north_ = function (robot) {
    return RUR.control.is_facing_north(robot);
};

RUR._UR.move_ = function (robot) {
    RUR.control.move(robot);
};

RUR._UR.object_here_ = function (robot, obj) {
    return RUR.world_get.object_at_robot_position(robot, obj);
};

RUR._UR.put_ = function (robot, obj) {
    RUR.control.put(robot, obj);
};

RUR._UR.right_is_clear_ = function (robot) {
    return RUR.control.right_is_clear(robot);
};

RUR._UR.set_model_ = function (robot, model) {
    RUR.control.set_model(robot, model);
};

RUR._UR.set_trace_color_ = function (robot, color) {
    RUR.control.set_trace_color(robot, color);
};

RUR._UR.set_trace_style_ = function (robot, style) {
    RUR.control.set_trace_style(robot, style);
};

RUR._UR.take_ = function (robot, obj) {
    RUR.control.take(robot, obj);
};

RUR._UR.turn_left_ = function (robot) {
    RUR.control.turn_left(robot);
};

RUR._UR.wall_in_front_ = function (robot) {
    return RUR.control.wall_in_front(robot);
};

RUR._UR.wall_on_right_ = function (robot) {
    return RUR.control.wall_on_right(robot);
};
