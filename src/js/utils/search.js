require("./../rur.js");
require("./../world_api/is_fatal.js");
require("./../world_api/walls.js");
require("./../programming_api/commands.js");
var random = require("./../utils/random.js");
var shuffle = random.shuffle;
var randint = random.randint;

 // The ideas used here are inspired from
 // http://www.redblobgames.com/pathfinding/a-star/introduction.html

default_palette = {
    'current': 'rgba(0, 255, 127, 0.5)',
    'on_frontier': 'rgba(135, 206, 235, 0.5)',
    'done': 'rgba(211, 211, 211, 0.5)'
};

function set_custom_palette(user_palette, container){
    "use strict";
    var i, key, keys;
    keys = Object.keys(user_palette);
    for(i=0; i < keys.length; i++) {
        key = keys[i];
        container.palette[key] = user_palette[key];
    }
}

/** @constructor Deque
 * @memberof RUR
 *
 * @desc Description to be added
 */

RUR.Deque = function (no_colors) {
    if (!no_colors) {
        this.use_colors = true;
        this.palette = {};
        set_custom_palette(default_palette, this);
    } else {
        this.use_colors = false;
    }
    this.array = [];
    this.previous_item = undefined;

    this.append = function(item) {
        this.array.push(item);
        if (this.use_colors) {
            this.set_color(this.palette["on_frontier"], item);
        }
    };

    this.set_palette = function (palette) {
        set_custom_palette(palette, this);
    };

    this.get_last = function() {
        var item = this.array.pop();
        if (this.use_colors) {
            this.set_color(this.palette["current"], item);
        }
        this.previous_item = item;
        return item;
    };

    this.get_first = function() {
        var item = this.array.shift();
        if (this.use_colors) {
            this.set_color(this.palette["current"], item);
        }
        this.previous_item = item;
        return item;
    };

    this.is_empty = function () {
        return this.array.length === 0;
    };

    this.mark_done = function (item) {
        if (this.use_colors) {
            this.set_color(this.palette["done"], item);
        }
    };

    this.set_color = function(color, item) {
        var x=item[0], y=item[1], recording_state;
        recording_state = RUR._recording_(false);
        if (RUR.is_decorative_object(this.palette["current"], x, y)) {
            RUR.remove_decorative_object(this.palette["current"], x, y);
        }
        if (RUR.is_decorative_object(this.palette["on_frontier"], x, y)) {
            RUR.remove_decorative_object(this.palette["on_frontier"], x, y);
        }
        if (RUR.is_decorative_object(this.palette["done"], x, y)) {
            RUR.remove_decorative_object(this.palette["done"], x, y);
        }
        RUR.add_decorative_object(color, x, y);
        RUR._recording_(recording_state);
        RUR.record_frame();
    };
};

// To be called from Python
RUR.create_deque = function(no_colors) {
    return new RUR.Deque(no_colors);
};


RUR.get_neighbours = function(current, options) {
    "use strict";
    var robot_body, ordered, ignore_walls;
    robot_body = RUR._default_robot_body_();
    if (options) {
        if (options.robot_body) {
            robot_body = options.robot_body;
        }
        if (options.ignore_walls){
            ignore_walls = options.ignore_walls;
        }
        if (options.ordered) {
            ordered = options.ordered;
        }
    } else {
        robot_body = undefined;
        ignore_walls = false;
        ordered = false;
    }
    if (options.track_turns) {
        return get_neighbours_track_turns(current, ignore_walls, ordered, robot_body);
    } else {
        return get_neighbours_around(current, ignore_walls, ordered, robot_body);
    }
};

// get neighbours when direction is unimportant

function get_neighbours_around (current, ignore_walls, ordered, robot_body) {
    "use strict";
    var x, y, neighbours, world, max_x, max_y;

    world = RUR.get_current_world();
    neighbours = [];
    x = current[0];
    y = current[1];
    max_x = world.cols;
    max_y = world.rows;
    if (x < max_x && !RUR.is_fatal_position(x+1, y, robot_body)) {
            if (ignore_walls || !RUR.is_wall(RUR.translate("east"), x, y)) {
                neighbours.push([x+1, y]);
        }
    }
    if (y < max_y && !RUR.is_fatal_position(x, y+1, robot_body)) {
            if (ignore_walls || !RUR.is_wall(RUR.translate("north"), x, y)) {
                neighbours.push([x, y+1]);
        }
    }
    if (x > 1 && !RUR.is_fatal_position(x-1, y, robot_body)) {
            if (ignore_walls || !RUR.is_wall(RUR.translate("west"), x, y)) {
                neighbours.push([x-1, y]);
        }
    }
    if (y > 1 && !RUR.is_fatal_position(x, y-1, robot_body)) {
            if (ignore_walls || !RUR.is_wall(RUR.translate("south"), x, y)) {
                neighbours.push([x, y-1]);
        }
    }
    if (!ordered) {
        shuffle(neighbours);
    }
    return neighbours;
}

/* for get_neighbours_track_turns, we define a neighbour as either the node
   immediately in front **or** the same node but turning left.
*/

function get_neighbours_track_turns (current, ignore_walls, ordered, robot_body) {
    "use strict";
    var direction, x, y, neighbours, world, max_x, max_y;

    world = RUR.get_current_world();

    neighbours = [];
    x = current[0];
    y = current[1];
    direction = current[2];

    max_x = world.cols;
    max_y = world.rows;

    switch (direction) {
        case "east":
            neighbours.push([x, y, "north"]);
            if (x < max_x && !RUR.is_fatal_position(x+1, y, robot_body)) {
                if (ignore_walls || !RUR.is_wall(RUR.translate("east"), x, y)) {
                    neighbours.push([x+1, y, "east"]);
                }
            }
            break;
        case "north":
            neighbours.push([x, y, "west"]);
            if (y < max_y && !RUR.is_fatal_position(x, y+1, robot_body)) {
                if (ignore_walls || !RUR.is_wall(RUR.translate("north"), x, y)) {
                    neighbours.push([x, y+1, "north"]);
                }
            }
            break;
        case "west":
            neighbours.push([x, y, "south"]);
            if (x > 1 && !RUR.is_fatal_position(x-1, y, robot_body)) {
                if (ignore_walls || !RUR.is_wall(RUR.translate("west"), x, y)) {
                    neighbours.push([x-1, y, "west"]);
                }
            }
            break;
        case "south":
            neighbours.push([x, y, "east"]);
            if (y > 1 && !RUR.is_fatal_position(x, y-1, robot_body)) {
                if (ignore_walls || !RUR.is_wall(RUR.translate("south"), x, y)) {
                    neighbours.push([x, y-1, "south"]);
                }
            }
            break;
    }

    if (!ordered) {
        shuffle(neighbours);
    }

    return neighbours;
}