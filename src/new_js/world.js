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
    var robot;
    console.log("json_string", json_string);
    if (RUR.imported_from_url){
        RUR.imported_from_url = false;
        return;
    }
    if (json_string === undefined){
        return {};
    }
    console.log("current", RUR.current_world);
    console.log("JSON", JSON);
    RUR.current_world = JSON.parse(json_string) || RUR.world.create_empty_world();
    if (RUR.current_world.robots !== undefined) {
        if (RUR.current_world.robots[0] !== undefined) {
            robot = RUR.current_world.robots[0];
            robot._prev_x = robot.x;
            robot._prev_y = robot.y;
            robot._prev_orientation = robot.orientation;
        }
    }
    RUR.world.saved_world = RUR.world.clone_world();
    RUR.vis_world.draw_all();
    if (RUR.we.editing_world) {
        RUR.we.change_edit_robot_menu();
    }
};

RUR.world.clone_world = function (world) {
    if (world === undefined) {
        return JSON.parse(JSON.stringify(RUR.current_world));
    } else {
        return JSON.parse(JSON.stringify(world));
    }
};

RUR.world.reset = function () {
    RUR.current_world = RUR.world.clone_world(RUR.world.saved_world);
    RUR.MAX_STEPS = 1000;
    RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.vis_world.refresh();
};

RUR.world.add_robot = function (robot) {
    if (RUR.current_world.robots === undefined){
        RUR.current_world.robots = [];
    }
    robot.__id = RUR.current_world.robots.length;
    RUR.current_world.robots.push(robot);
    RUR.rec.record_frame();
};


