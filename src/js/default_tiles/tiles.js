/* Initially, Reeborg's World only contained "objects", starting with a
  single one (beeper, which became token) and slowly increasing the number
  and characteristics (e.g. animated object).  The first objects were
  drawn on the canvas; eventually they were replaced by square images.

  In parallel, background images, known as tiles could be added on the grid
  to create worlds that could be more visually appealing.

  Eventually, all custom canvas drawings were replaced by square images for
  simplicity and consistency. */

require("./../rur.js");
require("./../world_api/add_tile_type.js");

var home_message, obj, tile;

tile = {name: "mud",
    url: RUR._BASE_URL + '/src/images/mud.png',
    message: "I'm stuck in mud.",
    fatal: "mud",
    info: "Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."
};
RUR.add_new_thing(tile);

tile = {name: "ice",
    url: RUR._BASE_URL + '/src/images/ice.png',
    message: "I'm slipping on ice!",
    info: "Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location."
};
RUR.add_new_thing(tile);

tile = {name: "grass",
    url: RUR._BASE_URL + '/src/images/grass.png',
    info: "Grass: usually safe."
};
RUR.add_new_thing(tile);

tile = {name: "pale_grass",
    url: RUR._BASE_URL + '/src/images/pale_grass.png',
    info: "Grass: usually safe.",
};
RUR.add_new_thing(tile);

tile = {name: "gravel",
    url: RUR._BASE_URL + '/src/images/gravel.png',
    info: "Gravel: usually safe."
};
RUR.add_new_thing(tile);

tile = {
    name:"water",
    images: [RUR._BASE_URL + '/src/images/water.png',
        RUR._BASE_URL + '/src/images/water2.png',
        RUR._BASE_URL + '/src/images/water3.png',
        RUR._BASE_URL + '/src/images/water4.png',
        RUR._BASE_URL + '/src/images/water5.png',
        RUR._BASE_URL + '/src/images/water6.png'],
    info: "Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location.",
    fatal: "water",
    detectable: true,
    message: "I'm in water!"
};
RUR.add_new_thing(tile);

tile = {name: "bricks",
    url: RUR._BASE_URL + '/src/images/bricks.png',
    info: "brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.",
    message: "Crash!",
    detectable: true,
    fatal: "bricks",
    solid: true
};
RUR.add_new_thing(tile);


// fire adapted from https://commons.wikimedia.org/wiki/File:Icon-Campfire.svg
tile = {name: "fire",
    url: RUR._BASE_URL + '/src/images/fire.png',
    info: "fire: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.",
    message: "My joints are melting!",
    detectable: true,
    fatal: "fire"
};
RUR.add_new_thing(tile);

/*--- home tiles ---*/

home_message = ": Reeborg <b>can</b> detect this tile using at_goal().";

tile = {name: "green_home_tile",
    url: RUR._BASE_URL + '/src/images/green_home_tile.png',
    info: "green_home_tile" + home_message,
    detectable: true
};
RUR.add_new_thing(tile);

tile = {name: "house",
    url: RUR._BASE_URL + '/src/images/house.png',
    info: "house" + home_message,
    detectable: true
};
RUR.add_new_thing(tile);

tile = {name: "racing_flag",
    url: RUR._BASE_URL + '/src/images/racing_flag.png',
    info: "racing_flag" + home_message,
    detectable: true
};
RUR.add_new_thing(tile);

/* --- default objects  -----*/

_add_object_type = function (name) {
    "use strict";
    var url, url_goal;
    url = RUR._BASE_URL + '/src/images/' + name + '.png';
    url_goal = RUR._BASE_URL + '/src/images/' + name + '_goal.png';
    RUR.add_new_thing({"name": name, "url": url, "goal": {"url": url_goal}});
};

_add_object_type("token");
_add_object_type("star");
_add_object_type("triangle");
_add_object_type("square");
_add_object_type("strawberry");
_add_object_type("banana");
_add_object_type("apple");
_add_object_type("leaf");
_add_object_type("carrot");
_add_object_type("dandelion");
_add_object_type("orange");
_add_object_type("daisy");
_add_object_type("tulip");
_add_object_type("east");
_add_object_type("north");
RUR.TILES.east.x_offset = 38;
RUR.TILES.east.y_offset = -2;
RUR.TILES.north.x_offset = -2;
RUR.TILES.north.y_offset = -2;

function _add_static_wall(name, x_offset) {
    "use strict";
    var url, y_offset=-2;
    url = RUR._BASE_URL + '/src/images/' + name + '.png';
    RUR.add_new_thing({"name": name, "url": url,
                     "x_offset": x_offset, "y_offset": y_offset});
}
_add_static_wall("east_border", 38);
_add_static_wall("east_grid", 38);
_add_static_wall("east_edit", 38);

_add_static_wall("north_border", -2);
_add_static_wall("north_grid", -2);
_add_static_wall("north_edit", -2);

_add_object_type("box");
RUR.TILES.box.name = "box";
// RUR.TILES.box.transform is defined elsewhere

tile = {
    name: "bridge",
    info: "Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water.",
    url: RUR._BASE_URL + '/src/images/bridge.png',
    protections: ["water", "mud"]
};
RUR.add_new_thing(tile);

obj = {"name": 'beeper',
    "selection_method": 'ordered',
    "images": [RUR._BASE_URL + '/src/images/beeper0.png',
            RUR._BASE_URL + '/src/images/beeper1.png',
            RUR._BASE_URL + '/src/images/beeper2.png',
            RUR._BASE_URL + '/src/images/beeper3.png'],
    "goal": {'url': RUR._BASE_URL + '/src/images/beeper_goal.png'}
};
RUR.add_new_thing(obj);

add_new_obstacle_type = function (name, url) {
    var obj = RUR.TILES;
    obj[name] = {};
    obj[name].name = name;
    obj[name].fatal = true;
    obj[name].solid = true;
    obj[name].detectable = true;
    obj[name].ctx = RUR.OBSTACLES_CTX;
    obj[name].image = new Image();
    if (url) {
        obj[name].url = url;
    } else {
        obj[name].url = RUR._BASE_URL + '/src/images/' + name + '.png';
    }
    obj[name].image.src = obj[name].url;

    obj[name].image.onload = RUR._incremented_loaded_images;
    RUR._NB_IMAGES_TO_LOAD += 1;
    RUR.KNOWN_TILES.push(name);
};


add_new_obstacle_type("fence_right", false);
RUR.TILES.fence_right.message = "I hit a fence!";
RUR.TILES.fence_right.info = "Fence: Reeborg <b>can</b> detect this but will be stopped by it.";

add_new_obstacle_type("fence_left", false);
RUR.TILES.fence_left.message = RUR.TILES.fence_right.message;
RUR.TILES.fence_left.info = RUR.TILES.fence_right.info;

add_new_obstacle_type("fence_double", false);
RUR.TILES.fence_double.message = RUR.TILES.fence_right.message;
RUR.TILES.fence_double.info = RUR.TILES.fence_right.info;

add_new_obstacle_type("fence_vertical", false);
RUR.TILES.fence_vertical.message = RUR.TILES.fence_right.message;
RUR.TILES.fence_vertical.info = RUR.TILES.fence_right.info;

