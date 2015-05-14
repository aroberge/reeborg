/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, white:false, plusplus:false */
/*globals $, CodeMirror, editor, library, parseUri */

var RUR = RUR || {};

RUR._at_goal_ = function () {
    return RUR.control.at_goal(RUR.current_world.robots[0]);
};

RUR._build_wall_ = function() {
    RUR.control.build_wall(RUR.current_world.robots[0]);
};

RUR._front_is_clear_ = function() {
  return RUR.control.front_is_clear(RUR.current_world.robots[0]);
};

RUR._has_token_ = function () {
    return RUR.control.has_token(RUR.current_world.robots[0]);
};

RUR._is_facing_north_ = function () {
    return RUR.control.is_facing_north(RUR.current_world.robots[0]);
};

RUR._move_ = function () {
    RUR.control.move(RUR.current_world.robots[0]);
};

RUR._put_ = function(arg) {
    RUR.control.put(RUR.current_world.robots[0], arg);
};

RUR._token_here_ = function() {
    return RUR.control.token_here(RUR.current_world.robots[0]);
};

RUR._right_is_clear_ = function() {
  return RUR.control.right_is_clear(RUR.current_world.robots[0]);
};

RUR._object_here_ = function () {
    return RUR.control.object_here(RUR.current_world.robots[0]);
};

RUR._take_ = function(arg) {
    RUR.control.take(RUR.current_world.robots[0], arg);
};

RUR._turn_left_ = function () {
    RUR.control.turn_left(RUR.current_world.robots[0]);
};

RUR._repeat_ = function (f, n) {
  for (var i=0; i < n; i++){
      f();
  }
};

RUR._set_max_steps_ = function(n){
    RUR.MAX_STEPS_ = n;
};
