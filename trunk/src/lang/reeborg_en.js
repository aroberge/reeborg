/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, white:false, plusplus:false */
/*globals $, CodeMirror, editor, library, removeHints, parseUri */

var RUR = RUR || {};

// required for lint.js
var globals_ = "/*globals move, turn_left, UsedRobot, front_is_clear, right_is_clear, "+
                    " is_facing_north, done, put, take, object_here, select_world, select_challenge,"+
                    " token_here, has_token, write, at_goal, at_goal_orientation," +
                    " build_wall, think, pause, repeat, sound," +
                    "RUR, inspect, view_source, verify, say" +
    // do not translate  nor include the following instructions; they help make rur-ple created programs *almost* compatible
                    "put_beeper, pick_beeper, turn_off, on_beeper, carries_beepers, set_max_steps*/\n";

var move, turn_left, inspect, front_is_clear, right_is_clear, select_challenge,
    is_facing_north, done, put, take, object_here, select_world, token_here,
    has_token, write, at_goal, at_goal_orientation, build_wall, think,
    pause, repeat, view_source, sound, UsedRobot,
    set_max_steps, say;

// do not translate the following three instructions; they are included only
// so that most basic programs from rur-ple would run "as-is"
var put_beeper, pick_beeper, turn_off, on_beeper, carries_beepers, next_to_a_beeper, set_delay, facing_north;

RUR.verify = function(test) {
    var reeborg, robots, world, tokens, orientation;
    var east, East, west, West, north, North, south, South;
    var js_test;
    east = East = RUR.EAST;
    west = West = RUR.WEST;
    north = North = RUR.NORTH;
    south = South = RUR.SOUTH;
    world = RUR.current_world;
    robots = world.robots;
    reeborg = robots[0];
    tokens = reeborg.tokens;
    orientation = reeborg.orientation;

    // if language is Python ... require spaces around logical operators to simplify
    js_test = test.replace(/ and /g, '&&');
    js_test = js_test.replace(/ or /g, '||');
    js_test = js_test.replace(/ not /g, '!');
    // True and False should not necessary to use ... but just in case
    js_test = js_test.replace(/False/g, 'false');
    js_test = js_test.replace(/True/g, 'true');

    if (eval(js_test)){
        return;
    }
    throw ReeborgError("Failed: <br>"+test);
};


RUR.reset_definitions = function () {
    UsedRobot = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.world.add_robot(this.body);
    };
    write = RUR.control.write;
    done = function () {
      RUR.control.done();
    };
    say = function (message) {
        RUR.control.say(message);
    }

    pause = function (ms) {
      RUR.control.pause(ms);
    };

    repeat = function (f, n) {
      for (var i=0; i < n; i++){
          f();
      }
    };

    think = function(delay) {
        RUR.control.think(delay);
    };

    select_world = RUR.ui.select_world;
    select_challenge = RUR.ui.select_challenge;
    set_max_steps = function(n){
        RUR.MAX_STEPS = n;
    };

    at_goal = function () {
        return RUR.control.at_goal(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.at_goal = function () {
        RUR.control.at_goal(this.body);
    };

    at_goal_orientation = function () {
        return RUR.control.at_goal_orientation(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.at_goal_orientation = function () {
        RUR.control.at_goal_orientation(this.body);
    };

    build_wall = function() {
        RUR.control.build_wall(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.build_wall = function () {
        RUR.control.build_wall(this.body);
    };

    front_is_clear = function() {
      return RUR.control.front_is_clear(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.front_is_clear = function () {
        RUR.control.front_is_clear(this.body);
    };

    has_token = function () {
        return RUR.control.has_token(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.has_token = function () {
        RUR.control.has_token(this.body);
    };

    is_facing_north = function () {
        return RUR.control.is_facing_north(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.is_facing_north = function () {
        RUR.control.is_facing_north(this.body);
    };

    move = function () {
        RUR.control.move(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.move = function () {
        RUR.control.move(this.body);
    };

    put = function(arg) {
        RUR.control.put(RUR.current_world.robots[0], arg);
    };
    UsedRobot.prototype.put = function () {
        RUR.control.put(this.body);
    };

    token_here = function() {
        return RUR.control.token_here(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.token_here = function () {
        RUR.control.token_here(this.body);
    };

    right_is_clear = function() {
      return RUR.control.right_is_clear(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.right_is_clear = function () {
        RUR.control.right_is_clear(this.body);
    };

    object_here = function () {
        return RUR.control.object_here(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.object_here = function () {
        RUR.control.object_here(this.body);
    };

    take = function(arg) {
        RUR.control.take(RUR.current_world.robots[0], arg);
    };
    UsedRobot.prototype.take = function () {
        RUR.control.take(this.body);
    };

    turn_left = function () {
        RUR.control.turn_left(RUR.current_world.robots[0]);
    };
    UsedRobot.prototype.turn_left = function () {
        RUR.control.turn_left(this.body);
    };

    sound = function (on) {
        RUR.control.sound(on);
    };
    inspect = RUR.inspect;

    view_source = RUR.view_source;
    verify = RUR.verify;

    // English speficic and only for compatibility with rur-ple
    // do not translate the following
    put_beeper = put;
    pick_beeper = take;
    turn_off = done;
    on_beeper = token_here;
    next_to_a_beeper = token_here;
    carries_beepers = has_token;
    set_delay = think;
    facing_north = is_facing_north;
};
RUR.reset_definitions();
// the regex of the following should be adapted
// so that they make sense in the human language ...

RUR.import_lib_regex_js = /^\s*import_lib\s*\(\s*\);/m;
RUR.import_lib_regex_py = /^from\s* my_lib import\s* \**$/m;  // using lib instead of my_lib could cause conflicts with Brython?
RUR.import_lib_regex_coffee = /^\s*import_lib\s*\(\s*\)/m;