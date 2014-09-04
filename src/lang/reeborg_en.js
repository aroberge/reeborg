/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, white:false, plusplus:false */
/*globals $, CodeMirror, editor, library, removeHints, parseUri */

var RUR = RUR || {};

RUR.translation = {};
RUR.translation["/* 'import_lib();' in Javascript Code is required to use\n the code in this library.*/\n\n"] =
    "/* 'import_lib();' in Javascript Code is required to use\n the code in this library.*/\n\n";
RUR.translation["# 'import my_lib' in Python Code is required to use\n# the code in this library. \n\n"] =
    "# 'from my_lib import *' in Python Code is required to use\n# the code in this library. \n\n";
RUR.translation["# 'import_lib()' in CoffeeScript Code is required to use\n# the code in this library. \n\n"] =
    "# 'import_lib()' in CoffeeScript Code is required to use\n# the code in this library. \n\n";

RUR.translation["Too many steps:"] = "Too many steps: {max_steps}";
RUR.translation["Reeborg's thinking time needs to be specified in milliseconds, between 0 and 10000; this was: "] =
    "Reeborg's thinking time needs to be specified in milliseconds, between 0 and 10000; this was: {delay}";
RUR.translation["No token found here!"] = "No token found here!";
RUR.translation["I don't have any token to put down!"] = "I don't have any token to put down!";
RUR.translation.triangle = "triangle";
RUR.translation.star = "star";
RUR.translation.square = "square";
RUR.translation["Unknown object"] = "Unknown object: {shape}";
RUR.translation["No shape found here"] = "No {shape} found here!";
RUR.translation["There is already something here."] = "There is already something here.";
RUR.translation["I don't have any shape to put down!"] = "I don't have any {shape} to put down!";
RUR.translation["There is already a wall here!"] = "There is already a wall here!";
RUR.translation["Ouch! I hit a wall!"] = "Ouch! I hit a wall!";
RUR.translation["I am afraid of the void!"] = "I am afraid of the void!";
RUR.translation.east = "east";
RUR.translation.north = "north";
RUR.translation.west = "west";
RUR.translation.south = "south";
RUR.translation.move = "move";
RUR.translation.token = "token";
RUR.translation["Unknown orientation for robot."] = "Unknown orientation for robot.";
RUR.translation["Done!"] = "Done!";
RUR.translation["There is no position as a goal in this world!"] = "There is no position as a goal in this world!";
RUR.translation["There is no orientation as a goal in this world!"] = "There is no orientation as a goal in this world!";
RUR.translation["There is no goal in this world!"] = "There is no goal in this world!";
RUR.translation["<li class='success'>Reeborg is at the correct x position.</li>"] = "<li class='success'>Reeborg is at the correct x position.</li>";
RUR.translation["<li class='failure'>Reeborg is at the wrong x position.</li>"] = "<li class='failure'>Reeborg is at the wrong x position.</li>";
RUR.translation["<li class='success'>Reeborg is at the correct y position.</li>"] = "<li class='success'>Reeborg is at the correct y position.</li>";
RUR.translation["<li class='failure'>Reeborg is at the wrong y position.</li>"] = "<li class='failure'>Reeborg is at the wrong y position.</li>";
RUR.translation["<li class='success'>Reeborg has the correct orientation.</li>"] = "<li class='success'>Reeborg has the correct orientation.</li>";
RUR.translation["<li class='failure'>Reeborg has the wrong orientation.</li>"] = "<li class='failure'>Reeborg has the wrong orientation.</li>";
RUR.translation["<li class='success'>All shapes are at the correct location.</li>"] = "<li class='success'>All shapes are at the correct location.</li>";
RUR.translation["<li class='failure'>One or more shapes are not at the correct location.</li>"] = "<li class='failure'>One or more shapes are not at the correct location.</li>";
RUR.translation["<li class='success'>All tokens are at the correct location.</li>"] = "<li class='success'>All tokens are at the correct location.</li>";
RUR.translation["<li class='failure'>One or more tokens are not at the correct location.</li>"] = "<li class='failure'>One or more tokens are not at the correct location.</li>";
RUR.translation["<li class='success'>All walls have been built correctly.</li>"] = "<li class='success'>All walls have been built correctly.</li>";
RUR.translation["<li class='failure'>One or more walls missing or built at wrong location.</li>"] = "<li class='failure'>One or more walls missing or built at wrong location.</li>";
RUR.translation["Last instruction completed!"] = "Last instruction completed!";
RUR.translation["<p class='center'>Instruction <code>done()</code> executed.</p>"] = "<p class='center'>Instruction <code>done()</code> executed.</p>";
RUR.translation.robot = "robot";
RUR.translation[", tokens="] = ", tokens=";
RUR.translation["World selected"] = "World {world} selected";
RUR.translation["Could not find world"] = "Could not find world {world}";
RUR.translation["Invalid world file."] = "Invalid world file.";

RUR.translation["Python Code"] = "Python Code";
RUR.translation["Javascript Code"] = "Javascript Code";
RUR.translation["CoffeeScript Code"] = "CoffeeScript Code";
/* translations from world_editor.js */

RUR.translation["Click on world to move robot."] = "Click on world to move Reeborg.";
RUR.translation["Removed robot."] = "Removed Reeborg.";
RUR.translation["Added robot."] = "Added Reeborg.";
RUR.translation["Click on image to turn robot"] = "Click on image to turn Reeborg";
RUR.translation["Robot now has tokens."] = "Reeborg now has {x_tokens} tokens.";
RUR.translation["Click on world to set number of tokens."] = "Click on world to set number of tokens.";
RUR.translation["Click on desired object below."] = "Click on desired object below.";
RUR.translation["Click on world to toggle star."] = "Click on world to toggle star.";
RUR.translation["Click on world to toggle triangle."] = "Click on world to toggle triangle.";
RUR.translation["Click on world to toggle square."] = "Click on world to toggle square.";
RUR.translation["Click on world to toggle walls."] = "Click on world to toggle walls.";
RUR.translation["Click on world to set home position for robot."] = "Click on world to set home position for robot.";
RUR.translation["Click on world to toggle additional walls to build."] = "Click on world to toggle additional walls to build.";
RUR.translation["Click on desired goal object below."] = "Click on desired goal object below.";
RUR.translation["Click on world to set number of goal tokens."] = "Click on world to set number of goal tokens.";
RUR.translation["Click on world to toggle star goal."] = "Click on world to toggle star goal.";
RUR.translation["Click on world to toggle triangle goal."] = "Click on world to toggle triangle goal.";
RUR.translation["Click on world to toggle square goal."] = "Click on world to toggle square goal.";
RUR.translation["Click on world at x=1, y=1 to have no object left as a goal."] = "Click on world at x=1, y=1 to have no object left as a goal.";
RUR.translation["Enter number of tokens for robot to carry (use inf for infinite number)"] = "Enter number of tokens for Reeborg to carry (use inf for infinite number)";
RUR.translation[" is not a valid value!"] = " is not a valid value!";
RUR.translation["Other object here; can't put tokens"] = "Other object here; can't put tokens";
RUR.translation["Enter number of tokens for at that location."] = "Enter number of tokens for at that location.";
RUR.translation["Other object goal here; can't put tokens"] = "Other object goal here; can't put tokens";
RUR.translation["Enter number of tokens for at that location."] = "Enter number of tokens required at that location.";
RUR.translation["tokens here; can't put another object"] = "tokens here; can't put another object";
RUR.translation["tokens as a goal here; can't set another object as goal."] = "tokens as a goal here; can't set another object as goal.";
RUR.translation["Click on same position to remove, or robot to set orientation."] = "Click on same position to remove, or robot to set orientation.";
RUR.translation["Goal: no object left in world."] = "Goal: no object left in world.";


/*==========================================*/

var globals_ = "/*globals move, turn_left, UsedRobot, front_is_clear, right_is_clear, "+
                    " is_facing_north, done, put, take, object_here, select_world, select_challenge,"+
                    " token_here, has_token, write, at_goal, at_goal_orientation," +
                    " build_wall, think, pause, repeat, sound," +
                    "RUR, inspect, view_source, " +
    // do not translate  nor include the following instructions; they help make rur-ple created programs *almost* compatible
                    "put_beeper, pick_beeper, turn_off, on_beeper, carries_beepers, set_max_steps*/\n";

var move, turn_left, inspect, front_is_clear, right_is_clear, select_challenge,
    is_facing_north, done, put, take, object_here, select_world, token_here,
    has_token, write, at_goal, at_goal_orientation, build_wall, think,
    pause, repeat, view_source, sound, UsedRobot,
    set_max_steps;

// do not translate the following three instructions; they are included only
// so that most basic programs from rur-ple would run "as-is"
var put_beeper, pick_beeper, turn_off, on_beeper, carries_beepers, next_to_a_beeper, set_delay, facing_north;

RUR.reset_definitions = function () {
    UsedRobot = function (x, y, orientation, tokens)  {
        this.body = RUR.robot.create_robot(x, y, orientation, tokens);
        RUR.world.add_robot(this.body);
    };
    write = RUR.write;
    done = function () {
      RUR.control.done();
    };

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

// the regex of the following should be adapted
// so that they make sense in the human language ...

RUR.import_lib_regex_js = /^\s*import_lib\s*\(\s*\);/m;
RUR.import_lib_regex_py = /^from\s* my_lib import\s* \**$/m;  // using lib instead of my_lib could cause conflicts with Brython?
RUR.import_lib_regex_coffee = /^\s*import_lib\s*\(\s*\)/m;

