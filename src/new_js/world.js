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
    }
    world.robots = [];
    world.walls = {};
    world.tokens = {};
    world.shapes = {};
    return world;
};
RUR.__current_world = RUR.__create_empty_world();

RUR.__export_world = function () {
    return JSON.stringify(RUR.__current_world, null, '   ');
};

RUR.__import_world = function (json_string) {
    if (json_string === undefined){
        return {};
    }
    RUR.__current_world = JSON.parse(json_string) || RUR.__create_empty_world();
    RUR.__visible_world.draw_all();
    if (RUR.__editing_world) {
        RUR.__change_edit_robot_menu();
    }
};

RUR.__clone_world = function (world) {
    return JSON.parse(JSON.stringify(world));
};

RUR.__add_robot = function (robot) {
    robot.__id = RUR.__current_world.robots.length;
    RUR.__current_world.robots.push(robot);
};
