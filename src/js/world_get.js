/* Obtain specific information about the world, either at a given
   position, or for the world in general.
*/

require("./objects.js");

RUR.world_get = {};

RUR.world_get.is_wall_at = function (coords, orientation) {
    if (RUR.current_world.walls === undefined) {
        return false;
    }
    if (RUR.current_world.walls[coords] !== undefined){
        if (RUR.current_world.walls[coords].indexOf(orientation) !== -1) {
            return true;
        }
    }
    return false;
};


RUR.world_get.tile_at_position = function (x, y) {
    "use strict";
    var coords = x + "," + y;
    if (RUR.current_world.tiles === undefined) return false;
    if (RUR.current_world.tiles[coords] === undefined) return false;
    return RUR.tiles[RUR.current_world.tiles[coords]];
};

RUR.world_get.pushable_object_at_position = function(x, y) {
    "use strict";
    var objects_here, obj_here, obj_type, coords = x + ',' + y;
    if (RUR.current_world.objects === undefined) return false;
    if (RUR.current_world.objects[coords] === undefined) return false;
    objects_here = RUR.current_world.objects[coords];

    for (obj_type in objects_here) {
        if (objects_here.hasOwnProperty(obj_type)) {
            if (RUR.objects[obj_type].pushable) {
                return obj_type;
            }
        }
    }
};

RUR.world_get.solid_objects_at_position = function (x, y) {
    "use strict";
    var coords = x + "," + y;
    if (RUR.current_world.solid_objects === undefined) return false;
    if (RUR.current_world.solid_objects[coords] === undefined) return false;
    return RUR.current_world.solid_objects[coords];
};

RUR.world_get.object_at_robot_position = function (robot, obj) {
    return object_of_type_here(robot, obj, RUR.current_world.objects);
};

RUR.world_get.decorative_object_at_robot_position = function (robot, obj) {
    return object_of_type_here(robot, obj, RUR.current_world.decorative_objects);
};


function object_of_type_here (robot, obj, object_type) {
    // object_type == RUR.current_world.objects or RUR.current_world.decorative_objects
    var obj_here, obj_type, all_objects;
    var coords = robot.x + "," + robot.y;

    if (object_type === undefined ||
        object_type[coords] === undefined) {
        return [];
    }

    obj_here =  object_type[coords];
    all_objects = [];

    for (obj_type in obj_here) {
        if (obj_here.hasOwnProperty(obj_type)) {
            if (obj !== undefined && obj_type == RUR.translate_to_english(obj)) {
                return [RUR.translate(obj_type)];
            }
            all_objects.push(RUR.translate(obj_type));
        }
    }

    if (obj !== undefined) {
        return [];
    } else if (all_objects.length === 0){
        return [];
    } else {
        return all_objects;
    }
};



RUR.world_get.world_map = function () {
    return JSON.stringify(RUR.current_world, null, 2);
};
