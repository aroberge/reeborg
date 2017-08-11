require("./../rur.js");
// Javascript random maze generation


// may want to use set_max_nb_instructions() to adjust number for larger mazes.
//RUR.MAX_STEPS = 2000;   // may be needed for larger mazes

RUR.create_maze = function (max_x, max_y, options) {
    "use strict"
    var world;
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
    make_maze(max_x, max_y);
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


function shuffle(o){
    for(var j, x, i = o.length; i; j = randint(i), x = o[--i], o[i] = o[j], o[j] = x){}
    return o;
}


function make_maze(w, h){
    // depth-first search wall removal https://en.wikipedia.org/wiki/Maze_generation_algorithm
    // adapted from the Python version found at http://rosettacode.org/wiki/Maze_generation
    var i, j, vis, in_vis;
    vis = [];
    for(i = 0; i<w; i++){
        in_vis = [];
        for(j=0; j<h; j++){
            in_vis.push(false);
        }
        in_vis.push(true);
        vis.push(in_vis);
    }
    in_vis = [];
    for(i=0; i<=w; i++){
        in_vis.push(true);
    }
    vis.push(in_vis);

    function walk(x, y){
        var i, d, dd, xx, yy;
        vis[x][y] = true;
        d = [[x - 1, y], [x, y + 1], [x + 1, y], [x, y - 1]];
        shuffle(d);
        for(i=0; i<=3; i++){
            dd = d[i];
            xx = dd[0];
            yy = dd[1]
            if (vis[xx] === undefined || vis[xx][yy] === undefined){
                continue;
            }
            if(vis[xx][yy]){
               continue;
            }
            if (xx === x) {
                RUR.remove_wall("north", x+1, Math.min(y, yy)+1);
            } else {
                RUR.remove_wall("east", Math.min(x, xx)+1, y+1);
            }
            walk(xx, yy);
        }
    }

    walk(w/2, h/2);
}


