/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.world = {};

RUR.world.create_empty_world = function (blank_canvas) {
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
RUR.current_world = RUR.world.create_empty_world();

RUR.world.export_world = function () {
    return JSON.stringify(RUR.current_world, null, '   ');
};

RUR.world.import_world = function (json_string) {
    if (json_string === undefined){
        return {};
    }
    RUR.current_world = JSON.parse(json_string) || RUR.world.create_empty_world();
    RUR.vis_world.draw_all();
    if (RUR.we.editing_world) {
        RUR.we.change_edit_robot_menu();
    }
};

RUR.world.clone_world = function (world) {
    return JSON.parse(JSON.stringify(world));
};

RUR.world.add_robot = function (robot) {
    robot.__id = RUR.current_world.robots.length;
    RUR.current_world.robots.push(robot);
};
