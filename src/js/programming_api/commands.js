/*  The purpose of this module is to act as an intermediary between end user
modules in various languages (e.g. reeborg_en.py or reeborg_fr.js) and
the other modules.  This way, in theory, (most) refactoring can take place in the
basic javascript code without affecting the end user code.

Convention: all "public" function names follow the pattern RUR._xyz_
            Use four spaces for indentation
            Order function names alphabetically (in English)
 */

//TODO: review the dependencies

require("./../rur.js");
require("./../translator.js");
require("./control.js");
require("./../ui/custom_world_select.js");
require("./../file_io/file_io.js");
require("./output.js");
require("./../drawing/visible_robot.js");
require("./../editors/update.js");
require("./../world_api/background_tile.js");

RUR._inspect_ = function (obj){
    var props, result, head = "<table border='1'><tr><th>name</th><th>type</th></tr>";
    result = head;
    for (props in obj) {
        result += "<tr><td>" + props + "</td><td>";
        if (Object.prototype.toString.call(obj[props]) == "[object Array]") {
            result += "Array</td></tr>";
        } else {
            result += typeof(obj[props]) + "</td></tr>";
        }
    }
    result += "</table>";
    RUR._print_html_(result, true); // true will replace existing content
};

function user_no_highlight () {
    if (RUR.state.highlight) {
        RUR.state.highlight = false;
        $("#highlight").addClass("blue-gradient");
        $("#highlight").removeClass("active-element");
        throw new RUR.ReeborgOK(RUR.translate("Turning highlighting off!"));
    }
}


RUR._at_goal_ = function () {
    return RUR.control.at_goal(RUR.get_current_world().robots[0]);
};

RUR._build_wall_ = function() {
    RUR.control.build_wall(RUR.get_current_world().robots[0]);
};

RUR._carries_object_ = function (arg) {
    return RUR.control.carries_object(RUR.get_current_world().robots[0], arg);
};

RUR._clear_print_ = RUR.output.clear_print;

RUR._color_here_ = function () {
    var robot = RUR.get_current_world().robots[0];
    return RUR.get_background_tile(robot.x, robot.y);
};

RUR._default_robot_body_ = function () { // simply returns body
    var body;
    try {
        body = RUR.get_current_world().robots[0];
    } catch (e) {
        body = {};
    }
    return body;
};

RUR._done_ = RUR.control.done;

RUR._front_is_clear_ = function() {
    return RUR.control.front_is_clear(RUR.get_current_world().robots[0]);
};


RUR._is_facing_north_ = function () {
    return RUR.control.is_facing_north(RUR.get_current_world().robots[0]);
};

RUR._move_ = function () {
    RUR.control.move(RUR.get_current_world().robots[0]);
};

RUR._new_robot_images_ = RUR.new_robot_images; // defined in visible_robot.js

RUR._no_highlight_ = user_no_highlight; // defined above

RUR._object_here_ = function (arg) {
    obj = RUR.world_get.object_at_robot_position(RUR.get_current_world().robots[0], arg);
    if (obj.length === 0) {
        return false;
    } 
    return obj;
};

RUR._paint_square_ = function (color) {
    // note that this can do more than simply setting the color: it can also
    // set the tile type.
    var robot = RUR.get_current_world().robots[0];
    RUR.add_colored_tile(color, robot.x, robot.y);
};

RUR._pause_ = RUR.control.pause;

RUR._print_html_ = function (html, replace) {
    RUR.output.print_html(html, replace);
};

RUR._put_ = function(arg) {
    RUR.control.put(RUR.get_current_world().robots[0], arg);
};

RUR._toss_ = function(arg) {
    RUR.control.toss(RUR.get_current_world().robots[0], arg);
};

RUR._recording_ = function(bool) {
    var current = !RUR.state.do_not_record;
    RUR.state.do_not_record = !bool;
    return current;
};

RUR._remove_robots_ = function () {
    RUR.get_current_world().robots = [];
};

RUR._right_is_clear_ = function() {
    return RUR.control.right_is_clear(RUR.get_current_world().robots[0]);
};

RUR._set_max_nb_steps_ = function(n){
    RUR.MAX_STEPS = n;
};

RUR._set_trace_color_ = function(color){
    RUR.control.set_trace_color(RUR.get_current_world().robots[0], color);
};

RUR._set_trace_style_ = function(style){
    RUR.control.set_trace_style(RUR.get_current_world().robots[0], style);
};

RUR._sound_ = RUR.control.sound;

RUR._take_ = function(arg) {
    RUR.control.take(RUR.get_current_world().robots[0], arg);
};

RUR._think_ = RUR.control.think;

RUR._turn_left_ = function () {
    RUR.control.turn_left(RUR.get_current_world().robots[0]);
};

RUR._wall_in_front_ = function() {
    return RUR.control.wall_in_front(RUR.get_current_world().robots[0]);
};

RUR._write_ = RUR.output.write;

RUR._write_ln = RUR.output.write_ln;

RUR._wall_on_right_ = function() {
    return RUR.control.wall_on_right(RUR.get_current_world().robots[0]);
};

RUR._MakeCustomMenu_ = RUR.custom_world_select.make;

RUR._World_ = RUR._load_world_from_program;

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

RUR._UR.color_here_ = function (robot_body) {
    return RUR.get_background_tile(robot_body.x, robot_body.y);
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

RUR._UR.paint_square_ = function (color, robot_body) {
    RUR.add_colored_tile(color, robot_body.x, robot_body.y);
};

RUR._UR.put_ = function (robot, obj) {
    RUR.control.put(robot, obj);
};

RUR._UR.toss_ = function (robot, obj) {
    RUR.control.toss(robot, obj);
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
