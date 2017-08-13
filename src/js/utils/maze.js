require("./../rur.js");
var palette, default_palette, palette, ROOMS;

default_palette = {
    'start': 'rgb(0, 190, 0)',
    'one way': 'rgba(255, 255, 0, 0.2)',
    'end': 'rgba(255, 0, 0, 0.7)',
    'junction': 'rgba(0, 0, 255, 0.1)',
    'four way': 'rgb(160, 0, 160)',
    'in room': 'beige'
}
palette = {};
ROOMS = [];
START = {};

function set_custom_palette(user_palette){
    var i, key, keys;
    keys = Object.keys(user_palette);
    for(i=0; i < keys.length; i++) {
        key = keys[i];
        palette[key] = user_palette[key];
    }
}

function update_color(x, y) {
    "use strict"
    var color, walls;
    if (in_room(x, y)) {
        color = palette["in room"];
    } else if(x == START.x && y == START.y) {
        color = palette ["start"];
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
                color = palette['junction'];
                break;
            case 2:
                color = palette['one way'];
                break;
            case 3:
                color = palette['end'];
                break;
            case 0:
                color = palette['four way'];
                break;
            default:
                color = "black";
        }
    }
    RUR.add_colored_tile(color, x, y);
}

function in_room(x, y) {
    "use strict"
    var r, room;
    for (r=0; r < ROOMS.length; r++) {
        room = ROOMS[r];
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
        RUR.remove_wall(direction, x, y); // world boundary walls cannot be removed
        return true;
    } catch(e) {
        return false;
    }

}


function open_doors(room) {
    "use strict"
    var directions, i, x, y, open = 0;
    x = room.x_min + randint(room.x_max-room.x_min);
    y = room.y_min + randint(room.y_max-room.y_min);
    directions = ["east", "west", "north", "south"];
    shuffle(directions);
    for (i=0; i < directions.length; i++) {
        if (open_single_door(x, y, room, directions[i])) {
            open++;
            if (open==2) {
                return;
            }
        }
    }
}

function fit_non_overlapping_rooms(number, width, height, world_width, world_height) {
    /* Makes 5*number^2 attempt to randomly find spaces for putting rooms that
    are entirely contained with the world and do not overlap with each other */
    "use strict"
    var i, nb_attempts, nb_rooms, overlap, room, x, y, xx, yy;
    i = 0;
    nb_rooms = 0;
    nb_attempts = 5*number * number;
    var attempts = [];

    while (i < nb_attempts) {
        i++;
        x = randint(world_width - width - 1) + 1;
        y = randint(world_height - height - 1) + 1;
        attempts.push([x, y]);
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
            ROOMS.push({x_min:x, y_min:y, x_max:x+width-1, y_max:y+height-1})
            nb_rooms++;
            if (nb_rooms == number) {
                return;
            }
        }
    }
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
 * @param {string} [options.palette['one way']] The default value is 'rgba(255, 255, 0, 0.2)'.
 * @param {string} [options.palette['junction']] The default value is 'rgba(0, 0, 255, 0.1)'.
 * @param {string} [options.palette['four way']] This rarely happens:
 * it correspond to a grid square open on all sides. The default value is 'rgb(160, 0, 160)'.
 *
 */
RUR.create_maze = function (max_x, max_y, options) {
    "use strict"
    var world, show_color=false;
    ROOMS = [];
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
            show_color = true;
        }
        if (options.recording) {
            RUR._recording_(true);
            RUR.record_frame("create_maze", "wall filled");
        }
        if (options.visible_grid) {
            RUR.state.visible_grid = true;
        }
    }
    remove_walls_dfs(max_x, max_y, show_color);
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
    var i, j, recording_state, x, y, x_max, y_max;
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
            RUR.add_colored_tile(palette["in room"], i, j);
            vis[i-1][j-1] = true;
        }
        try {
            RUR.remove_wall("east", i, y_max-1);
        } catch (e) {}
        RUR.add_colored_tile(palette["in room"], i, y_max-1);
        vis[i-1][j-1] = true;
    }
    for(j=y; j < y_max-1; j++) {
        try {
            RUR.remove_wall("north", x_max-1, j);
        } catch (e) {}
        RUR.add_colored_tile(palette["in room"], x_max-1, j);
        vis[i-1][j-1] = true;
    }
    RUR.add_colored_tile(palette["in room"], x_max-1, y_max-1);
    vis[x_max-2][y_max-2] = true;
    RUR._recording_(recording_state);
}


function randint(max) {
    return Math.floor(Math.random() * max);
}


// Fisher–Yates shuffle as modified by Durstenfeld
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

function remove_walls_dfs(w, h, show_color){
    var i, j, vis, temp, x_init, y_init;
    vis = [];
    for(i = 0; i<w; i++){
        temp = [];
        for(j=0; j<h; j++){
            temp.push(false);
        }
        vis.push(temp);
    }

    fit_non_overlapping_rooms(3, 4, 5, w, h);
    for(i=0; i < ROOMS.length; i++){
        var room = ROOMS[i];
        make_room(room, vis);
        open_doors(room);
    }

    while (true) {
        x_init = randint(w); // 1. pick a random cell, not in a room
        y_init = randint(h);
        if (!vis[x_init][y_init]) {
            break;
        }
    }
    START.x = x_init+1;
    START.y = y_init+1;
    if (show_color) {
        RUR.add_colored_tile(palette['start'], x_init+1, y_init+1);
    }
    walk(x_init, y_init, vis, show_color);
}

function walk(x, y, vis, show_color){
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

        if (xx === x) {  // 4. remove wall ...
            // add 1 to x & y compared with vis which is zero-based
            recording_state = RUR._recording_(false);
            RUR.remove_wall("north", x+1, Math.min(y, yy)+1);
            if (show_color) {
                update_color(x+1, y+1);
                update_color(x+1, yy+1);
            }
            RUR._recording_(recording_state);
            RUR.record_frame("from maze, updating colors");
        } else {
            recording_state = RUR._recording_(false);
            RUR.remove_wall("east", Math.min(x, xx)+1, y+1);
            if (show_color) {
                update_color(x+1, y+1);
                update_color(xx+1, y+1);
            }
            RUR._recording_(recording_state);
            RUR.record_frame("from maze, updating colors");
        }
        walk(xx, yy, vis, show_color); // recursive call; push ahead
    }
} // end recursive call, effectively backtrack
