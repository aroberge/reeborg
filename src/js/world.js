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
    world.objects = {};
    // allow teacher to insert code to be run before and after the
    // code entered by the student
    world.pre_code = '';
    world.post_code = '';
    return world;
};
RUR.current_world = RUR.world.create_empty_world();

RUR.world.export_world = function () {
    return JSON.stringify(RUR.current_world, null, 2);
};

RUR.world.import_world = function (json_string, already_parsed) {
    var body;
    if (json_string === undefined){
        return {};
    }
    if (already_parsed === undefined){
        try {
            RUR.current_world = JSON.parse(json_string) || RUR.world.create_empty_world();
        } catch (e) {
            console.log("exception caught in import_world");
            console.log(json_string);
            console.log(e);
            return;
        }
    } else {
        RUR.current_world = json_string;
    }

    if (RUR.current_world.robots !== undefined) {
        if (RUR.current_world.robots[0] !== undefined) {
            body = RUR.current_world.robots[0];
            body._prev_x = body.x;
            body._prev_y = body.y;
            body._prev_orientation = body.orientation;
        }
    }

    RUR.current_world.small_tiles = RUR.current_world.small_tiles || false;
    RUR.current_world.rows = RUR.current_world.rows || RUR.MAX_Y;
    RUR.current_world.cols = RUR.current_world.cols || RUR.MAX_X;
    RUR.vis_world.compute_world_geometry(RUR.current_world.cols, RUR.current_world.rows);

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
    if (RUR.MAX_NB_ROBOTS !== undefined){
        delete RUR.MAX_NB_ROBOTS;
    }
    RUR.vis_robot.set_trace_style("default");
    RUR.MAX_STEPS = 1000;
    RUR.vis_world.draw_all();
};

RUR.world.add_robot = function (robot) {
    if (RUR.current_world.robots === undefined){
        RUR.current_world.robots = [];
    }
    if (RUR.MAX_NB_ROBOTS !== undefined &&
        RUR.MAX_NB_ROBOTS == RUR.current_world.robots.length){
        throw new RUR.ReeborgError(RUR.translate("You cannot create another robot!"));
    }
    RUR.current_world.robots.push(robot);
    RUR.rec.record_frame();
};


RUR.world.__remove_default_robot = function () {
    if (RUR.MAX_NB_ROBOTS !== undefined){
        throw new RUR.ReeborgError(RUR.translate("Cheater! You are not allowed to change the number of robots this way!"));
    } else {
        RUR.current_world.robots = [];
    }
};
