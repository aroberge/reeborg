
require("./visible_world.js");
require("./rur.js");

RUR.world_init = {};

// Returns a random integer between min and max (both included)
randint = function (min, max, previous) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// assigns initial values
RUR.world_init.set = function () {
    "use strict";
    var coords, obj, objects, objects_here, nb, range, robot;
    var position, goal, total_nb_objects = {};

   // First, deal with objects

    if (RUR.CURRENT_WORLD.objects !== undefined){
        objects = RUR.CURRENT_WORLD.objects;
        for (coords in objects){
            if (objects.hasOwnProperty(coords)){
                objects_here = objects[coords];
                for (obj in objects_here){
                    if (objects_here.hasOwnProperty(obj)){
                        nb = objects_here[obj];
                        if (nb.toString().indexOf("-") != -1){
                            range = nb.split("-");
                            nb = randint(parseInt(range[0], 10), parseInt(range[1], 10));
                            if (nb !== 0){
                                objects_here[obj] = nb;
                            } else {
                                delete objects_here[obj];
                            }
                        }
                        if (total_nb_objects[obj] === undefined){
                            if (parseInt(nb, 10) !== 0) {
                                total_nb_objects[obj] = parseInt(nb, 10);
                            }
                        } else {
                            total_nb_objects[obj] += parseInt(nb, 10);
                        }
                    }
                }
                if (Object.keys(RUR.CURRENT_WORLD.objects[coords]).length === 0){
                    delete RUR.CURRENT_WORLD.objects[coords];
                }
            }
        }
    }

    // then look for "goals" with "all" as value;

    if (RUR.CURRENT_WORLD.goal !== undefined &&
        RUR.CURRENT_WORLD.goal.objects !== undefined){
        objects = RUR.CURRENT_WORLD.goal.objects;
        for (coords in objects){
            if (objects.hasOwnProperty(coords)){
                objects_here = objects[coords];
                for (obj in objects_here){
                    if (objects_here.hasOwnProperty(obj)){
                        nb = objects_here[obj];
                        if (nb == "all") {
                            try {
                                if (total_nb_objects[obj] !== undefined) {
                                    objects_here[obj] = total_nb_objects[obj];
                                } else {
                                    delete objects[coords][obj];
                                }
                            } catch (e) {
                                $("#world-info-button").click();
                                $("#World-info").html("<b>Warning</b> Trying to assign a goal when no corresponding objects are found in the world.");
                            }
                        }
                    }
                }
                if (Object.keys(RUR.CURRENT_WORLD.goal.objects[coords]).length === 0){
                    delete RUR.CURRENT_WORLD.goal.objects[coords];
                }
            }
        }
    }

    // next, initial position for robot
    if (RUR.CURRENT_WORLD.robots !== undefined && RUR.CURRENT_WORLD.robots.length == 1){
        robot = RUR.CURRENT_WORLD.robots[0];
        if (robot.start_positions !== undefined) {
            position = robot.start_positions[randint(0, robot.start_positions.length-1)];
            robot.x = position[0];
            robot.y = position[1];
            robot._prev_x = robot.x;
            robot._prev_y = robot.y;
            delete robot.start_positions;
        }
        if (robot._orientation == -1){
            RUR.CURRENT_WORLD.robots[0]._orientation = randint(0, 3);
            RUR.CURRENT_WORLD.robots[0]._prev_orientation = RUR.CURRENT_WORLD.robots[0]._orientation;
        }
    }

    // then final position for robot

    if (RUR.CURRENT_WORLD.goal !== undefined &&
        RUR.CURRENT_WORLD.goal.possible_positions !== undefined &&
        RUR.CURRENT_WORLD.goal.possible_positions.length > 1) {
        goal = RUR.CURRENT_WORLD.goal;
        position = goal.possible_positions[randint(0, goal.possible_positions.length-1)];
        goal.position.x = position[0];
        goal.position.y = position[1];
        delete goal.possible_positions;
    }
    RUR.vis_world.refresh();
};
