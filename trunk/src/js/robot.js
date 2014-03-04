/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, editor, library, translate_python, JSHINT, CodeMirror */

var RUR = RUR || {};

RUR.Robot = function(x, y, orientation, tokens) {
    "use strict";
    this.x = x || 1;
    this.y = y || 1;
    this.prev_x = this.x;
    this.prev_y = this.y;
    this.tokens = tokens || 0;
    this._is_leaky = true;
    // the following can only be found in the world
    this.triangles = 0;
    this.squares = 0;
    this.star = 0;

    if (orientation === undefined){
        this.orientation = RUR.world.EAST;
    } else {
        switch (orientation.toLowerCase()){
        case "e":
        case RUR.translation.east:
            this.orientation = RUR.world.EAST;
            break;
        case "n":
        case RUR.translation.north:
            this.orientation = RUR.world.NORTH;
            break;
        case "w":
        case RUR.translation.west:
            this.orientation = RUR.world.WEST;
            break;
        case "s":
        case RUR.translation.south:
            this.orientation = RUR.world.SOUTH;
            break;
        default:
            throw new RUR.Error(RUR.translation["Unknown orientation for robot."]);
        }
    }
    this.prev_orientation = this.orientation;
};

RUR.Robot.prototype.turn_left = function(no_frame){
    "use strict";
    this.prev_orientation = this.orientation;
    this.prev_x = this.x;
    this.prev_y = this.y;
    this.orientation += 1;
    this.orientation %= 4;
    if (no_frame !== undefined) return;
    RUR.world.add_frame();
};

RUR.Robot.prototype.__turn_right = function(no_frame){
    // private method for now ...
    "use strict";
    this.prev_orientation = this.orientation;
    this.prev_x = this.x;
    this.prev_y = this.y;
    this.orientation += 3;
    this.orientation %= 4;
    if (no_frame !== undefined) return;
    RUR.world.add_frame();
};

RUR.Robot.prototype.is_leaky = function (leak) {
    this._is_leaky = leak;
};

RUR.Robot.prototype.move = function(){
    "use strict";
    this.prev_orientation = this.orientation;
    RUR.world.move_robot(this);
    RUR.world.add_frame();
};

RUR.Robot.prototype.front_is_clear = function() {
    return RUR.world.front_is_clear(this);
};

RUR.Robot.prototype.right_is_clear = function() {
    return RUR.world.right_is_clear(this);
};

RUR.Robot.prototype.build_wall = function () {
    RUR.world.build_wall(this);
    RUR.world.add_frame();
};

RUR.Robot.prototype.is_facing_north = function () {
    return this.orientation === RUR.world.NORTH;
};

RUR.Robot.prototype.done = function() {
    throw new RUR.Error(RUR.translation["Done!"]);
};

RUR.Robot.prototype.put_token = function () {
    RUR.world.robot_put_token(this);
    RUR.world.add_frame();
};

RUR.Robot.prototype.take_token = function () {
    RUR.world.robot_take_token(this);
    RUR.world.add_frame();
};

RUR.Robot.prototype.has_token = function () {
    return this.tokens > 0 || typeof this.tokens === "string";
};

RUR.Robot.prototype.at_goal = function () {
    var goal = RUR.world.goal;
    if (goal !== undefined){
        if (goal.position !== undefined) {
            return (this.x === goal.position.x && this.y === goal.position.y);
        }
        throw new RUR.Error(RUR.translation["There is no position as a goal in this world!"]);
    }
    throw new RUR.Error(RUR.translation["There is no goal in this world!"]);
};

RUR.Robot.prototype.at_goal_orientation = function () {
    var goal = RUR.world.goal;
    if (goal !== undefined){
        if (goal.orientation !== undefined) {
            return (this.orientation === goal.orientation);
        }
        throw new RUR.Error(RUR.translation["There is no orientation as a goal in this world!"]);
    }
    throw new RUR.Error(RUR.translation["There is no goal in this world!"]);
};


RUR.Robot.prototype.put = function (shape) {
    RUR.world.robot_put(this, shape);
    RUR.world.add_frame();
};

RUR.Robot.prototype.take = function (shape) {
    RUR.world.robot_take(this, shape);
    RUR.world.add_frame();
};

RUR.Robot.prototype.token_here = function () {
    return RUR.world.get_tokens(this.x, this.y);
};

RUR.Robot.prototype.shape_here = function () {
    return RUR.world.find_shape(this.x, this.y);
};
