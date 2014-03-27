/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.__create_empty_world = function (blank_canvas) {
    "use strict";
    var world = {};
    if (blank_canvas) {
        world.blank_canvas = true;
        return world;
    } else {
        world.blank_canvas = false;
    }
    world.robots = [];
    world.walls = {};
    world.tokens = {};
    world.shapes = {};
    world.goal = {};
    return world;
};

RUR.__export_world = function (world) {
    return JSON.stringify(world, null, '   ');
};

RUR.__import_world = function (json_string) {
    if (json_string === undefined){
        return {};
    }
    return JSON.parse(json_string) || {};
};

RUR.__clone_world = function (world) {
    return JSON.parse(JSON.stringify(world));
};

RUR.__add_robot = function (world, robot) {
    world.robots.push(robot);
};
