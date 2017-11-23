/* Obtain specific information about the world, either at a given
   position, or for the world in general.
*/

require("./../rur.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../default_tiles/tiles.js");
require("./../dialogs/create.js");
require("./../listeners/canvas.js");
require("./../utils/supplant.js");
require("./../world_api/things.js");

RUR.world_get = {};
var goal_to_achieve = "<h3>" + RUR.translate("Goal to achieve:") + "</h3>";

RUR.world_get.tile_at_position = function (x, y) { // TODO: still needed or move elswhere?
    "use strict";
    var coords = x + "," + y;
    if (RUR.get_current_world().tiles === undefined) return false;
    if (RUR.get_current_world().tiles[coords] === undefined) return false;
    return RUR.THINGS[RUR.get_current_world().tiles[coords]];
};


RUR.world_get.object_at_robot_position = function (robot, obj) { // TODO: still needed or move elswhere?
    return object_of_type_here(robot, obj, RUR.get_current_world().objects);
};

// CSS widget to show difficulty level.
function difficulty(level) {
    var begin = "<div class='difficulty'>" + RUR.translate("Easy") + " <div><span class='",
        end = "'></span></div> " + RUR.translate("Hard") + "</div>";
    return begin + level + end;
}


function object_of_type_here (robot, obj, object_type) {
    // object_type == RUR.get_current_world().objects or RUR.get_current_world().decorative_objects
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

/** @function show_editors_content
 * @memberof RUR
 * @instance
 *
 * @desc Used to show (or not) the content of the various world
 * editors in the world description (world info button for English UI).
 *
 * @param {bool} show
 * 
 */

RUR.show_editors_content = function (show) {
    RUR.SHOW_EDITORS_CONTENTS = show;
    RUR.world_get.world_info();
};


RUR.world_get.world_info = function (show_info_at_location) {
    "use strict";
    // Shows the world information, as included in the description editor.
    // In addition shows the information about a given grid position
    // when the user clicks on the canvas at that grid position.
    // If a global flag is set, it also show the various editors content.
    var content, description, goals, insertion, to_replace, topic;
    var no_object, obj, r, robot, robots, x, y;
    var information = "<div class='automatic-description'>";

    description = RUR.get_current_world().description;
    if (description === undefined) {
        description = '';
    } else if (typeof description != "string") {
        description = description.join("\n");
    }

    if (RUR.SHOW_EDITORS_CONTENTS) {
        if (RUR.get_current_world().onload) {
            description = "<h3>Onload editor content</h3>INSERT_ONLOAD" + description;
        }   
         if (RUR.get_current_world().pre) {
            description = "<h3>Pre editor content</h3>INSERT_PRE" + description;
        }   
        if (RUR.get_current_world().post) {
            description = "<h3>Post editor content</h3>INSERT_POST" + description;
        }   
        if (RUR.get_current_world().editor) {
            description = "<h3>World's Editor content</h3>INSERT_EDITOR" + description;
        }   
        if (RUR.get_current_world().library) {
            description = "<h3>World's Library content</h3>INSERT_LIBRARY" + description;
        }    
    }

    if (description) {
        if (RUR.get_current_world().pre) {
            content = RUR.get_current_world().pre;
            if (typeof content != "string") {
                content = content.join("\n");
            }
            insertion = "<pre class='world_info_source'>" + content + "</pre>";
            to_replace = "INSERT_PRE";
            description = description.replace(to_replace, insertion);
        }
        if (RUR.get_current_world().editor) {
            content = RUR.get_current_world().editor;
            if (typeof content != "string") {
                content = content.join("\n");
            }            
            insertion = "<pre class='world_info_source'>" + content + "</pre>";
            to_replace = "INSERT_EDITOR";
            description = description.replace(to_replace, insertion);
        }        
        if (RUR.get_current_world().library) {
            content = RUR.get_current_world().library;
            if (typeof content != "string") {
                content = content.join("\n");
            }            
            insertion = "<pre class='world_info_source'>" + content + "</pre>";
            to_replace = "INSERT_LIBRARY";
            description = description.replace(to_replace, insertion);
        }
        if (RUR.get_current_world().post) {
            content = RUR.get_current_world().post;
            if (typeof content != "string") {
                content = content.join("\n");
            }            
            insertion = "<pre class='world_info_source'>" + content + "</pre>";
            to_replace = "INSERT_POST";
            description = description.replace(to_replace, insertion);
        }
        if (RUR.get_current_world().onload) {
            content = RUR.get_current_world().onload;
            if (typeof content != "string") {
                content = content.join("\n");
            }            
            insertion = "<pre class='world_info_onload'>" + content + "</pre>";
            to_replace = "INSERT_ONLOAD";
            description = description.replace(to_replace, insertion);
        }
        description = description.replace("DIFFICULTY1", difficulty("difficulty1"));
        description = description.replace("DIFFICULTY2", difficulty("difficulty2"));
        description = description.replace("DIFFICULTY3", difficulty("difficulty3"));
        description = description.replace("DIFFICULTY4", difficulty("difficulty4"));
        description = description.replace("DIFFICULTY5", difficulty("difficulty5"));
        description = description.replace("DIFFICULTY6", difficulty("difficulty6"));
        description = description.replace("DIFFICULTY7", difficulty("difficulty7"));
        description = description.replace("DIFFICULTY8", difficulty("difficulty8"));
        description = description.replace("DIFFICULTY9", difficulty("difficulty9"));
        description = description.replace("DIFFICULTY10", difficulty("difficulty10"));

        information +="<h2>" + RUR.translate("Description") + "</h2>" + description + "</div>";



    }

    if (show_info_at_location) {
        information = get_info_about_location() + information;
    }

    // Info about existing robots
    robots = RUR.get_current_world().robots;

    if (robots !== undefined && robots.length !== undefined){
        for (r=0; r<robots.length; r++){
            robot = robots[r];
            x = robot.x;
            y = robot.y;
            if (robot.possible_initial_positions !== undefined && robot.possible_initial_positions.length > 1){
                x = RUR.translate("random location");
                y = '';
            }
            no_object = true;
            for (obj in robot.objects){
                if (robot.objects.hasOwnProperty(obj)) {
                    if (no_object) {
                        no_object = false;
                        information += "<br><b>" + RUR.translate("A robot located here carries:").supplant({x:x, y:y}) + "</b>";
                    }
                    information += "<br>" + RUR.translate(obj) + ":" + robot.objects[obj];
                }
            }
            if (no_object){
                information += "<br><b>" + RUR.translate("A robot located here carries no objects.").supplant({x:x, y:y}) + "</b>";
            }
        }
    }

    // Goal: final position of the robot - only one can be specified

    goals = RUR.get_current_world().goal;
    if (goals !== undefined &&
         (goals.possible_final_positions !== undefined || goals.position !== undefined)){

        information += goal_to_achieve;
        if (goals.possible_final_positions !== undefined && goals.possible_final_positions.length > 2) {
            information += RUR.translate("The final required position of the robot will be chosen at random.");
        } else {
            information += RUR.translate("The final position of the robot must be (x, y) = ") +
                           "(" + goals.position.x + ", " + goals.position.y + ")";
        }
    }


    $("#World-info").html(information + '</div>');
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
            mode:  RUR.state.onload_programming_language,
            lineNumbers: !$this.is('.inline'),
            readOnly: true,
            theme: 'reeborg-readonly'
        });
    });
};


function get_info_about_location() {
    /* finds all the relevant information about a location where the
       user has clicked. */
    "use strict";
    var position, x, y, coords, grid_info, need_heading, goals;
    var tile, tilename, tiles;
    var obj, obj_here, obj_type;
    var special_info_about_location = "<h3>" + RUR.translate("Special information about this location:") + "</h3>";

    position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];
    if (isNaN(x) || isNaN(y)){
        return '';
    }

    coords = x + "," + y;
    grid_info = "<div class='grid-info'><code>x,y = " + coords + "</code><br>";

    // background tiles at that location
    try {
        tile = RUR.world_get.tile_at_position(x, y);
    } catch (e) {
        tile = false;
    }

    need_heading = true;
    if (tile){
        if (RUR.translate(tile.info)) {
            if (need_heading) {
                need_heading = false;
                grid_info += special_info_about_location;
            }
            grid_info += RUR.translate(tile.info) + "<br>";
        }
    }

    // obstacles at that location; same topic heading as for background tiles
    try {
        tiles = RUR.get_obstacles(x, y);
    } catch (e) {
        tiles = false;
    }
    if (tiles) {
        for (tilename of tiles) {
            tile = RUR.THINGS[tilename];
            if (RUR.translate(tile.info)){
                if (need_heading) {
                    need_heading = false;
                    grid_info += special_info_about_location;
                }
                if (tile.name == "fence") {
                    // multiple fences can be drawn at a single location to
                    // create a compount fence; the only information relevant
                    // to the user is that there is at least one fence there.
                    if (!fence_noted) {
                        fence_noted = true;
                        grid_info += RUR.translate(tile.info) + "<br>";
                    }
                } else {
                    grid_info += RUR.translate(tile.info) + "<br>";
                }
            }
        }
    }

    // objects at that location
    obj = RUR.get_current_world().objects;
    need_heading = true; // done with previous heading

    if (obj !== undefined && obj[coords] !== undefined){
        obj_here = obj[coords];
        for (obj_type in obj_here) {
            if (obj_here.hasOwnProperty(obj_type)) {
                if (need_heading) {
                    need_heading = false;
                    grid_info += "<h3>" + RUR.translate("Objects found here:") + "</h3>";
                }
                grid_info += RUR.translate(obj_type) + ":" + obj_here[obj_type];
                grid_info += " " + RUR.translate(RUR._get_property(obj_type, "info"))+"<br>";
            }
        }
    }

    // goal to achieve that that location
    goals = RUR.get_current_world().goal;
    need_heading = true; // done with previous heading

    if (goals !== undefined){
        obj = goals.objects;
        if (obj !== undefined && obj[coords] !== undefined){
            obj_here = obj[coords];
            for (obj_type in obj_here) {
                if (obj_here.hasOwnProperty(obj_type)) {
                    if (need_heading){
                        need_heading = false;
                        grid_info += goal_to_achieve;
                    }
                   grid_info += RUR.translate(obj_type) + ":" + obj_here[obj_type] + "<br>";
                }
            }
        }
        if (goals.walls !== undefined && coords) {
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("east") != -1) {
                    if (need_heading){
                        need_heading = false;
                        grid_info += goal_to_achieve;
                    }
                    grid_info += RUR.translate("A wall must be built east of this location.") + "<br>";
                }
                if (goals.walls[coords].indexOf("north") != -1) {
                    if (need_heading){
                        need_heading = false;
                        grid_info += goal_to_achieve;
                    }
                    grid_info += RUR.translate("A wall must be built north of this location.") + "<br>";
                }
            }
            x -= 1;
            coords = x + "," + y;
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("east") != -1) {
                    if (need_heading){
                        need_heading = false;
                        grid_info += goal_to_achieve;
                    }
                    grid_info += RUR.translate("A wall must be built west of this location.") + "<br>";
                }
            }
            x += 1;
            y -= 1;
            coords = x + "," + y;
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("north") != -1) {
                    if (need_heading){
                        need_heading = false;
                        grid_info += goal_to_achieve;
                    }
                    grid_info += RUR.translate("A wall must be built south of this location.") + "<br>";
                }
            }
            y += 1;
            coords = x + "," + y;
        }
    }

    return grid_info + '</div>';
}


RUR.create_and_activate_dialogs( $("#world-info-button"), $("#World-info"),
                                 {height:600, width:800}, RUR.world_get.world_info);