/*  The purpose of this module is to act as an intermediary between end user
modules in various languages (e.g. reeborg_en.py or reeborg_fr.js) and
the other modules.  This way, in theory, (most) refactoring can take place in the
basic javascript code without affecting the end user code.

The one allowed exception is for human language specific functions
(say "verify") that are defined in Javascript and need to be made available
in other languages, such as Python; these functions should be defined in
reeborg_xx.js where xx is the human language two-letter code.

Convention: all function names follow the pattern RUR._xyz_
            Use four spaces for indentation
            Order function names alphabetically (in English)
 */

/*jshint devel:true, white:false, plusplus:false */


var RUR = RUR || {};
RUR._UR = {};

RUR._at_goal_ = function () {
    return RUR.control.at_goal(RUR.current_world.robots[0]);
};

RUR._build_wall_ = function() {
    RUR.control.build_wall(RUR.current_world.robots[0]);
};

RUR._carries_object_ = function (arg) {
    return RUR.control.carries_object(RUR.current_world.robots[0], arg);
};

RUR._clear_print_ = function() {
    RUR.output.clear_print();
};

RUR._color_here_ = function () {
    var robot = RUR.current_world.robots[0];
    return RUR.control.get_color_at_position(robot.x, robot.y);
};

RUR._default_robot_ = function () {
    return RUR.current_world.robots[0];
};

RUR._dir_js_ = function (obj) {
    RUR.inspect(obj);
};

RUR._done_ = function () {
    RUR.control.done();
};

RUR._front_is_clear_ = function() {
  return RUR.control.front_is_clear(RUR.current_world.robots[0]);
};


RUR._is_facing_north_ = function () {
    return RUR.control.is_facing_north(RUR.current_world.robots[0]);
};

RUR._in_the_bag_ = function() {
    return RUR.control.in_the_bag(RUR.current_world.robots[0]);
};

RUR._move_ = function () {
    RUR.control.move(RUR.current_world.robots[0]);
};

RUR._new_robot_images_ = function (images) {
    RUR.vis_robot.new_robot_images(images);
};

RUR._no_highlight_ = function () {
    RUR.ui.user_no_highlight();
};

RUR._object_here_ = function (arg) {
    return RUR.control.object_here(RUR.current_world.robots[0], arg);
};

RUR._paint_square_ = function (color) {
    // note that this can do more than simply setting the color: it can also
    // set the tile type.
    var robot = RUR.current_world.robots[0];
    RUR.control.set_tile_at_position(x, y, color);
};

RUR._pause_ = function (ms) {
    RUR.control.pause(ms);
};

RUR._print_html_ = function (html, append) {
    RUR.output.print_html(html, append);
};

RUR._put_ = function(arg) {
    RUR.control.put(RUR.current_world.robots[0], arg);
};

RUR._recording_ = function(bool) {
    if (bool) {
        RUR.rec.do_not_record = false;
    } else {
        RUR.rec.do_not_record = true;
    }
};

RUR._remove_robots_ = function () {
    RUR.world.remove_robots();
};

RUR._right_is_clear_ = function() {
    return RUR.control.right_is_clear(RUR.current_world.robots[0]);
};

RUR._set_max_nb_instructions_ = function(n){
    RUR.MAX_STEPS = n;
};

RUR._set_max_nb_robots_ = function(n){
    RUR.control.set_max_nb_robots(n);
};

RUR._set_trace_color_ = function(color){
    RUR.current_world.robots[0].trace_color = color;
};

RUR._set_trace_style_ = function(style){
    RUR.vis_robot.set_trace_style(style);
};

RUR._sound_ = function (bool) {
    RUR.control.sound(bool);
};

RUR._take_ = function(arg) {
    RUR.control.take(RUR.current_world.robots[0], arg);
};

RUR._think_ = function (ms) {
    RUR.control.think(ms);
};

RUR._turn_left_ = function () {
    RUR.control.turn_left(RUR.current_world.robots[0]);
};

RUR._view_source_js_ = function (obj) {
    RUR.output.view_source(obj);
};

RUR._wall_in_front_ = function() {
    return RUR.control.wall_in_front(RUR.current_world.robots[0]);
};


RUR._wall_on_right_ = function() {
    return RUR.control.wall_on_right(RUR.current_world.robots[0]);
};

RUR._MakeCustomMenu_ = function (content){
    RUR.custom_menu.make(content);
};

RUR._World_ = function (url, shortname) {
    RUR.file_io.load_world_from_program(url, shortname);
};

/*  methods below */

RUR._UR.at_goal_ = function (robot) {
    RUR.control.at_goal(robot);
};

RUR._UR.build_wall_ = function (robot) {
    RUR.control.build_wall(robot);
};

RUR._UR.carries_object_ = function (robot, obj) {
    RUR.control.carries_object(robot, obj);
};

RUR._UR.front_is_clear_ = function (robot) {
    RUR.control.front_is_clear(robot);
};

RUR._UR.in_the_bag_ = function (robot) {
    RUR.control.in_the_bag(robot);
};

RUR._UR.is_facing_north_ = function (robot) {
    RUR.control.is_facing_north(robot);
};

RUR._UR.move_ = function (robot) {
    RUR.control.move(robot);
};

RUR._UR.object_here_ = function (robot, obj) {
    RUR.control.object_here(robot, obj);
};

RUR._UR.put_ = function (robot, obj) {
    RUR.control.put(robot, obj);
};

RUR._UR.right_is_clear_ = function (robot) {
    RUR.control.right_is_clear(robot);
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
    RUR.control.wall_in_front(robot);
};

RUR._UR.wall_on_right_ = function (robot) {
    RUR.control.wall_on_right(robot);
};
