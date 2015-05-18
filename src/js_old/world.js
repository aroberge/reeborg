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
    world.other = {};
    return world;
};
RUR.current_world = RUR.world.create_empty_world();

RUR.world.export_world = function () {
    return JSON.stringify(RUR.current_world, null, '');
};

RUR.world.import_world = function (json_string) {
    var body;
    if (json_string === undefined){
        return {};
    }
    try {
        RUR.current_world = JSON.parse(json_string) || RUR.world.create_empty_world();
    } catch (e) {
        console.log("exception caught in import_world");
        console.log(json_string);
        console.log(e);
        return;
    }
    if (RUR.current_world.robots !== undefined) {
        if (RUR.current_world.robots[0] !== undefined) {
            body = RUR.current_world.robots[0];
            body._prev_x = body.x;
            body._prev_y = body.y;
            body._prev_orientation = body.orientation;
        }
    }
    if (RUR.current_world.large_world !== undefined) {
        RUR.LARGE_WORLD = RUR.current_world.large_world;
    } else {
        RUR.LARGE_WORLD = false;
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
    RUR.vis_world.refresh("initial");
};

RUR.world.add_robot = function (robot) {
    if (RUR.current_world.robots === undefined){
        RUR.current_world.robots = [];
    }
    RUR.current_world.robots.push(robot);
    RUR.rec.record_frame();
};


RUR.world.__remove_default_robot = function () {
    RUR.current_world.robots = [];
};