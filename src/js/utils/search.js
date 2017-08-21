require("./../rur.js");
 // The ideas used here are inspired from
 // http://www.redblobgames.com/pathfinding/a-star/introduction.html

/* Generic container introduced for teaching purpose only.
 */
default_palette = {
    'current': 'SpringGreen',
    'on_frontier': 'SkyBlue',
    'done': 'LightGray'
}

function set_custom_palette(user_palette, container){
    "use strict"
    var i, key, keys;
    keys = Object.keys(user_palette);
    for(i=0; i < keys.length; i++) {
        key = keys[i];
        container.palette[key] = user_palette[key];
    }
}

function Container (no_colors) {
    if (!no_colors) {
        this.use_colors = true;
        this.palette = {};
        set_custom_palette(default_palette, this);
    } else {
        this.use_colors = false;
    }
    this.array = [];
    this.append = function(item) {
        this.array.push(item);
        if (this.use_colors) {
            RUR.add_colored_tile(this.palette["on_frontier"], item[0], item[1]);
        }
    };
    this.set_palette = function (palette) {
        set_custom_palette(palette, this);
    }
    this.get_last = function() {
        var item = this.array.pop();
        if (this.use_colors) {
            RUR.add_colored_tile(this.palette["current"], item[0], item[1]);
        }
        return item;
    };
    this.get_first = function() {
        var item = this.array.shift();
        if (this.use_colors) {
            RUR.add_colored_tile(this.palette["current"], item[0], item[1]);
        }
        return item;
    };
    this.is_empty = function () {
        return this.array.length == 0;
    };
    this.set_done = function (item) {
        if (this.use_colors) {
            RUR.add_colored_tile(this.palette["done"], item[0], item[1]);
        }
    }
}

window.Container = Container;

RUR.create_container = function(no_colors) {
    return new Container(no_colors);
};

RUR.get_neighbours = function(current) {
    "use strict"
    var x, y, neighbours, max_x, max_y, world = RUR.get_current_world();
    neighbours = [];
    x = current[0];
    y = current[1];
    max_x = world.cols;
    max_y = world.rows;
    if (x < max_x) {
        neighbours.push([x+1, y]);
    }
    if (y < max_y) {
        neighbours.push([x, y+1]);
    }
    if (x > 1) {
        neighbours.push([x-1, y]);
    }
    if (y > 1) {
        neighbours.push([x, y-1])
    }
    return neighbours;
}

