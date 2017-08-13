require("./../rur.js");
var palette, default_palette = {
    'start': 'rgb(0, 190, 0)',
    'one way': 'rgba(255, 255, 0, 0.2)',
    'end': 'rgba(255, 0, 0, 0.7)',
    'junction': 'rgba(0, 0, 255, 0.1)',
    'four way': 'rgb(160, 0, 160)'
}
palette = {};

function set_custom_palette(user_palette){
    var i, key, keys;
    keys = Object.keys(user_palette);
    for(i=0; i < keys.length; i++) {
        key = keys[i];
        palette[key] = user_palette[key];
    }
}

function next_color(x, y) {
    var i, color;
    switch (RUR.get_background_tile(x, y)){
        case null:
            color = palette['end'];
            break;
        case palette['start']:
            color = palette['start'];
            break;
        case palette['end']:
            color = palette['one way'];
            break;
        case palette['one way']:
            color = palette['junction'];
            break;
        case palette['junction']:
            color = palette['four way'];
            break;
        default:
            color = 'black'
    }
    RUR.add_colored_tile(color, x, y);
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
    x_init = randint(w); // 1. pick a random cell
    y_init = randint(h);
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
        if (show_color) {
            recording_state = RUR._recording_(false);
            next_color(x+1, y+1);
            next_color(xx+1, yy+1);
            RUR._recording_(recording_state);
        }
        if (xx === x) {  // 4. remove wall ...
                // add 1 to x & y compared with viz which is zero-based
            RUR.remove_wall("north", x+1, Math.min(y, yy)+1);
        } else {
            RUR.remove_wall("east", Math.min(x, xx)+1, y+1);
        }
        walk(xx, yy, vis, show_color); // recursive call; push ahead
    }
} // end recursive call, effectively backtrack
