/* Author: André Roberge
   License: MIT

The purpose of this module is to act as an intermediary between end user
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

RUR._at_goal_ = function () {
    return RUR.control.at_goal(RUR.current_world.robots[0]);
};

RUR._build_wall_ = function() {
    RUR.control.build_wall(RUR.current_world.robots[0]);
};

RUR._carries_object_ = function (arg) {
    return RUR.control.carries_object(RUR.current_world.robots[0], arg);
};

RUR._front_is_clear_ = function() {
  return RUR.control.front_is_clear(RUR.current_world.robots[0]);
};


RUR._is_facing_north_ = function () {
    return RUR.control.is_facing_north(RUR.current_world.robots[0]);
};

RUR._move_ = function () {
    RUR.control.move(RUR.current_world.robots[0]);
};

RUR._object_here_ = function (arg) {
    return RUR.control.object_here(RUR.current_world.robots[0], arg);
};

RUR._put_ = function(arg) {
    RUR.control.put(RUR.current_world.robots[0], arg);
};

RUR._right_is_clear_ = function() {
    return RUR.control.right_is_clear(RUR.current_world.robots[0]);
};

RUR._set_max_nb_robots_ = function(n){
    RUR.control.set_max_nb_robots(n);
};

RUR._set_max_steps_ = function(n){
    RUR.MAX_STEPS = n;
};

RUR._set_trace_color_ = function(color){
    RUR.current_world.robots[0].trace_color = color;
};

RUR._take_ = function(arg) {
    RUR.control.take(RUR.current_world.robots[0], arg);
};

RUR._turn_left_ = function () {
    RUR.control.turn_left(RUR.current_world.robots[0]);
};

RUR._wall_in_front_ = function() {
    return RUR.control.wall_in_front(RUR.current_world.robots[0]);
};


RUR._wall_on_right_ = function() {
    return RUR.control.wall_on_right(RUR.current_world.robots[0]);
};

RUR._recording_ = function(bool) {
    if (bool) {
        RUR.rec.do_not_record = false;
    } else {
        RUR.rec.do_not_record = true;
    }
};
