/* Obtain specific information about the world, either at a given
   position, or for the world in general.
*/

require("./../rur.js");
require("./../programming_api/exceptions.js");
require("./../default_tiles/tiles.js");
require("./../dialogs/create.js");
require("./../listeners/canvas.js");
require("./../utils/supplant.js");

RUR.world_get = {};

RUR.world_get.tile_at_position = function (x, y) {
    "use strict";
    var coords = x + "," + y;
    if (RUR.CURRENT_WORLD.tiles === undefined) return false;
    if (RUR.CURRENT_WORLD.tiles[coords] === undefined) return false;
    return RUR.TILES[RUR.CURRENT_WORLD.tiles[coords]];
};

// RUR.world_get.obstacles_at_position = function (x, y) {
//     "use strict";
//     var coords = x + "," + y;
//     if (RUR.CURRENT_WORLD.obstacles === undefined) return false;
//     if (RUR.CURRENT_WORLD.obstacles[coords] === undefined) return false;
//     return RUR.CURRENT_WORLD.obstacles[coords];
// };

RUR.world_get.object_at_robot_position = function (robot, obj) {
    return object_of_type_here(robot, obj, RUR.CURRENT_WORLD.objects);
};

RUR.world_get.decorative_object_at_robot_position = function (robot, obj) {
    return object_of_type_here(robot, obj, RUR.CURRENT_WORLD.decorative_objects);
};


function object_of_type_here (robot, obj, object_type) {
    // object_type == RUR.CURRENT_WORLD.objects or RUR.CURRENT_WORLD.decorative_objects
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
}

RUR.world_get.world_map = function () {
    return JSON.stringify(RUR.CURRENT_WORLD, null, 2);
};

RUR.world_get.world_info = function (no_grid) {
    "use strict";
    // shows the information about a given grid position
    // when the user clicks on the canvas at that grid position.
    // enabled in zz_dr_onclick.js
    var position, tile, obj, information, x, y, coords, obj_here, obj_type, goals;
    var topic, no_object, r, robot, robots;
    var tiles, tilename, fence_noted = false;
    var description, insertion, to_replace;


    information = "";

    if (RUR.CURRENT_WORLD.description) {
        description = RUR.CURRENT_WORLD.description;
        if (RUR.CURRENT_WORLD.pre) { // can be either javascript or python code
            insertion = "<pre class='world_info_source'>" + RUR.CURRENT_WORLD.pre + "</pre>";
            to_replace = "INSERT_PRE";
            description = description.replace(to_replace, insertion);
        }
        if (RUR.CURRENT_WORLD.post) { // can be either javascript or python code
            insertion = "<pre class='world_info_source'>" + RUR.CURRENT_WORLD.post + "</pre>";
            to_replace = "INSERT_POST";
            description = description.replace(to_replace, insertion);
        }
        if (RUR.CURRENT_WORLD.onload) { // only javascript, hence different class
            insertion = "<pre class='world_info_onload'>" + RUR.CURRENT_WORLD.onload + "</pre>";
            to_replace = "INSERT_ONLOAD";
            description = description.replace(to_replace, insertion);
        }
        information +="<b>" + RUR.translate("Description") + "</b><br>" + description + "<hr>";
    }

    if (!no_grid) {
        position = RUR.calculate_grid_position();
        x = position[0];
        y = position[1];
        coords = x + "," + y;
        if (!isNaN(x)){
            information += "x = " + x + ", y = " + y;
        }
    }

    try {
        tile = RUR.world_get.tile_at_position(x, y);
    } catch (e) {
        tile = false;
    }
    topic = true;
    if (tile){
        if (RUR.translate(tile.info)) {
            if (topic){
                topic = false;
                information += "<br><br><b>" + RUR.translate("Special information about this location:") + "</b>";
            }
            information += "<br>" + RUR.translate(tile.info);
        }
    }

    try {
        tiles = RUR.get_obstacles(x, y);
    } catch (e) {
        tiles = false;
    }
    if (tiles) {
        for (tilename of tiles) {
            tile = RUR.TILES[tilename];
            if (RUR.translate(tile.info)){
                if (topic){
                    topic = false;
                    information += "<br><br><b>" + RUR.translate("Special information about this location:") + "</b>";
                }
                if (tile.name == "fence") {
                    if (!fence_noted) {
                        fence_noted = true;
                        information += "<br>" + RUR.translate(tile.info);
                    }
                } else {
                    information +=  "<br>" + RUR.translate(tile.info);
                }
            }
        }
    }

    obj = RUR.CURRENT_WORLD.objects;
    topic = true;
    if (obj !== undefined && obj[coords] !== undefined){
        obj_here = obj[coords];
        for (obj_type in obj_here) {
            if (obj_here.hasOwnProperty(obj_type)) {
                    if (topic){
                        topic = false;
                        information += "<br><br><b>" + RUR.translate("Objects found here:") + "</b>";
                    }
               information += "<br>" + RUR.translate(obj_type) + ":" + obj_here[obj_type];
            }
        }
    }

    goals = RUR.CURRENT_WORLD.goal;
    if (goals !== undefined){
        obj = goals.objects;
        topic = true;
        if (obj !== undefined && obj[coords] !== undefined){
            obj_here = obj[coords];
            for (obj_type in obj_here) {
                if (obj_here.hasOwnProperty(obj_type)) {
                    if (topic){
                        topic = false;
                        information += "<br><br><b>" + RUR.translate("Goal to achieve:") + "</b>";
                    }
                   information += "<br>" + RUR.translate(obj_type) + ":" + obj_here[obj_type];
                }
            }
        }
    }


    if (goals !== undefined){
        if (goals.walls !== undefined && coords) {
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("east") != -1) {
                    information += "<br>" + RUR.translate("A wall must be built east of this location.");
                }
                if (goals.walls[coords].indexOf("north") != -1) {
                    information += "<br>" + RUR.translate("A wall must be built north of this location.");
                }
            }
            x -= 1;
            coords = x + "," + y;
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("east") != -1) {
                    information += "<br>" + RUR.translate("A wall must be built west of this location.");
                }
            }
            x += 1;
            y -= 1;
            coords = x + "," + y;
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("north") != -1) {
                    information += "<br>" + RUR.translate("A wall must be built south of this location.");
                }
            }
            y += 1;
            coords = x + "," + y;
        }
    }

    robots = RUR.CURRENT_WORLD.robots;
    if (robots !== undefined && robots.length !== undefined){
        for (r=0; r<robots.length; r++){
            robot = robots[r];
            x = robot.x;
            y = robot.y;
            if (robot.start_positions !== undefined && robot.start_positions.length > 1){
                x = RUR.translate("random location");
                y = '';
            }
            no_object = true;
            for (obj in robot.objects){
                if (robot.objects.hasOwnProperty(obj)) {
                    if (no_object) {
                        no_object = false;
                        information += "<br><br><b>" + RUR.translate("A robot located here carries:").supplant({x:x, y:y}) + "</b>";
                    }
                    information += "<br>" + RUR.translate(obj) + ":" + robot.objects[obj];
                }
            }
            if (no_object){
                information += "<br><br><b>" + RUR.translate("A robot located here carries no objects.").supplant({x:x, y:y}) + "</b>";
            }
        }
    }


    goals = RUR.CURRENT_WORLD.goal;
    if (goals !== undefined &&
         (goals.possible_positions !== undefined || goals.position !== undefined)){
        if (topic){
            topic = false;
            information += "<br><br><b>" + RUR.translate("Goal to achieve:") + "</b>";
        }
        if (goals.possible_positions !== undefined && goals.possible_positions.length > 2) {
            information += "<br>" + RUR.translate("The final required position of the robot will be chosen at random.");
        } else {
            information += "<br>" + RUR.translate("The final position of the robot must be (x, y) = ") +
                           "(" + goals.position.x + ", " + goals.position.y + ")";
        }
    }

    $("#World-info").html(information);
    $('.world_info_source').each(function() {
        var $this = $(this), $code = $this.text();
        $this.empty();
        var myCodeMirror = CodeMirror(this, {
            value: $code,
            mode:  RUR.state.programming_language,
            lineNumbers: !$this.is('.inline'),
            readOnly: true,
            theme: 'reeborg-readonly'
        });
    });
    $('.world_info_onload').each(function() {
        var $this = $(this), $code = $this.text();
        $this.empty();
        var myCodeMirror = CodeMirror(this, {
            value: $code,
            mode:  "javascript",
            lineNumbers: !$this.is('.inline'),
            readOnly: true,
            theme: 'reeborg-readonly'
        });
    });
};

RUR.create_and_activate_dialogs( $("#world-info-button"), $("#World-info"),
                                 {height:400, width:800}, RUR.world_get.world_info);