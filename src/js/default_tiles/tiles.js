require("./../rur.js");
require("./../world_api/things.js");

// the following requirements are for automatic transformations
// via the ".transform" attribute
require("./../world_api/background_tile.js");
require("./../world_api/bridges.js");
require("./../world_api/pushables.js");
require("./../world_api/obstacles.js");
require("./../world_api/objects.js");

var home_message, obj, tile;

tile = {name: "mud",
    url: RUR.BASE_URL + '/src/images/mud.png',
    message: "I'm stuck in mud.",
    fatal: "mud",
    info: "Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location."
};
RUR.add_new_thing(tile);

tile = {name: "soil",
    url: RUR.BASE_URL + '/src/images/mud.png',
    info: "Soil: usually safe, but looks identical to mud."
};
RUR.add_new_thing(tile);

tile = {name: "ice",
    url: RUR.BASE_URL + '/src/images/ice.png',
    info: "Ice: Reeborg <b>cannot</b> detect this and <em>might</em> slide and move to the next location if it moves to this location."
};
RUR.add_new_thing(tile);

tile = {name: "grass",
    url: RUR.BASE_URL + '/src/images/grass.png',
    info: "Grass: usually safe."
};
RUR.add_new_thing(tile);

tile = {name: "grass_top_left",
    url: RUR.BASE_URL + '/src/images/grass_top_left.png',
    info: "Grass: usually safe."
};
RUR.add_new_thing(tile);

tile = {name: "grass_top_right",
    url: RUR.BASE_URL + '/src/images/grass_top_right.png',
    info: "Grass: usually safe."
};
RUR.add_new_thing(tile);

tile = {name: "grass_bottom_left",
    url: RUR.BASE_URL + '/src/images/grass_bottom_left.png',
    info: "Grass: usually safe."
};
RUR.add_new_thing(tile);

tile = {name: "grass_bottom_right",
    url: RUR.BASE_URL + '/src/images/grass_bottom_right.png',
    info: "Grass: usually safe."
};
RUR.add_new_thing(tile);

tile = {name: "pale_grass",
    url: RUR.BASE_URL + '/src/images/pale_grass.png',
    info: "Grass: usually safe.",
};
RUR.add_new_thing(tile);

tile = {name: "gravel",
    url: RUR.BASE_URL + '/src/images/gravel.png',
    info: "Gravel: usually safe."
};
RUR.add_new_thing(tile);

tile = {
    name:"water",
    images: [RUR.BASE_URL + '/src/images/water.png',
        RUR.BASE_URL + '/src/images/water2.png',
        RUR.BASE_URL + '/src/images/water3.png',
        RUR.BASE_URL + '/src/images/water4.png',
        RUR.BASE_URL + '/src/images/water5.png',
        RUR.BASE_URL + '/src/images/water6.png'],
    info: "Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location.",
    fatal: "water",
    detectable: true,
    message: "I'm in water!"
};
RUR.add_new_thing(tile);

tile = {name: "bricks",
    url: RUR.BASE_URL + '/src/images/bricks.png',
    info: "brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.",
    message: "Crash!",
    detectable: true,
    fatal: "bricks",
    solid: true
};
RUR.add_new_thing(tile);


// fire adapted from https://commons.wikimedia.org/wiki/File:Icon-Campfire.svg
tile = {name: "fire",
    images: [RUR.BASE_URL + '/src/images/fire.png',
        RUR.BASE_URL + '/src/images/fire1.png',
        RUR.BASE_URL + '/src/images/fire2.png'],
    info: "fire: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.",
    message: "My joints are melting!",
    detectable: true,
    fatal: "fire"
};
RUR.add_new_thing(tile);

// flame burst adapted from fire above
tile = {name: "flame burst",
    images: [RUR.BASE_URL + "/src/images/flame1.png",
             RUR.BASE_URL + "/src/images/flame2.png",
             RUR.BASE_URL + "/src/images/flame3.png",
             RUR.BASE_URL + "/src/images/flame4.png",
             RUR.BASE_URL + "/src/images/flame5.png",
             RUR.BASE_URL + "/src/images/flame6.png"],
  selection_method: "cycle remove",
  x_offset: -4,
  y_offset: -8
};

RUR.add_new_thing(tile);

// logs adapted from fire above
tile = {name: "logs",
    url: RUR.BASE_URL + '/src/images/logs.png',
    info: "Some harmless, slightly burnt logs",
};
RUR.add_new_thing(tile);

// smoke adapted from https://opengameart.org/content/animated-fireball

tile = {name: "smoke",
    images: [RUR.BASE_URL + "/src/images/smoke1.png",
             RUR.BASE_URL + "/src/images/smoke2.png",
             RUR.BASE_URL + "/src/images/smoke3.png",
             RUR.BASE_URL + "/src/images/smoke4.png",
             RUR.BASE_URL + "/src/images/smoke5.png",
             RUR.BASE_URL + "/src/images/smoke6.png"],
  selection_method: "cycle remove",
  y_offset: -8
};

RUR.add_new_thing(tile);


/*--- home tiles ---*/

home_message = ": Reeborg <b>can</b> detect this tile using at_goal().";

tile = {name: "green_home_tile",
    url: RUR.BASE_URL + '/src/images/green_home_tile.png',
    info: "green_home_tile" + home_message,
    detectable: true
};
RUR.add_new_thing(tile);

tile = {name: "house",
    url: RUR.BASE_URL + '/src/images/house.png',
    info: "house" + home_message,
    detectable: true
};
RUR.add_new_thing(tile);

tile = {name: "racing_flag",
    url: RUR.BASE_URL + '/src/images/racing_flag.png',
    info: "racing_flag" + home_message,
    detectable: true
};
RUR.add_new_thing(tile);

/* --- default objects  -----*/

_add_object_type = function (name) {
    "use strict";
    var url, url_goal;
    url = RUR.BASE_URL + '/src/images/' + name + '.png';
    url_goal = RUR.BASE_URL + '/src/images/' + name + '_goal.png';
    RUR.add_new_thing({"name": name, "url": url, "goal": {"url": url_goal}});
};

_add_object_type("token");
RUR.THINGS.token.info = "tokens are Reeborg's favourite thing.";
_add_object_type("star");
_add_object_type("triangle");
_add_object_type("square");
_add_object_type("strawberry");
_add_object_type("banana");
_add_object_type("apple");
_add_object_type("leaf");
_add_object_type("carrot");
_add_object_type("dandelion");
_add_object_type("daisy");
_add_object_type("tulip");
_add_object_type("east");
_add_object_type("north");
RUR.THINGS.east.x_offset = 38;
RUR.THINGS.east.y_offset = -2;
RUR.THINGS.north.x_offset = -2;
RUR.THINGS.north.y_offset = -2;

// goal walls treated above
function _add_static_wall(name, x_offset, y_offset) {
    "use strict";
    var url;
    url = RUR.BASE_URL + '/src/images/' + name + '.png';
    RUR.add_new_thing({"name": name, "url": url,
                     "x_offset": x_offset, "y_offset": y_offset});
}
_add_static_wall("east_border", 38, -2);
_add_static_wall("east_grid", 39, -2);
_add_static_wall("east_edit", 38, -2);

_add_static_wall("north_border", -2, -2);
_add_static_wall("north_grid", -2, -1);
_add_static_wall("north_edit", -2, -2);

_add_object_type("box");
RUR.THINGS.box.name = "box";
RUR.THINGS.box.transform = [
    {conditions: [[RUR.is_background_tile, "water"],
                  [RUR.is_pushable, "box"],
                  [RUR.is_bridge, "bridge", "not"]],
     actions: [[RUR.remove_pushable, "box"],
              [RUR.add_bridge, "bridge"]]
    },
    {conditions: [[RUR.is_background_tile, "mud"],
                  [RUR.is_pushable, "box"],
                  [RUR.is_bridge, "bridge", "not"]],
     actions: [[RUR.remove_pushable, "box"],
              [RUR.add_bridge, "bridge"]]
    },
    {conditions: [[RUR.is_background_tile, "fire"],
                  [RUR.is_pushable, "box"]],
     actions: [[RUR.remove_pushable, "box"],
               [RUR.add_obstacle, "flame burst"]]
    },
    {conditions: [[RUR.is_obstacle, "fire"],
                  [RUR.is_pushable, "box"]],
     actions: [[RUR.remove_pushable, "box"],
               [RUR.add_obstacle, "flame burst"]]
    }
];

tile = {
    name: "bucket",
    info: "A bucket full of water.",
    url: RUR.BASE_URL + '/src/images/water_bucket.png',
    transform: [
        {conditions: [[RUR.is_background_tile, "fire"],
                    [RUR.is_object, "bucket"]],
        actions: [[RUR.remove_object, "bucket"],
                [RUR.remove_background_tile, "fire"],
                [RUR.add_obstacle, "logs"], // added as obstacle so that "info"
                [RUR.add_obstacle, "smoke"]] // can be shown when clicking on canvas.
        },
        {conditions: [[RUR.is_obstacle, "fire"],
                    [RUR.is_object, "bucket"]],
        actions: [[RUR.remove_object, "bucket"],
                [RUR.remove_obstacle, "fire"],
                [RUR.add_obstacle, "logs"],
                [RUR.add_obstacle, "smoke"]]
        },
        {conditions: [[RUR.is_object, "bulb"],
                    [RUR.is_object, "bucket"]],
        actions: [[RUR.remove_object, "bucket"],
                [RUR.remove_object, "bulb"],
                [RUR.add_object, "tulip"]]
        }
    ]
};
RUR.add_new_thing(tile);


tile = {
    name: "bulb",
    info: "Tulip bulb: might grow into a nice tulip with some water from a bucket.",
    url: RUR.BASE_URL + '/src/images/seed.png'
};
RUR.add_new_thing(tile);

tile = {
    name: "bridge",
    info: "Bridge:Reeborg <b>can</b> detect this and will know that it allows safe passage over water.",
    url: RUR.BASE_URL + '/src/images/bridge.png',
    protections: ["water", "mud"]
};
RUR.add_new_thing(tile);

tile = {"name": 'beeper',
    "selection_method": 'ordered',
    "images": [RUR.BASE_URL + '/src/images/beeper0.png',
            RUR.BASE_URL + '/src/images/beeper1.png',
            RUR.BASE_URL + '/src/images/beeper2.png',
            RUR.BASE_URL + '/src/images/beeper3.png'],
    "goal": {'url': RUR.BASE_URL + '/src/images/beeper_goal.png'}
};
RUR.add_new_thing(tile);

add_fence = function (name) {
    var obj = {};
    obj.name = name;
    obj.fatal = "fence";
    obj.solid = true;
    obj.detectable = true;
    obj.message = "I hit a fence!";
    obj.info = "Fence: Reeborg <b>can</b> detect this but will be stopped by it.";
    obj.url = RUR.BASE_URL + '/src/images/' + name + '.png';
    RUR.add_new_thing(obj);
};

add_fence("fence_right");
add_fence("fence_left");
add_fence("fence_double");
add_fence("fence_vertical");

