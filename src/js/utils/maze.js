require("./../rur.js");
// Javascript random maze generation


// may want to use set_max_nb_instructions() to adjust number for larger mazes.
//RUR.MAX_STEPS = 2000;   // may be needed for larger mazes

/** @function create_maze
 * @memberof RUR
 * @instance
 *
 * @desc Creates a maze of a specified size. This is done with a
 * depth-search wall removal algorith
 *
 * **Note**: for larger size mazes, you might want to increase the number
 * of steps allowed to find a solution, by using `set_max_nb_steps()`.
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
 * @param {float} [options.remaining_fraction] When this factor is specified,
 * some additional walls are removed at random after the construction of
 * the maze. We must have `0 <= remaining_fraction <=1`.
 */


RUR.create_maze = function (max_x, max_y, options) {
    "use strict"
    var world, frac, to_remove, walls, i, x, y, coords, orientation;
    world = RUR.create_empty_world();
    if (options && options.small_tiles) {
        world.small_tiles = true;
    }
    RUR.set_current_world(world);
    RUR.set_world_size(max_x, max_y);
    RUR._recording_(false);
    fill_walls(max_x, max_y);
    if (options && options.recording) {
        RUR._recording_(true);
        RUR.record_frame("create_maze", "wall filled");
    }
    remove_walls_dfs(max_x, max_y);
    if (options && options.remaining_fraction) {
        frac = options.remaining_fraction;
        if (frac < 0 || frac > 1) {
            throw new Error(frac + " is an invalid value in RUR.create_maze");
        }
        frac = 1-frac;
        walls = Object.keys(world.walls);
        to_remove = [];
        for (i=0; i < walls.length; i++){
            coords = walls[i].split(",");
            x = parseInt(coords[0], 10);
            y = parseInt(coords[1], 10);
            if (world.walls[walls[i]].indexOf("east") != -1) {
                to_remove.push(["east", x, y]);
            }
            if (world.walls[walls[i]].indexOf("north") != -1) {
                to_remove.push(["north", x, y]);
            }
        }
        shuffle(to_remove);
        for (i=0; i < to_remove.length * frac; i++) {
            orientation = to_remove[i][0];
            x = to_remove[i][1];
            y = to_remove[i][2]
            RUR.remove_wall(orientation, x, y);
        }
    }
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

function remove_walls_dfs(w, h){
    var i, j, vis, temp;
    vis = [];
    for(i = 0; i<w; i++){
        temp = [];
        for(j=0; j<h; j++){
            temp.push(false);
        }
        vis.push(temp);
    }
    walk(randint(w-1)+1, randint(h-1)+1, vis); // 1. pick a random cell
}

function walk(x, y, vis){
    var i, d, dd, xx, yy;
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
                // add 1 to x & y compared with viz which is zero-based
            RUR.remove_wall("north", x+1, Math.min(y, yy)+1);
        } else {
            RUR.remove_wall("east", Math.min(x, xx)+1, y+1);
        }
        walk(xx, yy, vis); // recursive call; push ahead
    }
} // end recursive call, effectively backtrack
