require("./../rur.js");
 // The ideas used here are inspired from
 // http://www.redblobgames.com/pathfinding/a-star/introduction.html

/* Generic container introduced for teaching purpose only.
 */
default_palette = {
    'current': 'rgba(0, 255, 127, 0.5)',
    'on_frontier': 'rgba(135, 206, 235, 0.5)',
    'done': 'rgba(211, 211, 211, 0.5)'
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

/** @constructor Container
 * @memberof RUR
 *
 * @desc Description to be added
 */

RUR.Container = function (no_colors) {
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
    }

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
        return this.array.length == 0;
    };

    this.mark_done = function (item) {
        if (this.use_colors) {
            this.set_color(this.palette["done"], item);
        }
    }

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
    }
}

RUR.create_container = function(no_colors) {
    return new RUR.Container(no_colors);
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

