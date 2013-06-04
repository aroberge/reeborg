var globals_ = "/*globals move, turn_left, RUR, inspect, UsedRobot, front_is_clear, right_is_clear, "+
                    " is_facing_north, done, put_token, take_token, put, take, shape_here,"+
                    " token_here, has_token, write, write_now, at_goal, at_goal_orientation," +
                    " build_wall, think, DEBUG, pause, remove_robot, repeat*/\n";

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