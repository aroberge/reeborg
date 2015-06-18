/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, white:false, plusplus:false */
/*globals $, CodeMirror, editor, library, removeHints, parseUri */

var RUR = RUR || {};

// required for lint.js
var globals_ = "/*globals move, turn_left, UsedRobot, front_is_clear, right_is_clear, "+
                    " is_facing_north, done, put, take, World, Permalink,"+
                    " object_here, carries_object, write, at_goal, at_goal_orientation," +
                    " build_wall, think, pause, repeat, sound, narration," +
                    "RUR, inspect, view_source, verify, say, library, _write" +
    // do not translate  nor include the following instructions; they help make rur-ple created programs *almost* compatible
                    "put_beeper, pick_beeper, turn_off, on_beeper, carries_beepers, set_max_steps*/\n";

var move, turn_left, inspect, front_is_clear, right_is_clear,
    is_facing_north, done, put, take, object_here, World, Permalink,
    carries_object, write, _write, at_goal, at_goal_orientation, build_wall, think,
    pause, repeat, view_source, sound, UsedRobot,
    set_max_steps, say, verify, ReeborgError, narration;

// do not translate the following three instructions; they are included only
// so that most basic programs from rur-ple would run "as-is"
var put_beeper, pick_beeper, turn_off, on_beeper, carries_beepers, next_to_a_beeper, set_delay, facing_north;

RUR.verify = function(test) {
    var reeborg, robots, world, orientation;
    var east, East, west, West, north, North, south, South;
    var js_test;
    east = East = RUR.EAST;
    west = West = RUR.WEST;
    north = North = RUR.NORTH;
    south = South = RUR.SOUTH;
    world = RUR.current_world;
    robots = world.robots;
    reeborg = robots[0];
    orientation = reeborg.orientation;

    // if language is Python ... require spaces around logical operators to simplify
    js_test = test.replace(/ and /g, '&&');
    js_test = js_test.replace(/ or /g, '||');
    js_test = js_test.replace(/ not /g, '!');
    // True and False should not necessary to use ... but just in case
    js_test = js_test.replace(/False/g, 'false');
    js_test = js_test.replace(/True/g, 'true');

    if (eval(js_test)){ // jshint ignore:line
        return;
    }
    throw ReeborgError("Failed: <br>"+test);
};


RUR.reset_definitions = function () {
    // RUR._x_ defined in commands.js
    at_goal = RUR._at_goal_;
    at_goal_orientation = RUR._at_goal_orientation_;
    build_wall = RUR._build_wall_;
    front_is_clear = RUR._front_is_clear_;
    carries_object = RUR._carries_object_;
    is_facing_north = RUR._is_facing_north_;
    move = RUR._move_;
    put = RUR._put_;
    object_here = RUR._object_here_;
    right_is_clear = RUR._right_is_clear_;
    token_here = RUR._token_here_;
    take = RUR._take_;
    turn_left = RUR._turn_left_;
    repeat = RUR._repeat_;
    set_max_steps = RUR._set_max_steps_;
    // defined in rur_utils.js
    inspect = RUR.inspect;
    view_source = RUR.view_source;
    // defined in control.js
    write = RUR.control.write;
    _write = RUR.control._write;
    narration = RUR.control.narration;
    done = RUR.control.done;
    sound = RUR.control.sound;
    think = RUR.control.think;
    say = RUR.control.say;
    pause = RUR.control.pause;
    // defined in ui.js
    World = RUR.ui.load_world;
    Permalink = RUR.load_permalink;
    set_max_nb_robots = RUR._set_max_nb_robots_;


    UsedRobot = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.world.add_robot(this.body);
    };

    UsedRobot.prototype.at_goal = function () {
        RUR.control.at_goal(this.body);
    };

    UsedRobot.prototype.at_goal_orientation = function () {
        RUR.control.at_goal_orientation(this.body);
    };

    UsedRobot.prototype.build_wall = function () {
        RUR.control.build_wall(this.body);
    };

    UsedRobot.prototype.front_is_clear = function () {
        RUR.control.front_is_clear(this.body);
    };

    UsedRobot.prototype.carries_object = function () {
        RUR.control.carries_object(this.body);
    };

    UsedRobot.prototype.is_facing_north = function () {
        RUR.control.is_facing_north(this.body);
    };

    UsedRobot.prototype.move = function () {
        RUR.control.move(this.body);
    };

    UsedRobot.prototype.put = function () {
        RUR.control.put(this.body);
    };

    UsedRobot.prototype.token_here = function () {
        RUR.control.token_here(this.body);
    };

    UsedRobot.prototype.right_is_clear = function () {
        RUR.control.right_is_clear(this.body);
    };

    UsedRobot.prototype.object_here = function () {
        RUR.control.object_here(this.body);
    };

    UsedRobot.prototype.take = function () {
        RUR.control.take(this.body);
    };

    UsedRobot.prototype.turn_left = function () {
        RUR.control.turn_left(this.body);
    };

    verify = RUR.verify;

    // English speficic and only for compatibility with rur-ple
    // do not translate the following
    put_beeper = put;
    pick_beeper = take;
    turn_off = done;
    on_beeper = object_here;
    next_to_a_beeper = object_here;
    carries_beepers = carries_object;
    set_delay = think;
    facing_north = is_facing_north;
};
RUR.reset_definitions();