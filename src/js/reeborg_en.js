var globals_ = "/*globals move, turn_left, RUR, inspect, UsedRobot, front_is_clear, right_is_clear, "+
                    " is_facing_north, done, put_token, take_token, put, take, shape_here,"+
                    " token_here, has_token, write, write_now, at_goal, at_goal_orientation," +
                    " build_wall, think, DEBUG, pause, remove_robot, repeat*/\n";

RUR.translation = {};
RUR.translation.ReeborgError = "ReeborgError";
RUR.translation["Too many steps:"] = "Too many steps: {max_steps}";
RUR.translation["Reeborg's thinking time needs to be specified in milliseconds, between 0 and 10000; this was: "] =
    "Reeborg's thinking time needs to be specified in milliseconds, between 0 and 10000; this was: {delay}";
RUR.translation["No token found here!"] = "No token found here!";
RUR.translation["I don't have any token to put down!"] = "I don't have any token to put down!";
RUR.translation.triangle = "triangle";
RUR.translation.star = "star";
RUR.translation.square = "square";
RUR.translation["Unknown shape"] = "Unknown shape: {shape}";
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
RUR.translation["<p class='center'>Instruction <code>done;()</code> executed.</p>"] = "<p class='center'>Instruction <code>done;()</code> executed.</p>";
RUR.translation.robot = "robot";
RUR.translation[", tokens="] = ", tokens=";
RUR.translation["Delete "] = "Delete";
RUR.translation["Undo Delete"] = "Undo Delete";


var at_goal = function() {
    return RUR.world.robots[0].at_goal();
};

var at_goal_orientation = function() {
    return RUR.world.robots[0].at_goal_orientation();
};

var build_wall = function() {
    RUR.world.robots[0].build_wall();
};

var done = function () {
    RUR.world.robots[0].done();
};

var front_is_clear = function() {
    return RUR.world.front_is_clear(RUR.world.robots[0]);
};

var has_token = function () {
    return RUR.world.robots[0].has_token();
};

var inspect = function (obj){
    var props, result = "";
    for (props in obj) {
        if (typeof obj[props] === "function") {
            result += props + "()\n";
        } else{
            result += props + "\n";
        }
    }
    write_now(result);
};

var is_facing_north = function() {
    return RUR.world.robots[0].is_facing_north();
};

var move = function() {
    RUR.world.robots[0].move();
};

var pause = function (ms) {
    RUR.world.pause(ms);
};

var put = function(arg) {
    RUR.world.robots[0].put(arg);
};

var put_token = function() {
    RUR.world.robots[0].put_token();
};

var remove_robot = function (){
    RUR.world.remove_robot();
};

var repeat = function (f, n) {
    for (var i=0; i < n; i++){
        f();
    }
};

var right_is_clear = function() {
    return RUR.world.right_is_clear(RUR.world.robots[0]);
};

var shape_here = function () {
    return RUR.world.find_shape(RUR.world.robots[0].x, RUR.world.robots[0].y);
};

var take = function(arg) {
    RUR.world.robots[0].take(arg);
};

var take_token = function() {
    RUR.world.robots[0].take_token();
};

var think = function(delay) {
    RUR.world.think(delay);
};

var token_here = function () {
    return RUR.world.get_tokens(RUR.world.robots[0].x, RUR.world.robots[0].y);
};

var turn_left = function() {
    RUR.world.robots[0].turn_left();
};

var write = function (s) {
    RUR.world.add_output_frame("#output-pre", s);
};

var write_now = function (s){
    $("#output-pre").append(s + "\n");
};

UsedRobot.prototype = Object.create(RUR.Robot.prototype);
UsedRobot.prototype.constructor = UsedRobot;

function UsedRobot(x, y, orientation, tokens)  {
    RUR.Robot.call(this, x, y, orientation, tokens);
    RUR.world.add_robot(this);
}