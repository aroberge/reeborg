require("./../rur.js");

var default_palette;

default_palette = {
    'start': 'rgb(0, 190, 0)',
    'two way': 'rgba(255, 255, 0, 0.2)',
    'end': 'rgba(255, 0, 0, 0.7)',
    'three way': 'rgba(0, 0, 255, 0.1)',
    'four way': 'rgb(160, 0, 160)',
    'in room': 'beige'
}
function randint(max) {
    // returns integer between 0 and max-1
    return Math.floor(Math.random() * max);
}

// Fisher–Yates in-place shuffle as modified by Durstenfeld
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffle(arr) {
    var i, j, temp, n=arr.length;
    for (i=n-1; i >= 1; i--) {
        j = randint(i);
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}


function set_custom_palette(user_palette){
    "use strict"
    var i, key, keys;
    keys = Object.keys(user_palette);
    for(i=0; i < keys.length; i++) {
        key = keys[i];
        RUR.current_maze.palette[key] = user_palette[key];
    }
}

function color_tile(color, x, y) {
    // accept either background tile or color for flexibility
    if (RUR.current_maze.show_color == undefined) {
        return;
    }
    if(RUR.KNOWN_THINGS.indexOf(RUR.translate_to_english(color)) != -1){
        RUR.add_background_tile(color, x, y);
    } else {
        RUR.add_colored_tile(color, x, y);
    }
}

function update_color(x, y) {
    "use strict"
    // update color at location based on characteristics:
    // inside a room
    // starting point (fixed color)
    // number of walls surrounding the tile
    var color, walls;
    if (RUR.current_maze.show_color == undefined) {
        return;
    }
    if (in_room(x, y)) {
        color = RUR.current_maze.palette["in room"];
    } else if(x == RUR.current_maze.start.x && y == RUR.current_maze.start.y) {
        color = RUR.current_maze.palette["start"];
    } else {
        walls = 0;
        if (RUR.is_wall("north", x, y)) {
            walls++;
        }
        if (RUR.is_wall("east", x, y)) {
            walls++;
        }
        if (RUR.is_wall("south", x, y)) {
            walls++;
        }
        if (RUR.is_wall("west", x, y)) {
            walls++;
        }
        switch (walls){
            case 1:
                color = RUR.current_maze.palette['three way'];
                break;
            case 2:
                color = RUR.current_maze.palette['two way'];
                break;
            case 3:
                color = RUR.current_maze.palette['end'];
                break;
            case 0:
                color = RUR.current_maze.palette['four way'];
                break;
            default:
                color = "black";
        }
    }
    color_tile(color, x, y);
}

function in_room(x, y) {
    "use strict"
    // returns true if the point is within an existing room
    var r, room;
    for (r=0; r < RUR.current_maze.rooms.length; r++) {
        room = RUR.current_maze.rooms[r];
        if (x >= room.x_min && x < room.x_max && y >= room.y_min && y < room.y_max) {
            return true;
        }
    }
    return false;
}

function open_single_door(x, y, room, direction) {
    "use strict"
    if (direction == "west") {
        x = room.x_min;
    } else if (direction == "east") {
        x = room.x_max - 1;
    } else if (direction == "north") {
        y = room.y_max - 1;
    } else if (direction == "south") {
        y = room.y_min;
    }
    try {
        RUR.remove_wall(direction, x, y);
        return {direction: direction, x:x, y:y};
    } catch(e) { // world boundary walls cannot be removed
        return false;
    }

}


function open_doors(room, nb_doors_goal) {
    "use strict"
    var directions, i, x, y, open = 0, door;
    x = room.x_min + randint(room.x_max-room.x_min);
    y = room.y_min + randint(room.y_max-room.y_min);
    directions = ["east", "west", "north", "south"];
    shuffle(directions);
    for (i=0; i < directions.length; i++) {
        door = open_single_door(x, y, room, directions[i]);
        if (door) {
            room.doors.push(door);
            open++;
            if (open==nb_doors_goal) {
                return;
            }
        }
    }
}

function fit_non_overlapping_rooms(world_width, world_height) {
    /* Given a goal of N rooms, makes 5*N^2 attempt to randomly find spaces
       for putting rooms that are entirely contained with the world and
        do not overlap with each other */
    "use strict"
    var i, nb_attempts, nb_rooms, nb_rooms_goal, overlap, room, x, y, xx, yy, width, height;
    i = 0;
    nb_rooms = 0;
    nb_rooms_goal = RUR.current_maze.nb_rooms_goal;
    nb_attempts = 5 * nb_rooms_goal * nb_rooms_goal;

    while (i < nb_attempts) {
        i++;
        if (RUR.current_maze.room_max_width) {
            width = RUR.current_maze.room_width + randint(RUR.current_maze.room_max_width);
        } else {
            width = RUR.current_maze.room_width;
        }
        if (RUR.current_maze.room_max_height) {
            height = RUR.current_maze.room_height + randint(RUR.current_maze.room_max_height);
        } else {
            height = RUR.current_maze.room_height;
        }

        x = randint(world_width - width - 1) + 1;
        y = randint(world_height - height - 1) + 1;
        overlap = false;
        overlap_loop:
        for (xx=x-1; xx <= x+width; xx++){
            for (yy=y-1; yy <= y+height; yy++) {
                if (in_room(xx, yy)) {
                    overlap = true;
                    break overlap_loop;
                }
            }
        }
        if (!overlap) {
            RUR.current_maze.rooms.push({x_min:x, y_min:y, x_max:x+width, y_max:y+height,
            doors: []})
            nb_rooms++;
            if (nb_rooms == nb_rooms_goal) {
                return;
            }
        }
    }
}

function init_current_maze() {
    RUR.current_maze = {};
    RUR.current_maze.rooms = [];
    RUR.current_maze.in_room = in_room;
    RUR.current_maze.start = {};
    RUR.current_maze.palette = {};
}

/** @function create_maze
 * @memberof RUR
 * @instance
 *
 * @desc Creates a maze of a specified size. This is done with a
 * depth-search wall removal algorithm.<br><br>
 *
 * **Note**: When `options.recording` is set to `true`, the number of
 * steps required to build and show the maze is `max_x * max_y + 3`;
 * if required, use `set_max_nb_steps()` to increase the default limit
 * of 1000.<br><br>
 *
 * **For the palette**: any color value recognized by html/javascript
 * (i.e. `red`, `rgb(126, 230, 0)`, `#ffc356`, etc., can be used).
 *
 * @param {integer} max_x The width of the world.
 * @param {integer} max_y The height of the world.
 * @param {object} [options]
 * @param {bool} [options.small_tiles] Indicates if small tiles must be used.
 * This is useful for larger mazes
 * @param {bool} [options.recording] If `true`, the walls being removed
 * will be shown as they are removed one by one, in a series of frames.
 * This is only useful for demonstration, and will only visible if the
 * maze is created as part of the Pre code or the main code - but not in
 * the Onload phase.
 * @param {bool} [options.show_colors] If `true`, the path construction will be
 * shown using a pre-defined color scheme, indicating the starting point,
 * and the branching points.
 * @param {bool} [options.visible_grid] If `true`, the grid will be (possibly more) visible.
 * This is equivalent to writing `RUR.state.visible_grid = true` in your program.
 * This might be useful if you have `options.show_colors == true` and choose a
 * custom palette with opaque colors.
 * @param {obj} [options.palette] An optional color palette. You can replace
 * any or all of the default colors.
 * @param {string} [options.palette['start']] Color to use as starting point;
 * the default value is 'rgb(0, 190, 0)'.
 * @param {string} [options.palette['end']] Color used to indicate that we have
 * reached a dead end. The default value is 'rgba(255, 0, 0, 0.7)'.
 * @param {string} [options.palette['two way']] The default value is 'rgba(255, 255, 0, 0.2)'.
 * @param {string} [options.palette['three way']] The default value is 'rgba(0, 0, 255, 0.1)'.
 * @param {string} [options.palette['four way']] This rarely happens:
 * it correspond to a grid square open on all sides. The default value is 'rgb(160, 0, 160)'.
 *
 */
RUR.create_maze = function (max_x, max_y, options) {
    "use strict"
    var world;
    init_current_maze();
    set_custom_palette(default_palette);
    world = RUR.create_empty_world();
    if (options && options.small_tiles) {
        world.small_tiles = true;
    }
    RUR.set_current_world(world);
    RUR.set_world_size(max_x, max_y);
    RUR._recording_(false);
    fill_walls(max_x, max_y);
    if (options) {
        if (options.palette) {
            set_custom_palette(options.palette);
        }
        if (options.show_colors) {
            RUR.current_maze.show_color = true;
        }
        if (options.recording) {
            RUR._recording_(true);
            RUR.record_frame("create_maze", "wall filled");
        }
        if (options.visible_grid) {
            RUR.state.visible_grid = true;
        }
        if (options.nb_rooms_goal) {
            RUR.current_maze.nb_rooms_goal = options.nb_rooms_goal;
            if (options.room_width) {
                RUR.current_maze.room_width = options.room_width;
                if (options.room_max_width && options.room_max_width > options.room_width) {
                    RUR.current_maze.room_max_width = options.room_max_width;
                }
            } else {
                RUR.current_maze.room_width = 1;
            }
            if (options.room_height) {
                RUR.current_maze.room_height = options.room_height;
                if (options.room_max_height && options.room_max_height > options.room_height) {
                    RUR.current_maze.room_max_height = options.room_max_height;
                }
            } else {
                RUR.current_maze.room_height = 1;
            }
            if (options.nb_doors_goal) {
                RUR.current_maze.nb_doors_goal = options.nb_doors_goal;
            } else {
                RUR.current_maze.nb_doors_goal = 0;
            }
        }
    }
    remove_walls_dfs(max_x, max_y);
    RUR._recording_(true);
    RUR.record_frame("create_maze", "completed");
};

function fill_walls(max_x, max_y) {
    "use strict"
    var x, y;
    for(x=1; x < max_x; x++){
        for(y=1; y < max_y; y++){
            RUR.add_wall("east", x, y);
            RUR.add_wall("north", x, y);
        }
        RUR.add_wall("east", x, max_y);
    }
    for(y=1; y < max_y; y++){
        RUR.add_wall("north", max_x, y);
    }
}

function make_room(room, vis) {
    "use strict"
    var i, j, in_room_color, recording_state, x, y, x_max, y_max;
    in_room_color = RUR.current_maze.palette["in room"];
    x = room.x_min;
    x_max = room.x_max;
    y = room.y_min;
    y_max = room.y_max;
    recording_state = RUR._recording_(false);
    for(i=x; i < x_max-1; i++){
        for(j=y; j < y_max-1; j++) {
            try {  // could be boundary wall
                RUR.remove_wall("east", i, j);
            } catch (e) {}
            try {
                RUR.remove_wall("north", i, j);
            } catch (e) {}
            color_tile(in_room_color, i, j);
            vis[i-1][j-1] = true;
        }
        try {
            RUR.remove_wall("east", i, y_max-1);
        } catch (e) {}
        color_tile(in_room_color, i, y_max-1);
        vis[i-1][j-1] = true;
    }
    for(j=y; j < y_max-1; j++) {
        try {
            RUR.remove_wall("north", x_max-1, j);
        } catch (e) {}
        color_tile(in_room_color, x_max-1, j);
        vis[i-1][j-1] = true;
    }
    color_tile(in_room_color, x_max-1, y_max-1);
    vis[x_max-2][y_max-2] = true;
    RUR._recording_(recording_state);
}


/* Depth-first search wall removal

    See https://en.wikipedia.org/wiki/Maze_generation_algorithm
    Adapted from the Python version found at http://rosettacode.org/wiki/Maze_generation

    1. We pick a random cell
    2. We select a random neighbouring cell ...
    3. ... that has not been visited
    4. We remove the wall between the two cells and add the neighbouring cell
    to the list of cells having been visited.
    5. If there are no unvisited neighbouring cell, we backtrack to one that
    has at least one unvisited neighbour;
    this is done until we backtract to the original cell.
*/

function remove_walls_dfs(w, h){
    var i, j, vis, temp, x_init, y_init;
    vis = [];
    for(i = 0; i<w; i++){
        temp = [];
        for(j=0; j<h; j++){
            temp.push(false);
        }
        vis.push(temp);
    }

    fit_non_overlapping_rooms(w, h);
    for(i=0; i < RUR.current_maze.rooms.length; i++){
        var room = RUR.current_maze.rooms[i];
        make_room(room, vis);
        if (RUR.current_maze.nb_doors_goal) {
            open_doors(room, RUR.current_maze.nb_doors_goal);
        }

    }

    while (true) {
        x_init = randint(w); // 1. pick a random cell, not in a room
        y_init = randint(h);
        if (!vis[x_init][y_init]) {
            break;
        }
    }
    RUR.current_maze.start.x = x_init+1;
    RUR.current_maze.start.y = y_init+1;
    color_tile(RUR.current_maze.palette['start'], x_init+1, y_init+1);
    walk(x_init, y_init, vis);
}

function walk(x, y, vis){
    var i, d, dd, xx, yy, recording_state;
    vis[x][y] = true; // 4. add start cell to visited
    d = [[x - 1, y], [x, y + 1], [x + 1, y], [x, y - 1]];
    shuffle(d);  // 2. randomize neighbours
    for(i=0; i<=3; i++){
        dd = d[i];  // 2. pick neighbours in random order
        xx = dd[0];
        yy = dd[1]
        if(vis[xx] && vis[xx][yy]){ // 3. ignore visited
            continue;
        }
        if (vis[xx] === undefined || vis[xx][yy] === undefined){
            continue; // not in the world
        }

        recording_state = RUR._recording_(false);
        if (xx === x) {  // 4. remove wall ...
            // add 1 to x & y compared with vis which is zero-based
            RUR.remove_wall("north", x+1, Math.min(y, yy)+1);
            update_color(x+1, y+1);
            update_color(x+1, yy+1);
        } else {
            RUR.remove_wall("east", Math.min(x, xx)+1, y+1);
            update_color(x+1, y+1);
            update_color(xx+1, y+1);
        }
        RUR._recording_(recording_state);
        RUR.record_frame("from maze, updating colors");
        walk(xx, yy, vis); // recursive call; push ahead
    }
} // end recursive call, effectively backtrack
