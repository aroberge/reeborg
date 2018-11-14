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


/**---------------------------- */

/** @constructor PriorityQueue
 * @memberof RUR
 *
 * @desc Description to be added
 */

RUR.PriorityQueue = function (no_colors) {
    if (!no_colors) {
        this.use_colors = true;
        this.palette = {};
        set_custom_palette(default_palette, this);
    } else {
        this.use_colors = false;
    }
    this.array = [];

    this.add = function(node, cost) {
        var i, idx = 0, n = this.array.length;
        if (n===0) {
            this.array[0] = [node, cost];
        } else {
            for (i=n-1; i >= 0; i--){
                if (cost < this.array[i][1]) {
                    idx = i + 1;
                    break;
                } else {
                    this.array[i+1] = this.array[i];
                }
            }
            this.array[idx] = [node, cost];
        }
        if (this.use_colors) {
            this.set_color(this.palette["on_frontier"], node);
        }
    };

    this.set_palette = function (palette) {
        set_custom_palette(palette, this);
    };

    this.get_best = function() {
        var item = this.array.pop();
        if (this.use_colors) {
            this.set_color(this.palette["current"], item[0]);
        }
        return item[0];
    };

    this.is_empty = function () {
        return this.array.length === 0;
    };

    this.mark_done = function (node) {
        if (this.use_colors) {
            this.set_color(this.palette["done"], node);
        }
    };

    this.set_color = function(color, node) {
        var x=node[0], y=node[1], recording_state;
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
RUR.create_priority_queue = function(no_colors) {
    return new RUR.PriorityQueue(no_colors);
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
            if (ignore_walls || !RUR._is_wall("east", x, y)) {
                neighbours.push([x+1, y]);
        }
    }
    if (y < max_y && !RUR.is_fatal_position(x, y+1, robot_body)) {
            if (ignore_walls || !RUR._is_wall("north", x, y)) {
                neighbours.push([x, y+1]);
        }
    }
    if (x > 1 && !RUR.is_fatal_position(x-1, y, robot_body)) {
            if (ignore_walls || !RUR._is_wall("west", x, y)) {
                neighbours.push([x-1, y]);
        }
    }
    if (y > 1 && !RUR.is_fatal_position(x, y-1, robot_body)) {
            if (ignore_walls || !RUR._is_wall("south", x, y)) {
                neighbours.push([x, y-1]);
        }
    }
    if (!ordered) {
        shuffle(neighbours);
    }
    return neighbours;
}

/* for get_neighbours_turn_left, we define a neighbour as either the node
   immediately in front **or** the same node but turning left.
*/

function get_neighbours_turn_left (current, ignore_walls, ordered, robot_body) {
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
                if (ignore_walls || !RUR._is_wall("east", x, y)) {
                    neighbours.push([x+1, y, "east"]);
                }
            }
            break;
        case "north":
            neighbours.push([x, y, "west"]);
            if (y < max_y && !RUR.is_fatal_position(x, y+1, robot_body)) {
                if (ignore_walls || !RUR._is_wall("north", x, y)) {
                    neighbours.push([x, y+1, "north"]);
                }
            }
            break;
        case "west":
            neighbours.push([x, y, "south"]);
            if (x > 1 && !RUR.is_fatal_position(x-1, y, robot_body)) {
                if (ignore_walls || !RUR._is_wall("west", x, y)) {
                    neighbours.push([x-1, y, "west"]);
                }
            }
            break;
        case "south":
            neighbours.push([x, y, "east"]);
            if (y > 1 && !RUR.is_fatal_position(x, y-1, robot_body)) {
                if (ignore_walls || !RUR._is_wall("south", x, y)) {
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


/** @constructor Graph
 * @memberof RUR
 *
 * @desc Description to be added
 */

RUR.Graph = function (options) {
    "use strict";
    this.robot_body = RUR._default_robot_body_();
    this.ordered = false;
    this.ignore_walls = false;
    this.turn_left = false;
    this.cost_info = {};

    if (options) {
        if (options.robot_body) {
            this.robot_body = options.robot_body;
        }
        if (options.ignore_walls){
            this.ignore_walls = options.ignore_walls;
        }
        if (options.ordered) {
            this.ordered = options.ordered;
        }
        if (options.turn_left) {
            this.turn_left = options.turn_left;
        }
    }


    this.neighbours = function(current) {

        if (this.turn_left) {
            return get_neighbours_turn_left(current, this.ignore_walls, this.ordered, this.robot_body);
        } else {
            return get_neighbours_around(current, this.ignore_walls, this.ordered, this.robot_body);
        }
    };

    this.cost = function(current, neighbour) {
        var action, x, y, to_x, to_y;
        x = current[0];
        y = current[1];
        to_x = neighbour[0];
        to_y = neighbour[1];
        if (x != to_x || y != to_y) {
            action = "move";
        } else {
            action = get_turn(current, neighbour);
        }

        if (action=="move") {
            return 1;
        } else if (action == "turn_left") {
            return 1;
        } else if (action == "turn_around") {
            return 2;
        } else if (action == "turn_right") {
            return 3;
        } else {
            throw new RUR.ReeborgError("Unknown action in RUR.Graph.cost");
        }
    };

};

function get_turn (current, neighbour) {
    "use strict";
    var direction, to_direction;
    direction = current[2];
    to_direction = neighbour[2];
    switch (direction) {
        case "east":
            if (to_direction == "north"){
                return "turn_left";
            } else if (to_direction == "west"){
                return "turn_around";
            } else if(to_direction == "south") {
                return "turn_right";
            }
            break;
        case "north":
            if (to_direction == "west"){
                return "turn_left";
            } else if (to_direction == "south"){
                return "turn_around";
            } else if(to_direction == "east") {
                return "turn_right";
            }
            break;
        case "west":
            if (to_direction == "south"){
                return "turn_left";
            } else if (to_direction == "east"){
                return "turn_around";
            } else if(to_direction == "north") {
                return "turn_right";
            }
            break;
        case "south":
            if (to_direction == "east"){
                return "turn_left";
            } else if (to_direction == "north"){
                return "turn_around";
            } else if(to_direction == "west") {
                return "turn_right";
            }
            break;
        default: 
            throw new RUR.ReeborgError("Unknown direction in get_turn() [search.js]");
    }
}


// To be called from Python
RUR.create_graph = function(options) {
    return new RUR.Graph(options);
};
